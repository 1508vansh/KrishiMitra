import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DiseaseDetection = () => {
  const { language } = useSelector(state => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // Mock disease detection
        setTimeout(() => {
          setDetectionResult({
            disease: getText('Leaf Rust', 'ഇല തുരുമ്പ്', 'पत्ती की जंग'),
            confidence: '85%',
            description: getText(
              'Fungal disease affecting leaves. Use fungicide spray.',
              'ഇലകളെ ബാധിക്കുന്ന ഫംഗസ് രോഗം. ഫംഗിസൈഡ് സ്പ്രേ ഉപയോഗിക്കുക.',
              'पत्तियों को प्रभावित करने वाला फंगल रोग। कवकनाशी स्प्रे का प्रयोग करें।'
            ),
            treatment: getText(
              'Remove affected leaves, apply Copper Oxychloride',
              'ബാധിച്ച ഇലകൾ നീക്കംചെയ്യുക, കോപ്പർ ഓക്സിക്ലോറൈഡ് പ്രയോഗിക്കുക',
              'प्रभावित पत्तियों को हटाएं, कॉपर ऑक्सीक्लोराइड लगाएं'
            )
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
        🔍 {getText('Disease Detection', 'രോഗം കണ്ടെത്തൽ', 'रोग पहचान')}
      </h3>

      <div className="space-y-6">
        {/* Image Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="disease-image"
          />
          <label htmlFor="disease-image" className="cursor-pointer">
            <div className="text-4xl mb-2">📸</div>
            <p className="text-gray-600 mb-2">
              {getText(
                'Click to upload plant/disease image',
                'ചെടി/രോഗ ചിത്രം അപ്ലോഡ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക',
                'पौधे/रोग की छवि अपलोड करने के लिए क्लिक करें'
              )}
            </p>
            <span className="text-sm text-gray-500">
              {getText('Supports JPG, PNG', 'JPG, PNG പിന്തുണ', 'JPG, PNG समर्थित')}
            </span>
          </label>
        </div>

        {/* Preview Section */}
        {selectedImage && (
          <div className="text-center">
            <h4 className="font-bold text-gray-700 mb-3">
              {getText('Uploaded Image', 'അപ്ലോഡ് ചെയ്ത ചിത്രം', 'अपलोड की गई छवि')}
            </h4>
            <img 
              src={selectedImage} 
              alt="Plant/disease" 
              className="max-w-full h-64 mx-auto object-cover rounded-lg"
            />
            <div className="mt-3 text-blue-600">
              🔄 {getText('Analyzing...', 'വിശകലനം ചെയ്യുന്നു...', 'विश्लेषण कर रहे हैं...')}
            </div>
          </div>
        )}

        {/* Results Section */}
        {detectionResult && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-3">
              🎯 {getText('Detection Results', 'കണ്ടെത്തൽ ഫലങ്ങൾ', 'पहचान परिणाम')}
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">{getText('Disease', 'രോഗം', 'रोग')}:</span>
                <span className="font-bold">{detectionResult.disease}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">{getText('Confidence', 'ആത്മവിശ്വാസം', 'विश्वास')}:</span>
                <span className="font-bold text-green-600">{detectionResult.confidence}</span>
              </div>

              <div>
                <span className="font-medium block mb-1">{getText('Description', 'വിവരണം', 'विवरण')}:</span>
                <p className="text-sm text-gray-700">{detectionResult.description}</p>
              </div>

              <div>
                <span className="font-medium block mb-1">{getText('Treatment', 'ചികിത്സ', 'उपचार')}:</span>
                <p className="text-sm text-gray-700">{detectionResult.treatment}</p>
              </div>
            </div>

            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">
              📞 {getText('Contact Agriculture Officer', 'കൃഷി ഉദ്യോഗസ്ഥനെ ബന്ധപ്പെടുക', 'कृषि अधिकारी से संपर्क करें')}
            </button>
          </div>
        )}

        {/* Common Diseases Info */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h5 className="font-bold text-yellow-800 mb-2">
            ℹ️ {getText('Common Plant Diseases in Kerala', 'കേരളത്തിൽ സാധാരണമായ ചെടി രോഗങ്ങൾ', 'केरल में सामान्य पौध रोग')}
          </h5>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• {getText('Leaf Blast - Rice', 'ഇല ബ്ലാസ്റ്റ് - നെല്ല്', 'पत्ती झुलसा - धान')}</li>
            <li>• {getText('Bud Rot - Coconut', 'മൊട്ട് ചീഞ്ഞൽ - തെങ്ങ്', 'कली सड़न - नारियल')}</li>
            <li>• {getText('Bunchy Top - Banana', 'ബഞ്ചി ടോപ്പ് - വാഴ', 'गुच्छेदार शीर्ष - केला')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;