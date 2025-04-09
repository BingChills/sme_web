import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  Home,
  ShoppingCart,
  Grid,
  User,
  MoreVertical,
  AlertTriangle,
  CheckCircle2,
  Star,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  Upload,
  Headset,
  X,
  Check,
  Percent,
  Edit2,
  Tv,
  Tag,
  Users,
  DollarSign,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import ManageCharactersPage from './ManageCharactersPage';

function DashboardPage() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [profileData, setProfileData] = useState({
    businessName: 'Acme Corporation',
    email: 'contact@acmecorp.com',
    phone: '+1 (555) 123-4567',
    website: 'www.acmecorp.com',
    address: '123 Business Ave, Suite 100',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States',
    description: 'Leading provider of innovative solutions for modern businesses.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  });

  const stats = [
    {
      value: '$12,456',
      label: 'Total Revenue',
      change: '+15.3% this month',
      icon: <DollarSign className="w-6 h-6 text-purple-600" />
    },
    {
      value: '856',
      label: 'Total Sales',
      change: '+23.1% this month',
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />
    },
    {
      value: '$14.50',
      label: 'Today Sale',
      change: '+8.2% Yesterday',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />
    }
  ];

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
      buttonText: 'Your Current Plan',
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
      buttonText: 'Upgrade to Advanced',
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
      buttonText: 'Upgrade to Platinum',
      color: 'blue',
      featured: true
    }
  ];

  const sidebarLinks = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', view: 'dashboard' },
    { icon: <Grid className="w-5 h-5" />, label: 'Manage Characters', view: 'manage-characters' },
    { icon: <Upload className="w-5 h-5" />, label: 'Upload Character', view: 'upload-character' },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'Change Plan', view: 'change-plan' },
    { icon: <User className="w-5 h-5" />, label: 'Business Profile', view: 'profile' },
    { icon: <Headset className="w-5 h-5" />, label: 'Customer Support', view: 'support' }
  ];

  const recentActivity = [
    {
      title: 'Large Transaction',
      description: 'Premium character bundle purchased',
      status: 'success',
      time: '2 hours ago'
    },
    {
      title: 'New Sales Record',
      description: 'Highest daily sales achieved',
      status: 'active',
      time: '5 hours ago'
    },
    {
      title: 'Revenue Milestone',
      description: 'Monthly target exceeded by 25%',
      status: 'success',
      time: '1 day ago'
    }
  ];

  const handlePlanChange = (planName: string) => {
    navigate('/payment', { state: { plan: planName } });
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSidebarClick = (view: string) => {
    if (view === 'upload-character') {
      navigate('/upload-character');
      return;
    }
    if (view === 'support') {
      navigate('/support');
      return;
    }
    setCurrentView(view);
  };

  const notifications = [
    { title: 'Character Upload', status: 'Complete' },
    { title: 'Coupon Upload', status: 'Complete' }
  ];

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the profile data
    alert('Profile updated successfully!');
  };

  const renderBusinessProfile = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-purple-500 to-purple-600 relative">
            <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-lg px-4 py-2 flex items-center space-x-2 backdrop-blur-sm transition-colors">
              <Camera className="w-4 h-4" />
              <span>Change Cover</span>
            </button>
          </div>

          <div className="px-8 pb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img
                  src={profileData.logo}
                  alt="Business Logo"
                  className="w-24 h-24 rounded-xl border-4 border-white shadow-md object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profileData.businessName}</h1>
                <p className="text-gray-500">Business Profile</p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="businessName"
                      value={profileData.businessName}
                      onChange={handleProfileChange}
                      className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="website"
                      value={profileData.website}
                      onChange={handleProfileChange}
                      className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Description
                  </label>
                  <textarea
                    name="description"
                    value={profileData.description}
                    onChange={handleProfileChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (currentView === 'profile') {
      return renderBusinessProfile();
    }

    if (currentView === 'manage-characters') {
      return <ManageCharactersPage />;
    }

    if (currentView === 'change-plan') {
      return (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Change Your Plan</h2>
            <p className="text-gray-500 mt-2">Choose the plan that best suits your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    onClick={() => handlePlanChange(plan.name)}
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
        </>
      );
    }

    return (
      <>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  <p className="text-sm text-green-500 mt-1">{stat.change}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Traffic Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Customer Growth</h3>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">2,579</span>
                  <span className="text-sm text-gray-500 ml-2">Total Customers</span>
                  <span className="text-sm text-green-500 ml-4">+2.45%</span>
                </div>
                  
              </div>
              <select className="text-sm border rounded-lg px-3 py-2">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
        
            <div className="h-48 flex items-end justify-between">
              {[100, 25, 45, 30, 35, 45, 20].map((height, index) => (
                <div
                  key={index}
                  className="w-12 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
              
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thur</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
             
            
  
          </div>

          {/* Engagement Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Sales Distribution</h3>
              <select className="text-sm border rounded-lg px-3 py-2">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#93C5FD"
                    strokeWidth="3"
                    strokeDasharray="15, 100"
                    strokeDashoffset="-85"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold text-gray-900">85%</span>
                  <span className="text-sm text-gray-500">Online Sales</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-8 mt-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#4F46E5] rounded-full mr-2"></div>
                <div>
                  <p className="text-sm font-medium">Online</p>
                  <p className="text-lg font-bold">85%</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#93C5FD] rounded-full mr-2"></div>
                <div>
                  <p className="text-sm font-medium">Offline</p>
                  <p className="text-lg font-bold">15%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coupon Usage */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-1">Characters Availability </h3>
            <div>
              <span className="text-2xl font-bold mb-4">4121 </span>
                <span className="text-sm text-gray-500 ml-1 ">Characters</span>
             </div>
            
            
            <div className="h-40 relative">
              {/* Y-axis labels */}
              <div className="absolute -left-1 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                <span>5000</span>
                <span>4500</span>
                <span>4000</span>
              </div>

              {/* Line chart - More realistic declining trend */}
              <div className="absolute inset-0 mt-4 ml-8">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <path
                    d="M0,20 C30,25 50,15 70,30 C90,45 110,35 130,40 C150,45 170,35 190,40 C210,45 230,40 250,50 C270,60 290,55 300,70"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <button>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'success' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <CheckCircle2 className={`w-5 h-5 ${
                      activity.status === 'success' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <span className="text-xs text-gray-400 mt-1 block">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Tv className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">Linkz.</span>
          </div>
        </div>
        <nav className="mt-6">
          {sidebarLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleSidebarClick(link.view)}
              className={`w-full flex items-center px-6 py-3 text-sm ${
                link.view === currentView
                  ? 'text-purple-600 bg-purple-50 border-r-4 border-purple-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.icon}
              <span className="ml-3">{link.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>

      {/* Notification Bell */}
      <div className="fixed bottom-8 right-8">
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute bottom-full right-0 mb-2 w-80 bg-white rounded-lg shadow-xl">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-500">{notification.title}</p>
                    <p className="font-medium">{notification.status}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;