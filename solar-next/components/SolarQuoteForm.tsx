'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SolarQuoteForm() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <FormContent />
        </Suspense>
    );
}

function FormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        pincode: '',
        rooftopArea: '',
        customerType: 'residential',
        monthlyBill: '',
        message: ''
    });

    // Pincode to City Mapping
    const pincodeToCity: Record<string, string> = {
        '110': 'delhi',
        '122': 'gurugram',
        '201': 'noida',
        '474': 'gwalior',
        '452': 'indore',
        '477': 'bhind',
        '462': 'bhopal',
    };

    useEffect(() => {
        // Populate form from URL params
        const newFormData = { ...formData };
        let hasChanges = false;

        if (searchParams.get('name')) {
            newFormData.name = searchParams.get('name') || '';
            hasChanges = true;
        }
        if (searchParams.get('phone')) {
            newFormData.phone = searchParams.get('phone') || '';
            hasChanges = true;
        }
        if (searchParams.get('customerType')) {
            newFormData.customerType = searchParams.get('customerType') || 'residential';
            hasChanges = true;
        }

        // Pincode logic
        if (searchParams.get('pincode')) {
            const pin = searchParams.get('pincode') || '';
            newFormData.pincode = pin;
            hasChanges = true;

            // Auto-detect city
            const prefix = pin.substring(0, 3);
            if (pincodeToCity[prefix]) {
                newFormData.city = pincodeToCity[prefix];
            }
        }

        if (hasChanges) {
            setFormData(newFormData);
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };

            // Auto-detect city when user types pincode
            if (name === 'pincode' && value.length >= 3) {
                const prefix = value.substring(0, 3);
                if (pincodeToCity[prefix]) {
                    updated.city = pincodeToCity[prefix];
                }
            }

            return updated;
        });
    };

    const handleRadioChange = (value: string) => {
        setFormData(prev => ({ ...prev, customerType: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send data to API
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    sourcePage: '/go-solar'
                })
            });

            if (response.ok) {
                router.push('/thank-you');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('Something went wrong. Please try again or call us directly.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                            placeholder="+91"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                            placeholder="you@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">City *</label>
                        <select
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                        >
                            <option value="">Select City</option>
                            <option value="delhi">New Delhi</option>
                            <option value="gurugram">Gurugram</option>
                            <option value="noida">Noida</option>
                            <option value="gwalior">Gwalior</option>
                            <option value="indore">Indore</option>
                            <option value="bhind">Bhind</option>
                            <option value="bhopal">Bhopal</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Pincode *</label>
                        <input
                            type="text"
                            name="pincode"
                            required
                            pattern="[0-9]{6}"
                            maxLength={6}
                            value={formData.pincode}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                            placeholder="e.g., 110001"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Rooftop Area (sq ft)</label>
                        <input
                            type="number"
                            name="rooftopArea"
                            required
                            value={formData.rooftopArea}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                            placeholder="e.g., 500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Customer Type *</label>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { id: 'residential', label: 'Residential' },
                            { id: 'commercial', label: 'Commercial' },
                            { id: 'society', label: 'Housing Society' }
                        ].map((type) => (
                            <label key={type.id} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="customerType"
                                    value={type.id}
                                    checked={formData.customerType === type.id}
                                    onChange={() => handleRadioChange(type.id)}
                                    className="peer sr-only"
                                />
                                <div className="text-center py-3 px-4 rounded-lg border border-slate-200 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary font-medium transition-all text-gray-700">
                                    {type.label}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Monthly Electricity Bill (₹)</label>
                    <input
                        type="number"
                        name="monthlyBill"
                        value={formData.monthlyBill}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                        placeholder="e.g., 3500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Message / Additional Details</label>
                    <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-gray-900"
                        placeholder="Any specific requirements or questions? (optional)"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
                </button>
            </form>
        </div>
    );
}
