import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Headset, 
  Send, 
  MessageSquare, 
  Clock, 
  Home, 
  Grid, 
  Upload,
  ShoppingCart,
  User,
  Tv,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: 'open' | 'closed';
  date: string;
  responses?: {
    id: number;
    message: string;
    from: 'support' | 'user';
    date: string;
  }[];
}

function SupportPage() {
  const navigate = useNavigate();
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: ''
  });
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const subjectOptions = [
    'Technical Issue',
    'Billing Question',
    'Feature Request',
    'Character Upload Problem',
    'Account Access',
    'Integration Help',
    'Other'
  ];

  const sidebarLinks = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Grid className="w-5 h-5" />, label: 'Manage Characters', path: '/manage-characters' },
    { icon: <Upload className="w-5 h-5" />, label: 'Upload Character', path: '/upload-character' },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'Change Plan', path: '/pricing' },
    { icon: <User className="w-5 h-5" />, label: 'Business Profile', path: '/profile' },
    { icon: <Headset className="w-5 h-5" />, label: 'Customer Support', path: '/support' }
  ];

  const tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Character Upload Issue',
      message: "Having trouble uploading new character designs. The upload process seems to get stuck at 50% and then fails. I have tried multiple times with different file sizes but the issue persists.",
      status: 'open',
      date: '2024-03-15',
      responses: [
        {
          id: 1,
          message: "I understand you're having trouble with character uploads. Could you please provide the following information:\n\n1. File format you're trying to upload\n2. File size\n3. Browser you're using\n4. Any error messages you see",
          from: 'support',
          date: '2024-03-15 14:30'
        },
        {
          id: 2,
          message: "I'm using PNG files, around 2MB each. I'm on Chrome latest version. The error message says 'Upload failed: Please try again'",
          from: 'user',
          date: '2024-03-15 15:45'
        },
        {
          id: 3,
          message: "Thank you for the information. I've checked our system and there was a temporary issue with our upload service. It has been resolved now. Please try uploading again and let me know if you still experience any issues.",
          from: 'support',
          date: '2024-03-15 16:00'
        }
      ]
    },
    {
      id: 2,
      subject: 'Billing Question',
      message: "Need clarification on latest invoice. There seems to be an additional charge that I don't recognize.",
      status: 'closed',
      date: '2024-03-10',
      responses: [
        {
          id: 1,
          message: "I'll help you understand the charges on your invoice. The additional charge you're seeing is likely the pro-rated amount for the upgraded features you activated mid-cycle. I'll break down the calculation for you.",
          from: 'support',
          date: '2024-03-10 09:15'
        },
        {
          id: 2,
          message: "Thanks for explaining. That makes sense now. I forgot about the mid-cycle upgrade.",
          from: 'user',
          date: '2024-03-10 10:30'
        }
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted successfully!');
    setNewTicket({ subject: '', message: '' });
  };

  const renderTicketDetails = (ticket: Ticket) => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setSelectedTicket(null)}
            className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{ticket.subject}</h2>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{ticket.date}</span>
              <span className={`ml-3 px-2 py-0.5 rounded-full text-xs ${
                ticket.status === 'open' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {ticket.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Original Ticket */}
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">{ticket.message}</p>
          </div>

          {/* Responses */}
          {ticket.responses?.map((response) => (
            <div
              key={response.id}
              className={`flex ${response.from === 'support' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-4 ${
                response.from === 'support' 
                  ? 'bg-white border border-gray-200'
                  : 'bg-purple-600 text-white'
              }`}>
                <p className="leading-relaxed text-[15px]">{response.message}</p>
                <div className={`flex items-center mt-2 text-xs ${
                  response.from === 'support' ? 'text-gray-500' : 'text-purple-200'
                }`}>
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{response.date}</span>
                  {response.from === 'support' && (
                    <span className="flex items-center ml-2">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Support Team
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Reply Box */}
          {ticket.status === 'open' && (
            <div className="mt-6">
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent text-[15px] leading-relaxed"
                placeholder="Write your reply..."
              />
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
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
              onClick={() => navigate(link.path)}
              className={`w-full flex items-center px-6 py-3 text-sm ${
                link.path === '/support'
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
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold flex items-center">
                  <Headset className="w-10 h-10 mr-3 text-purple-600" />
                  Customer Support
                </h1>
                <p className="text-gray-500 mt-2">Get help from our support team</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {selectedTicket ? (
                <div className="lg:col-span-2">
                  {renderTicketDetails(selectedTicket)}
                </div>
              ) : (
                <>
                  {/* New Ticket Form */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-xl font-semibold mb-6">Create New Support Ticket</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subject
                          </label>
                          <select
                            value={newTicket.subject}
                            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white"
                          >
                            <option value="">Select a subject</option>
                            {subjectOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message
                          </label>
                          <textarea
                            value={newTicket.message}
                            onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                            rows={6}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Describe your issue in detail..."
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Submit Ticket
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}

              {/* Support Info and Previous Tickets */}
              <div className="space-y-6">
                {/* Quick Help */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Quick Help</h3>
                  <div className="space-y-4">
                    <a href="#" className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                      <div className="font-medium text-purple-700">FAQs</div>
                      <p className="text-sm text-purple-600">Find answers to common questions</p>
                    </a>
                    <a href="#" className="block p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                      <div className="font-medium text-blue-700">Documentation</div>
                      <p className="text-sm text-blue-600">Detailed guides and tutorials</p>
                    </a>
                    <a href="#" className="block p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div className="font-medium text-green-700">Live Chat</div>
                      <p className="text-sm text-green-600">Chat with our support team</p>
                    </a>
                  </div>
                </div>

                {/* Previous Tickets */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Recent Tickets</h3>
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div 
                        key={ticket.id} 
                        className="border rounded-lg p-4 cursor-pointer hover:border-purple-300 transition-colors hover:bg-gray-50"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                            <h4 className="font-medium text-gray-900 leading-5">{ticket.subject}</h4>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                            ticket.status === 'open' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {ticket.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-2">{ticket.message}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{ticket.date}</span>
                          {ticket.responses && (
                            <span className="ml-3 flex items-center">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              {ticket.responses.length} responses
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;