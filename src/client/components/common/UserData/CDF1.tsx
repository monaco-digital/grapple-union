import React, { useEffect } from 'react';
import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import AppState from '../../../../data/AppState';
import { createCDF } from '../../../../api/general';
import { UserData } from '../../../../types/UserData';
import logo1 from '../../../assets/img/grapple-logo.svg';

interface Props {
	previewType?: string;
}

export const cdfValues = {
	salary: {
		ZERO_TO_THIRTYK: '£0 - £30,000',
		THIRTYK_TO_FIFTYK: '£30,000 - £50,000',
		FIFTYK_TO_HUNDREDK: '£50,000 - £100,000',
		HUNDREDK_PLUS: '£100,000+',
	},
	stillEmployed: {
		YES: 'Yes',
		NO: 'No',
	},
	yearsEmployed: {
		LESS_THAN_2: 'Less than 2 years',
		MORE_THAN_2: 'More than 2 years',
	},
};

export const CDF1: React.FC<Props> = ({ previewType }: Props) => {
	const history = useHistory();

	const matchDefaultFlow = useRouteMatch('/cdf/form');
	const matchEndToEndFlow = useRouteMatch('/step/cdf/form');

	const userData = useSelector<AppState, UserData>(state => state.session.userData);
	const {
		register,
		handleSubmit,
		errors,
		control,
		setValue,
		formState: { isSubmitting },
	} = useForm();

	useEffect(() => {
		const { name, recipient, stillEmployed, yearsEmployed, description } = userData;
		if (name) {
			setValue('name', name, { shouldValidate: true });
		}
		if (recipient) {
			setValue('email', recipient, { shouldValidate: true });
		}
		if (stillEmployed) {
			setValue('stillEmployed', stillEmployed, { shouldValidate: true });
		}
		if (yearsEmployed) {
			setValue('yearsEmployed', yearsEmployed, { shouldValidate: true });
		}
		if (description) {
			setValue('description', description, { shouldValidate: true });
		}
	}, [setValue, userData]);

	const onSubmit = async (data): Promise<void> => {
		const {
			name,
			email,
			description,
			jobTitle: job,
			phone,
			salary,
			settlementAgreement,
			stillEmployed,
			yearsEmployed,
		} = data;
		const { templateId, topicsList } = userData;

		const uData = {
			templateId,
			job,
			topicsList,
			description,
			phone,
			salary,
			'settlement-agreement': settlementAgreement,
			'still-employed': stillEmployed,
			'years-employed': yearsEmployed,
			name: name || userData.name,
			recipient: email || userData.recipient,
		};

		await createCDF(uData);
		if (matchDefaultFlow) {
			history.push('/cdf/complete');
		} else if (matchEndToEndFlow) {
			history.push('/step/cdf/complete');
		} else {
			history.replace(`/preview/${previewType}/checkout/cdf1/complete`);
		}
	};

	return (
		<>
			<div className="flex flex-col justify-center" style={{ height: 'calc(50vh)' }}>
				<Typography variant="h4" style={{ marginTop: '30px', marginBottom: '22px' }}>
					Get in touch
				</Typography>
				<p>
					If you’ve taken the previous steps to advance your case and you have received a settlement offer, please feel
					free to contact us providing your phone number and a member of our team will get in touch to arrange a free
					consultation with our specialist employment lawyers, Monaco Solicitors.
				</p>
				<a
					className="button button--secondary button--rounded text-sm inline-block"
					style={{ marginTop: '30px', width: 'max-content' }}
					target="_blank"
					href="mailto:contact@grapple.uk"
					rel="noreferrer"
				>
					Email Us
				</a>
			</div>
			<form id="cdf1-form" noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3 hidden">
				<Box alignSelf="center">
					<img alt="grapple" src={logo1} width="200px" />
				</Box>
				<Typography className="text-center" variant="h4" style={{ marginTop: '30px' }}>
					Request a callback about your case
				</Typography>
				<p className="self-center text-center">
					Some optional information about you case that will help us provide a better service
				</p>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							name="email"
							label="Email"
							required
							inputRef={register({ required: 'Email is required' })}
							disabled={isSubmitting}
							fullWidth
							error={Boolean(errors.email)}
							helperText={errors.email?.message}
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name="name"
							label="Name"
							required
							inputRef={register({ required: 'Name is required' })}
							disabled={isSubmitting}
							error={Boolean(errors.name)}
							helperText={errors.name?.message}
							fullWidth
							variant="filled"
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							name="description"
							label="Brief description of case"
							required
							rows={4}
							inputRef={register({ required: 'Description is required' })}
							error={Boolean(errors.description)}
							helperText={errors.description?.message}
							disabled={isSubmitting}
							fullWidth
							multiline
							variant="filled"
							data-testid="description"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name="jobTitle"
							label="Job Title"
							required
							inputRef={register({ required: 'Job Title is required' })}
							error={Boolean(errors.jobTitle)}
							helperText={errors.jobTitle?.message}
							disabled={isSubmitting}
							fullWidth
							variant="filled"
							data-testid="jobTitle"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name="phone"
							label="Phone"
							required
							inputRef={register({ required: 'Phone is required' })}
							error={Boolean(errors.phone)}
							helperText={errors.phone?.message}
							disabled={isSubmitting}
							fullWidth
							variant="filled"
							data-testid="phone"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<FormControl fullWidth variant="filled" required error={Boolean(errors.yearsEmployed)}>
							<InputLabel htmlFor="years-employed-select">Years Employed</InputLabel>
							<Controller
								name="yearsEmployed"
								control={control}
								rules={{ required: 'Years employed is required' }}
								defaultValue=""
								as={
									<Select id="years-employed-select" native required disabled={isSubmitting}>
										<option aria-label="None" value="" />
										<option value={cdfValues.yearsEmployed.LESS_THAN_2}>Less than 2 years</option>
										<option value={cdfValues.yearsEmployed.MORE_THAN_2}>More than 2 years</option>
									</Select>
								}
							/>
							{Boolean(errors.yearsEmployed) && <FormHelperText>{errors.yearsEmployed?.message}</FormHelperText>}
						</FormControl>
					</Grid>
					<Grid item xs={12} md={6}>
						<FormControl fullWidth variant="filled" required error={Boolean(errors.stillEmployed)}>
							<InputLabel htmlFor="still-employed-select">Still employed</InputLabel>
							<Controller
								name="stillEmployed"
								control={control}
								rules={{ required: 'This is a required field' }}
								defaultValue=""
								as={
									<Select id="still-employed-select" name="stillEmployed" ref={register} native disabled={isSubmitting}>
										<option aria-label="None" value="" />
										<option value={cdfValues.stillEmployed.YES}>Yes</option>
										<option value={cdfValues.stillEmployed.NO}>No</option>
									</Select>
								}
							/>
							{Boolean(errors.stillEmployed) && <FormHelperText>{errors.stillEmployed?.message}</FormHelperText>}
						</FormControl>
					</Grid>
					<Grid item xs={12} md={6}>
						<FormControl fullWidth variant="filled" required error={Boolean(errors.salary)}>
							<InputLabel htmlFor="salary-select">Salary</InputLabel>
							<Controller
								control={control}
								name="salary"
								rules={{ required: 'Salary is required' }}
								defaultValue=""
								as={
									<Select id="salary-select" native disabled={isSubmitting}>
										<option aria-label="None" value="" />
										<option value={cdfValues.salary.ZERO_TO_THIRTYK}>£0 - £30,000</option>
										<option value={cdfValues.salary.THIRTYK_TO_FIFTYK}>£30,000 - £50,000</option>
										<option value={cdfValues.salary.FIFTYK_TO_HUNDREDK}>£50,000 - £100,000</option>
										<option value={cdfValues.salary.HUNDREDK_PLUS}>£100,000+</option>
									</Select>
								}
							/>
							{Boolean(errors.salary) && <FormHelperText>{errors.salary?.message}</FormHelperText>}
						</FormControl>
					</Grid>
					<Grid item xs={12} md={6}>
						<FormControl fullWidth variant="filled" required error={Boolean(errors.settlementAgreement)}>
							<InputLabel htmlFor="settlement-agreement-select">Do you have a settlement agreement ?</InputLabel>
							<Controller
								name="settlementAgreement"
								control={control}
								rules={{ required: 'This field is required' }}
								defaultValue=""
								as={
									<Select id="settlement-agreement-select" native disabled={isSubmitting}>
										<option aria-label="None" value="" />
										<option value="Yes">Yes</option>
										<option value="No">No</option>
									</Select>
								}
							/>
							{Boolean(errors.settlementAgreement) && (
								<FormHelperText>{errors.settlementAgreement?.message}</FormHelperText>
							)}
						</FormControl>
					</Grid>
					<Grid item xs={12} md={12}>
						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={isSubmitting}
							type="submit"
							variant="contained"
							size="large"
							color="secondary"
							fullWidth
						>
							<>
								{isSubmitting && <CircularProgress size={30} thickness={5} style={{ color: 'white' }} />}
								{!isSubmitting && <span>Request Callback</span>}
							</>
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

CDF1.defaultProps = {
	previewType: '',
};
