import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Tv, Star } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$0',
    period: '/mo',
    description: '$299 After First Month',
    features: [
      '3 Common Characters',
      'Performance Tracker',
      'Up-to-date Features',
      '',
      '',
      ''
    ],
    buttonText: 'Get Started Free',
    color: 'white',
    featured: false
  },
  {
    name: 'Advanced',
    price: '$599',
    period: '/mo',
    description: 'Most Popular Choice',
    features: [
      'Everything from Basic',
      '10 Common Characters',
      '5 Rare Characters',
      'Professional Analytics',
      '20 Banners Ad on LINEOA',
      'POS Integration Service'
    ],
    buttonText: 'Get Advanced',
    color: 'purple',
    featured: true
  },
  {
    name: 'Platinum',
    price: '$999',
    period: '/mo',
    description: 'Ultimate Features',
    features: [
      'Everything from Advanced',
      '10 Common Characters',
      '5 Rare Characters',
      'Professional Analytics',
      '20 Banners Ad on LINEOA',
      'POS Integration Service'
    ],
    buttonText: 'Get Platinum',
    color: 'blue',
    featured: true
  }
];

function PricingPage() {
  const navigate = useNavigate();

  const handleSelectPlan = (planName: string) => {
    navigate('/payment', { state: { plan: planName } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Tv className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-2xl font-bold text-purple-600">Linkz.</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Linkz offers flexible, quick, and innovative features that will help your company scale fast
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                plan.color === 'white'
                  ? 'bg-white'
                  : plan.color === 'purple'
                  ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white'
                  : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    FEATURED
                  </div>
                </div>
              )}
              <div className="p-8 h-full flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-lg opacity-80">{plan.period}</span>
                  </div>
                  <p className={`mt-2 ${plan.color === 'white' ? 'text-gray-500' : 'text-white/80'}`}>
                    {plan.description}
                  </p>

                  <ul className="mt-8 mb-16 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {feature && (
                          <>
                            <Check className={`h-5 w-5 ${plan.color === 'white' ? 'text-purple-600' : 'text-white'} mr-3`} />
                            <span>{feature}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.color === 'white'
                      ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
                      : 'bg-white text-gray-900 hover:bg-gray-50 hover:shadow-lg'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;