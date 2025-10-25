import { UpdateProfileRequest } from '@/types/request';
import { ProfileResponse } from '@/types/response';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  profile: ProfileResponse | null;
  getProfileLoading: boolean;
  updateProfileLoading: boolean;
  countries: string[] | null;
  getCountriesLoading: boolean;
}

const initialState: ProfileState = {
  profile: null,
  getProfileLoading: false,
  updateProfileLoading: false,
  countries: null,
  getCountriesLoading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileRequest: (state: ProfileState) => {
      state.getProfileLoading = true;
    },
    getProfileSuccess: (
      state: ProfileState,
      action: PayloadAction<ProfileResponse>,
    ) => {
      state.getProfileLoading = false;
      state.profile = action.payload;
    },
    getProfileFailure: (state: ProfileState) => {
      state.getProfileLoading = false;
    },
    updateProfileRequest: (
      state: ProfileState,
      _action: PayloadAction<UpdateProfileRequest>,
    ) => {
      state.updateProfileLoading = true;
    },
    updateProfileSuccess: (
      state: ProfileState,
      action: PayloadAction<ProfileResponse>,
    ) => {
      state.updateProfileLoading = false;
      state.profile = action.payload;
    },
    updateProfileFailure: (state: ProfileState) => {
      state.updateProfileLoading = false;
    },
    clearProfile: (state: ProfileState) => {
      state.profile = null;
    },
    // Get Countries
    getCountriesRequest: (state: ProfileState) => {
      state.getCountriesLoading = true;
    },
    getCountriesSuccess: (
      state: ProfileState,
      action: PayloadAction<string[]>,
    ) => {
      state.getCountriesLoading = false;
      state.countries = action.payload;
    },
    getCountriesFailure: (state: ProfileState) => {
      state.getCountriesLoading = false;
    },
  },
});

export const {
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  clearProfile,
  getCountriesRequest,
  getCountriesSuccess,
  getCountriesFailure,
} = profileSlice.actions;
export default profileSlice.reducer;
