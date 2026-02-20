"use client";

import { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Booking } from '@/lib/supabase/client';
import { format } from "date-fns";
import { Download, Printer, CheckCircle2 } from "lucide-react";

interface BookingAcknowledgmentProps {
    booking: Booking;
    onClose: () => void;
}

export function BookingAcknowledgment({ booking, onClose }: BookingAcknowledgmentProps) {
    const printRef = useRef<HTMLDivElement>(null);

    const formatTimeSlots = () => {
        if (booking.duration_type === "full-day") {
            return "Full Day (9:00 AM - 4:30 PM)";
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

    const addThirtyMinutes = (time: string) => {
        const [hour, minute] = time.split(':');
        const totalMinutes = parseInt(hour) * 60 + parseInt(minute) + 30;
        const newHour = Math.floor(totalMinutes / 60);
        const newMinute = totalMinutes % 60;
        return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        const jsPDF = (await import('jspdf')).default;

        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

        const W = 210;
        const H = 297;
        const margin = 10;
        const contentW = W - margin * 2;
        const footerY = H - 20;   // footer is always pinned here
        let y = margin;

        const logoUrl = typeof window !== 'undefined' ? `${window.location.origin}/favicon.png` : '/favicon.png';
        const collegeLogoUrl = 'image.png';

        const loadImage = (url: string): Promise<string> =>
            new Promise((resolve) => {
                const img = new window.Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    const c = document.createElement('canvas');
                    c.width = img.width; c.height = img.height;
                    c.getContext('2d')?.drawImage(img, 0, 0);
                    resolve(c.toDataURL('image/png'));
                };
                img.onerror = () => resolve('');
                img.src = url;
            });

        // Section title + grey rule; returns new y
        const sectionHeader = (title: string, yPos: number) => {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(11);
            pdf.setTextColor(30, 30, 30);
            pdf.text(title, margin, yPos);
            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.3);
            pdf.line(margin, yPos + 1.5, W - margin, yPos + 1.5);
            return yPos + 10;
        };

        // Label + bold value in a column; returns bottom y
        const field = (label: string, value: string, x: number, yPos: number, w: number) => {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8);
            pdf.setTextColor(110, 110, 110);
            pdf.text(label, x, yPos);
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10.5);
            pdf.setTextColor(20, 20, 20);
            const lines = pdf.splitTextToSize(value, w - 3);
            pdf.text(lines, x, yPos + 5.5);
            return yPos + 5.5 + lines.length * 6.5;
        };

        const [logoData, collegeLogoData] = await Promise.all([loadImage(logoUrl), loadImage(collegeLogoUrl)]);

        // ── HEADER ────────────────────────────────────────────────────
        const logoH = 13;
        if (logoData) pdf.addImage(logoData, 'PNG', margin, y, logoH, logoH);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(13);
        pdf.setTextColor(21, 128, 61);
        pdf.text('ImpactOne', margin + logoH + 2, y + 9);

        pdf.setFontSize(16);
        pdf.setTextColor(17, 24, 39);
        pdf.text('Booking Acknowledgment', W / 2, y + 6, { align: 'center' });
        pdf.setFontSize(9.5);
        pdf.setTextColor(22, 163, 74);
        pdf.text('\u2713  APPROVED', W / 2, y + 13, { align: 'center' });

        if (collegeLogoData) pdf.addImage(collegeLogoData, 'PNG', W - margin - logoH, y, logoH, logoH);

        y += logoH + 4;
        pdf.setDrawColor(22, 163, 74);
        pdf.setLineWidth(0.55);
        pdf.line(margin, y, W - margin, y);
        y += 6;

        // ── BOOKING REFERENCE ─────────────────────────────────────────
        pdf.setFillColor(246, 246, 246);
        pdf.roundedRect(margin, y, contentW, 13, 1.5, 1.5, 'F');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7.5);
        pdf.setTextColor(120, 120, 120);
        pdf.text('Booking Reference', margin + 4, y + 5);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.setTextColor(20, 20, 20);
        pdf.text(booking.id.substring(0, 8).toUpperCase(), margin + 4, y + 11.5);
        y += 22;

        // ── EVENT DETAILS ─────────────────────────────────────────────
        y = sectionHeader('Event Details', y);
        const colW = contentW / 2;
        const col1 = margin;
        const col2 = margin + colW;

        let r1 = field('Event Title', booking.event_title, col1, y, colW);
        let r2 = field('Department', `${booking.department} - ${booking.department_category}`, col2, y, colW);
        y = Math.max(r1, r2) + 5;

        r1 = field('Date', format(new Date(booking.booking_date), 'EEEE, MMMM d, yyyy'), col1, y, colW);
        r2 = field('Time', formatTimeSlots(), col2, y, colW);
        y = Math.max(r1, r2) + 5;

        r1 = field('Expected Attendees', `${booking.attendees} people`, col1, y, colW);
        r2 = field('Resource', `${booking.resource_name}${booking.sub_area ? ' - ' + booking.sub_area : ''}`, col2, y, colW);
        y = Math.max(r1, r2) + 5;

        if (booking.event_description) {
            y = field('Description', booking.event_description, col1, y, contentW) + 5;
        }
        y += 8;

        // ── CONTACT INFORMATION ───────────────────────────────────────
        y = sectionHeader('Contact Information', y);
        r1 = field('Requester', `${booking.requester_name}\n${booking.requester_email}`, col1, y, colW);
        if (booking.faculty_incharge) {
            const fac = [booking.faculty_incharge, booking.contact_number, booking.contact_email]
                .filter(Boolean).join('\n');
            r2 = field('Faculty In-charge', fac, col2, y, colW);
            y = Math.max(r1, r2) + 10;
        } else {
            y = r1 + 10;
        }

        // ── APPROVAL INFORMATION ──────────────────────────────────────
        y = sectionHeader('Approval Information', y);
        r1 = field('Status', 'Approved', col1, y, colW);
        if (booking.reviewed_at) {
            r2 = field('Approved On', format(new Date(booking.reviewed_at), "PPP 'at' p"), col2, y, colW);
            y = Math.max(r1, r2) + 5;
        } else {
            y = r1 + 5;
        }
        if (booking.reviewed_by || booking.created_at) {
            r1 = booking.reviewed_by ? field('Approved By', booking.reviewed_by, col1, y, colW) : y;
            r2 = booking.created_at
                ? field('Requested On', format(new Date(booking.created_at), "PPP 'at' p"), col2, y, colW)
                : y;
            y = Math.max(r1, r2) + 10;
        }

        // ── IMPORTANT NOTES — auto-expands to fill remaining space ─────
        const notes = [
            'Please arrive 15 minutes before your scheduled time.',
            'Ensure the venue is left clean and in good condition.',
            'Report any damages or issues to the facilities team immediately.',
            'This acknowledgment must be presented if requested by staff.',
        ];
        const minNotesH = 8 + notes.length * 6.5;
        const notesH = Math.max(minNotesH, footerY - y - 6);  // auto-fill remaining space

        pdf.setFillColor(239, 246, 255);
        pdf.roundedRect(margin, y, contentW, notesH, 2, 2, 'F');
        pdf.setDrawColor(147, 197, 253);
        pdf.setLineWidth(0.35);
        pdf.roundedRect(margin, y, contentW, notesH, 2, 2, 'S');

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9.5);
        pdf.setTextColor(30, 58, 138);
        pdf.text('Important Notes:', margin + 4, y + 7);

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(30, 64, 175);
        const bulletStart = y + 14;
        const bulletSpacing = (notesH - 14 - 3) / notes.length;  // evenly distribute bullets vertically
        notes.forEach((note, i) => {
            pdf.text(`\u2022  ${note}`, margin + 4, bulletStart + i * bulletSpacing);
        });

        // ── FOOTER – always at bottom ─────────────────────────────────
        pdf.setDrawColor(210, 210, 210);
        pdf.setLineWidth(0.3);
        pdf.line(margin, footerY, W - margin, footerY);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7.5);
        pdf.setTextColor(130, 130, 130);
        pdf.text('This is a computer-generated acknowledgment and does not require a signature.', W / 2, footerY + 5, { align: 'center' });
        pdf.text(`Generated on ${format(new Date(), "PPP 'at' p")}`, W / 2, footerY + 10, { align: 'center' });
        const fl = W / 2 - 24;
        if (logoData) pdf.addImage(logoData, 'PNG', fl, footerY + 12, 4.5, 4.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(80, 80, 80);
        pdf.text('ImpactOne - Resource Booking System', fl + 6, footerY + 15.5);

        pdf.save(`booking-acknowledgment-${booking.id}.pdf`);
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="print:hidden">
                    <DialogTitle>Booking Acknowledgment</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 print:hidden">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={handlePrint} variant="outline" className="flex-1">
                            <Printer className="h-4 w-4 mr-2" />
                            Print
                        </Button>
                        <Button onClick={handleDownload} className="flex-1 bg-green-600 hover:bg-green-700">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                        </Button>
                    </div>
                </div>

                {/* Acknowledgment Content */}
                <div ref={printRef} className="bg-white p-8 space-y-6 print:p-0">
                    {/* Header */}
                    <div style={{ borderBottom: '2px solid #16a34a', paddingBottom: '16px', marginBottom: '8px' }}>
                        {/* 3-column header: ImpactOne | Title | College Logo */}
                        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: '12px' }}>
                            {/* Left: ImpactOne */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '4px', flexShrink: 0 }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={typeof window !== 'undefined' ? `${window.location.origin}/favicon.png` : '/favicon.png'}
                                    alt="ImpactOne Logo"
                                    style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                                />
                                <span style={{ fontSize: '16px', fontWeight: '700', color: '#15803d', lineHeight: 1 }}>ImpactOne</span>
                            </div>

                            {/* Center: Title */}
                            <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <h1 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 4px', color: '#111827' }}>Booking Acknowledgment</h1>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '13px' }}>APPROVED</span>
                                </div>
                            </div>

                            {/* Right: College Logo */}
                            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="image.png"
                                    alt="College Logo"
                                    crossOrigin="anonymous"
                                    style={{ width: '72px', height: '72px', objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Booking Reference */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Booking Reference</p>
                        <p className="font-mono font-bold text-lg">{booking.id.substring(0, 8).toUpperCase()}</p>
                    </div>

                    {/* Event Details */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">Event Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Event Title</p>
                                <p className="font-medium">{booking.event_title}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Department</p>
                                <p className="font-medium">{booking.department} - {booking.department_category}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Date</p>
                                <p className="font-medium">{format(new Date(booking.booking_date), 'EEEE, MMMM d, yyyy')}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Time</p>
                                <p className="font-medium">{formatTimeSlots()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Expected Attendees</p>
                                <p className="font-medium">{booking.attendees} people</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Resource</p>
                                <p className="font-medium">{booking.resource_name}
                                    {booking.sub_area && ` - ${booking.sub_area}`}
                                </p>
                            </div>
                        </div>

                        {booking.event_description && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">Description</p>
                                <p className="text-sm mt-1">{booking.event_description}</p>
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Requester</p>
                                <p className="font-medium">{booking.requester_name}</p>
                                <p className="text-sm text-gray-600">{booking.requester_email}</p>
                            </div>
                            {booking.faculty_incharge && (
                                <div>
                                    <p className="text-sm text-gray-600">Faculty In-charge</p>
                                    <p className="font-medium">{booking.faculty_incharge}</p>
                                    {booking.contact_number && (
                                        <p className="text-sm text-gray-600">{booking.contact_number}</p>
                                    )}
                                    {booking.contact_email && (
                                        <p className="text-sm text-gray-600">{booking.contact_email}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Approval Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">Approval Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Status</p>
                                <p className="font-medium text-green-600">Approved</p>
                            </div>
                            {booking.reviewed_at && (
                                <div>
                                    <p className="text-sm text-gray-600">Approved On</p>
                                    <p className="font-medium">{format(new Date(booking.reviewed_at), 'PPP \'at\' p')}</p>
                                </div>
                            )}
                            {booking.reviewed_by && (
                                <div>
                                    <p className="text-sm text-gray-600">Approved By</p>
                                    <p className="font-medium">{booking.reviewed_by}</p>
                                </div>
                            )}
                            {booking.created_at && (
                                <div>
                                    <p className="text-sm text-gray-600">Requested On</p>
                                    <p className="font-medium">{format(new Date(booking.created_at), 'PPP \'at\' p')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">Important Notes:</h4>
                        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                            <li>Please arrive 15 minutes before your scheduled time</li>
                            <li>Ensure the venue is left clean and in good condition</li>
                            <li>Report any damages or issues to the facilities team immediately</li>
                            <li>This acknowledgment must be presented if requested by staff</li>
                        </ul>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-6 border-t text-sm text-gray-600">
                        <p>This is a computer-generated acknowledgment and does not require a signature.</p>
                        <p className="mt-1">Generated on {format(new Date(), 'PPP \'at\' p')}</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={typeof window !== 'undefined' ? `${window.location.origin}/favicon.png` : '/favicon.png'}
                                alt="ImpactOne Logo"
                                style={{ width: '20px', height: '20px', objectFit: 'contain', display: 'block' }}
                            />
                            <p className="font-semibold">ImpactOne - Resource Booking System</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
