import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CommunityForum = () => {
  const { language, user } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Rajesh Kumar',
      crop: 'Rice',
      question: 'Best time to transplant rice seedlings?',
      answers: 3,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      user: 'Sujatha M',
      crop: 'Coconut',
      question: 'How to control red palm weevil?',
      answers: 5,
      timestamp: '1 day ago'
    }
  ]);
  const [newPost, setNewPost] = useState('');

  const getText = (english, malayalam, hindi) => {
    if (language === 'malayalam') return malayalam;
    if (language === 'hindi') return hindi;
    return english;
  };

  const addPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: user?.name || 'Farmer',
        crop: user?.primaryCrop || 'General',
        question: newPost,
        answers: 0,
        timestamp: 'Just now'
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
        👥 {getText('Community Forum', 'കമ്മ്യൂണിറ്റി ഫോറം', 'सामुदायिक मंच')}
      </h3>

      {/* New Post Form */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-bold text-green-800 mb-3">
          💬 {getText('Ask a Question', 'ഒരു ചോദ്യം ചോദിക്കുക', 'एक प्रश्न पूछें')}
        </h4>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder={getText(
            'Share your farming question with the community...',
            'കമ്മ്യൂണിറ്റിയുമായി നിങ്ങളുടെ കൃഷി ചോദ്യം പങ്കിടുക...',
            'समुदाय के साथ अपना कृषि प्रश्न साझा करें...'
          )}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          rows="3"
        />
        <button 
          onClick={addPost}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
        >
          {getText('Post Question', 'ചോദ്യം പോസ്റ്റ് ചെയ്യുക', 'प्रश्न पोस्ट करें')}
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        <h4 className="font-bold text-gray-700">
          {getText('Recent Discussions', 'ഏറ്റവും പുതിയ ചർച്ചകൾ', 'हाल की चर्चाएं')}
        </h4>
        
        {posts.map(post => (
          <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-bold text-green-600">{post.user}</span>
                <span className="ml-2 text-sm text-gray-500">• {post.crop}</span>
              </div>
              <span className="text-sm text-gray-400">{post.timestamp}</span>
            </div>
            
            <p className="text-gray-800 mb-3">{post.question}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-blue-600 text-sm">
                💬 {post.answers} {getText('answers', 'ഉത്തരങ്ങൾ', 'उत्तर')}
              </span>
              <button className="text-green-600 text-sm font-bold hover:text-green-700">
                {getText('View Discussion', 'ചർച കാണുക', 'चर्चा देखें')} →
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {getText(
              'No discussions yet. Start the first one!',
              'ഇതുവരെ ചർച്ചകളില്ല. ആദ്യത്തേത് ആരംഭിക്കുക!',
              'अभी तक कोई चर्चा नहीं। पहली चर्चा शुरू करें!'
            )}
          </div>
        )}
      </div>

      {/* Community Guidelines */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-bold text-blue-800 mb-2">
          📋 {getText('Community Guidelines', 'കമ്മ്യൂണിറ്റി മാർഗ്ഗനിർദ്ദേശങ്ങൾ', 'सामुदायिक दिशानिर्देश')}
        </h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• {getText('Be respectful to other farmers', 'മറ്റ് കർഷകരോട് ബഹുമാനം കാണിക്കുക', 'अन्य किसानों का सम्मान करें')}</li>
          <li>• {getText('Share authentic information', 'അധികൃത വിവരങ്ങൾ പങ്കിടുക', 'प्रामाणिक जानकारी साझा करें')}</li>
          <li>• {getText('Help each other grow', 'പരസ്പരം വളരാൻ സഹായിക്കുക', 'एक दूसरे को बढ़ने में मदद करें')}</li>
        </ul>
      </div>
    </div>
  );
};

export default CommunityForum;