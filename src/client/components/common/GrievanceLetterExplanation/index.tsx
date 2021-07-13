import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EndToEndStepper from '../EndToEndStepper';
import ActionBar from '../ActionBar';

const GrievanceLetterExplanation: React.FC = () => {
	const history = useHistory();

	const handleNext = () => {
		history.push('/preview/_GR');
	};

	return (
		<div className="flex-col w-full">
			<EndToEndStepper step={3} />
			<div className="step-intro">
				<Typography variant="body1" paragraph>
					So, your employer is ignoring your ‘without prejudice’ letter. If you’re still employed, you can submit a
					formal written grievance under your employer’s internal procedure. A grievance is a statement of facts
					regarding what happened to you in the past.
				</Typography>
				<Typography variant="body1" paragraph>
					Writing a grievance lets your employer know that you are not planning to give up, so it’s another reason for
					them to offer you a settlement. On the next page you can find your grievance letter.
				</Typography>
				<Typography variant="body1" paragraph>
					If you want us to check and send the letters in this service for you as well as any follow up letters from
					this tool, our fee for the entire service is £75 up front + 20% of any increase in settlement achieved (if you
					already have an offer our fee won’t apply to that).{' '}
					<Link href="/cdf/form" color="primary">
						Contact us
					</Link>{' '}
					for full terms of use.
				</Typography>
				<ActionBar step={2} nextHandler={handleNext} />
			</div>
		</div>
	);
};

export default GrievanceLetterExplanation;
