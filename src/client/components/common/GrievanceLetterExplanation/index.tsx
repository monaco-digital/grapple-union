import React from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EndToEndStepper from '../EndToEndStepper';
import ActionBar from '../ActionBar';
import VLcard from '../VLcard';

const GrievanceLetterExplanation: React.FC = () => {
	const history = useHistory();

	const handleNext = () => {
		history.push('/grievance-explanation');
	};

	return (
		<div className="flex-col w-full grievance-explanation">
			<EndToEndStepper step={3} />
			<div className="letter-preview">
				<h2>Grievance appeals</h2>
				<Typography variant="body1" paragraph>
					If you have lodged a grievance and received a response from your employer rejecting your complaint, then you
					should have been given the opportunity to lodge a grievance appeal.
				</Typography>
				<Typography variant="body1" paragraph>
					You should always lodge a grievance appeal if you don’t agree with the grievance outcome and are considering
					taking matters further. You should mention everything which you might later rely on in an employment tribunal.
				</Typography>
				<Typography variant="body1">
					<p>The most common reasons to appeal a grievance include:</p>
					<ul className="list-disc p-4">
						<li>Employer didn’t interview witnesses.</li>
						<li>Employer didn’t take account of some of the points I raised.</li>
						<li>Employer didn’t take account of the documentary evidence provided.</li>
						<li>Outcome unfair in all the circumstances.</li>
					</ul>
				</Typography>
				<Typography variant="body1" paragraph>
					If these, or other reasons, apply to you, then in your grievance appeal letter you should identify the parts
					of your grievance which these reasons apply to. For example, you might say:
				</Typography>
				<Typography variant="body1" paragraph>
					<i>
						“In my grievance letter, I referred to Michael as a witness for the workplace being unsafe, but you failed
						to interview him.”
					</i>
				</Typography>
				<Typography variant="body1" paragraph>
					Remember, for the purposes of a Tribunal claim, your time limit of 3 months minus one day (from the date of
					the incident you are complaining about) will NOT stop running because you lodged a grievance or grievance
					appeal. This is a common misunderstanding amongst employees that can mean an otherwise good claim goes “out of
					time”.
				</Typography>
				<Typography variant="body1" paragraph>
					You should always protect your position by starting ACAS Early Conciliation using the online form well before
					your time limit expires. Unite the union is not responsible for starting ACAS Early Conciliation on your
					behalf. However, as a union we nearly always recommend that our members agree to enter into conciliation (and
					do not ask for ACAS to issue the Certificate straight away) because this provides additional time for us to
					see if we can help you resolve your workplace issue without further legal action.
				</Typography>
				<div className="my-5 py-5">
					<VLcard heading="Grievance appeal" theme="light">
						<div className="letter-preview__body">
							<div className="grievance-appeal-preview">PRIVATE & CONFIDENTIAL</div>
							<div className="grievance-appeal-preview">[HR manager]</div>
							<div className="grievance-appeal-preview">[Company name]</div>
							<div className="grievance-appeal-preview">By email only to: [Email]</div>
							<div className="grievance-appeal-preview">[Today]</div>
							<div className="grievance-appeal-preview">Dear [HR manager]</div>
							<div className="grievance-appeal-preview">I write to appeal the outcome of my grievance.</div>
							<div className="grievance-appeal-preview">##Witnesses not interviewed</div>
							<div className="grievance-appeal-preview">
								The following witnesses were not interviewed despite being mentioned in my grievance: [names]. You
								should now interview these witnesses as part of this appeal.
							</div>
							<div className="grievance-appeal-preview">##Documentary evidence not considered</div>
							<div className="grievance-appeal-preview">
								The following documentary evidence was not considered, despite being mentioned in my grievance: [list
								items, for example: Email of [date] from me to [name] about [topic]]. You should now consider these
								documents as part of this appeal.
							</div>
							<div className="grievance-appeal-preview">##Didn’t take account of points raised</div>
							<div className="grievance-appeal-preview">
								The grievance outcome didn’t take into account the following points raised in my grievance: [list the
								points which weren’t considered].
							</div>
							<div className="grievance-appeal-preview">##Outcome unfair in all the circumstances</div>
							<div className="grievance-appeal-preview">
								The grievance outcome was unfair in all the circumstances, especially: [list other reasons why it was
								unfair, for example that your line manager was deciding the grievance, despite the grievance being about
								them].
							</div>
							<div className="grievance-appeal-preview">
								I look forward to hearing from you at your earliest convenience.
							</div>
							<div className="grievance-appeal-preview">Yours sincerely</div>
							<div className="grievance-appeal-preview">[name]</div>
						</div>
					</VLcard>
				</div>
				<ActionBar step={2} nextHandler={handleNext} />
			</div>
		</div>
	);
};

export default GrievanceLetterExplanation;
