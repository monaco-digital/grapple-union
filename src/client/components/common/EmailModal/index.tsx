import React, { FC, useState, useEffect } from 'react';
import { TextField, Button, InputLabel, FormControl, Select, FormHelperText, Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CaseTopic, Advice } from 'api/vl/models';
import { Controller, useForm } from 'react-hook-form';
import AppState from '../../../../data/AppState';
import { SessionDocument } from '../../../../types/SessionDocument';
import { getDocumentText } from '../../../../utils/renderDocument';
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs';
import { updateUserData } from '../../../../data/sessionDataSlice';
import logo1 from '../../../assets/img/grapple-logo.svg';
import { submitDetails } from '../../../../api/general';

interface Data {
	adviceText: string;
	letterText: string;
	topicsList: string;
	templateId: string;
}

interface Props {
	previewType?: string;
}

const getLetterText = (sessionDocument: SessionDocument) => {
	const letterText = sessionDocument?.document && getDocumentText(sessionDocument.document);
	return letterText;
};

const getTopicsList = (selectedTopics: CaseTopic[]) => {
	const topicsList = selectedTopics.map(t => t.text).join(', ');
	return topicsList;
};

const getAdviceText = (adviceParagraphs: Advice[]) => {
	const adviceText = adviceParagraphs.map(ap => ap.text).join('\n\n\n');
	return adviceText;
};

const EmailModal: FC<Props> = ({ previewType }: Props) => {
	const history = useHistory();
	const {
		register,
		handleSubmit,
		errors,
		control,
		watch,
		formState: { isSubmitting },
	} = useForm();
	const watchContact = watch('contact', '');

	const dispatch = useDispatch();
	const [data, setData] = useState<Data>({
		adviceText: '',
		letterText: '',
		topicsList: '',
		templateId: '',
	});

	const sessionDocument = useSelector<AppState, SessionDocument>(state => {
		return state.session.sessionDocuments[state.session.currentSessionDocument];
	});
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const [adviceParagraphs, setAdviceParagraphs] = useState<Advice[]>([]);

	useEffect(() => {
		const updateAdviceParagraphs = async () => {
			const suggestAdviceParagraphs = await getSuggestedAdviceParagraphs(selectedTopics);
			setAdviceParagraphs(suggestAdviceParagraphs);
		};
		updateAdviceParagraphs();
	}, [selectedTopics]);

	useEffect(() => {
		data.adviceText = getAdviceText(adviceParagraphs);
		data.letterText = getLetterText(sessionDocument);
		data.topicsList = getTopicsList(selectedTopics);
		switch (previewType) {
			case '_ADV':
				data.templateId = 'AD1';
				break;
			case '_WP':
				data.templateId = 'LAC';
				break;
			default:
				break;
		}

		setData(data);
	}, [sessionDocument, selectedTopics, adviceParagraphs, data, previewType]);

	const onSubmit = ({ name, email, contact }) => {
		const contactMe = contact === 'true';
		dispatch(
			updateUserData({
				...data,
				contactMe,
				name,
				recipient: email,
			}),
		);
		if (contactMe) {
			history.replace(`/preview/${previewType}/checkout/cdf1`);
		} else {
			history.replace(`/preview/${previewType}/checkout/email/complete`);
		}
		const submissionData = {
			...data,
			contactMe: false,
			name,
			recipient: email,
			type: 'grapple',
		};
		submitDetails(submissionData);
	};

	return (
		<form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
			<div className="emailModal space-y-5 flex flex-col">
				<Box alignSelf="center">
					<img alt="Monaco Solicitors" src={logo1} width="200px" />
				</Box>

				<Typography className="text-center" variant="h4">
					Send this to me
				</Typography>
				<p className="self-center text-center">
					Enter your name and email address below and we&apos;ll send this to you for free
				</p>

				<TextField
					id="name"
					name="name"
					label="Name"
					autoComplete="name"
					variant="filled"
					fullWidth
					error={Boolean(errors.name)}
					helperText={errors.name?.message}
					disabled={isSubmitting}
					inputRef={register({ required: 'Please enter your name' })}
				/>
				<TextField
					id="email"
					name="email"
					label="Your email"
					autoComplete="email"
					variant="filled"
					fullWidth
					error={Boolean(errors.email)}
					helperText={errors.email?.message}
					disabled={isSubmitting}
					inputRef={register({ required: 'Please enter your email address' })}
				/>

				{/* <FormControl fullWidth error={Boolean(errors.contact)} variant="filled">
					<InputLabel variant="filled" htmlFor="contact">
						Request a callback
					</InputLabel>
					<Controller
						name="contact"
						control={control}
						rules={{ required: 'This field is required' }}
						as={
							<Select id="contact" native disabled={isSubmitting}>
								<option aria-label="None" value="" />
								<option value="true">Yes</option>
								<option value="false">No</option>
							</Select>
						}
					/>

					{Boolean(errors.contact) && <FormHelperText>{errors.contact?.message}</FormHelperText>}
				</FormControl> */}

				<div className="emailModal__section-end">
					<Button variant="contained" size="large" color="secondary" type="submit" disabled={isSubmitting}>
						{watchContact === 'true' ? 'Next' : 'Send now'}
					</Button>
				</div>

				<input type="hidden" value={data.letterText} name="letterText" />
				<input type="hidden" value={data.adviceText} name="adviceText" />
			</div>
		</form>
	);
};

EmailModal.defaultProps = {
	previewType: '',
};

export default EmailModal;
