'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    customerType: 'residential'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build URL parameters
    const params = new URLSearchParams(formData);
    // Redirect to go-solar page with prefilled data
    router.push(`/go-solar?${params.toString()}`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full min-h-[600px] flex items-center bg-background-light">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDS5H78C5M3oDnC4o5YvbjYZ_Aj8-_bOscM1vagw6mguxTvDy9g9swC9-M18ndQ-TU9HFuJ2suc7yhKL2t0BXi4zRgNsMWosNDJfKmwPG7d5JJpuY5--TON4TBrlSQujzrCx7l0-BIWG3sjPAJ_qmOgh3FzlnLa-hKiikQ9sLc1z3HKtIi4czePcmzIt2cMNXHqQtPxmmCXu7QlwHE7JDyGbict1iPnwko_-P1nOl9FIhvXgyo-qkrUS6HZpZ--X9arv61zUsMDD6M')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 sm:to-transparent lg:via-white/80"></div>
          <div className="absolute inset-0 bg-white/90 lg:hidden"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 w-fit">
                <span className="material-symbols-outlined text-primary text-sm">verified</span>
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">India's #1 Solar Partner</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-secondary leading-[1.1] tracking-tight">
                Increase Your <span className="text-primary">Home's Efficiency</span> with Solar
              </h1>
              <p className="text-lg text-slate-600 max-w-xl font-medium leading-relaxed">
                High-Performance Solar Installations That Pay for Themselves
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 transform transition-all hover:shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-secondary">Get Your Free Quote</h3>
                  <p className="text-sm text-gray-500 mt-1">Fill out the form below to get a customized solar plan.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 uppercase" htmlFor="hero-name">Full Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">person</span>
                      </div>
                      <input
                        name="name"
                        required
                        className="block w-full pl-10 rounded-lg border-gray-300 bg-gray-50 text-secondary focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                        id="hero-name"
                        placeholder="Enter your name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 uppercase" htmlFor="hero-phone">Phone Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">phone_iphone</span>
                      </div>
                      <input
                        name="phone"
                        required
                        className="block w-full pl-10 rounded-lg border-gray-300 bg-gray-50 text-secondary focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                        id="hero-phone"
                        placeholder="+91 98765 43210"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 uppercase" htmlFor="hero-pincode">Pin Code *</label>
                      <input
                        name="pincode"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        className="block w-full rounded-lg border-gray-300 bg-gray-50 text-secondary focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                        id="hero-pincode"
                        placeholder="110001"
                        type="text"
                        value={formData.pincode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 uppercase" htmlFor="hero-type">Solar For</label>
                      <select
                        name="customerType"
                        className="block w-full rounded-lg border-gray-300 bg-gray-50 text-secondary focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                        id="hero-type"
                        value={formData.customerType}
                        onChange={handleInputChange}
                      >
                        <option value="residential">Home</option>
                        <option value="commercial">Business</option>
                        <option value="society">Society</option>
                      </select>
                    </div>
                  </div>
                  <button className="mt-2 w-full flex justify-center items-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 transition-colors" type="submit">
                    Get Free Quote
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-2">
                    By clicking submit, you agree to our Terms & Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <section className="py-16 md:py-24 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Solar Solutions for Every Need</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">Whether for your home, community, or business, SolarForce offers tailored solar energy packages.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: 'Residential Solar', link: '/homes', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS5H78C5M3oDnC4o5YvbjYZ_Aj8-_bOscM1vagw6mguxTvDy9g9swC9-M18ndQ-TU9HFuJ2suc7yhKL2t0BXi4zRgNsMWosNDJfKmwPG7d5JJpuY5--TON4TBrlSQujzrCx7l0-BIWG3sjPAJ_qmOgh3FzlnLa-hKiikQ9sLc1z3HKtIi4czePcmzIt2cMNXHqQtPxmmCXu7QlwHE7JDyGbict1iPnwko_-P1nOl9FIhvXgyo-qkrUS6HZpZ--X9arv61zUsMDD6M', desc: 'Power your home with clean energy and drastically reduce your electricity bills.' },
              { title: 'Housing Society Solar', link: '/housing-society', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGy3Bn9rOLl1yiz-5YJpJAbzRKYJOwouxDC61POdJH79exkIk0zlhnoVxgQFDqjFu9AfTck0xC_Gu7Nh36KLpy05NDKbOp3UKkcnA2VErsvxSHKR1I-R9jU8mTvBwO-Ylg4Bi5h0kfmtkMr7ohBszwXacLWz5SWVZztb_MyOuHCA7n7aNtNlblTl7w9XDGSVrLsvYhzyNLFeG-AesF5LDZdLLKpnquUsxGfqNJXfob55hhEBDayFxWRQF-wyw38-RinSoOfw9NEKU', desc: 'Bring collective savings and green energy to your entire community.' },
              { title: 'Commercial Solar', link: '/commercial', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG-g272fwolwcSDPHfwVZiH8ZG6dWYE6B121HaGa9WOV6-kXjS8cCwxfqr0lI3174gLScDC8cteVL6DOZEPN4I9lnSCW08brmC_czh4dnetlyAqg14mLnOI4vWt5Mx8inD3VP3X3VJHygxltnv_QRIUD7sFc0yRxhSxowV9GR0hxKxJXPbDiiSxSikjoeYarYa2MHy7nw4dZK8dEk0uaaVvAX3Isaft_hCQH2vdu5wzf2UD44T6433VrNuq0Hf0PfwmiZTY2uLy1M', desc: 'Optimize operational costs and enhance your brand\'s green image.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${item.img}')` }}></div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-secondary mb-3">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6 flex-grow">{item.desc}</p>
                  <Link href={item.link} className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md shadow-blue-500/20 transition-colors self-start">
                    Learn More <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="relative w-full bg-gradient-to-b from-white via-blue-50/30 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">Trusted by Industry Leaders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Partnering with the best to deliver exceptional solar solutions</p>

          <div className="flex flex-wrap justify-center items-center gap-20 md:gap-32 mt-12">
            {['2.png', '3.png'].map((img, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-primary rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img src={`/img/trusted_by/${img}`} alt="Trusted Partner" className="h-28 md:h-36 w-auto object-contain transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover why thousands of homeowners trust SolarForce.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Shubham Jain', loc: 'Dev Nagar, Bhind', text: 'My power bills have reduced significantly, and the system is working perfectly.', img: '/img/testimonial/Gangadhar shivhare.jpeg' },
              { name: 'Abhishek Sharma', loc: 'Lashkar Road, Bhind', text: 'SolarForce provided excellent service from site survey to final commissioning.', icon: 'person' },
              { name: 'Ashok Kumar Shrivas', loc: 'Arya Nagar, Lashkar Road, Bhind', text: 'SolarForce made the entire process simple and hassle-free.', img: '/img/testimonial/Ashok shrivas.png' },
              { name: 'Gangadhar Shivhare', loc: 'Etawah Road, Bhind', text: 'The monitoring support gives me confidence that my system is performing efficiently.', img: '/img/testimonial/Shubham jain.jpeg' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col gap-4">
                <p className="text-gray-700 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-50">
                  {t.img ? (
                    <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-primary/20" style={{ backgroundImage: `url('${t.img}')` }}></div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-2xl">person</span>
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-secondary text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {[
              { q: 'How much can I save by installing solar panels?', a: 'Most customers save 50%–90% on their electricity bills.' },
              { q: 'Do you provide solar subsidy support?', a: 'Yes. SolarForce provides complete subsidy and documentation support.' },
              { q: 'How long does a solar installation take?', a: 'A standard residential solar installation is usually completed within 30 days.' },
              { q: 'Do you offer EMI or financing options?', a: 'Yes. We offer flexible EMI and financing options.' },
              { q: 'What type of properties do you install solar for?', a: 'We install solar systems for independent homes & villas, housing societies & apartments, commercial buildings, and institutions and offices.' },
              { q: 'How long do solar panels last?', a: 'High-quality solar panels typically last 25+ years with minimal maintenance.' },
            ].map((faq, i) => (
              <div key={i} className="accordion-item bg-background-light rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <input className="absolute" id={`faq${i}`} type="checkbox" />
                <label className="accordion-title flex justify-between items-center p-6 cursor-pointer text-lg font-semibold text-secondary hover:text-primary transition-colors duration-200" htmlFor={`faq${i}`}>
                  {faq.q}
                  <span className="material-symbols-outlined text-2xl transition-transform duration-300">expand_more</span>
                </label>
                <div className="accordion-content max-h-0 overflow-hidden px-6 text-gray-700 leading-relaxed transition-all duration-300 opacity-0 visibility-hidden bg-white">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
