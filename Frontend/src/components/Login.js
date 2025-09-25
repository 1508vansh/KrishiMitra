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
    <div className="min-h-screen flex items-center justify-center p-4 bg-green-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        {/* Header Banner */}
        <div className="bg-green-600 text-white p-6 text-center rounded-t-xl">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 text-2xl">🌾</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Krishi Sakhi</h1>
              <p className="text-green-200 text-sm">Government of Kerala</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {!showProfile ? (
            // Language Selection
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Choose Your Language / अपनी भाषा चुनें
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => handleLanguageSelect('malayalam')}
                  className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg text-lg font-bold hover:bg-orange-600 transition"
                >
                  മലയാളം
                </button>
                <button
                  onClick={() => handleLanguageSelect('hindi')}
                  className="w-full bg-amber-300 text-white py-4 px-6 rounded-lg text-lg font-bold hover:bg-orange-600 transition"
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => handleLanguageSelect('english')}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
                >
                  English
                </button>
              </div>
            </div>
          ) : (
            // Profile Form
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
                {getText('Farmer Profile', 'കൃഷിക്കാരൻ പ്രൊഫൈൽ', 'किसान प्रोफाइल')}
              </h2>
              
              <input
                type="text"
                placeholder={getText('Full Name', 'പേര്', 'पूरा नाम')}
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              
              <input
                type="number"
                placeholder={getText('Age (Optional)', 'വയസ്സ്', 'आयु (वैकल्पिक)')}
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <select
                value={profile.primaryCrop}
                onChange={(e) => setProfile({...profile, primaryCrop: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <input
                type="text"
                placeholder={getText('Land Area (acres)', 'നിലം വിസ്തീർണ്ണം', 'जमीन का क्षेत्रफल (एकड़)')}
                value={profile.landArea}
                onChange={(e) => setProfile({...profile, landArea: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-green-700 transition"
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