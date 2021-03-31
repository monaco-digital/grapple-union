import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CaseTopic, BulletPoints, DocumentParagraph, TemplateParagraph } from 'api/vl/models';
import ReactGA from 'react-ga';
import _ from 'lodash';
import { Box, Fab } from '@material-ui/core';

import moreInfoIcon from '../../../assets/img/more-info-icon.svg';
import AppState from '../../../../data/AppState';
import {
	updateSuggestedParagraphs,
	selectParagraphs,
	deselectParagraphs,
	removeLastAnsweredQuestion,
} from '../../../../data/sessionDataSlice';
import { SessionParagraph } from '../../../../types/SessionDocument';
import { getSuggestedParagraphs } from '../../../../api/vl';

const StatementSelect: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const selectedTopicIds = selectedTopics.map(t => t.id);
	if (_.intersection(selectedTopicIds, ['_RES_CD', '_RES_CO', '_RES_I', '_RES_KM']).length > 0) {
		history.push('/preview');
	}

	const suggestedParagraphs = useSelector<AppState, SessionParagraph[]>(state => state.session.suggestedParagraphs);

	useEffect(() => {
		const updateParagraphs = async () => {
			const paragraphs = await getSuggestedParagraphs(selectedTopics);
			const sessionParagraphs = paragraphs.map(
				paragraph =>
					({
						templateComponent: paragraph,
						documentComponent: null,
						isSelected: paragraph.paragraph?.isAutomaticallyIncluded,
					} as SessionParagraph),
			);
			dispatch(updateSuggestedParagraphs(sessionParagraphs));
		};
		updateParagraphs();
	}, [dispatch, selectedTopics]);

	const handleOnClick = (id: string): void => {
		const selectedSessionParagraph = suggestedParagraphs.find(paragraph => paragraph.templateComponent.id === id);
		if (!selectedSessionParagraph.isSelected) {
			dispatch(selectParagraphs([id]));
		} else {
			dispatch(deselectParagraphs([id]));
		}

		const paragraph = selectedSessionParagraph.templateComponent as TemplateParagraph;
		ReactGA.event({
			category: 'User',
			action: `Selected statement: ${paragraph?.paragraph.summary.substring(0, 30)} - ${id}`,
		});
	};

	const enterLetterPreviewMode = () => {
		history.push('/preview');
	};

	const handleGoBackwardsFromStatements = () => {
		dispatch(removeLastAnsweredQuestion());
		history.push('/questions');
	};

	const statements = suggestedParagraphs.map(sessionParagraph => {
		const templateParagraph = sessionParagraph.templateComponent as TemplateParagraph;
		if (templateParagraph.paragraph?.isAutomaticallyIncluded) {
			// paragraph is already selected. Do not show.
			return null;
		}

		const documentParagraph = sessionParagraph.documentComponent as DocumentParagraph;
		const { id, summary } = templateParagraph.paragraph;
		const selected = sessionParagraph.isSelected;
		const hasUserInput = templateParagraph.paragraph.paragraphComponents.find(
			pc => pc.type === 'BulletPoints',
		) as BulletPoints;
		const displayInput = hasUserInput && documentParagraph;

		return (
			// FIXME - sort out accessability on these buttons
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
			<div key={id} className="topic" onClick={() => handleOnClick(id)}>
				<input
					type="checkbox"
					id=""
					name={summary}
					value={summary}
					checked={selected}
					onChange={() => handleOnClick(id)}
				/>
				<label htmlFor={id}>{summary}</label>
				{displayInput && documentParagraph.documentParagraphComponents}
			</div>
		);
	});

	return (
		<>
			<div className="questions">
				<h1 className="title">Select all the statements that apply to you</h1>
				<div className="topics">{statements}</div>
				<Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
					<Box flexGrow={1}>
						<Fab color="primary" onClick={() => history.push('/help')}>
							<img src={moreInfoIcon} alt="More Info" />
						</Fab>
					</Box>

					<Box px={1}>
						<Fab variant="extended" color="inherit" onClick={handleGoBackwardsFromStatements}>
							Back
						</Fab>
					</Box>
					<Box px={1}>
						<Fab variant="extended" color="secondary" onClick={enterLetterPreviewMode}>
							Preview Letter
						</Fab>
					</Box>
				</Box>
			</div>
		</>
	);
};

export default StatementSelect;
