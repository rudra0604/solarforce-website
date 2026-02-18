
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Contact SolarForce | Get in Touch',
    description: 'Contact SolarForce for solar panel installation inquiries in New Delhi and Madhya Pradesh. Call us or visit our offices.',
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-primary text-white py-24 px-6 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                        backgroundSize: "30px 30px"
                    }}
                ></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Get in Touch with SolarForce</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Ready to switch to solar? Our team in New Delhi and Madhya Pradesh is here to answer your questions and help you start your journey.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="flex-grow bg-background-light dark:bg-background-dark py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-10">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-[#1c130d] dark:text-white mb-4">Our Offices</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Visit or contact our regional headquarters for personalized solar consultations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* New Delhi Office */}
                            <div className="bg-white dark:bg-[#1e140e] p-6 rounded-xl border border-[#e8d9ce] dark:border-[#3a2e26] hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary mb-4">
                                    <span className="material-symbols-outlined text-2xl">apartment</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#1c130d] dark:text-white mb-2">New Delhi</h3>
                                <p className="text-gray-500 text-sm mb-4">Regional Headquarters</p>
                                <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">location_on</span>
                                    <span>Ground Floor, Plot No.-209-210 Arjun Park, Near Lal <br /> Mandir Kh No.6/22/11, Nangli Sakrawati, Nazafgarh, South West Delhi</span>
                                </div>
                            </div>

                            {/* Madhya Pradesh Office */}
                            <div className="bg-white dark:bg-[#1e140e] p-6 rounded-xl border border-[#e8d9ce] dark:border-[#3a2e26] hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary mb-4">
                                    <span className="material-symbols-outlined text-2xl">domain</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#1c130d] dark:text-white mb-2">Madhya Pradesh</h3>
                                <p className="text-gray-500 text-sm mb-4">State Operations Center</p>
                                <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">location_on</span>
                                    <span>ANJALI ENTERPRISES Lashkar Road Jain Mandir, <br />Puliya ke pass, Bhind (M.P.)</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-blue-50 dark:bg-[#1a202c] p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="text-xl font-bold text-[#1c130d] dark:text-white mb-6 text-center">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20 mb-4">
                                        <span className="material-symbols-outlined text-xl">call</span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium mb-2">Phone Numbers</p>
                                    <a href="tel:+919354932531" className="text-lg font-bold text-[#1c130d] dark:text-white font-display hover:text-primary transition-colors block">
                                        +91 93549 32531
                                    </a>
                                    <a href="tel:+919893132335" className="text-lg font-bold text-[#1c130d] dark:text-white font-display hover:text-primary transition-colors block">
                                        +91 98931 32335
                                    </a>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20 mb-4">
                                        <span className="material-symbols-outlined text-xl">mail</span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium mb-2">Email Address</p>
                                    <a href="mailto:privatelimitedsolarforce@gmail.com" className="text-lg font-medium text-[#1c130d] dark:text-white hover:text-primary transition-colors break-all">
                                        privatelimitedsolarforce@gmail.com
                                    </a>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20 mb-4">
                                        <span className="material-symbols-outlined text-xl">schedule</span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium mb-2">Business Hours</p>
                                    <p className="text-lg font-medium text-[#1c130d] dark:text-white">Mon - Sat</p>
                                    <p className="text-lg font-medium text-[#1c130d] dark:text-white">9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center bg-white dark:bg-[#1e140e] p-8 rounded-2xl border border-[#e8d9ce] dark:border-[#3a2e26]">
                            <h3 className="text-2xl font-bold text-[#1c130d] dark:text-white mb-4">Ready to Go Solar?</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Get a free consultation and customized quote for your solar installation.
                            </p>
                            <Link href="/go-solar" className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-colors shadow-xl shadow-blue-500/20">
                                Get Free Quote <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
