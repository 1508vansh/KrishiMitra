import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    language: 'english' // default language
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  }
});

const activitySlice = createSlice({
  name: 'activities',
  initialState: {
    activities: [
      {
        id: 1,
        type: 'sowing',
        crop: 'Rice',
        date: '2024-01-15',
        notes: 'Sowed paddy seeds in field A',
        photo: null
      }
    ],
    reminders: [
      {
        id: 1,
        title: 'Fertilize Rice Crop',
        date: '2024-01-25',
        completed: false
      }
    ]
  },
  reducers: {
    addActivity: (state, action) => {
      state.activities.unshift({
        id: Date.now(),
        ...action.payload
      });
    },
    updateActivity: (state, action) => {
      const index = state.activities.findIndex(activity => activity.id === action.payload.id);
      if (index !== -1) {
        state.activities[index] = { ...state.activities[index], ...action.payload };
      }
    },
    deleteActivity: (state, action) => {
      state.activities = state.activities.filter(activity => activity.id !== action.payload);
    },
    addReminder: (state, action) => {
      state.reminders.push({
        id: Date.now(),
        ...action.payload
      });
    },
    completeReminder: (state, action) => {
      const reminder = state.reminders.find(reminder => reminder.id === action.payload);
      if (reminder) {
        reminder.completed = true;
      }
    },
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(reminder => reminder.id !== action.payload);
    }
  }
});

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    posts: [
      {
        id: 1,
        userId: 1,
        userName: 'Rajesh Kumar',
        userAvatar: '👨‍🌾',
        content: 'Has anyone tried organic farming for paddy? Looking for advice.',
        timestamp: '2024-01-10T10:30:00',
        likes: 5,
        comments: [
          {
            id: 1,
            userId: 2,
            userName: 'Priya Nair',
            content: 'Yes! I\'ve been doing it for 2 years. Great results!',
            timestamp: '2024-01-10T11:15:00'
          }
        ],
        tags: ['organic', 'paddy', 'farming']
      }
    ],
    discussions: [
      {
        id: 1,
        title: 'Best time for coconut harvesting',
        category: 'harvesting',
        participants: 12,
        lastActivity: '2024-01-12T14:20:00'
      }
    ]
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        ...action.payload
      });
    },
    addComment: (state, action) => {
      const { postId, comment } = state.posts.find(post => post.id === action.payload.postId);
      if (post) {
        post.comments.push({
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...action.payload.comment
        });
      }
    },
    likePost: (state, action) => {
      const post = state.posts.find(post => post.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    addDiscussion: (state, action) => {
      state.discussions.unshift({
        id: Date.now(),
        participants: 1,
        lastActivity: new Date().toISOString(),
        ...action.payload
      });
    }
  }
});

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState: {
    crops: [
      {
        id: 1,
        name: 'Rice',
        suitableSeasons: ['Kharif'],
        soilType: 'Clayey',
        waterRequirements: 'High',
        duration: '120-150 days',
        yield: '4-6 tons/hectare'
      },
      {
        id: 2,
        name: 'Wheat',
        suitableSeasons: ['Rabi'],
        soilType: 'Loamy',
        waterRequirements: 'Medium',
        duration: '100-120 days',
        yield: '3-5 tons/hectare'
      }
    ],
    diseases: [
      {
        id: 1,
        name: 'Blast Disease',
        crop: 'Rice',
        symptoms: ['Spots on leaves', 'Node rot'],
        prevention: 'Use resistant varieties',
        treatment: 'Fungicide application'
      }
    ],
    userRecommendations: [],
    detectionHistory: []
  },
  reducers: {
    addCropRecommendation: (state, action) => {
      state.crops.push({
        id: Date.now(),
        ...action.payload
      });
    },
    addDisease: (state, action) => {
      state.diseases.push({
        id: Date.now(),
        ...action.payload
      });
    },
    addUserRecommendation: (state, action) => {
      state.userRecommendations.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload
      });
    },
    addDetection: (state, action) => {
      state.detectionHistory.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload
      });
    },
    updateRecommendation: (state, action) => {
      const index = state.userRecommendations.findIndex(rec => rec.id === action.payload.id);
      if (index !== -1) {
        state.userRecommendations[index] = { ...state.userRecommendations[index], ...action.payload };
      }
    }
  }
});

const pestReportSlice = createSlice({
  name: 'pestReports',
  initialState: {
    reports: [
      {
        id: 1,
        crop: 'Rice',
        pestType: 'Brown Plant Hopper',
        severity: 'High',
        date: '2024-01-08',
        location: 'Field A',
        description: 'Found large infestation in the northern section',
        status: 'pending',
        image: null
      }
    ]
  },
  reducers: {
    addPestReport: (state, action) => {
      state.reports.unshift({
        id: Date.now(),
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        ...action.payload
      });
    },
    updatePestReport: (state, action) => {
      const index = state.reports.findIndex(report => report.id === action.payload.id);
      if (index !== -1) {
        state.reports[index] = { ...state.reports[index], ...action.payload };
      }
    },
    deletePestReport: (state, action) => {
      state.reports = state.reports.filter(report => report.id !== action.payload);
    }
  }
});

const advisorySlice = createSlice({
  name: 'advisory',
  initialState: {
    alerts: [
      {
        id: 1,
        type: 'weather',
        title: 'Heavy Rainfall Alert',
        message: 'Expect heavy rainfall in next 48 hours. Take necessary precautions.',
        severity: 'high',
        date: '2024-01-15',
        expires: '2024-01-17'
      }
    ],
    tips: [
      {
        id: 1,
        category: 'sowing',
        content: 'Sow seeds when soil moisture is adequate for better germination',
        language: 'english'
      }
    ]
  },
  reducers: {
    addAlert: (state, action) => {
      state.alerts.unshift({
        id: Date.now(),
        ...action.payload
      });
    },
    dismissAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    addTip: (state, action) => {
      state.tips.push({
        id: Date.now(),
        ...action.payload
      });
    }
  }
});

export const { login, logout, setLanguage, updateUser } = authSlice.actions;
export const { addActivity, updateActivity, deleteActivity, addReminder, completeReminder, deleteReminder } = activitySlice.actions;
export const { addPost, addComment, likePost, addDiscussion } = communitySlice.actions;
export const { addCropRecommendation, addDisease, addUserRecommendation, addDetection, updateRecommendation } = recommendationSlice.actions;
export const { addPestReport, updatePestReport, deletePestReport } = pestReportSlice.actions;
export const { addAlert, dismissAlert, addTip } = advisorySlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    activities: activitySlice.reducer,
    community: communitySlice.reducer,
    recommendations: recommendationSlice.reducer,
    pestReports: pestReportSlice.reducer,
    advisory: advisorySlice.reducer
  }
});
