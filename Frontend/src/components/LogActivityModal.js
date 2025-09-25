import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../store/store';

const LogActivityModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { language } = useSelector(state => state.auth);
  const [activity, setActivity] = useState({
    type: 'sowing',
    crop: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    photo: null
  });

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const activityTypes = [
    { value: 'sowing', label: getText('Sowing', 'വിതയ്ക്കൽ', 'बुआई'), icon: '🌱' },
    { value: 'irrigation', label: getText('Irrigation', 'നീരൊഴുക്ക്', 'सिंचाई'), icon: '💧' },
    { value: 'fertilizer', label: getText('Fertilizer', 'വളം', 'उर्वरक'), icon: '🧪' },
    { value: 'pesticide', label: getText('Pesticide', 'പെസ്റ്റിസൈഡ്', 'कीटनाशक'), icon: '🐛' },
    { value: 'harvesting', label: getText('Harvesting', 'വിളവെടുപ്പ്', 'कटाई'), icon: '🌾' },
    { value: 'pest_sighting', label: getText('Pest Sighting', 'കീടം കണ്ടത്', 'कीट दर्शन'), icon: '⚠️' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addActivity(activity));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="bg-green-600 text-white p-3 sm:p-4 rounded-t-lg sticky top-0">
          <h2 className="text-lg sm:text-xl font-bold">
            {getText('Log Activity', 'പ്രവൃത്തി രേഖപ്പെടുത്തുക', 'गतिविधि दर्ज करें')}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Activity Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 sm:mb-2">
              {getText('Activity Type', 'പ്രവൃത്തി തരം', 'गतिविधि प्रकार')}
            </label>
            <select
              value={activity.type}
              onChange={(e) => setActivity({...activity, type: e.target.value})}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            >
              {activityTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Crop */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 sm:mb-2">
              {getText('Crop', 'വിള', 'फसल')}
            </label>
            <input
              type="text"
              value={activity.crop}
              onChange={(e) => setActivity({...activity, crop: e.target.value})}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              placeholder={getText('Crop name', 'വിളയുടെ പേര്', 'फसल का नाम')}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 sm:mb-2">
              {getText('Date', 'തീയതി', 'तारीख')}
            </label>
            <input
              type="date"
              value={activity.date}
              onChange={(e) => setActivity({...activity, date: e.target.value})}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 sm:mb-2">
              {getText('Notes', 'കുറിപ്പുകൾ', 'टिप्पणियाँ')}
            </label>
            <textarea
              value={activity.notes}
              onChange={(e) => setActivity({...activity, notes: e.target.value})}
              rows="3"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              placeholder={getText('Additional details...', 'അധിക വിവരങ്ങൾ...', 'अतिरिक्त विवरण...')}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 sm:py-3 rounded-lg font-bold hover:bg-gray-400 transition text-sm sm:text-base"
            >
              {getText('Cancel', 'റദ്ദാക്കുക', 'रद्द करें')}
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 sm:py-3 rounded-lg font-bold hover:bg-green-700 transition text-sm sm:text-base"
            >
              {getText('Save', 'സേവ് ചെയ്യുക', 'सेव करें')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogActivityModal;