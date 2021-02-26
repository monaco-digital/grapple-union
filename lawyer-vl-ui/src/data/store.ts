import { configureStore } from '@reduxjs/toolkit'
import topicsReducer from './topicDataSlice'
import questionsReducer from './questionDataSlice'
import navigationReducer from './navigationDataSlice'
import sessionReducer from './sessionDataSlice'
import featureReducer from './featureDataSlice'

export default configureStore({
	reducer: {
		topics: topicsReducer,
		questions: questionsReducer,
		navigation: navigationReducer,
		session: sessionReducer,
		features: featureReducer,
	},
})
