import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setLanguage } from '../store/store';

const Header = () => {
  const dispatch = useDispatch();
  const { user, language } = useSelector(state => state.auth);

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const languages = [
    { code: 'english', label: 'EN' },
    { code: 'hindi', label: 'HI' },
    { code: 'malayalam', label: 'ML' }
  ];

  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-white rounded-full p-1 sm:p-2">
              <span className="text-green-600 text-xl sm:text-2xl">🌱</span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-xl font-bold">Krishi Sakhi</h1>
              <p className="text-green-200 text-xs sm:text-sm">{getText('AI Farming Assistant', 'AI കൃഷി സഹായി', 'AI कृषि सहायक')}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-green-200 text-sm sm:text-base text-center">
              {getText('Welcome', 'സ്വാഗതം', 'स्वागत')}, {user?.name}
            </span>
            
            {/* Language Selector */}
            <div className="flex space-x-1 bg-green-700 rounded-lg p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => dispatch(setLanguage(lang.code))}
                  className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold transition ${
                    language === lang.code 
                      ? 'bg-white text-green-600' 
                      : 'text-green-200 hover:bg-green-800'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 hover:bg-red-600 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition"
            >
              {getText('Logout', 'ലോഗൗട്ട്', 'लॉगआउट')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;