import React, { FC, useEffect } from 'react'
import Footer from '../components/Footer'
import LetterPreview from '../components/LetterPreview'
import ParagraphsPreview from '../components/common/ParagraphsPreview'
import Topics from '../components/common/Topics'
import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import modes from '../state/modes'
import ParagraphsEditMode from '../components/ParagraphsEditMode'
import { setView } from '../../data/questionDataSlice'
import { updateAllParagraphs } from '../../data/paragraphsDataSlice'
import { getData } from '../../api/vlmasersheet'

const Main: FC = () => {
	const mode = useSelector<any, any>(state => state.questions.mode)
	const dispatch = useDispatch()

	useEffect(() => {
		//TODO - fix this
		dispatch(setView(undefined))
		;(async () => {
			const paragraphs = await getData()
			dispatch(updateAllParagraphs(paragraphs))
		})()
	}, [])

	return (
		<main className="main">
			<Header />
			<div className="screen container">
				{mode === modes.TOPICS && <Topics />}
				{mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
				{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
				{mode === modes.LETTER_PREVIEW && <LetterPreview />}
			</div>
			<Footer />
		</main>
	)
}

export default Main