
import type { Metadata } from 'next';
import SolarCalculator from '@/components/SolarCalculator';

export const metadata: Metadata = {
    title: 'Solar Calculator | SolarForce',
    description: 'Calculate your solar savings now! Estimate system size, subsidy, and ROI with our advanced solar calculator.',
};

export default function CalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
            {/* Hero Calculator Section */}
            <div className="w-full bg-gradient-to-br from-blue-600 via-primary to-blue-800 text-white py-12 md:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur rounded-full mb-6">
                        <span className="material-symbols-outlined text-4xl text-white">solar_power</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        Calculate Your Solar Savings Now!
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                        Unlock savings, build that dream fund, and start ticking off your checklist.
                    </p>
                </div>
            </div>

            {/* Main Calculator Card */}
            <div className="max-w-2xl mx-auto px-4 -mt-10 relative z-10 w-full mb-12">
                <SolarCalculator />
            </div>

            {/* Why Use Calculator Section */}
            <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Use the SolarForce Solar Panel Calculator?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Our intelligent solar panel calculator for home is powered by region-specific data and takes into
                            account electricity tariffs, panel degradation, inflation and solar irradiance levels to give you a
                            personalised solar savings report.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: 'trending_up', title: 'Estimate Solar Savings', desc: 'Know how much you can save each month and over 25 years.' },
                            { icon: 'solar_power', title: 'Size Your Solar System', desc: 'Get the ideal system capacity for your rooftop.' },
                            { icon: 'account_balance_wallet', title: 'Calculate Investment & ROI', desc: 'Understand your return on investment and break-even point.' },
                            { icon: 'home', title: 'Area Requirement', desc: "Learn how much rooftop space you'll need." },
                            { icon: 'bolt', title: 'System Performance', desc: 'See how much clean energy your system will generate.' },
                            { icon: 'compare_arrows', title: 'Compare Financing Options', desc: 'Evaluate savings and how you can get solar @ 0 investment.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-background-light dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                                <div className="text-primary mb-4">
                                    <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
