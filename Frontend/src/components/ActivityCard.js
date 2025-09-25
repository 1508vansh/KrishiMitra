import React from 'react';
import { useSelector } from 'react-redux';

const ActivityCard = ({ activity }) => {
  const { language } = useSelector(state => state.auth);

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const getActivityIcon = (type) => {
    const icons = {
      sowing: '🌱',
      irrigation: '💧',
      fertilizer: '🧪',
      pesticide: '🐛',
      harvesting: '🌾',
      pest_sighting: '⚠️'
    };
    return icons[type] || '📝';
  };

  const getActivityLabel = (type) => {
    const labels = {
      sowing: getText('Sowing', 'വിതയ്ക്കൽ', 'बुआई'),
      irrigation: getText('Irrigation', 'നീരൊഴുക്ക്', 'सिंचाई'),
      fertilizer: getText('Fertilizer', 'വളം', 'उर्वरक'),
      pesticide: getText('Pesticide', 'പെസ്റ്റിസൈഡ്', 'कीटनाशक'),
      harvesting: getText('Harvesting', 'വിളവെടുപ്പ്', 'कटाई'),
      pest_sighting: getText('Pest Sighting', 'കീടം കണ്ടത്', 'कीट दर्शन')
    };
    return labels[type] || type;
  };

  return (
    <div className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
      <div className="text-xl sm:text-2xl">{getActivityIcon(activity.type)}</div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-gray-800 text-sm sm:text-base truncate">{getActivityLabel(activity.type)}</div>
        <div className="text-xs sm:text-sm text-gray-600 truncate">{activity.crop} • {activity.date}</div>
        {activity.notes && (
          <div className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{activity.notes}</div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;