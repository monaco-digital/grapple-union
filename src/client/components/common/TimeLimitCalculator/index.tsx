import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import ActionBar from '../ActionBar';

type FormInputs = {
	date: string;
};

const TimeLimitCalculator: React.FC = () => {
	const history = useHistory();
	const { register, handleSubmit } = useForm<FormInputs>();
	const [selectedDate, setSelectedDate] = useState('');
	const handleNext = () => {
		history.push('/grievance-explanation');
	};

	function addThreeMonthsToDate(inputDate) {
		// Create a new Date object based on the input date
		const date = new Date(inputDate);

		// Get the current day of the month
		const day = date.getDate();

		// Add 3 months to the date
		date.setMonth(date.getMonth() + 3);

		// Adjust the date to the last day of the month if necessary
		if (date.getDate() < day) {
			date.setDate(0);
		}

		date.setDate(date.getDate() - 1); // Subtract 1 day from the final date

		return date;
	}

	const onSubmit = ({ date }) => {
		const dates = addThreeMonthsToDate(date);
		const mnth = `0${dates.getMonth() + 1}`.slice(-2);
		const day = `0${dates.getDate()}`.slice(-2);
		setSelectedDate([day, mnth, dates.getFullYear()].join('-'));
	};
	const reset = () => {
		setSelectedDate('');
	};

	return (
		<div className="time-limit-calculator">
			<div className="letter-preview">
				<h2>Time limit calculator</h2>
				<p>So that you don’t miss an employment tribunal claim opportunity, please enter the Date of first incident.</p>
				<div className="select-date">
					<p>Date of first incident:</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							id="date"
							name="date"
							label="Date"
							type="date"
							autoComplete="name"
							variant="outlined"
							inputRef={register({ required: 'Please enter a date' })}
							InputLabelProps={{
								shrink: true,
							}}
							defaultValue={selectedDate}
						/>
						<div className="field-action">
							<Button onClick={reset}>Cancel</Button>
							<Button type="submit">OK</Button>
						</div>
					</form>
				</div>
				<div className="selected-date">
					<p>
						Your time limit (when you need to send off your{' '}
						<a href="https://www.acas.org.uk/notify/start" target="_blank" rel="noreferrer">
							ACAS certificate
						</a>
						):
					</p>
					<p className="selected-date-display">{selectedDate}</p>
				</div>
				<div className="footer">
					<p>
						<b>Please note:</b> your time limit does not pause for any reason - don’t miss it!
					</p>
				</div>
			</div>
			<div className="letter-preview__action-buttons">
				<ActionBar step={0} nextHandler={handleNext} />
			</div>
		</div>
	);
};

export default TimeLimitCalculator;
