
import type { Metadata } from 'next';
import SolarQuoteForm from '@/components/SolarQuoteForm';

export const metadata: Metadata = {
    title: 'Go Solar - Get a Free Quote | SolarForce',
    description: 'Get a free, customized solar quote for your home or business. SolarForce provides top-tier solar installation services.',
};

export default function GoSolarPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 min-h-screen bg-background-light dark:bg-background-dark">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-black mb-4 text-secondary dark:text-white">Get Your Free Solar Quote</h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Fill out the form below and our team will contact you within 24 hours with a customized proposal.
                </p>
            </div>

            <SolarQuoteForm />
        </main>
    );
}
