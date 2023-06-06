import { Paragraph, TemplateParagraph } from 'api/vl/models';
import { gql } from '@apollo/client';
import { client } from './graphql';
import { fragments } from './fragments';

const GET_ALL_PARAGRAPHS = gql`
	query {
		getAllParagraphs {
			...FParagraph
		}
	}
	${fragments.paragraph}
`;

interface ParagraphData {
	getAllParagraphs: Paragraph[];
}

export const getAllParagraphs = async (): Promise<TemplateParagraph[]> => {
	try {
		const result = await client.query<ParagraphData>({
			query: GET_ALL_PARAGRAPHS,
		});
		const { data, errors } = result;
		if (!data) {
			const errorString = errors?.join('\n') ?? 'did not get data from server';
			throw new Error(`The error is: ${errorString}`);
		}
		const { getAllParagraphs: allParagraphs } = data;
		/* TODO - Fix the endpoint so that it returns template Paragraphs? */
		return allParagraphs.map(paragraph => ({
			id: paragraph.id,
			type: 'Paragraph',
			version: 1,
			paragraph,
		}));
	} catch (e) {
		// ignore
	}
	return null;
};
