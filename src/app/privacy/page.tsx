import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Privacy Policy - ImpactOne",
    description: "Privacy Policy for ImpactOne Campus Resource Management",
};

export default function PrivacyPage() {
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
                        <h1 className="text-4xl font-headline font-bold mb-2">Privacy Policy</h1>
                        <p className="text-muted-foreground mb-8">Effective Date: February 17, 2026</p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                            <p className="mb-4">
                                Welcome to ImpactOne. We are committed to protecting your privacy and handling your personal information
                                with care and respect. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                                information when you use our campus resource management system.
                            </p>
                            <p className="mb-4">
                                By using ImpactOne, you agree to the collection and use of information in accordance with this policy.
                                If you do not agree with our policies and practices, please do not use the Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

                            <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
                            <p className="mb-4">When you use ImpactOne, we may collect the following personal information:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>
                                    <strong>Account Information:</strong> Name, email address (institutional), user ID, profile picture
                                </li>
                                <li>
                                    <strong>Booking Information:</strong> Resource booking details, event names, dates, times, attendee counts,
                                    department affiliation, special requirements
                                </li>
                                <li>
                                    <strong>Contact Information:</strong> Phone number (if provided for booking purposes)
                                </li>
                                <li>
                                    <strong>Authentication Data:</strong> Login credentials managed through Clerk authentication service
                                </li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
                            <p className="mb-4">We automatically collect certain information when you use the Service:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>
                                    <strong>Usage Data:</strong> Pages visited, features used, time spent on the Service, booking history
                                </li>
                                <li>
                                    <strong>Device Information:</strong> Browser type, operating system, device type, IP address
                                </li>
                                <li>
                                    <strong>Cookies and Similar Technologies:</strong> Session data, preferences, authentication tokens
                                </li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                            <p className="mb-4">We use the collected information for the following purposes:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>
                                    <strong>Service Delivery:</strong> To process and manage your bookings, send notifications, and facilitate
                                    resource allocation
                                </li>
                                <li>
                                    <strong>Account Management:</strong> To create and maintain your account, authenticate users, and manage access
                                </li>
                                <li>
                                    <strong>Communication:</strong> To send booking confirmations, status updates, reminders, and important
                                    service announcements
                                </li>
                                <li>
                                    <strong>Improvement:</strong> To analyze usage patterns, improve features, and enhance user experience
                                </li>
                                <li>
                                    <strong>Administration:</strong> To monitor and enforce institutional policies, prevent fraud, and resolve disputes
                                </li>
                                <li>
                                    <strong>Analytics:</strong> To generate reports on resource utilization and booking trends for administrative purposes
                                </li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
                            <p className="mb-4">
                                We do not sell your personal information. We may share your information in the following circumstances:
                            </p>

                            <h3 className="text-xl font-semibold mb-3">4.1 Within the Institution</h3>
                            <p className="mb-4">
                                Your booking information may be shared with authorized administrators, faculty, and staff members who need
                                access to manage resources and approve bookings.
                            </p>

                            <h3 className="text-xl font-semibold mb-3">4.2 Service Providers</h3>
                            <p className="mb-4">We work with third-party service providers to operate the Service:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>
                                    <strong>Clerk:</strong> Authentication and user management services
                                </li>
                                <li>
                                    <strong>Firebase/Google Cloud:</strong> Hosting, database, and cloud infrastructure
                                </li>
                                <li>
                                    <strong>Email Services:</strong> For sending booking notifications and confirmations
                                </li>
                            </ul>
                            <p className="mb-4">
                                These providers are bound by confidentiality agreements and may only use your information to perform
                                services on our behalf.
                            </p>

                            <h3 className="text-xl font-semibold mb-3">4.3 Legal Requirements</h3>
                            <p className="mb-4">
                                We may disclose your information if required by law, court order, or to protect the rights, property,
                                or safety of the institution, users, or others.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                            <p className="mb-4">
                                We implement appropriate technical and organizational measures to protect your personal information against
                                unauthorized access, alteration, disclosure, or destruction. These measures include:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Secure authentication via Clerk with industry-standard encryption</li>
                                <li>HTTPS encryption for data transmission</li>
                                <li>Access controls and role-based permissions</li>
                                <li>Regular security audits and updates</li>
                                <li>Secure cloud infrastructure with Firebase/Google Cloud</li>
                            </ul>
                            <p className="mb-4">
                                However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot
                                guarantee absolute security of your data.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                            <p className="mb-4">
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                                Privacy Policy, unless a longer retention period is required by law or institutional policy.
                            </p>
                            <p className="mb-4">
                                Booking records may be retained for administrative, historical, and auditing purposes even after you
                                leave the institution.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
                            <p className="mb-4">You have the following rights regarding your personal information:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>
                                    <strong>Access:</strong> Request access to the personal information we hold about you
                                </li>
                                <li>
                                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                                </li>
                                <li>
                                    <strong>Deletion:</strong> Request deletion of your personal information (subject to retention requirements)
                                </li>
                                <li>
                                    <strong>Opt-Out:</strong> Unsubscribe from non-essential email communications
                                </li>
                                <li>
                                    <strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format
                                </li>
                            </ul>
                            <p className="mb-4">
                                To exercise these rights, please contact us at{" "}
                                <a href="mailto:impact1.iceas@gmail.com" className="text-primary hover:underline font-semibold">
                                    impact1.iceas@gmail.com
                                </a>
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking Technologies</h2>
                            <p className="mb-4">
                                We use cookies and similar technologies to maintain your session, remember your preferences, and analyze
                                Service usage. You can control cookies through your browser settings, but disabling cookies may limit
                                certain features of the Service.
                            </p>
                            <p className="mb-4">Types of cookies we use:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>
                                    <strong>Essential Cookies:</strong> Required for authentication and core functionality
                                </li>
                                <li>
                                    <strong>Preference Cookies:</strong> Remember your settings and preferences
                                </li>
                                <li>
                                    <strong>Analytics Cookies:</strong> Help us understand how users interact with the Service
                                </li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links</h2>
                            <p className="mb-4">
                                The Service may contain links to third-party websites or services that are not operated by us. We are
                                not responsible for the privacy practices of these third parties. We encourage you to review the privacy
                                policies of any third-party sites you visit.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">10. Children&apos;s Privacy</h2>
                            <p className="mb-4">
                                The Service is intended for use by members of the educational institution who are 18 years of age or older,
                                or minors who have institutional authorization. We do not knowingly collect information from children under
                                13 without parental consent.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
                            <p className="mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
                                the new Privacy Policy on this page and updating the &quot;Effective Date.&quot; Your continued use of the Service
                                after changes are posted constitutes acceptance of the updated Privacy Policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
                            <p className="mb-4">
                                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                                please contact us at:
                            </p>
                            <div className="bg-muted p-4 rounded-lg border">
                                <p className="mb-2">
                                    <strong>Email:</strong>{" "}
                                    <a href="mailto:impact1.iceas@gmail.com" className="text-primary hover:underline font-semibold">
                                        impact1.iceas@gmail.com
                                    </a>
                                </p>
                                <p className="mb-0">
                                    <strong>System Administrators:</strong> Thejaswin P and Aarcha U
                                </p>
                            </div>
                        </section>

                        <div className="mt-12 p-6 bg-muted rounded-lg border">
                            <p className="text-sm text-muted-foreground">
                                By using ImpactOne, you acknowledge that you have read and understood this Privacy Policy and consent
                                to the collection, use, and disclosure of your information as described herein.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t py-6 px-4 md:px-6 text-xs text-muted-foreground bg-background/50">
                <div className="container max-w-4xl">
                    <p className="text-center mb-3">
                        © {new Date().getFullYear()} ImpactOne. Developed by{" "}
                        <a href="https://impactone.space" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
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
