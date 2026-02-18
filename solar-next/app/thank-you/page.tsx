
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Thank You | SolarForce',
    description: 'Thank you for your interest in SolarForce. Our team will contact you shortly.',
};

export default function ThankYouPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center p-4 py-16 bg-background-light">
                <div className="max-w-lg w-full text-center">
                    {/* Success Card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>

                        {/* Checkmark Icon */}
                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-checkmark">
                                <span className="material-symbols-outlined text-white text-5xl">check_circle</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 animate-fadeUp delay-200 fill-mode-forwards">
                                Thank You! 🌞
                            </h1>

                            <div className="text-lg text-gray-600 mb-6 animate-fadeUp delay-400 fill-mode-forwards">
                                We're excited about your interest in going solar!<br />
                                <strong className="text-primary">Our team will reach out to you within 24 hours</strong> with a customized solar proposal.
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6 mb-8 animate-fadeUp delay-600 fill-mode-forwards">
                                <h2 className="font-bold text-gray-800 mb-3">What happens next?</h2>
                                <ul className="text-left text-gray-600 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">call</span>
                                        <span>Our solar expert will call you</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">home</span>
                                        <span>We'll schedule a free site visit</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">description</span>
                                        <span>You'll receive a detailed proposal</span>
                                    </li>
                                </ul>
                            </div>

                            <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg">
                                <span className="material-symbols-outlined">home</span>
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <p className="mt-6 text-gray-500 text-sm">
                        Have questions? Call us at <a href="tel:+919354932531" className="text-primary font-semibold hover:underline">+91 93549 32531</a>
                    </p>
                </div>
            </main>
        </div>
    );
}
