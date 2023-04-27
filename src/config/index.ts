const stage = process.env.REACT_APP_STAGE ?? 'dev';

const apiUrl = (): string => {
	if (stage === 'prod') {
		return 'https://95b3honng8.execute-api.eu-west-2.amazonaws.com/dev';
	}
	if (stage === 'dev') {
		return 'https://95b3honng8.execute-api.eu-west-2.amazonaws.com/dev';
	}
	return '';
};

const vlApiUrl = (): string => {
	if (stage === 'prod') {
		return 'https://4xrp27z7te.execute-api.eu-west-2.amazonaws.com/prod/graphql';
	}
	if (stage === 'dev') {
		return 'https://95b3honng8.execute-api.eu-west-2.amazonaws.com/dev/graphql';
	}
	return '';
};

const vlStripeUrl = (): string => {
	if (stage === 'prod') {
		return 'https://oixsmncpd5.execute-api.eu-west-2.amazonaws.com/prod';
	}
	if (stage === 'dev') {
		return 'https://rl6mqddh4h.execute-api.eu-west-2.amazonaws.com/dev';
	}
	return '';
};

const gaPropertyId = (): string => {
	if (stage === 'prod') {
		return 'UA-66970592-3';
	}
	if (stage === 'dev') {
		return 'UA-66970592-4';
	}
	return '';
};

const lambdaUrl = (): string =>
	stage === 'prod'
		? 'https://j8em4hk1r5.execute-api.eu-west-2.amazonaws.com/prod'
		: 'https://j8em4hk1r5.execute-api.eu-west-2.amazonaws.com/prod';

const config = {
	API_URL: apiUrl(),
	VL_API_URL: vlApiUrl(),
	VL_STRIPE_URL: vlStripeUrl(),
	LAMBDA_URL: lambdaUrl(),
	STRIPE_PUBLIC_KEY:
		stage === 'prod' ? 'pk_live_6Uq8eJFH8Hx6nXFrAOCkVckm00cI5AF91f' : 'pk_test_hGSeVxDC8lZRMNo8TNE2XSC200i9IRSvSj',
	GA_PROPERTY_ID: gaPropertyId(),
};

export default config;
