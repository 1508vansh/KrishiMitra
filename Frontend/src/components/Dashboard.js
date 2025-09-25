import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AdvisoryCard from './AdvisoryCard';
import ActivityCard from './ActivityCard';
import LogActivityModal from './LogActivityModal';
import PestReportModal from './PestReportModal';
import AskAssistantModal from './AskAssistantModal';

const Dashboard = () => {
  const { language, user } = useSelector(state => state.auth);
  const { activities, reminders } = useSelector(state => state.activities);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showPestModal, setShowPestModal] = useState(false);
  const [showAskModal, setShowAskModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  // Sample data for demonstration
  const weatherData = {
    temperature: 28,
    humidity: 75,
    rainfall: '2 mm',
    forecast: getText('Rain likely today', 'ഇന്ന് മഴയുണ്ടാകാം', 'आज बारिश की संभावना')
  };

  const marketPrices = [
    { crop: 'Rice', price: '₹42/kg', trend: 'up' },
    { crop: 'Coconut', price: '₹35/piece', trend: 'stable' },
    { crop: 'Banana', price: '₹28/kg', trend: 'down' }
  ];

  const governmentSchemes = [
    { 
      title: getText('Crop Insurance Scheme', 'കൃഷി ഭീമാ പദ്ധതി', 'फसल बीमा योजना'), 
      deadline: '2024-02-15',
      status: 'active'
    },
    { 
      title: getText('Soil Health Card', 'മണ്ണ് ആരോഗ്യ കാർഡ്', 'मृदा स्वास्थ्य कार्ड'), 
      deadline: '2024-03-01',
      status: 'upcoming'
    }
  ];

  const quickActions = [
    { 
      icon: '🎤', 
      label: getText('Ask Assistant', 'ചോദിക്കുക', 'सहायक से पूछें'), 
      color: 'blue',
      action: () => setShowAskModal(true)
    },
    { 
      icon: '✍️', 
      label: getText('Log Activity', 'പ്രവൃത്തി രേഖപ്പെടുത്തുക', 'गतिविधि दर्ज करें'), 
      color: 'green',
      action: () => setShowLogModal(true)
    },
    { 
      icon: '📸', 
      label: getText('Report Pest', 'കീടം റിപ്പോർട്ട്', 'कीट रिपोर्ट करें'), 
      color: 'red',
      action: () => setShowPestModal(true)
    },
    { 
      icon: '📅', 
      label: getText('Reminders', 'ഓർമ്മപ്പെടുത്തലുകൾ', 'अनुस्मारक'), 
      color: 'orange',
      action: () => setActiveTab('reminders')
    }
  ];

  const tabs = [
    { id: 'overview', label: getText('Overview', 'അവലോകനം', 'अवलोकन') },
    { id: 'activities', label: getText('Activities', 'പ്രവൃത്തികൾ', 'गतिविधियाँ') },
    { id: 'reminders', label: getText('Reminders', 'ഓർമ്മപ്പെടുത്തലുകൾ', 'अनुस्मारक') },
    { id: 'reports', label: getText('Reports', 'റിപ്പോർട്ടുകൾ', 'रिपोर्ट्स') }
  ];

  const farmingTips = [
    getText('Plan sowing according to rainfall patterns', 
            'മഴക്കാലത്ത് വിതയ്ക്കൽ ശ്രദ്ധിക്കുക', 
            'बारिश के पैटर्न के अनुसार बुआई की योजना बनाएं'),
    getText('Regular soil testing is important', 
            'മണ്ണ് പരിശോധന ഓർക്കുക', 
            'नियमित मिट्टी परीक्षण महत्वपूर्ण है')
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">
                {getText('Welcome', 'സ്വാഗതം', 'स्वागत')}, {user?.name}!
              </h1>
              <p className="text-green-200">
                {getText('We are here to assist you in your farming journey', 
                        'നിങ്ങളുടെ കൃഷി യാത്രയിൽ സഹായിക്കാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്', 
                        'हम आपकी खेती की यात्रा में सहायता के लिए यहां हैं')}
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                <div className="text-sm">{weatherData.forecast}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 px-4 py-3 text-center font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-green-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-center transform hover:scale-105 ${
                action.color === 'green' ? 'border-l-4 border-green-500' :
                action.color === 'blue' ? 'border-l-4 border-blue-500' :
                action.color === 'red' ? 'border-l-4 border-red-500' : 'border-l-4 border-orange-500'
              }`}
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <div className="font-bold text-gray-700 text-sm">{action.label}</div>
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Advisory Card */}
            <AdvisoryCard />

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Weather Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    🌤️ {getText('Weather', 'കാലാവസ്ഥ', 'मौसम')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{weatherData.temperature}°C</div>
                      <div className="text-sm text-gray-600">{getText('Temperature', 'താപനില', 'तापमान')}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{weatherData.humidity}%</div>
                      <div className="text-sm text-gray-600">{getText('Humidity', 'ആർദ്രത', 'नमी')}</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{weatherData.rainfall}</div>
                      <div className="text-sm text-gray-600">{getText('Rainfall', 'മഴ', 'वर्षा')}</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-sm font-bold text-orange-600">{weatherData.forecast}</div>
                      <div className="text-sm text-gray-600">{getText('Forecast', 'പ്രവചനം', 'पूर्वानुमान')}</div>
                    </div>
                  </div>
                </div>

                {/* Market Prices */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    📊 {getText('Market Prices', 'വിപണി വിലകൾ', 'बाजार मूल्य')}
                  </h3>
                  <div className="space-y-3">
                    {marketPrices.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{item.crop}</span>
                        <span className="font-bold">{item.price}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.trend === 'up' ? 'bg-green-100 text-green-800' :
                          item.trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {getText('All Activities', 'എല്ലാ പ്രവൃത്തികളും', 'सभी गतिविधियाँ')}
                  </h3>
                  <button 
                    onClick={() => setShowLogModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition"
                  >
                    + {getText('New Activity', 'പുതിയ പ്രവൃത്തി', 'नई गतिविधि')}
                  </button>
                </div>
                <div className="space-y-3">
                  {activities.length > 0 ? (
                    activities.map(activity => (
                      <ActivityCard key={activity.id} activity={activity} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {getText('No activities recorded yet', 
                              'ഇതുവരെ പ്രവൃത്തികൾ രേഖപ്പെടുത്തിയിട്ടില്ല', 
                              'अभी तक कोई गतिविधि दर्ज नहीं की गई')}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reminders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  🔔 {getText('Reminders', 'ഓർമ്മപ്പെടുത്തലുകൾ', 'अनुस्मारक')}
                </h3>
                <div className="space-y-3">
                  {reminders.length > 0 ? (
                    reminders.map(reminder => (
                      <div key={reminder.id} className="flex items-center justify-between p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                        <div>
                          <div className="font-medium">{reminder.title}</div>
                          <div className="text-sm text-gray-600">
                            {getText('Due', 'അവസാന തീയതി', 'नियत तारीख')}: {reminder.date}
                          </div>
                        </div>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          {getText('Mark Done', 'പൂർത്തിയാക്കി', 'पूर्ण चिह्नित करें')}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {getText('No reminders at the moment', 
                              'ഇപ്പോൾ ഓർമ്മപ്പെടുത്തലുകൾ ഇല്ല', 
                              'फिलहाल कोई अनुस्मारक नहीं')}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Government Schemes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                🏛️ {getText('Government Schemes', 'സർക്കാർ പദ്ധതികൾ', 'सरकारी योजनाएं')}
              </h3>
              <div className="space-y-3">
                {governmentSchemes.map((scheme, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">{scheme.title}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {getText('Deadline', 'അവസാന തീയതി', 'अंतिम तिथि')}: {scheme.deadline}
                    </div>
                    <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                      scheme.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {scheme.status === 'active' 
                        ? getText('Active', 'സജീവം', 'सक्रिय') 
                        : getText('Upcoming', 'വരുന്ന', 'आगामी')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                💡 {getText('Farming Tips', 'കൃഷി നുറുങ്ങുകൾ', 'कृषि युक्तियाँ')}
              </h3>
              <div className="space-y-3">
                {farmingTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-sm">{tip}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farm Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                🌾 {getText('Farm Summary', 'ഫാം സംഗ്രഹം', 'खेत सारांश')}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{getText('Primary Crop', 'പ്രധാന വിള', 'मुख्य फसल')}:</span>
                  <span className="font-medium">{user?.primaryCrop || 'Rice'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{getText('Land Area', 'നിലം വിസ്തീർണ്ണം', 'जमीन का क्षेत्रफल')}:</span>
                  <span className="font-medium">{user?.landArea || '2 acres'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{getText('Location', 'സ്ഥലം', 'स्थान')}:</span>
                  <span className="font-medium">{user?.location || 'Thrissur'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLogModal && <LogActivityModal onClose={() => setShowLogModal(false)} />}
      {showPestModal && <PestReportModal onClose={() => setShowPestModal(false)} />}
      {showAskModal && <AskAssistantModal onClose={() => setShowAskModal(false)} />}
    </div>
  );
};

export default Dashboard;