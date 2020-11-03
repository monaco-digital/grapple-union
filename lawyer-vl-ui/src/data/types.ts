export interface Paragraph {
  id: string,
  paragraph: string,
  verticalHeight: number,
  topic?: string,
  topicsOneOf: string[]
  topicsAllOf: string[]
  topicsNoneOf: string[]
  bold?: boolean
}

export const ParagraphTopics = {
  EMPLOYED: 'EMPLOYED',
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
  RESIGNED: 'RESIGNED',
  SUSPENSION: 'SUSPENSION',
  MISCONDUCT: 'MISCONDUCT',
  FAILURE_TO_PROVIDE_PARTCULARS: 'FAILURE_TO_PROVIDE_PARTCULARS',
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
  ALL: 'All'
}


export const ParagraphTopicMapping = {

  EMPLOYED: 'E',
  DISMISSED: 'T',
  REDUNDANCY:  'R',
  DISCRIMINATION: 'D',
  BULLYING:  'B',
  PERFORMANCE: 'P',
  CORONAVIRUS:  'C',
  HEALTH_SAFETY: 'H',
  WHISTLEBLOWING: 'W',
  SICKNESS: 'S',
  MENTAL_HEALTH: 'Mh',
  MONEY_OWED:  'M',
  RESIGNED:  'Rd',
  SUSPENSION:  'Sn',
  MISCONDUCT:  'Mt',
  FAILURE_TO_PROVIDE_PARTICULARS: 'F',
  GRIEVANCE:  'G',
  PREGNANCY: 'DP',
  MATERNITY:  'DM',
  SEX: 'DS',
  SEXUALITY: 'DSy',
  RACE: 'DR',
  RELIGION_BELIEF: 'DRn',
  AGE: 'DA',
  DISABILITY: 'DD',
  MARRIAGE_CIVIL_PARTNERSHIP: 'DMe',
  GENDER_REASSIGNMENT: 'DG',
  POLITICAL_PHILOSOPHICAL:  'DPI',
  ALL: 'All'

}
export const TopicAlgebraOperators = {
  AND: '+',
  OR: ',',
  OPEN_ENCLOSURE: '(',
  CLOSE_ENCLOSURE: ')',
  NOT: '!'
}
