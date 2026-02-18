
'use client';

import { useState, useEffect } from 'react';
import { pincodeDatabase } from '@/lib/pincodes';

export default function SolarCalculator() {
    const [state, setState] = useState({
        pincode: '',
        location: '',
        electricityBill: '',
        showResults: false,
        activeTab: 'system',
        emiTenure: 60,
        isCalculating: false,

        // Calculated values
        systemSize: 0,
        roofArea: 0,
        monthlySavings: 0,
        yearlySavings: 0,
        fiveYearSavings: 0,
        totalCost: 0,
        subsidy: 0,
        netCost: 0,
        emi: 0,
        downPayment: 0,
        netDownPayment: 0,
        co2Mitigated: 0,
        treesPlanted: 0,
        distanceKm: 0,
    });

    const [locationStatus, setLocationStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [quoteFormStatus, setQuoteFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Format number to currency
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-IN').format(num);
    };

    const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);

        let location = '';
        let status: 'idle' | 'success' | 'error' = 'idle';

        if (value.length === 6) {
            if (pincodeDatabase[value]) {
                location = pincodeDatabase[value];
                status = 'success';
            } else {
                status = 'error';
            }
        }

        setState(prev => ({ ...prev, pincode: value, location }));
        setLocationStatus(status);
    };

    const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, electricityBill: e.target.value }));
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        const bill = parseFloat(state.electricityBill);
        if (!state.location || !bill || bill < 500) return;

        setState(prev => ({ ...prev, isCalculating: true }));

        // Simulate calculation delay
        setTimeout(() => {
            performCalculation(bill);
        }, 800);
    };

    const performCalculation = (bill: number) => {
        // System sizing logic
        let selectedSystemSize = 3;
        let selectedSystemCost = 200000;

        if (bill < 2000) {
            selectedSystemSize = 3;
            selectedSystemCost = 200000;
        } else if (bill < 3000) {
            selectedSystemSize = 4;
            selectedSystemCost = 230000;
        } else if (bill < 4000) {
            selectedSystemSize = 5;
            selectedSystemCost = 300000;
        } else if (bill < 5000) {
            selectedSystemSize = 7;
            selectedSystemCost = 350000;
        } else {
            selectedSystemSize = 10;
            selectedSystemCost = 450000;
        }

        // Savings calculation
        let cumulativeSavings = 0;
        let fiveYearTotal = 0;

        for (let year = 1; year <= 25; year++) {
            const degradation = Math.pow(0.99, year - 1);
            const inflation = Math.pow(1.03, year - 1);
            const yearSavings = bill * 12 * degradation * inflation;
            cumulativeSavings += yearSavings;
            if (year <= 5) fiveYearTotal += yearSavings;
        }

        const avgYearlySavings = cumulativeSavings / 25;
        const avgMonthlySavings = avgYearlySavings / 12;

        // Subsidy calculation
        let subsidyCalc = 0;
        if (selectedSystemSize >= 3) {
            subsidyCalc = 78000;
        } else {
            subsidyCalc = (selectedSystemSize / 3) * 78000;
        }

        const netCost = selectedSystemCost - subsidyCalc;
        const minDownPaymentCalc = Math.round(selectedSystemCost * 0.2);

        // Environmental impact
        const yearlyGeneration = selectedSystemSize * 1400;
        const lifetimeGeneration = yearlyGeneration * 25;

        // Updates
        const newState = {
            systemSize: selectedSystemSize,
            roofArea: Math.round(selectedSystemSize * 100),
            monthlySavings: Math.round(avgMonthlySavings),
            yearlySavings: Math.round(avgYearlySavings),
            fiveYearSavings: Math.round(fiveYearTotal),
            totalCost: selectedSystemCost,
            subsidy: Math.round(subsidyCalc),
            netCost: Math.round(netCost),
            downPayment: minDownPaymentCalc,
            netDownPayment: Math.max(0, minDownPaymentCalc - Math.round(subsidyCalc)),
            co2Mitigated: Math.round(lifetimeGeneration * 0.7),
            treesPlanted: Math.round(lifetimeGeneration * 0.7 / 20),
            distanceKm: Math.round(lifetimeGeneration * 2.5),
            showResults: true,
            isCalculating: false
        };

        setState(prev => ({ ...prev, ...newState }));

        // Calculate EMI with current tenure
        calculateEMI(newState.netCost, state.emiTenure);

        // Scroll to results
        setTimeout(() => {
            const resultsElement = document.getElementById('resultsSection');
            if (resultsElement) {
                resultsElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const calculateEMI = (principal: number, months: number) => {
        const rate = 0.095 / 12; // 9.5% annual rate
        const emiCalc = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        setState(prev => ({ ...prev, emi: Math.round(emiCalc) }));
    };

    const handleEmiTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tenure = parseInt(e.target.value);
        setState(prev => ({ ...prev, emiTenure: tenure }));
        if (state.showResults) {
            calculateEMI(state.netCost, tenure);
        }
    };

    const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuoteFormStatus('submitting');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            pincode: state.pincode,
            city: state.location,
            monthlyBill: state.electricityBill,
            systemSize: state.systemSize,
            estimatedCost: state.netCost,
            customerType: 'residential',
            sourcePage: 'calculator'
        };

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setQuoteFormStatus('success');
                setTimeout(() => {
                    setIsQuoteModalOpen(false);
                    setQuoteFormStatus('idle');
                }, 2000);
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            setQuoteFormStatus('error');
        }
    };

    const canCalculate = state.location && state.electricityBill && parseFloat(state.electricityBill) >= 500;

    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700">
                <form onSubmit={handleCalculate} className="space-y-6">
                    {/* Pincode Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Pin code</label>
                        <input
                            type="text"
                            value={state.pincode}
                            onChange={handlePincodeChange}
                            className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white transition-all outline-none ${locationStatus === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                                    locationStatus === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                                        'border-gray-200 dark:border-gray-600'
                                }`}
                            placeholder="Enter your pincode"
                            maxLength={6}
                        />

                        {locationStatus === 'success' && (
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400">location_on</span>
                                <span className="text-sm font-semibold text-green-700 dark:text-green-300">{state.location}</span>
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400 ml-auto">check_circle</span>
                            </div>
                        )}

                        {locationStatus === 'error' && (
                            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 rounded-lg">
                                <p className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-1">Oh! We haven't reached your location yet</p>
                                <p className="text-xs text-orange-700 dark:text-orange-400">We are not yet serviceable at your location but we will soon!</p>
                            </div>
                        )}
                    </div>

                    {/* Electricity Bill Input */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Avg electricity bill</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined text-lg cursor-help text-gray-500">info</span>
                                <div className="hidden group-hover:block absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-10">
                                    Take a 12-month average of your electricity bills, combining all meters before averaging.
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-500 dark:text-gray-400">₹</span>
                            <input
                                type="number"
                                value={state.electricityBill}
                                onChange={handleBillChange}
                                className="w-full pl-10 pr-4 py-4 text-lg font-semibold border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white transition-all outline-none"
                                placeholder="Min. ₹500"
                                min="500"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Min. ₹500</span>
                            <span>Max ₹1,00,000</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!canCalculate || state.isCalculating}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${canCalculate && !state.isCalculating
                                ? 'bg-primary hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {state.isCalculating ? (
                            'Calculating...'
                        ) : (
                            <>
                                <span className="material-symbols-outlined">calculate</span>
                                <span>Calculate Solar Savings</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Take control of your electricity bill with SolarForce
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3 text-yellow-400">
                        {[1, 2, 3, 4, 5].map(i => (
                            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-sm font-bold text-primary ml-1">4.8/5 Google Rating</span>
                    </div>
                </div>
            </div>

            {state.showResults && (
                <div id="resultsSection" className="w-full py-8 md:py-12 fade-in-up">
                    <div className="max-w-4xl mx-auto px-4 space-y-6">

                        {/* Tabbed Results Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
                            <div className="flex border-b border-gray-200 dark:border-gray-700">
                                {[
                                    { id: 'system', label: 'Required System Size' },
                                    { id: 'savings', label: 'Your Solar Savings' },
                                    { id: 'investment', label: 'Your Investment' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setState(prev => ({ ...prev, activeTab: tab.id }))}
                                        className={`flex-1 py-4 px-2 md:px-4 text-sm md:text-base font-semibold transition-all ${state.activeTab === tab.id
                                                ? 'border-b-4 border-primary text-primary'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 md:p-8">
                                {/* System Tab */}
                                {state.activeTab === 'system' && (
                                    <div className="grid md:grid-cols-2 gap-6 fade-in-up">
                                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                            <span className="material-symbols-outlined text-5xl text-primary mb-3">solar_power</span>
                                            <p className="text-4xl font-black text-gray-800 dark:text-white">{state.systemSize} kW</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">System Size</p>
                                        </div>
                                        <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                            <span className="material-symbols-outlined text-5xl text-slate-600 dark:text-slate-400 mb-3">home</span>
                                            <p className="text-4xl font-black text-gray-800 dark:text-white">{state.roofArea} sq. ft.</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Required Roof Area</p>
                                        </div>
                                    </div>
                                )}

                                {/* Savings Tab */}
                                {state.activeTab === 'savings' && (
                                    <div className="fade-in-up">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Your savings with SolarForce</h3>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly</p>
                                                <p className="text-3xl font-black text-primary">₹{formatNumber(state.monthlySavings)}</p>
                                            </div>
                                            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Yearly</p>
                                                <p className="text-3xl font-black text-green-600">₹{formatNumber(state.yearlySavings)}</p>
                                            </div>
                                            <div className="text-center p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">5 Years</p>
                                                <p className="text-3xl font-black text-amber-600">₹{formatNumber(state.fiveYearSavings)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Investment Tab */}
                                {state.activeTab === 'investment' && (
                                    <div className="fade-in-up space-y-4">
                                        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
                                            <span className="text-gray-700 dark:text-gray-300">Total cost of plant</span>
                                            <span className="text-2xl font-black text-gray-800 dark:text-white">₹{formatNumber(state.totalCost)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700 text-green-600">
                                            <span>Central Subsidy</span>
                                            <span className="text-2xl font-black">-₹{formatNumber(state.subsidy)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-4 bg-primary/5 dark:bg-primary/10 rounded-xl px-4">
                                            <span className="font-bold text-gray-800 dark:text-white">Net Cost</span>
                                            <span className="text-3xl font-black text-primary">₹{formatNumber(state.netCost)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* EMI Section */}
                        <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl shadow-xl p-6 md:p-8 fade-in-up">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined">account_balance</span>
                                Buy solar at ₹0 downpayment
                            </h3>

                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="font-semibold">EMI Tenure</label>
                                    <span className="text-xl font-bold">{Math.round(state.emiTenure / 12)} years</span>
                                </div>
                                <input
                                    type="range"
                                    min="12"
                                    max="120"
                                    step="12"
                                    value={state.emiTenure}
                                    onChange={handleEmiTenureChange}
                                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-sm mt-2 opacity-80">
                                    <span>1 year</span>
                                    <span>10 years</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <p className="text-sm opacity-90 mb-1">Minimum Down Payment</p>
                                    <p className="text-2xl font-bold">₹{formatNumber(state.downPayment)}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <p className="text-sm opacity-90 mb-1">Subsidy</p>
                                    <p className="text-2xl font-bold">-₹{formatNumber(state.subsidy)}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <p className="text-sm opacity-90 mb-1">Net Down Payment</p>
                                    <p className="text-2xl font-bold">₹{formatNumber(state.netDownPayment)}</p>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                <p className="text-sm opacity-90 mb-2">Monthly EMI</p>
                                <p className="text-5xl font-black">₹{formatNumber(state.emi)}</p>
                            </div>

                            <p className="text-sm text-center mt-4 opacity-80">* Your down payment is covered by the government subsidy!</p>
                        </div>

                        {/* Environmental Impact */}
                        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl shadow-xl p-6 md:p-8 fade-in-up">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined">eco</span>
                                Your Solar Saves More Than Money
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                    <span className="material-symbols-outlined text-5xl mb-3">cloud_off</span>
                                    <p className="text-sm opacity-90 mb-2">CO₂ Mitigated</p>
                                    <p className="text-3xl font-black">{formatNumber(state.co2Mitigated)}</p>
                                    <p className="text-xs opacity-75 mt-1">Kg</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                    <span className="material-symbols-outlined text-5xl mb-3">forest</span>
                                    <p className="text-sm opacity-90 mb-2">Trees Planted</p>
                                    <p className="text-3xl font-black">{formatNumber(state.treesPlanted)}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                    <span className="material-symbols-outlined text-5xl mb-3">directions_car</span>
                                    <p className="text-sm opacity-90 mb-2">Distance</p>
                                    <p className="text-3xl font-black">{formatNumber(state.distanceKm)}</p>
                                    <p className="text-xs opacity-75 mt-1">Kms</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 text-center fade-in-up">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Ready to Go Solar?</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <a href="/contact" className="bg-primary hover:bg-primary-dark text-white py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">call</span>
                                    Book Free Consultation
                                </a>
                                <button
                                    onClick={() => setIsQuoteModalOpen(true)}
                                    className="bg-white border-2 border-primary text-primary py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">mail</span>
                                    Get Detailed Quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {isQuoteModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full shadow-2xl animate-fadeUp">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Get Your Detailed Quote</h3>
                                <button onClick={() => setIsQuoteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                Our solar experts will contact you within 24 hours with a customized quote
                            </p>
                        </div>

                        {quoteFormStatus === 'success' ? (
                            <div className="p-10 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">Quote Requested!</h4>
                                <p className="text-gray-600">We'll be in touch shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        pattern="[0-9]{10}"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
                                        placeholder="10-digit mobile number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                {quoteFormStatus === 'error' && (
                                    <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsQuoteModalOpen(false)}
                                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={quoteFormStatus === 'submitting'}
                                        className="flex-1 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-70"
                                    >
                                        {quoteFormStatus === 'submitting' ? 'Sending...' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
