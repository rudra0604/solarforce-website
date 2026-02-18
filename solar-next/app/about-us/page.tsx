
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About SolarForce | High-Performance Solar Solutions',
    description: 'Learn about SolarForce, a leading solar energy company providing residential, commercial, and society solar solutions since 2019.',
};

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full h-[600px] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20 z-10"></div>
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkHw7MlyIhhmwENfAYWbuJx3cSnXyPesqN3XjMi7pX_irL3xmltK-yDiW1k_Zauv5HKWcw_fM6xD4Gnt7eFZWSV497-_yaFQOt-VmOblXprmmO6Fycy3xEvryetvTh4YsF2sBthu6vHlNz5asK4vdxzSFrKB3lCvQxHg7y13Df99vNJmb5p-6WkeDi2tVpEjyIeiUzEut-mbESgHbUf_BMD__yeyLwnOBkDIgXb4T3XSie8cJJoZkh0kCLeDJMDzSQk8xMLVbhfYw')" }}
                    ></div>
                </div>
                <div className="relative z-10 max-w-4xl px-6 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                        Empowering the Future with Clean Energy
                    </h1>
                    <p className="text-lg md:text-xl font-medium text-slate-200 mb-8 max-w-2xl mx-auto">
                        Since 2019, SolarForce has been at the forefront of the sustainable energy revolution, delivering
                        high-quality solar solutions for residential, commercial, and society needs.
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">About SolarForce Solar</h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                            <p>
                                SolarForce Solar is a family-owned solar energy company delivering reliable, high-performance solar
                                solutions for residential, commercial, and large-scale projects across Madhya Pradesh and New Delhi.
                                We specialize in end-to-end (turnkey) solar installations, covering the complete value chain — from site
                                assessment and system design to project development, construction, financing, subsidy support, and
                                long-term operation & maintenance.
                            </p>
                            <p>
                                Our mission is to make solar energy simple, affordable, and sustainable for every customer we serve.
                            </p>
                            <p>
                                At SolarForce, our expertise lies in the technical and economic optimization of solar power systems,
                                ensuring maximum energy generation, faster return on investment, and long-term performance. Every project is
                                designed with precision, transparency, and a strong focus on quality.
                            </p>
                            <p>
                                With over 5+ years of industry experience, 30+ successful installations, and certifications including ISO
                                9001, MSME, Startup India, and Make in India, SolarForce has built a reputation as a trusted solar
                                installation company.
                            </p>
                        </div>

                        <div className="pt-6">
                            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Our Product Range</h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                In addition to solar power systems, we also manufacture and supply energy-efficient solar and LED lighting solutions, including:
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-3 text-slate-600 dark:text-slate-300">
                                {[
                                    'Solar Street Lights', 'Flood Lights',
                                    'High Mast Lights', 'High Bay Lights',
                                    'Panel Lights', 'Tube Lights'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-slate-600 dark:text-slate-300 mt-4">
                                We continuously expand our product portfolio to meet evolving energy needs and bring innovative, future-ready
                                solutions to our customers.
                            </p>
                        </div>

                        <div className="pt-6">
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Investment Opportunities</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                SolarForce is also actively developing a qualified pipeline of photovoltaic projects, creating opportunities for
                                investors interested in the clean energy sector.
                            </p>
                        </div>

                        <div className="pt-6">
                            <p className="text-slate-600 dark:text-slate-300 font-medium">
                                Driven by integrity, innovation, and long-term partnerships, we are committed to brightening the future through
                                clean, renewable energy.
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 w-full h-[400px] rounded-2xl overflow-hidden shadow-xl relative ring-1 ring-slate-200 dark:ring-slate-800">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYu4-8-hclmMK2rFVVhQwkBG8daCu5ySQT8OzMQ_Ix1AAtnOUKPbklPAzrFkyQ7_1NaF0dqyhfLF-msHKPA2GAyTEnWu5OXfmjNotYHPEC5hJUm1pLgQZBw9r43uAqYxp90rx1luXPZldxONbVNJA0f_iCZgsJn-p3lYogxtSEecVT_jBVUV87RyCtZpwzNH9w1NHkHbTWFKf6K1XKUe_Z3BoYreR60ZXrqxbYnziMRxS6NdYd3V_07bOgoX3X2mAd3-hKv8DtJjc')" }}
                        ></div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-white dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold mb-4">Core Values</h2>
                        <p className="text-slate-600 dark:text-slate-400">The principles that guide every installation and interaction.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: 'eco', title: 'Sustainability', desc: 'Commited to reducing carbon footprints with every project.' },
                            { icon: 'lightbulb', title: 'Innovation', desc: 'Leveraging the latest technology for maximum efficiency.' },
                            { icon: 'verified', title: 'Integrity', desc: 'Transparent pricing and honest energy assessments.' },
                            { icon: 'workspace_premium', title: 'Quality', desc: 'Using only top-tier components for durability.' }
                        ].map((val, i) => (
                            <div key={i} className="p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                    <span className="material-symbols-outlined">{val.icon}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2">{val.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="py-20 max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16">Our Journey (2019 - 2026)</h2>
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-300 dark:bg-slate-700"></div>

                    {/* 2019 */}
                    <div className="relative flex items-center justify-between mb-16 group">
                        <div className="w-5/12 text-right pr-8">
                            <h3 className="text-xl font-bold text-primary">2019</h3>
                            <h4 className="font-semibold text-lg">Inception</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Founded with a vision to bring clean energy to local communities. Completed first residential project.</p>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-sm z-10"></div>
                        <div className="w-5/12 pl-8"></div>
                    </div>

                    {/* 2022 */}
                    <div className="relative flex items-center justify-between mb-16 group">
                        <div className="w-5/12 text-right pr-8"></div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-sm z-10"></div>
                        <div className="w-5/12 pl-8">
                            <h3 className="text-xl font-bold text-primary">2022</h3>
                            <h4 className="font-semibold text-lg">Commercial Expansion</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Launched commercial division, partnering with factories for large-scale roof installations.</p>
                        </div>
                    </div>

                    {/* 2024 */}
                    <div className="relative flex items-center justify-between mb-16 group">
                        <div className="w-5/12 text-right pr-8">
                            <h3 className="text-xl font-bold text-primary">2024</h3>
                            <h4 className="font-semibold text-lg">Lighting Division</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Introduced LED lighting portfolio including solar street lights and flood lights.</p>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-sm z-10"></div>
                        <div className="w-5/12 pl-8"></div>
                    </div>

                    {/* 2026 */}
                    <div className="relative flex items-center justify-between group">
                        <div className="w-5/12 text-right pr-8"></div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-sm z-10"></div>
                        <div className="w-5/12 pl-8">
                            <h3 className="text-xl font-bold text-primary">2026</h3>
                            <h4 className="font-semibold text-lg">1.2MW Milestone</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Achieved 1.2MW total installed capacity across 3 states.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Portfolio */}
            <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Our Product Portfolio</h2>
                        <p className="text-slate-600 dark:text-slate-400">Efficient solar and LED solutions for every need.</p>
                    </div>
                    <Link href="#" className="hidden md:inline-flex items-center text-primary font-bold hover:underline">
                        View All Products <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Solar Street Lights',
                            desc: 'Autonomous lighting for smart cities.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7dG5IzhR2e_IM4z73szJCR4QH79yUqaF1tZUsYlAezKhGmSRVc93_JiHvG5lTc6UA5uhNsCrGacr3JScsr2LPHmkzBu-EvM1A_GAcEOT0nYiOua_4T1eMHS107tiOSxmvNZP9RoW3ZqAoqAndf0TGGlnbmKrkwRRLJDVu1Ui-l4HtAew5J47-D1Bo1OkzkjfE0qLxDGnpFZn__M5CXeCnFjvRx8B9SPva4VlRMUaeAgX_XZSiKuPmFl2xTOTkt6fesYUoOCvR9hU'
                        },
                        {
                            title: 'LED Flood Lights',
                            desc: 'High-intensity illumination for large areas.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw32sYAnI31rIFiPryWLKFdsIaVfOOlsKClHV22maeunv0NIpV3d9I2bD14L2Dfhl6iL6KmEpfXe1Q3EK1NxVYqRRsEJjvw-VnEmHoZX-lN6SSYD1jWTNIKb2yMk3gV0UJX6Ly1t4Ai4EOrAeGM-lDHfCNW_sXo76wYLxqcD6_xzEq704v4sAMnH03hOdB1y_8XYKn6i4HklxNj0oaeqGRBeHtVh5XH45WOeE1FBZKwhzUldrJnjpqSUc3xjyfMxIp357VnTqYXKM'
                        },
                        {
                            title: 'Rooftop Solutions',
                            desc: 'Customized panels for homes and factories.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1UU2l1OjsbUu3hVzPY4aYoyUcC17Q2qqyzXul3ng-hoO_Fm54w4KjWIBWPk7HRpEGg7mpqcc99MiMWhlOgq_BvcR5-EXj8NUdfqvh5TL4WU0pFv4qLCZMvFDRYOQQ3mORSyd1AenJ1RToAWEtX0gDdNrljx8FQCnBIZGKn-cSkSoiXUxto2fYEsZAaW7Hc62fcaYL_q3GjSgs7Gxld3zx4NecfRIWupsYtP-_q33swvT_SbQ4fRurgHBr2dhrey-mZ-f9Ty2vxLg'
                        }
                    ].map((item, i) => (
                        <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer h-80 shadow-md">
                            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors z-10"></div>
                            <img
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                src={item.img}
                                alt={item.title}
                            />
                            <div className="absolute bottom-0 left-0 p-6 z-20 text-white w-full bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <p className="text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 md:hidden text-center">
                    <Link href="#" className="inline-flex items-center text-primary font-bold hover:underline">
                        View All Products <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                    </Link>
                </div>
            </section>
        </>
    );
}
