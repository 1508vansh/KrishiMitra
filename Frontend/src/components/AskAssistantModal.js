import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import Loader from '../utils/Loader';
const AskAssistantModal = ({ onClose }) => {
  const { language } = useSelector(state => state.auth);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isSending,setIsSending] = useState(false);

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const sampleQuestions = [
    getText('When to sow?', 'എപ്പോൾ വിതയ്ക്കണം?', 'कब बोना है?'),
    getText('How much water to give?', 'എത്ര വെള്ളം നൽകണം?', 'कितना पानी देना है?'),
    getText('Which fertilizer to use?', 'ഏത് വളം ഉപയോഗിക്കണം?', 'कौन सा उर्वरक उपयोग करें?')
  ];

  const handleAsk = async() => {
    try{
      if(question==='')return;
      if(question.length<=1)return;
      setIsSending(true);
      const response = await axiosClient.post('/handleAi',{message:question});
      console.log(response);
      const data = response?.data;
      console.log("this is ai response :",data);
      const message = data?.message;
      setResponse(getText(message,message,message));
      setIsSending(false);
    }catch(err){
      console.log("Error in ai response!");
    }
    // Mock AI response
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-t-lg sticky top-0">
          <h2 className="text-lg sm:text-xl font-bold">
            🤖 {getText('Ask AI Assistant', 'AI സഹായിയോട് ചോദിക്കുക', 'AI सहायक से पूछें')}
          </h2>
        </div>
        
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Quick Questions */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 sm:mb-2">
              {getText('Quick Questions', 'വേഗത്തിലുള്ള ചോദ്യങ്ങൾ', 'त्वरित प्रश्न')}
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(q)}
                  className="bg-gray-100 hover:bg-gray-200 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Question Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 sm:mb-2">
              {getText('Your Question', 'നിങ്ങളുടെ ചോദ്യം', 'आपका प्रश्न')}
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="3"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder={getText('Type your farming question here...', 'നിങ്ങളുടെ കൃഷി ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക...', 'अपना कृषि प्रश्न यहाँ टाइप करें...')}
            />
          </div>

          {/* Response */}
          {
            isSending && 
           <div className="bg-green-50 p-2 sm:p-4 rounded-lg">
              <div className="font-bold text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">
                {getText('AI Assistant Response', 'AI സഹായിയുടെ പ്രതികരണം', 'AI सहायक प्रतिक्रिया')}
              </div>
              <div className="text-green-700 text-sm sm:text-base">{<Loader/>}</div>
            </div>
           }
          {response && !isSending && (
            <div className="bg-green-50 p-2 sm:p-4 rounded-lg">
              <div className="font-bold text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">
                {getText('AI Assistant Response', 'AI സഹായിയുടെ പ്രതികരണം', 'AI सहायक प्रतिक्रिया')}
              </div>
              <div className="text-green-700 text-sm sm:text-base">{response}</div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 sm:py-3 rounded-lg font-bold hover:bg-gray-400 transition text-sm sm:text-base"
            >
              {getText('Close', 'അടയ്ക്കുക', 'बंद करें')}
            </button>
            <button
              onClick={handleAsk}
              className="flex-1 bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-bold hover:bg-blue-700 transition text-sm sm:text-base"
            >
              {getText('Ask', 'ചോദിക്കുക', 'पूछें')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAssistantModal;