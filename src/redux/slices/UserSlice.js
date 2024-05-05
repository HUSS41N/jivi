import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heartRate: 80,
  bloodPressure: 140,
  anotherBloodPressure:70,
  userName: 'Hussain',
  dob: '',
  age: 24,
  currentWeight: 70,
  gender: 'Male',
  recordedData: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setHeartRate: (state, action) => {
      state.heartRate = action.payload;
    },
    setBloodPressure: (state, action) => {
      state.bloodPressure = action.payload;
    },
    setAnotherBloodPressure: (state, action) => {
      state.bloodPressure = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setCurrentWeight: (state, action) => {
      state.currentWeight = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setRecordedData: (state, action) => {
      state.recordedData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setHeartRate, setBloodPressure, setUserName, setDob, setAge,
  setCurrentWeight, setGender, setRecordedData,setAnotherBloodPressure
} = userSlice.actions;

export default userSlice.reducer;
