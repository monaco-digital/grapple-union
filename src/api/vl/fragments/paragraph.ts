import { gql } from '@apollo/client';

export const paragraphComponent = gql`
	fragment FParagraphComponent on ParagraphComponent {
		id
		type
	}
`;

export const staticText = gql`
	fragment FStaticText on StaticText {
		id
		type
		textFirstPerson
	}
`;

export const bulletPoint = gql`
	fragment FBulletPoints on BulletPoints {
		id
		type
		bulletPoints {
			placeholder
			required
			minLength
			maxLength
		}
	}
`;

export const paragraph = gql`
	fragment FParagraph on Paragraph {
		id
		summary
		verticalHeight
		topic
		status
		topicsOneOf
		topicsAllOf
		topicsNoneOf
		isAutomaticallyIncluded
		paragraphComponents {
			... on StaticText {
				...FStaticText
			}
			... on BulletPoints {
				...FBulletPoints
			}
		}
	}
	${staticText}
	${bulletPoint}
`;
