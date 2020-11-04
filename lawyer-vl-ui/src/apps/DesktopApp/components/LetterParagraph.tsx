//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Paragraph } from './Paragraph'
import {
	Box,
	Grid,
	Button,
	AccordionDetails,
	Accordion,
	AccordionSummary,
	Typography,
	TextField,
	Tab,
	Tabs,
	Paper,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { RSA_PSS_SALTLEN_AUTO } from 'constants'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { FilterButton } from './FilterButton'
import { ParagraphTopics } from '../../../data/types'
import PhoneIcon from '@material-ui/icons/Phone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import {
	convertParagraphsForEditor,
	getEData,
} from './editor/convertParagraphs'
import { SimpleEditor } from './editor/SimpleEditor'
import AppState from '../../../data/AppState'
import { LetterTop } from './letter/LetterTop'
import { LetterBottom } from './letter/LetterBottom'
import { CustomParagraphs } from '../../../data/static'

interface Props {
	paragraphs: Paragraph[]
}

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (
	source: any,
	destination: any,
	droppableSource: any,
	droppableDestination: any
) => {
	const sourceClone = Array.from(source)
	const destClone = Array.from(destination)
	const [removed] = sourceClone.splice(droppableSource.index, 1)

	destClone.splice(droppableDestination.index, 0, removed)

	const result = {} as any
	result[droppableSource.droppableId] = sourceClone
	result[droppableDestination.droppableId] = destClone

	return result
}

interface TabPanelProps {
	children?: React.ReactNode
	index: any
	value: any
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	)
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		letterContainer: {
			padding: '10px',
			width: '94%',
			overflowY: 'scroll',
			background: '#eee',
			height: '85vh',
		},
		letterStyle: {
			border: '1px solid gray',
			margin: 'auto',
			padding: '10px',
			borderRadius: '5px',
			background: 'white',
			width: '94%',
			minHeight: window.innerHeight - 250,
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightBold,
		},
		button: {
			margin: 2,
			width: '10rem',
			color: 'black',
			background: theme.palette.secondary.light,
		},
	})
)

const grid = 8

const getItemStyle = (
	side: 'pList' | 'letter',
	isDragging,
	draggableStyle
) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: side === 'pList' ? grid * 2 : grid * 1,
	margin: `0 0 ${side === 'pList' ? grid : grid / 2}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightblue' : 'white',

	// styles we need to apply on draggables
	...draggableStyle,
})

const getListStyle = isDraggingOver => ({
	borderRight: '1px solid gray',
	background: isDraggingOver ? '#bbb' : '#aaa',
	padding: '30px',
	width: '90%',
	height: '85vh',
	overflowY: 'scroll',
})

const getParagraphContentStyle = () => ({
	margin: 'auto',
	minHeight: '100%',
})

const getLetterContentStyle = isDraggingOver => ({
	padding: '4px',
	backgroundColor: isDraggingOver ? '#ccc' : '#efefef',
	minHeight: 250,
	paddingBottom: '40px',
})

export const LetterParagraph: React.FC<Props> = (props: Props) => {
	const classes = useStyles()

	const { paragraphs } = props
	const [paragraphOptions, setParagraphOptions] = useState(paragraphs ?? [])
	const [selectedParagraphs, setSelectedParagraphs] = useState([])
	const [editorData, setEditorData] = useState<any>([])
	const [tabValue, setTabValue] = React.useState(0)

	//top paragraphs

	//bottom paragraphs

	const handleChange = (event, newValue) => {
		setTabValue(newValue)
	}

	const onSelectedParagraphChange = (paragraphs: Paragraphp[]): void => {
		//add paragraphs to the top and bottom of the letter
		const combinedParagraphs = [
			...CustomParagraphs.top,
			...paragraphs,
			...CustomParagraphs.bottom,
		]
		const eParagraphs = convertParagraphsForEditor(combinedParagraphs)
		const eData = getEData(eParagraphs)
		setEditorData(eData)
	}

	useEffect(() => {
		const selectedParagraphsIds = selectedParagraphs.map(
			paragraph => paragraph.id
		)
		//filter out already selcted paragraphs
		const uParagraphs = paragraphs.filter(
			({ id }) => !selectedParagraphsIds.includes(id)
		)
		setParagraphOptions(uParagraphs)
	}, [paragraphs])

	useEffect(() => {
		console.log(
			'Effect to call on select paragraphs change has been caleed with: ',
			selectedParagraphs
		)
		onSelectedParagraphChange(selectedParagraphs)
	}, [selectedParagraphs])

	console.log('the paragraphs in Letter paragraphs are: ', paragraphOptions)

	const copyParasToText = () => {
		const x = selectedParagraphs.map(item => item.paragraph).join('\n\n')
		navigator.clipboard.writeText(x)
	}

	const getList = id => {
		if (id === 'paragraphList') {
			return paragraphOptions
		} else if (id === 'letterList') {
			return selectedParagraphs
		}
	}

	const onDragEnd = result => {
		const { source, destination } = result
		// dropped outside the list
		if (!destination) {
			return
		}
		if (source.droppableId === destination.droppableId) {
			const reordered = reorder(
				getList(source.droppableId),
				source.index,
				destination.index
			)

			if (source.droppableId === 'letterList') {
				setSelectedParagraphs(reordered)
			}
		} else {
			const updatedLists = move(
				getList(source.droppableId),
				getList(destination.droppableId),
				source,
				destination
			)
			setParagraphOptions(updatedLists.paragraphList)
			setSelectedParagraphs(updatedLists.letterList)
		}
	}

	return (
		<>
			<Paper>
				<Tabs
					variant="fullWidth"
					indicatorColor="secondary"
					textColor="secondary"
					aria-label="icon label tabs example"
					value={tabValue}
					onChange={handleChange}
				>
					<Tab label="Paragraph Select" wrapped={false} />
					<Tab label="Editor" wrapped={false} />
				</Tabs>
				<TabPanel value={tabValue} index={0}>
					<DragDropContext onDragEnd={onDragEnd}>
						<Grid container spacing={0} xs={12}>
							<Droppable droppableId="paragraphList">
								{(provided, snapshot) => (
									<Grid
										item
										xs={6}
										style={getListStyle(snapshot.isDraggingOver)}
									>
										<div
											style={getParagraphContentStyle()}
											ref={provided.innerRef}
										>
											{paragraphOptions?.map((item, index) => {
												return (
													<Draggable
														key={item.id}
														draggableId={item.id}
														index={index}
													>
														{(provided, snapshot) => (
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={getItemStyle(
																	'pList',
																	snapshot.isDragging,
																	provided.draggableProps.style
																)}
															>
																<Paragraph
																	paragraph={item.paragraph}
																	verticalHeight={item.verticalHeight}
																	topic={item.topic}
																/>
															</div>
														)}
													</Draggable>
												)
											})}
											{provided.placeholder}
										</div>
									</Grid>
								)}
							</Droppable>
							<Grid item xs={6} className={classes.letterContainer}>
								<Box className={classes.letterStyle}>
									<div>
										<LetterTop />
									</div>
									<Droppable droppableId="letterList">
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												style={getLetterContentStyle(snapshot.isDraggingOver)}
											>
												{selectedParagraphs.length === 0 &&
													`[Note to user - drag and drop paragraphs here]`}
												{selectedParagraphs?.map((item, index) => (
													<Draggable
														key={item.id}
														draggableId={item.id}
														index={index}
													>
														{(provided, snapshot) => (
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={getItemStyle(
																	'letter',
																	snapshot.isDragging,
																	provided.draggableProps.style
																)}
															>
																<Paragraph
																	paragraph={item.paragraph}
																	verticalHeight={item.verticalHeight}
																	topic={item.topic}
																/>
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
									<div>
										<br />
										<LetterBottom />
									</div>
								</Box>
								<Box style={{ marginTop: '10px' }}>
									<Button
										variant="contained"
										color="secondary"
										className={classes.button}
										onClick={() => {
											copyParasToText()
										}}
									>
										Copy text
									</Button>
								</Box>
							</Grid>
						</Grid>
					</DragDropContext>
				</TabPanel>
				<TabPanel value={tabValue} index={1}>
					<SimpleEditor data={editorData} />
				</TabPanel>
			</Paper>
		</>
	)
}
