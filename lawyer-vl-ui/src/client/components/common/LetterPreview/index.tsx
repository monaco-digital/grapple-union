import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import AppState from '../../../../data/AppState'
import { CaseTopic, Paragraph } from '../../../../data/types'
import { getLetterParagraphs, getLetterText } from '../../../../utlis/letter'
import VLcard from '../VLcard'

const LetterPreview: FC = () => {
	const selectedParagraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected
	)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const [isCollapsedIntro, setIsCollapsedIntro] = useState(false)
	const chevronClasses = classNames('fas', {
		'fa-chevron-up': isCollapsedIntro,
		'fa-chevron-down': !isCollapsedIntro,
	})
	const handleCollapseIntro = () => {
		setIsCollapsedIntro(collapseIntro => !collapseIntro)
	}
	const { top, middle, bottom } = getLetterParagraphs(
		selectedTopics,
		selectedParagraphs
	)

	return (
		<>
			<div className="letter-preview">
				<VLcard
					heading="Draft letter"
					theme="light"
					counter={selectedParagraphs.length}
				>
					<div className="letter-preview__intro">
						{!isCollapsedIntro ? (
							<LetterPreviewParagraph paragraphs={top} />
						) : (
							<p>
								<b>Introduction</b>
							</p>
						)}
						<div className="letter-preview_intro__chevron">
							<button onClick={handleCollapseIntro}>
								<i className={chevronClasses}></i>
							</button>
						</div>
					</div>
					<div className="letter-preview__body">
						<LetterPreviewParagraph paragraphs={middle} />
					</div>
					<div className="letter-preview__signature">
						<LetterPreviewParagraph paragraphs={bottom} />
					</div>
				</VLcard>
			</div>
		</>
	)
}

const LetterPreviewParagraph: FC<{ paragraphs: Paragraph[] }> = ({
	paragraphs,
}) => {
	return (
		<>
			{paragraphs.map(({ paragraph, bold, id }) => {
				if (bold) {
					return (
						<p key={id}>
							<b>{paragraph}</b>
						</p>
					)
				}

				return <p key={id}>{paragraph}</p>
			})}
		</>
	)
}

export default LetterPreview
