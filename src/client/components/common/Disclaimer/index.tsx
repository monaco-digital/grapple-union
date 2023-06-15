import React, { FC } from 'react';
import { Divider, Grid, Link, Typography } from '@material-ui/core/';
import { useRouteMatch } from 'react-router-dom';

const Disclaimer: FC = () => {
	// Some pages take up half the width of the screen, so we only show the disclaimer on the following pages
	const isPreview = useRouteMatch('/preview');
	const isHelp = useRouteMatch('/help');
	const isTerms = useRouteMatch('/terms');
	const isCDF = useRouteMatch('/cdf');
	const isStepCDF = useRouteMatch('/step/cdf');

	const disclaimerText =
		'Grapple makes every attempt to ensure the factual accuracy of website content at the time of publication. Any guidance or tips given are for information only. Nothing should be taken as legal advice or as forming a lawyer-client relationship. If you require legal representation please get in touch and we will refer you to one of our friendly law firm partners. ';

	return (
		<>
			{(isPreview || isHelp || isTerms || isCDF || isStepCDF) && (
				<div className="disclaimer">
					<Divider />
					<Grid container justifyContent="space-between">
						<Grid item xs={12} className="disclaimer__text">
							<Typography variant="caption">
								{disclaimerText}{' '}
								<Link href="/cdf" target="_blank">
									here.
								</Link>
							</Typography>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="space-between">
						<Grid item md={6} xs={12}>
							<Typography variant="caption">
								© Grapple Tech Ltd, <br />
								Registered company no. 14339842 <br /> <br />
								Registered office address: Unit 6 Queens Yard, White Post Lane, London, <br />
								United Kingdom, E9 5EN
								<br />
							</Typography>
						</Grid>
					</Grid>
				</div>
			)}
		</>
	);
};

export default Disclaimer;
