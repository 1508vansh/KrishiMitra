import React from 'react';
import { useSelector } from 'react-redux';

const AdvisoryCard = () => {
  const { language } = useSelector(state => state.auth);

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const advisory = getText(
    'Rain expected tomorrow, avoid spraying. Check your rice crop for pests.',
    'മഴയ്ക്ക് സാധ്യതയുണ്ട്, നാളെ സ്പ്രേ ഒഴിവാക്കുക. നിങ്ങളുടെ നെല്ല് വിളയിൽ കീടങ്ങൾ പരിശോധിക്കുക.',
    'कल बारिश की संभावना है, छिड़काव से बचें। अपनी धान की फसल में कीटों की जांच करें।'
  );

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2">
            🔔 {getText('Current Advisory', 'നിലവിലെ ഉപദേശം', 'वर्तमान सलाह')}
          </h3>
          <p className="text-green-100">{advisory}</p>
        </div>
        <div className="text-4xl">🌤️</div>
      </div>
    </div>
  );
};

export default AdvisoryCard;