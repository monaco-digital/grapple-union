import { Template, TemplateSection, TemplateParagraph, StaticText } from 'api/vl/models';
import { nanoid } from 'nanoid';

export const adviceLetter: Template = {
	id: nanoid(),
	version: 1,
	meta: {
		created: 123123,
		updated: 234234,
	},
	templateComponents: [
		{
			id: nanoid(),
			version: 1,
			type: 'TemplateContentSection',
			templateComponents: [
				{
					id: nanoid(),
					type: 'Paragraph',
					version: 1,
					paragraph: {
						id: nanoid(),
						type: 'Paragraph',
						verticalHeight: 0,
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: `Advice

								If you do have a case, it’s important to gather evidence as your employer will likely want to deny wrongdoing. The stronger your case, the more likely the employer is to settle it with you (although there are no guarantees and different employers act differently). This is why we refer to having a claim throughout the advice - it’s always in the shadow of your negotiations with your employer.
								`,
							} as StaticText,
						],
					},
				},
				{
					id: nanoid(),
					type: 'Paragraph',
					version: 1,
					paragraph: {
						id: nanoid(),
						verticalHeight: 0,
						paragraphComponents: [
							{
								id: nanoid(),
								type: 'StaticText',
								textFirstPerson: `Time limits

								This is very important. You should keep on top of the time limit for your case, even if you don’t intend to bring a claim at an employment tribunal. It’s essential for your bargaining power - once you’ve lost your right to issue a claim, the employer has no incentive to settle the case with you. 
								Time limits for employment claims are short - three months minus one day from the last act complained of. In a claim for unfair dismissal or constructive dismissal, the time limit will run from your last day of employment. For other claims such as discrimination or whistleblowing, the time limit will normally run from the date of the employer’s alleged wrongdoing. When the treatment is ongoing, it will be the date of the last act. Time limits can occasionally be extended - however, we’d urge that you bring your claim promptly as you don’t want a dispute in the tribunal about this. More information on time limits: https://www.monacosolicitors.co.uk/tribunals/time-limits/.  
								If it’s getting close to the time limit expiring, you should contact Advisory Conciliation and Arbitration Service (Acas) for early conciliation, which is a compulsory step before issuing a claim and it will give you a bit more time. For more information see: https://www.acas.org.uk/making-a-claim-to-an-employment-tribunal.`,
							} as StaticText,
						],
					},
				},
			] as TemplateParagraph[],
		} as TemplateSection,
		{
			id: 'ADVICE_ADV1',
			version: 1,
			type: 'UserContentSection',
			templateComponents: [],
		} as TemplateSection,
	],
} as Template;
