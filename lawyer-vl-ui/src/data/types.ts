export interface Paragraph {
	id: string
	paragraph: string
	verticalHeight: number
	topic?: string
	topicsOneOf: string[]
	topicsAllOf: string[]
	topicsNoneOf: string[]
	bold?: boolean
}

export const ParagraphTopics = {
	EMPLOYED: 'EMPLOYED',
	EQUAL_PAY: 'EQUAL_PAY',
	DISMISSED: 'DISMISSED',
	REDUNDANCY: 'REDUNDANCY',
	DISCRIMINATION: 'DISCRIMINATION',
	BULLYING: 'BULLYING',
	PERFORMANCE: 'PERFORMANCE',
	CORONAVIRUS: 'CORONAVIRUS',
	HEALTH_SAFETY: 'HEALTH_SAFETY',
	WHISTLEBLOWING: 'WHISTLEBLOWING',
	SICKNESS: 'SICKNESS',
	MENTAL_HEALTH: 'MENTAL_HEALTH',
	MONEY_OWED: 'MONEY_OWED',
	STAY_EMPLOYED: 'STAY_EMPLOYED',
	RESIGNED: 'RESIGNED',
	SUSPENSION: 'SUSPENSION',
	MISCONDUCT: 'MISCONDUCT',
	FAILURE_TO_PROVIDE_PARTICULARS: 'FAILURE_TO_PROVIDE_PARTICULARS',
	GRIEVANCE: 'GRIEVANCE',
	PREGNANCY: 'PREGNANCY',
	MATERNITY: 'MATERNITY',
	SEX: 'SEX',
	SEXUALITY: 'SEXUALITY',
	RACE: 'RACE',
	RELIGION_BELIEF: 'RELIGION_BELIEF',
	AGE: 'AGE',
	DISABILITY: 'DISABILITY',
	MARRIAGE_CIVIL_PARTNERSHIP: 'MARRIAGE_CIVIL_PARTNERSHIP',
	GENDER_REASSIGNMENT: 'GENDER_REASSIGNMENT',
	POLITICAL_PHILOSOPHICAL: 'POLITICAL_PHILOSOPHICAL',
	MENTAL_HEALTH_DISCRIMINATION: 'MENTAL_HEALTH_DISCRIMINATION',
	VEGAN: 'VEGAN',
	ALL: 'ALL',
	LESS_THAN_2_YEARS: 'LESS_THAN_2_YEARS',
}

export type Topic =
	| 'E'
	| 'EP'
	| 'T'
	| 'R'
	| 'D'
	| 'B'
	| 'P'
	| 'C'
	| 'H'
	| 'W'
	| 'S'
	| 'S1'
	| 'Ml'
	| 'M'
	| 'Rd'
	| 'Sn'
	| 'Mt'
	| 'F'
	| 'G'
	| 'DP'
	| 'DM'
	| 'DS'
	| 'DSy'
	| 'DR'
	| 'DRn'
	| 'DA'
	| 'DD'
	| 'DMe'
	| 'DG'
	| 'DPI'
	| 'DMl'
	| 'DV'
	| '2y'

export interface CaseTopic {
	id: string
	name: string
	text: string
	parentTopics: string[]
	subtopics: string[]
	type: string
}

export const Topics: CaseTopic[] = [
	{
		id: 'E',
		name: 'EMPLOYED',
		text: 'Employed',
		parentTopics: [],
		subtopics: [],
		type: 'employment_situation',
	},
	{
		id: 'EP',
		name: 'EQUAL_PAY',
		text: 'Equal pay',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'T',
		name: 'DISMISSED',
		text: 'Dismissed',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'R',
		name: 'REDUNDANCY',
		text: 'Redundancy',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'D',
		name: 'DISCRIMINATION',
		text: 'Discrimination',
		parentTopics: [],
		subtopics: [
			'DP',
			'DM',
			'DS',
			'DSy',
			'DR',
			'DRn',
			'DA',
			'DD',
			'DMe',
			'DG',
			'DPI',
			'DMl',
			'DV',
		],
		type: 'case',
	},
	{
		id: 'B',
		name: 'BULLYING',
		text: 'Bullying',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'P',
		name: 'PERFORMANCE',
		text: 'Performance',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'C',
		name: 'CORONAVIRUS',
		text: 'Coronavirus',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'H',
		name: 'HEALTH_SAFETY',
		text: 'Health & Safety',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'W',
		name: 'WHISTLEBLOWING',
		text: 'Whistleblowing',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'S',
		name: 'SICKNESS',
		text: 'Sickness',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'S1',
		name: 'STAY_EMPLOYED',
		text: 'Stay employed',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'M1',
		name: 'MENTAL_HEALTH',
		text: 'Mental health',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'M',
		name: 'MONEY_OWED',
		text: 'Money owed',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'Rd',
		name: 'RESIGNED',
		text: 'Resigned',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'Sn',
		name: 'SUSPENSION',
		text: 'Suspension',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'Mt',
		name: 'MISCONDUCT',
		text: 'Misconduct',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'F',
		name: 'FAILURE_TO_PROVIDE_PARTICULARS',
		text: 'Failure to provide particulars',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'G',
		name: 'GRIEVANCE',
		text: 'Grievance',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: 'DP',
		name: 'PREGNANCY',
		text: 'Pregnancy',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DM',
		name: 'MATERNITY',
		text: 'Maternity',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DS',
		name: 'SEX',
		text: 'Sex',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DSy',
		name: 'SEXUALITY',
		text: 'Sexuality',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DR',
		name: 'RACE',
		text: 'Race',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DRn',
		name: 'RELIGION_BELIEF',
		text: 'Religion / belief',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DA',
		name: 'AGE',
		text: 'Age',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DD',
		name: 'DISABILITY',
		text: 'Disability',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DMe',
		name: 'MARRIAGE_CIVIL_PARTNERSHIP',
		text: 'Marriage / Civil partnership',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DG',
		name: 'GENDER_REASSIGNMENT',
		text: 'Gender reassignment',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DPI',
		name: 'POLITICAL_PHILOSOPHICAL',
		text: 'Political / philosophical',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DMl',
		name: 'MENTAL_HEALTH_DISCRIMINATION',
		text: 'Mental health discrimination',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'DV',
		name: 'VEGAN',
		text: 'Vegan',
		parentTopics: [],
		subtopics: [],
		type: 'subcase',
	},
	{
		id: 'All',
		name: 'ALL',
		text: 'All',
		parentTopics: [],
		subtopics: [],
		type: 'case',
	},
	{
		id: '2y',
		name: 'LESS_THAN_2_YEARS',
		text: 'Less than 2 years',
		parentTopics: [],
		subtopics: [],
		type: 'employment_situation',
	},
]

export const ParagraphTopicMapping = {
	EMPLOYED: 'E',
	EQUAL_PAY: 'EP',
	DISMISSED: 'T',
	REDUNDANCY: 'R',
	DISCRIMINATION: 'D',
	BULLYING: 'B',
	PERFORMANCE: 'P',
	CORONAVIRUS: 'C',
	HEALTH_SAFETY: 'H',
	WHISTLEBLOWING: 'W',
	SICKNESS: 'S',
	STAY_EMPLOYED: 'S1',
	MENTAL_HEALTH: 'Ml',
	MONEY_OWED: 'M',
	RESIGNED: 'Rd',
	SUSPENSION: 'Sn',
	MISCONDUCT: 'Mt',
	FAILURE_TO_PROVIDE_PARTICULARS: 'F',
	GRIEVANCE: 'G',
	PREGNANCY: 'DP',
	MATERNITY: 'DM',
	SEX: 'DS',
	SEXUALITY: 'DSy',
	RACE: 'DR',
	RELIGION_BELIEF: 'DRn',
	AGE: 'DA',
	DISABILITY: 'DD',
	MARRIAGE_CIVIL_PARTNERSHIP: 'DMe',
	GENDER_REASSIGNMENT: 'DG',
	POLITICAL_PHILOSOPHICAL: 'DPI',
	MENTAL_HEALTH_DISCRIMINATION: 'DMl',
	VEGAN: 'DV',
	ALL: 'All',
	LESS_THAN_2_YEARS: '2y',
}
export const TopicAlgebraOperators = {
	AND: '+',
	OR: ',',
	OPEN_ENCLOSURE: '(',
	CLOSE_ENCLOSURE: ')',
	NOT: '!',
}

export const DSubTopics = [
	ParagraphTopicMapping.PREGNANCY,
	ParagraphTopicMapping.MATERNITY,
	ParagraphTopicMapping.SEX,
	ParagraphTopicMapping.SEXUALITY,
	ParagraphTopicMapping.RACE,
	ParagraphTopicMapping.RELIGION_BELIEF,
	ParagraphTopicMapping.AGE,
	ParagraphTopicMapping.DISABILITY,
	ParagraphTopicMapping.MARRIAGE_CIVIL_PARTNERSHIP,
	ParagraphTopicMapping.GENDER_REASSIGNMENT,
	ParagraphTopicMapping.POLITICAL_PHILOSOPHICAL,
	ParagraphTopicMapping.MENTAL_HEALTH_DISCRIMINATION,
	ParagraphTopicMapping.VEGAN,
]
