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
    addReminder: (state, action) => {
      state.reminders.push({
        id: Date.now(),
        ...action.payload
      });
    }
  }
});

export const { login, logout, setLanguage } = authSlice.actions;
export const { addActivity, addReminder } = activitySlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    activities: activitySlice.reducer
  }
});