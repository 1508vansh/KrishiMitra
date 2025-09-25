import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CropRecommendation = () => {
  const { language } = useSelector(state => state.auth);
  const [recommendationData, setRecommendationData] = useState({
    soilType: '',
    season: '',
    waterAvailability: '',
    landSize: ''
  });
  const [recommendations, setRecommendations] = useState([]);

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const soilTypes = [
    { value: 'clay', label: getText('Clay', 'ചെളി', 'चिकनी मिट्टी') },
    { value: 'sandy', label: getText('Sandy', 'മണൽ', 'बलुई मिट्टी') },
    { value: 'loamy', label: getText('Loamy', 'എക്കൽ', 'दोमट मिट्टी') },
    { value: 'black', label: getText('Black Soil', 'കറുത്ത മണ്ണ്', 'काली मिट्टी') }
  ];

  const seasons = [
    { value: 'kharif', label: getText('Kharif (Jun-Sep)', 'ഖരിഫ് (ജൂൺ-സെപ്റ്റംബർ)', 'खरीफ (जून-सितंबर)') },
    { value: 'rabi', label: getText('Rabi (Oct-Mar)', 'റബി (ഒക്ടോബർ-മാർച്ച്)', 'रबी (अक्टूबर-मार्च)') },
    { value: 'zaid', label: getText('Zaid (Apr-Jun)', 'സൈദ് (ഏപ്രിൽ-ജൂൺ)', 'जायद (अप्रैल-जून)') }
  ];

  const cropData = {
    rice: {
      name: getText('Rice', 'നെല്ല്', 'धान'),
      suitability: getText('High yield in clay soil with good water', 'ചെളി മണ്ണിൽ നല്ല വിളവ്', 'चिकनी मिट्टी में अच्छी पैदावार'),
      season: ['kharif'],
      profit: getText('High', 'ഉയർന്ന', 'उच्च')
    },
    coconut: {
      name: getText('Coconut', 'തെങ്ങ്', 'नारियल'),
      suitability: getText('Coastal areas, sandy soil', 'തീരദേശങ്ങൾ, മണൽ മണ്ണ്', 'तटीय क्षेत्र, बलुई मिट्टी'),
      season: ['kharif', 'rabi'],
      profit: getText('Medium', 'ഇടത്തരം', 'मध्यम')
    },
    banana: {
      name: getText('Banana', 'വാഴ', 'केला'),
      suitability: getText('Warm climate, well-drained soil', 'ചൂടുള്ള കാലാവസ്ഥ, നനവുള്ള മണ്ണ്', 'गर्म जलवायु, अच्छी जल निकासी'),
      season: ['kharif'],
      profit: getText('High', 'ഉയർന്ന', 'उच्च')
    },
    vegetables: {
      name: getText('Vegetables', 'പച്ചക്കറികൾ', 'सब्जियाँ'),
      suitability: getText('All soil types, regular water', 'എല്ലാ മണ്ണിലും, നിരന്തരമായ ജലം', 'सभी मिट्टी, नियमित पानी'),
      season: ['rabi', 'zaid'],
      profit: getText('Medium', 'ഇടത്തരം', 'मध्यम')
    }
  };

  const getRecommendations = () => {
    // Mock recommendation logic
    const recommendedCrops = Object.keys(cropData).filter(crop => 
      cropData[crop].season.includes(recommendationData.season)
    );
    
    setRecommendations(recommendedCrops.map(crop => cropData[crop]));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
        🌱 {getText('Crop Recommendation', 'വിള ശുപാർശ', 'फसल सिफारिश')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {getText('Soil Type', 'മണ്ണ് തരം', 'मिट्टी का प्रकार')}
          </label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={recommendationData.soilType}
            onChange={(e) => setRecommendationData({...recommendationData, soilType: e.target.value})}
          >
            <option value="">{getText('Select Soil Type', 'മണ്ണ് തരം തിരഞ്ഞെടുക്കുക', 'मिट्टी का प्रकार चुनें')}</option>
            {soilTypes.map(soil => (
              <option key={soil.value} value={soil.value}>{soil.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {getText('Season', 'സീസൺ', 'मौसम')}
          </label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={recommendationData.season}
            onChange={(e) => setRecommendationData({...recommendationData, season: e.target.value})}
          >
            <option value="">{getText('Select Season', 'സീസൺ തിരഞ്ഞെടുക്കുക', 'मौसम चुनें')}</option>
            {seasons.map(season => (
              <option key={season.value} value={season.value}>{season.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        onClick={getRecommendations}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
      >
        {getText('Get Recommendations', 'ശുപാർശകൾ നേടുക', 'सिफारिशें प्राप्त करें')}
      </button>

      {recommendations.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="font-bold text-gray-800">
            {getText('Recommended Crops', 'ശുപാർശ ചെയ്യുന്ന വിളകൾ', 'सुझाई गई फसलें')}
          </h4>
          {recommendations.map((crop, index) => (
            <div key={index} className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-bold text-lg">{crop.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">{crop.suitability}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  crop.profit === getText('High', 'ഉയർന്ന', 'उच्च') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {crop.profit} {getText('Profit', 'ലാഭം', 'लाभ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-bold text-blue-800 mb-2">
          💡 {getText('Expert Tip', 'വിദഗ്ധ ടിപ്പ്', 'विशेषज्ञ सलाह')}
        </h5>
        <p className="text-sm text-blue-700">
          {getText(
            'Consult local agriculture officer for personalized advice based on soil test results.',
            'മണ്ണ് പരിശോധന ഫലങ്ങളെ അടിസ്ഥാനമാക്കി വ്യക്തിഗത ഉപദേശത്തിന് പ്രാദേശിക കൃഷി ഉദ്യോഗസ്ഥനെ സമീപിക്കുക.',
            'मिट्टी परीक्षण परिणामों के आधार पर व्यक्तिगत सलाह के लिए स्थानीय कृषि अधिकारी से परामर्श करें।'
          )}
        </p>
      </div>
    </div>
  );
};

export default CropRecommendation;