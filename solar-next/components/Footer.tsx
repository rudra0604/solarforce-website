import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-12 pb-0 overflow-hidden relative">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/img/logo/logo.svg" alt="SolarForce" className="h-8 w-8" />
                            <span className="text-xl font-bold">SolarForce</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            SolarForce helps homeowners avoid costly utility bills and save the environment
                            by increasing their home's energy efficiency.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/homes" className="hover:text-primary">Residential Solar</Link></li>
                            <li><Link href="/commercial" className="hover:text-primary">Commercial Solar</Link></li>
                            <li><Link href="/housing-society" className="hover:text-primary">Society Solutions</Link></li>
                            <li><Link href="/calculator" className="hover:text-primary">Calculate Savings</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                            <li><Link href="/#faq" className="hover:text-primary">FAQs</Link></li>
                            <li><Link href="/terms-of-use" className="hover:text-primary">Warranty Policy</Link></li>
                            <li><Link href="/go-solar" className="hover:text-primary">Service Request</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xs">call</span> +91 9354932531
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xs">mail</span> privatelimitedsolarforce@gmail.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xs">location_on</span>
                                RZC 209-210 Ground Floor B-Block Arjun Park Nangli Sakrawati Najafragh, New Delhi
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2026 SolarForce Private Limited. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="/terms-of-use" className="hover:text-primary">Terms of Use</Link>
                        <Link href="/sitemap" className="hover:text-primary">Sitemap</Link>
                    </div>
                </div>
            </div>

            {/* 3D Perspective Brand Text */}
            <div className="footer-3d-container mt-8 hidden md:block">
                <div className="flex justify-center items-end">
                    <span className="footer-3d-text">SolarForce</span>
                </div>
            </div>
        </footer>
    );
}
