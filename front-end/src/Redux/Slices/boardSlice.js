import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: '',
	title: '',
	backgroundImageLink: '',
	isImage: true,
	lists: [],
	members: [],
	activity: [],
	loading: true,
	description: '',
	activityLoading: false,
};

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		successFetchingBoard: (state, action) => {
			state.id = action.payload._id;
			state.members = action.payload.members;
		},
		updateTitle: (state, action) => {
			state.title = action.payload;
		},
		setActivityLoading: (state, action) => {
			state.activityLoading = action.payload;
		},
		updateActivity: (state, action) => {
			state.activity = action.payload;
		},
		updateDescription: (state, action) => {
			state.description = action.payload;
		},
		updateBackground: (state, action) => {
			const { background, isImage } = action.payload;
			state.backgroundImageLink = background;
			state.isImage = isImage;
		},
		addMembers: (state,action)=>{
			state.members = action.payload;
		},
		successDeletingBoard: (state, action) => {
			state.id = action.payload;
		},
		updateTitle: (state, action) => {
			state.title = action.payload;
		},
	},
});

export const {
	setLoading,
	successDeletingBoard,
	successFetchingBoard,
	updateTitle,
	setActivityLoading,
	updateActivity,
	updateDescription,
	updateBackground,
	addMembers,
} = boardSlice.actions;
export default boardSlice.reducer;
