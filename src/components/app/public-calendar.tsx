"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase, type Booking } from '@/lib/supabase/client';
import { format, isSameDay, startOfToday } from "date-fns";
import { Loader2, Clock, MapPin, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Festival Configuration
interface Festival {
    name: string;
    emoji: string;
    message: string;
    month: number; // 0-indexed (Jan = 0)
    day: number;
}

const FESTIVALS: Festival[] = [
    // January
    { name: "New Year's Day", emoji: "🎉", message: "Happy New Year! Wishing you a fantastic year ahead!", month: 0, day: 1 },
    { name: "Makar Sankranti", emoji: "🪁", message: "Happy Makar Sankranti! May your life be filled with sweetness and joy!", month: 0, day: 14 },
    { name: "Republic Day", emoji: "🇮🇳", message: "Happy Republic Day! Let's celebrate the spirit of our great nation!", month: 0, day: 26 },

    // February
    { name: "Valentine's Day", emoji: "💝", message: "Happy Valentine's Day! Spread love and kindness today!", month: 1, day: 14 },

    // March
    { name: "Holi", emoji: "🎨", message: "Happy Holi! May your life be filled with colors of joy!", month: 2, day: 14 }, // Approximate - varies yearly
    { name: "Women's Day", emoji: "👩", message: "Happy Women's Day! Celebrating the strength and achievements of women!", month: 2, day: 8 },

    // April
    { name: "Ugadi/Gudi Padwa", emoji: "🌸", message: "Happy New Year! Wishing you prosperity and happiness!", month: 3, day: 9 }, // Approximate
    { name: "Ambedkar Jayanti", emoji: "📚", message: "Remembering Dr. B.R. Ambedkar and his contributions to our nation!", month: 3, day: 14 },
    { name: "Ram Navami", emoji: "🏹", message: "Happy Ram Navami! Celebrating the birth of Lord Rama!", month: 3, day: 17 }, // Approximate

    // May
    { name: "Buddha Purnima", emoji: "☸️", message: "Happy Buddha Purnima! May peace and wisdom guide you!", month: 4, day: 5 }, // Approximate
    { name: "Mother's Day", emoji: "💐", message: "Happy Mother's Day! Celebrating all the amazing mothers!", month: 4, day: 11 }, // Second Sunday - approximate

    // June
    { name: "Father's Day", emoji: "👨‍👧‍👦", message: "Happy Father's Day! Celebrating all the wonderful fathers!", month: 5, day: 15 }, // Third Sunday - approximate
    { name: "Eid al-Adha", emoji: "🌙", message: "Eid Mubarak! Wishing you joy, peace, and prosperity!", month: 5, day: 17 }, // Approximate - varies yearly

    // July
    { name: "Guru Purnima", emoji: "🙏", message: "Happy Guru Purnima! Honoring all our teachers and mentors!", month: 6, day: 3 }, // Approximate

    // August
    { name: "Independence Day", emoji: "🇮🇳", message: "Happy Independence Day! Celebrating 75+ years of freedom!", month: 7, day: 15 },
    { name: "Raksha Bandhan", emoji: "🪢", message: "Happy Raksha Bandhan! Celebrating the bond of love!", month: 7, day: 19 }, // Approximate
    { name: "Janmashtami", emoji: "🪈", message: "Happy Janmashtami! May Lord Krishna bless you!", month: 7, day: 26 }, // Approximate

    // September
    { name: "Ganesh Chaturthi", emoji: "🐘", message: "Happy Ganesh Chaturthi! Ganpati Bappa Morya!", month: 8, day: 7 }, // Approximate
    { name: "Onam", emoji: "🌼", message: "Happy Onam! Wishing you a prosperous harvest season!", month: 8, day: 15 }, // Approximate
    { name: "Teacher's Day", emoji: "📖", message: "Happy Teacher's Day! Thanking all the wonderful teachers!", month: 8, day: 5 },

    // October
    { name: "Gandhi Jayanti", emoji: "🕊️", message: "Happy Gandhi Jayanti! Remembering the Father of our Nation!", month: 9, day: 2 },
    { name: "Navratri", emoji: "🎊", message: "Happy Navratri! May the divine bless you with strength and prosperity!", month: 9, day: 3 }, // Approximate - 9 days
    { name: "Dussehra", emoji: "🏹", message: "Happy Dussehra! Victory of good over evil!", month: 9, day: 12 }, // Approximate

    // November
    { name: "Diwali", emoji: "🪔", message: "Happy Diwali! May your life be filled with light and prosperity!", month: 10, day: 1 }, // Approximate
    { name: "Bhai Dooj", emoji: "👫", message: "Happy Bhai Dooj! Celebrating the bond between siblings!", month: 10, day: 3 }, // Approximate
    { name: "Children's Day", emoji: "🧒", message: "Happy Children's Day! Celebrating the joy and innocence of childhood!", month: 10, day: 14 },
    { name: "Guru Nanak Jayanti", emoji: "🙏", message: "Guru Nanak Jayanti! May his teachings inspire peace and harmony!", month: 10, day: 15 }, // Approximate

    // December
    { name: "Christmas Eve", emoji: "🎅", message: "Merry Christmas Eve! May your celebrations be joyful!", month: 11, day: 24 },
    { name: "Christmas", emoji: "🎄", message: "Merry Christmas! Wishing you peace, joy, and happiness!", month: 11, day: 25 },
    { name: "New Year's Eve", emoji: "🎆", message: "Happy New Year's Eve! Ready to welcome the new year with joy!", month: 11, day: 31 },
];

// Helper function to check if a date is a festival
const getFestivalForDate = (date: Date | undefined): Festival | null => {
    if (!date) return null;
    const month = date.getMonth();
    const day = date.getDate();

    return FESTIVALS.find(festival =>
        festival.month === month && festival.day === day
    ) || null;
};

export function PublicCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [festivalDialog, setFestivalDialog] = useState<{ open: boolean; festival: Festival | null }>({
        open: false,
        festival: null
    });

    useEffect(() => {
        async function fetchApprovedBookings() {
            const today = new Date().toISOString().split('T')[0];

            try {
                const { data, error } = await supabase
                    .from('bookings')
                    .select('id, event_title, booking_date, start_time, end_time, resource_name, sub_area, resource_type, selected_slots, duration_type, status')
                    .eq('status', 'Approved')
                    .gte('booking_date', today) // Only future/today bookings
                    .order('booking_date', { ascending: true });

                if (error) {
                    console.error("Error fetching approved bookings:", error);
                    setLoading(false);
                    return;
                }

                setBookings((data as unknown as Booking[]) || []);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchApprovedBookings();
    }, []);

    // Reliable date parsing helper (avoids timezone shifts)
    const parseSupabaseDate = (dateStr: string) => {
        if (!dateStr) return new Date();
        const part = dateStr.split('T')[0];
        const [y, m, d] = part.split('-').map(Number);
        return new Date(y, m - 1, d);
    };

    // Get bookings for selected date
    const selectedDateBookings = bookings.filter((booking) => {
        if (!date) return false;
        const bDate = parseSupabaseDate(booking.booking_date);
        return isSameDay(bDate, date);
    });

    // Get dates with bookings for calendar highlighting
    // Create a map to avoid duplicates and easy lookup
    const bookedDates = bookings.map((b) => parseSupabaseDate(b.booking_date));

    // Format time slots display
    const formatTimeSlots = (booking: Booking) => {
        if (booking.duration_type === "full-day") {
            return "Full Day";
        }
        if (booking.selected_slots && booking.selected_slots.length > 0) {
            const sortedSlots = [...booking.selected_slots].sort();
            if (sortedSlots.length === 1) {
                return sortedSlots[0];
            }
            return `${sortedSlots[0]} - ${sortedSlots[sortedSlots.length - 1]}`;
        }
        return `${booking.start_time} - ${booking.end_time}`;
    };

    // Helper to add 30 minutes to time string
    const addThirtyMinutes = (time: string) => {
        const [hour, minute] = time.split(':');
        const totalMinutes = parseInt(hour) * 60 + parseInt(minute) + 30;
        const newHour = Math.floor(totalMinutes / 60);
        const newMinute = totalMinutes % 60;
        return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
            {/* Calendar View */}
            <Card className="border-primary/10 shadow-md">
                <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="flex items-center gap-2 text-primary">
                        <CalendarIcon className="h-5 w-5" />
                        Event Calendar
                    </CardTitle>
                    <CardDescription>Select a date to view scheduled events</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex justify-center">
                    <style jsx global>{`
            .rdp-day_booked {
              background-color: #10b981 !important;
              color: white !important;
              font-weight: 600 !important;
              border-radius: 6px !important;
            }
            .rdp-day_booked:hover {
              background-color: #059669 !important;
            }
            .rdp-day_today {
              font-weight: bold;
              border: 2px solid #10b981;
            }
          `}</style>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                            setDate(newDate);
                            // Check if the selected date is a festival
                            const festival = getFestivalForDate(newDate);
                            if (festival) {
                                setFestivalDialog({ open: true, festival });
                            }
                        }}
                        className="rounded-md border shadow-sm p-4 bg-white"
                        modifiers={{
                            booked: bookedDates,
                        }}
                        modifiersClassNames={{
                            booked: "rdp-day_booked",
                        }}
                        disabled={(date) => date < startOfToday()}
                    />
                </CardContent>
            </Card>

            {/* Bookings List */}
            <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-headline">
                        {date ? format(date, "EEEE, MMMM d, yyyy") : "Upcoming Events"}
                    </CardTitle>
                    <CardDescription className="text-base">
                        {selectedDateBookings.length > 0
                            ? `${selectedDateBookings.length} confirmed event${selectedDateBookings.length !== 1 ? 's' : ''}`
                            : "No public events scheduled for this date."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                    {selectedDateBookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/30">
                            <CalendarIcon className="h-12 w-12 mb-4 opacity-20" />
                            <p className="text-lg font-medium">No events found</p>
                            <p className="text-sm">Try selecting a green highlighted date on the calendar.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {selectedDateBookings
                                .sort((a, b) => {
                                    const timeA = a.start_time || a.selected_slots?.[0] || "00:00";
                                    const timeB = b.start_time || b.selected_slots?.[0] || "00:00";
                                    return timeA.localeCompare(timeB);
                                })
                                .map((booking) => (
                                    <Card key={booking.id} className="overflow-hidden border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-xl text-foreground">{booking.event_title}</h3>
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <MapPin className="h-4 w-4 text-green-600" />
                                                        <span className="font-medium">
                                                            {booking.resource_name}
                                                            {booking.sub_area && ` - ${booking.sub_area}`}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 bg-secondary/50 px-4 py-2 rounded-lg whitespace-nowrap">
                                                    <Clock className="h-5 w-5 text-primary" />
                                                    <span className="font-semibold text-lg text-primary">
                                                        {formatTimeSlots(booking)}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Festival Easter Egg Toast Notification */}
            {festivalDialog.open && festivalDialog.festival && (
                <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
                    <Card className="w-80 border-primary/20 shadow-xl bg-card relative">
                        {/* Close button */}
                        <button
                            onClick={() => setFestivalDialog({ open: false, festival: null })}
                            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors z-10"
                            aria-label="Close"
                        >
                            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <CardContent className="p-5 space-y-3">
                            {/* Emoji and Title */}
                            <div className="flex items-center gap-3">
                                <div className="text-4xl animate-bounce">
                                    {festivalDialog.festival.emoji}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-primary">
                                        {festivalDialog.festival.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Message */}
                            <p className="text-sm text-muted-foreground pl-1 leading-relaxed">
                                {festivalDialog.festival.message}
                            </p>

                            {/* Bottom decoration */}
                            <div className="flex items-center justify-center gap-2 pt-1">
                                <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                                <span className="text-xs text-primary font-medium">
                                    Wishing you a wonderful celebration!
                                </span>
                                <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
