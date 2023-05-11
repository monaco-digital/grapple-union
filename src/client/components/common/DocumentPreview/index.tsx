import React, { FC, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import { Fab } from '@material-ui/core';

import { TemplateParagraph } from 'api/vl/models';
import AppState from '../../../../data/AppState';
import {
	SessionDocumentComponent,
	SessionDocumentSection,
	SessionParagraph,
	SessionDocument,
} from '../../../../types/SessionDocument';
import EndToEndStepper from '../EndToEndStepper';
import PreviewLetterExplanation from '../PreviewLetterExplanation';
import { PreviewParagraph } from '../DocumentPreviewComponents';
import { createSessionDocument } from '../../../../utils/sessionDocument';
import VLcard from '../VLcard';
import { getTemplate } from '../../../../api/vl';
import { updateSessionDocument, updateCurrentSessionDocument } from '../../../../data/sessionDataSlice';
import { downloadDataForDS } from '../../../../ds';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import ActionBar from '../ActionBar';

interface Props {
	sessionDocumentComponents: SessionDocumentComponent[];
}

const SessionDocComponents: FC<Props> = ({ sessionDocumentComponents }: Props) => {
	if (!sessionDocumentComponents) return null;
	const output = sessionDocumentComponents.map(sessionDocumentComponent => {
		const type = sessionDocumentComponent?.type;
		switch (type) {
			case 'UserContentSection': {
				const userContentSection = sessionDocumentComponent as SessionDocumentSection;
				return <SessionDocComponents sessionDocumentComponents={userContentSection.sessionDocumentComponents} />;
			}
			case 'TemplateContentSection': {
				const templateContentSection = sessionDocumentComponent as SessionDocumentSection;
				return <SessionDocComponents sessionDocumentComponents={templateContentSection.sessionDocumentComponents} />;
			}
			case 'Paragraph': {
				const sessionParagraph = sessionDocumentComponent as SessionParagraph;
				return <PreviewParagraph paragraph={sessionParagraph} />;
			}
			default:
				return null;
		}
	});
	return <>{output.concat()}</>;
};

// const triggerGAEvent = id => {
// 	switch (id) {
// 		case '_LET': {
// 			ReactGA.event({
// 				category: 'User',
// 				action: 'Letter Previewed',
// 			});
// 			break;
// 		}
// 		case '_WP': {
// 			ReactGA.event({
// 				category: 'User',
// 				action: 'WP Letter Previewed',
// 			});
// 			break;
// 		}
// 		case '_ET': {
// 			ReactGA.event({
// 				category: 'User',
// 				action: 'Tribunal Letter Previewed',
// 			});
// 			break;
// 		}
// 		case '_GR': {
// 			ReactGA.event({
// 				category: 'User',
// 				action: 'Grievance Letter Previewed',
// 			});
// 			break;
// 		}
// 		case '_RES_CD': {
// 			ReactGA.event({
// 				category: 'User',
// 				action: 'Complete Denial Response',
// 			});
// 			break;
// 		}
// 		case '_RES_CO': {
// 			ReactGA.event({
// 				category: 'User',
// 				action: 'Counter Offer Response',
// 			});
// 			break;
// 		}
// 		case '_RES_I': {
// 			ReactGA.event({
// 				category: 'User',
// 				action: 'Investigating Response',
// 			});
// 			break;
// 		}
// 		case '_RES_KM': {
// 			ReactGA.event({
// 				category: 'User',
// 				action: 'Want To Keep Me Response',
// 			});
// 			break;
// 		}
// 		default:
// 			break;
// 	}
// };

const DocumentPreview: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id = '_WP' } = useParams();
	const paragraphs = useSelector<AppState, SessionParagraph[]>(state => state.session.suggestedParagraphs);
	const selectedParagraphs = useMemo(
		() =>
			paragraphs.filter(
				suggested =>
					suggested.isSelected &&
					// Filters out paragraphs not meant to display on this template.
					(suggested.templateComponent as TemplateParagraph).paragraph?.topics?.some(
						t => t.topicId === id && t.value === 1,
					),
			),
		[id, paragraphs],
	);
	const isDsFlow = useSelector<AppState, boolean>(state => state.features.dsFlow);
	const sessionDocument = useSelector<AppState, SessionDocument>(state => state.session.sessionDocuments[id]);

	// triggerGAEvent('_LET');
	// triggerGAEvent(id);

	const handleNext = () => {
		history.push('/preview/_ADV');
	};

	const headingText = () => {
		switch (id) {
			case '_ET':
				return 'Employment Tribunal Grounds of Claim';
			case '_WP':
			case '_GR':
			case '_RES_CD':
			case '_RES_CO':
			case '_RES_I':
			case '_RES_KM':
			default:
				return 'Draft letter';
		}
	};

	useEffect(() => {
		const updatedTemplate = getTemplate(id);
		const document = createSessionDocument(updatedTemplate, selectedParagraphs);
		dispatch(updateSessionDocument({ document, type: id }));
		dispatch(updateCurrentSessionDocument(id));
	}, [dispatch, id, selectedParagraphs]);

	const step = id === '_WP' ? 1 : 2;

	return (
		<>
			<div className="flex-col w-full">
				<ScrollToTopOnMount />
				<EndToEndStepper step={step} />
				<div className="letter-preview">
					<PreviewLetterExplanation letter={id} />
					<VLcard heading={headingText()} theme="light">
						<div className="letter-preview__body">
							<SessionDocComponents sessionDocumentComponents={sessionDocument?.sessionDocumentComponents} />
						</div>
					</VLcard>
					{isDsFlow && (
						<Fab variant="extended" onClick={downloadDataForDS}>
							Download
						</Fab>
					)}

					<div className="letter-preview__action-buttons">
						<ActionBar step={step} nextHandler={handleNext} />
					</div>
				</div>
			</div>
		</>
	);
};

export default DocumentPreview;
