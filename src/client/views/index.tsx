import React, { FC, useEffect } from 'react';
// import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';

import Narrative from 'client/components/common/Narrative';
import DocumentPreview from '../components/common/DocumentPreview';
import AdvicePreview from '../components/common/AdvicePreview';
import Header from '../components/common/Header';
import Questions from '../components/common/Questions';
import { setAllTopics } from '../../data/topicDataSlice';
import { updateSuggestedParagraphs } from '../../data/sessionDataSlice';

import Help from './Help';
import { getAllCaseTopics } from '../../api/vl';
import Disclaimer from '../components/common/Disclaimer';
import StatementSelect from '../components/common/StatementSelect';
import Step2Intro from '../components/common/Step2Intro';
import Step3Intro from '../components/common/Step3Intro';
import AllQuestions from '../components/common/AllQuestions';
import TimeLimitCalculator from '../components/common/TimeLimitCalculator';
import GrievanceLetterExplanation from '../components/common/GrievanceLetterExplanation';
import EmploymentTribunalExplanation from '../components/common/EmploymentTribunalExplanation';
import RespondToEmployer from '../components/common/RespondToEmployer';
import { SessionParagraph } from '../../types/SessionDocument';
import { getAllParagraphs } from '../../api/vl/paragraph';
import { enableDsFlow, disableDsFlow, enableFeature, disableFeature } from '../../data/featureDataSlice';

import Terms from './Terms';
import CheckoutModal from '../components/common/CheckoutModal';
import { Settlement } from '../components/common/Settlement';
import { CDF1 } from '../components/common/UserData/CDF1';
import CDFComplete from '../components/common/UserData/CDFComplete';
import { startSession } from '../../data/sessionDataThunks';
import StatementSelectAcademy from '../components/common/StatementSelectAcademy';
import AppState from '../../data/AppState';

// set of feature names and aliases. Aliases allow A/B testing without making it obvious to the user what's going on.
const featureQueryParams = [
	{ feature: 'enableMonetization', alias: 'fm' },
	{ feature: 'enableNarrative', alias: 'fn' },
	{ feature: 'academyFlow', alias: 'fa' },
];

const Main: FC = () => {
	const dispatch = useDispatch();
	const { search } = useLocation();
	const history = useHistory();

	const academyFlow = useSelector<AppState, boolean>(state => state.features.academyFlow);

	// useEffect(() => {
	// 	history.listen(location => {
	// 		ReactGA.pageview(location.pathname);
	// 	});
	// }, [academyFlow, history]);

	useEffect(() => {
		// Pulls feature switch values from URL or local storage, and passes to redux.
		// URL values (if present) should override local storage.

		const queryParams = new URLSearchParams(search);

		let featureStorage: Record<string, boolean> = {};

		try {
			featureStorage = JSON.parse(localStorage.getItem('vl-features')) || {};
		} catch {
			/* ignore */
		}

		// dsFlow switch only ever lasts for single session
		if (queryParams.has('dsFlow') && queryParams.get('dsFlow') === 'true') {
			dispatch(enableDsFlow());
		} else if (queryParams.has('dsFlow') && queryParams.get('dsFlow') === 'false') {
			dispatch(disableDsFlow());
		}

		featureQueryParams.forEach(({ alias, feature }) => {
			if (queryParams.has(alias)) {
				featureStorage[feature] = queryParams.get(alias) === 'true';
			}

			if (queryParams.has(feature)) {
				featureStorage[feature] = queryParams.get(feature) === 'true';
			}
		});

		const isFromLegalAdviceCentre = queryParams.get('source') === 'lac';
		if (isFromLegalAdviceCentre) {
			featureStorage.enableMonetization = false;
		}

		Object.entries(featureStorage).forEach(([feature, value]) => {
			if (value) {
				dispatch(enableFeature(feature));
			} else {
				dispatch(disableFeature(feature));
			}
		});

		try {
			localStorage.setItem('vl-features', JSON.stringify(featureStorage));
		} catch {
			/* ignore */
		}
	}, [dispatch, search]);

	useEffect(() => {
		(async () => {
			const paragraphs = await getAllParagraphs();
			const caseTopics = await getAllCaseTopics();
			const sessionParagraphs = paragraphs?.map(
				paragraph =>
					({
						templateComponent: paragraph,
						documentComponent: null,
						isSelected: paragraph.paragraph?.isAutomaticallyIncluded,
					} as SessionParagraph),
			);
			dispatch(setAllTopics(caseTopics));
			dispatch(updateSuggestedParagraphs(sessionParagraphs));
			await dispatch(startSession());
		})();
	}, [dispatch]);

	return (
		<main className="main">
			<Header />
			<div className="screen container mx-auto">
				<div>
					<div>
						<Switch>
							<Route path="/time-limit-calculator">
								<TimeLimitCalculator />
							</Route>
							<Route path="/questions/:id">
								<Questions />
							</Route>
							<Route path="/statements">
								<StatementSelect />
							</Route>
							<Route path="/statementsAcademy">
								<StatementSelectAcademy />
							</Route>
							<Route path="/narrative">
								<Narrative />
							</Route>
							<Route path="/step">
								<Switch>
									<Route exact path="/step/settlement">
										<Settlement />
									</Route>
									<Route exact path="/step/cdf/form">
										<CDF1 />
									</Route>
									<Route exact path="/step/cdf/complete">
										<CDFComplete isFinalStep />
									</Route>
								</Switch>
							</Route>
							<Route exact path="/preview">
								<Redirect to="/preview/_ADV" />
							</Route>
							<Route path="/preview/:id">
								<Switch>
									<Route path="/preview/_ADV">
										<AdvicePreview />
									</Route>
									<DocumentPreview />
								</Switch>
							</Route>
							<Route path="/terms">
								<Terms />
							</Route>
							<Route path="/progress-legal-case">
								<Step3Intro />
							</Route>
							<Route path="/grievance-explanation">
								<GrievanceLetterExplanation />
							</Route>
							<Route path="/employment-tribunal-explanation">
								<EmploymentTribunalExplanation />
							</Route>
							<Route path="/respond-to-employer">
								<RespondToEmployer />
							</Route>
							<Route path="/help">
								<Help />
							</Route>
							<Route path="/start-legal-process">
								<Step2Intro />
							</Route>
							<Route path="/">
								{academyFlow && <AllQuestions />}
								{!academyFlow && <Questions />}
							</Route>
						</Switch>
					</div>
					<div>
						<Disclaimer />
					</div>
				</div>
			</div>
			<Route path="/preview/:type/checkout">
				<CheckoutModal />
			</Route>
		</main>
	);
};

export default Main;
