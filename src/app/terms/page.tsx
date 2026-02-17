import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Terms of Service - ImpactOne",
    description: "Terms of Service for ImpactOne Campus Resource Management",
};

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-16 flex items-center bg-background border-b sticky top-0 z-50 backdrop-blur-sm bg-background/80">
                <Link href="/" className="flex items-center justify-center">
                    <Image
                        src="/favicon.png"
                        alt="ImpactOne Logo"
                        width={28}
                        height={28}
                        className="h-7 w-7"
                    />
                    <span className="ml-2 text-lg font-bold font-headline">ImpactOne</span>
                </Link>
                <nav className="ml-auto">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </nav>
            </header>

            <main className="flex-1">
                <div className="container max-w-4xl py-8 px-4 md:px-6">
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <h1 className="text-4xl font-headline font-bold mb-2">Terms of Service</h1>
                        <p className="text-muted-foreground mb-8">Effective Date: February 17, 2026</p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                            <p className="mb-4">
                                By accessing and using ImpactOne (&quot;the Service&quot;), you agree to be bound by these Terms of Service
                                (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Service.
                            </p>
                            <p className="mb-4">
                                ImpactOne is a campus resource management system designed to streamline venue and bus booking
                                for educational institutions. These Terms apply to all users, including students, faculty, and administrators.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">2. User Eligibility</h2>
                            <p className="mb-4">
                                The Service is intended for use by authorized members of the educational institution only.
                                You must have a valid institutional email address to create an account and access the Service.
                            </p>
                            <p className="mb-4">
                                By using the Service, you represent and warrant that:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>You are currently affiliated with the institution (student, faculty, or staff)</li>
                                <li>All information you provide is accurate and up-to-date</li>
                                <li>You will maintain the security of your account credentials</li>
                                <li>You will not share your account with others</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">3. Acceptable Use Policy</h2>
                            <p className="mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Make fraudulent or duplicate bookings</li>
                                <li>Book resources without intent to use them</li>
                                <li>Interfere with or disrupt the Service or servers</li>
                                <li>Attempt to gain unauthorized access to any part of the Service</li>
                                <li>Use the Service to harass, abuse, or harm others</li>
                                <li>Impersonate another user or provide false information</li>
                                <li>Violate any applicable laws or institutional policies</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">4. Booking Policies</h2>
                            <h3 className="text-xl font-semibold mb-3">4.1 Booking Process</h3>
                            <p className="mb-4">
                                All bookings are subject to approval by authorized administrators. Submitting a booking request
                                does not guarantee approval. You will receive email notifications regarding the status of your bookings.
                            </p>

                            <h3 className="text-xl font-semibold mb-3">4.2 Cancellations and Modifications</h3>
                            <p className="mb-4">
                                You may cancel or modify your bookings according to institutional policies. Repeated cancellations
                                or no-shows may result in restrictions on future booking privileges.
                            </p>

                            <h3 className="text-xl font-semibold mb-3">4.3 Resource Usage</h3>
                            <p className="mb-4">
                                You are responsible for the proper use and care of booked resources. Any damage or misuse may result
                                in penalties, including suspension of booking privileges and financial liability.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">5. Account Responsibilities</h2>
                            <p className="mb-4">
                                You are responsible for maintaining the confidentiality of your account credentials and for all
                                activities that occur under your account. You must notify the system administrator immediately
                                of any unauthorized use of your account.
                            </p>
                            <p className="mb-4">
                                We reserve the right to suspend or terminate accounts that violate these Terms or institutional policies.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                            <p className="mb-4">
                                The Service, including its design, features, graphics, and content, is owned by the institution
                                and protected by copyright and other intellectual property laws. You may not copy, modify, distribute,
                                or create derivative works without explicit permission.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
                            <p className="mb-4">
                                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                                OR IMPLIED. We do not guarantee that the Service will be uninterrupted, error-free, or free from
                                viruses or other harmful components.
                            </p>
                            <p className="mb-4">
                                We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                            <p className="mb-4">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, ARISING OUT OF OR RELATED TO
                                YOUR USE OF THE SERVICE.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">9. Privacy</h2>
                            <p className="mb-4">
                                Your use of the Service is also governed by our{" "}
                                <Link href="/privacy" className="text-primary hover:underline font-semibold">
                                    Privacy Policy
                                </Link>
                                , which describes how we collect, use, and protect your personal information.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                            <p className="mb-4">
                                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon
                                posting to the Service. Your continued use of the Service after changes are posted constitutes
                                acceptance of the modified Terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
                            <p className="mb-4">
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard
                                to its conflict of law provisions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
                            <p className="mb-4">
                                If you have any questions about these Terms, please contact us at:{" "}
                                <a href="mailto:impact1.iceas@gmail.com" className="text-primary hover:underline font-semibold">
                                    impact1.iceas@gmail.com
                                </a>
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">13. Severability</h2>
                            <p className="mb-4">
                                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions
                                will continue in full force and effect.
                            </p>
                        </section>

                        <div className="mt-12 p-6 bg-muted rounded-lg border">
                            <p className="text-sm text-muted-foreground">
                                By using ImpactOne, you acknowledge that you have read, understood, and agree to be bound by these
                                Terms of Service.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t py-6 px-4 md:px-6 text-xs text-muted-foreground bg-background/50">
                <div className="container max-w-4xl">
                    <p className="text-center mb-3">
                        © {new Date().getFullYear()} ImpactOne. Developed by{" "}
                        <a href="https://aarx.space" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                            Thejaswin P (1IC23CS082)
                        </a>{" "}
                        and{" "}
                        <span className="font-semibold text-primary">Aarcha U (1IC21AI001)</span>
                    </p>
                    <nav className="flex items-center justify-center gap-4">
                        <Link href="/terms" className="hover:underline hover:text-foreground transition-colors">
                            Terms of Service
                        </Link>
                        <span>•</span>
                        <Link href="/privacy" className="hover:underline hover:text-foreground transition-colors">
                            Privacy Policy
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
