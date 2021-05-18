/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CaseTopic, DocumentParagraph, Template, DocumentParagraphComponent, TemplateParagraph } from 'api/vl/models';
import _ from 'lodash';
import { UserData } from '../types/UserData';
import {
	SessionDocument,
	SessionParagraph,
	SessionDocumentComponent,
	SessionDocumentSection,
} from '../types/SessionDocument';
import { Question } from '../types/Questions';
import { createDocument } from '../utils/document';
import orderSuggestedParagraphs from '../utils/paragraphOrdering';
import { generateParagraphsByTopics } from './sessionDataThunks';

const updateSessionDocumentMapper = (
	documentParagraphComponent: DocumentParagraphComponent,
	sessionDocument: SessionDocument,
): SessionDocument => {
	const processSessionDocumentComponent = (sessionDocumentComponent: SessionDocumentComponent) => {
		if (
			sessionDocumentComponent.type === 'TemplateContentSection' ||
			sessionDocumentComponent.type === 'UserContentSection'
		) {
			const sectionComponent = sessionDocumentComponent as SessionDocumentSection;
			sectionComponent.sessionDocumentComponents.forEach(sc => processSessionDocumentComponent(sc));
		} else if (sessionDocumentComponent.type === 'Paragraph') {
			const sessionParagraph = sessionDocumentComponent as SessionParagraph;
			const documentParagraph = sessionParagraph.documentComponent as DocumentParagraph;
			documentParagraph.documentParagraphComponents.forEach((dpc, idx) => {
				if (dpc.baseTemplateComponent === documentParagraphComponent.baseTemplateComponent) {
					documentParagraph.documentParagraphComponents[idx] = documentParagraphComponent;
				}
			});
		}
	};

	sessionDocument.sessionDocumentComponents.forEach(sessionDocumentComponent => {
		processSessionDocumentComponent(sessionDocumentComponent);
	});
	const newSessioonDocument = {
		...sessionDocument,
		document: createDocument(sessionDocument),
	};
	return newSessioonDocument;
};

export const slice = createSlice({
	name: 'session',
	initialState: {
		narrative: null as string,
		suggestedParagraphs: [] as SessionParagraph[],
		selectedTopics: [] as CaseTopic[],
		answeredQuestions: [] as Question[],
		selectedTemplate: null as Template,
		currentSessionDocument: null as string,
		sessionDocuments: {
			_WP: null as SessionDocument,
			_GR: null as SessionDocument,
			_ET: null as SessionDocument,
			_RES_CD: null as SessionDocument,
			_RES_CO: null as SessionDocument,
			_RES_I: null as SessionDocument,
			_RES_KM: null as SessionDocument,
		},
		userData: {} as UserData,
	},
	reducers: {
		selectParagraphs: (state, action) => {
			const ids = action.payload;
			state.suggestedParagraphs.forEach(suggestedParagraph => {
				if (ids.includes(suggestedParagraph.templateComponent.id)) {
					suggestedParagraph.isSelected = true;
				}
			});
		},
		deselectParagraphs: (state, action) => {
			const ids = action.payload;
			state.suggestedParagraphs.forEach(suggestedParagraph => {
				if (ids.includes(suggestedParagraph.templateComponent.id)) {
					suggestedParagraph.isSelected = false;
				}
			});
		},
		updateNarrative: (state, action) => {
			state.narrative = action.payload;
		},
		updateCurrentSessionDocument: (state, action) => {
			state.currentSessionDocument = action.payload;
		},
		updateSessionDocument: (state, action) => {
			const { document, type } = action.payload;
			state.sessionDocuments[type] = document;
		},
		updateSessionDocumentComponent: (state, action) => {
			state.sessionDocuments[state.currentSessionDocument] = updateSessionDocumentMapper(
				action.payload,
				state.sessionDocuments[state.currentSessionDocument],
			);
		},
		updateSelectedTopics: (state, action) => {
			state.selectedTopics = _.compact(action.payload);
		},
		updateSuggestedParagraphs: (state, action) => {
			state.suggestedParagraphs = orderSuggestedParagraphs(action.payload, state.selectedTopics);
		},
		updateAnsweredQuestions: (state, action) => {
			state.answeredQuestions = action.payload;
		},
		updateSelectedTemplate: (state, action) => {
			state.selectedTemplate = action.payload;
		},
		addAnsweredQuestion: (state, action) => {
			const latestQuestionId = action.payload;

			// re-answering a question invalidates all later answers
			const currentQuestionIndex = state.answeredQuestions.indexOf(latestQuestionId);
			const currentlyAnsweredQuestions =
				currentQuestionIndex === -1 ? state.answeredQuestions : state.answeredQuestions.slice(0, currentQuestionIndex);
			state.answeredQuestions = currentlyAnsweredQuestions;
		},
		updateUserData: (state, action) => {
			const updatedUserData = action.payload;
			state.userData = {
				...state.userData,
				...updatedUserData,
			};
		},
	},
	extraReducers: builder => {
		builder.addCase(generateParagraphsByTopics.fulfilled, (state, action) => {
			state.suggestedParagraphs = action.payload.map(
				paragraph =>
					({
						templateComponent: {
							id: paragraph.id,
							type: 'Paragraph',
							version: 1,
							paragraph,
						} as TemplateParagraph,
						documentComponent: null,
						isSelected: Boolean(paragraph.isAutomaticallyIncluded),
					} as SessionParagraph),
			);
		});
	},
});

export const {
	updateNarrative,
	updateSuggestedParagraphs,
	updateAnsweredQuestions,
	updateSelectedTopics,
	addAnsweredQuestion,
	selectParagraphs,
	deselectParagraphs,
	updateSelectedTemplate,
	updateCurrentSessionDocument,
	updateSessionDocument,
	updateSessionDocumentComponent,
	updateUserData,
} = slice.actions;

export default slice.reducer;
