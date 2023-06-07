import { ApolloProvider } from '@apollo/client';
import React, { FC, useEffect } from 'react';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

import { BrowserRouter as Router } from 'react-router-dom';
import { client } from 'api/vl/graphql';
import Client from './client/index';

// const { GA_PROPERTY_ID } = config;

const App: FC = () => {
	TagManager.initialize({
		gtmId: 'GTM-TQGKF9P',
	});

	// ReactGA.initialize(GA_PROPERTY_ID);
	ReactGA.pageview(window.location.pathname + window.location.search);

	useEffect(() => {
		const redirectToHomepage = () => {
			window.location.href = '/'; // Replace with your homepage URL
		};

		window.addEventListener('beforeunload', redirectToHomepage);

		return () => {
			window.removeEventListener('beforeunload', redirectToHomepage);
		};
	}, []);

	return (
		<>
			<ApolloProvider client={client}>
				<Router>
					<Client />
				</Router>
			</ApolloProvider>
		</>
	);
};

export default App;
