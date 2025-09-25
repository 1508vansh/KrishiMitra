import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, setLanguage } from '../store/store';

const Login = () => {
  const dispatch = useDispatch();
  const [language, setLanguageState] = useState('english');
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    primaryCrop: '',
    location: '',
    landArea: '',
    soilType: '',
    irrigationType: ''
  });

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const handleLanguageSelect = (lang) => {
    setLanguageState(lang);
    dispatch(setLanguage(lang));
    setShowProfile(true);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(login(profile));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-green-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-2 sm:mx-auto">
        {/* Header Banner */}
        <div className="bg-green-600 text-white p-4 sm:p-6 text-center rounded-t-xl">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center sm:mr-3 mb-2 sm:mb-0">
              <span className="text-green-600 text-xl sm:text-2xl">🌾</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Krishi Sakhi</h1>
              <p className="text-green-200 text-xs sm:text-sm">Government of Kerala</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {!showProfile ? (
            // Language Selection
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                Choose Your Language / अपनी भाषा चुनें
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={() => handleLanguageSelect('malayalam')}
                  className="w-full bg-orange-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-bold hover:bg-orange-600 transition"
                >
                  മലയാളം
                </button>
                <button
                  onClick={() => handleLanguageSelect('hindi')}
                  className="w-full bg-orange-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-bold hover:bg-orange-700 transition"
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => handleLanguageSelect('english')}
                  className="w-full bg-blue-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-bold hover:bg-blue-700 transition"
                >
                  English
                </button>
              </div>
            </div>
          ) : (
            // Profile Form
            <form onSubmit={handleProfileSubmit} className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center mb-3 sm:mb-4">
                {getText('Farmer Profile', 'കൃഷിക്കാരൻ പ്രൊഫൈൽ', 'किसान प्रोफाइल')}
              </h2>
              
              <input
                type="text"
                placeholder={getText('Full Name', 'പേര്', 'पूरा नाम')}
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                required
              />
              
              <input
                type="number"
                placeholder={getText('Age (Optional)', 'വയസ്സ്', 'आयु (वैकल्पिक)')}
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: e.target.value})}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />

              <select
                value={profile.primaryCrop}
                onChange={(e) => setProfile({...profile, primaryCrop: e.target.value})}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                required
              >
                <option value="">{getText('Primary Crop', 'പ്രാഥമിക വിള', 'मुख्य फसल')}</option>
                <option value="rice">Rice / चावल</option>
                <option value="coconut">Coconut / नारियल</option>
                <option value="rubber">Rubber / रबर</option>
                <option value="banana">Banana / केला</option>
              </select>

              <input
                type="text"
                placeholder={getText('Location (Village/Taluk)', 'സ്ഥലം', 'स्थान (गाँव/तालुका)')}
                value={profile.location}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                required
              />

              <input
                type="text"
                placeholder={getText('Land Area (acres)', 'നിലം വിസ്തീർണ്ണം', 'जमीन का क्षेत्रफल (एकड़)')}
                value={profile.landArea}
                onChange={(e) => setProfile({...profile, landArea: e.target.value})}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                required
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold hover:bg-green-700 transition text-sm sm:text-base"
              >
                {getText('Get Started', 'ആരംഭിക്കുക', 'शुरू करें')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;