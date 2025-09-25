import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../store/store';

const PestReportModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { language } = useSelector(state => state.auth);
  const [pestData, setPestData] = useState({
    crop: '',
    pestType: '',
    severity: 'low',
    description: '',
    photo: null
  });

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addActivity({
      type: 'pest_sighting',
      crop: pestData.crop,
      notes: `Pest: ${pestData.pestType}, Severity: ${pestData.severity}. ${pestData.description}`,
      date: new Date().toISOString().split('T')[0]
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="bg-red-600 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">
            🐛 {getText('Report Pest', 'കീടം റിപ്പോർട്ട് ചെയ്യുക', 'कीट रिपोर्ट करें')}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {getText('Crop', 'വിള', 'फसल')}
            </label>
            <input
              type="text"
              value={pestData.crop}
              onChange={(e) => setPestData({...pestData, crop: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {getText('Pest Type', 'കീടം തരം', 'कीट प्रकार')}
            </label>
            <input
              type="text"
              value={pestData.pestType}
              onChange={(e) => setPestData({...pestData, pestType: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {getText('Severity', 'തീവ്രത', 'गंभीरता')}
            </label>
            <select
              value={pestData.severity}
              onChange={(e) => setPestData({...pestData, severity: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="low">{getText('Low', 'കുറഞ്ഞ', 'कम')}</option>
              <option value="medium">{getText('Medium', 'ഇടത്തരം', 'मध्यम')}</option>
              <option value="high">{getText('High', 'ഉയർന്ന', 'उच्च')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {getText('Description', 'വിവരണം', 'विवरण')}
            </label>
            <textarea
              value={pestData.description}
              onChange={(e) => setPestData({...pestData, description: e.target.value})}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={getText('Details about the pest...', 'കീടത്തിന്റെ വിവരങ്ങൾ...', 'कीट के बारे में विवरण...')}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400 transition"
            >
              {getText('Cancel', 'റദ്ദാക്കുക', 'रद्द करें')}
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              {getText('Report', 'റിപ്പോർട്ട് ചെയ്യുക', 'रिपोर्ट करें')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PestReportModal;