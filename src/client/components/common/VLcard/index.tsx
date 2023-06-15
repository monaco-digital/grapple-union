import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Fab } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/GetApp';
import { useHistory, useParams } from 'react-router-dom';

type VLCardProps = {
	children: ReactNode;
	theme?: 'light' | 'dark';
	heading: string;
};

const VLcard: FC<VLCardProps> = ({ children, heading, theme }: VLCardProps) => {
	const VLCardClasses = classNames('vl-card', {
		[`vl-card--${theme}`]: theme,
	});

	const history = useHistory();
	const { id = '_ADV' } = useParams();

	const openCheckoutModal = () => {
		history.replace(`/preview/${id}/checkout/email`);
	};

	return (
		<div className={VLCardClasses}>
			<div className="vl-card__header">
				<span className="vl-card__header__title">{heading}</span>
				<div className="vl-card__actions">
					<Fab variant="extended" color="primary" onClick={openCheckoutModal}>
						<DownloadIcon />
						<div className="vl-card__email_button_text">&nbsp;Download</div>
					</Fab>
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
};

VLcard.defaultProps = {
	theme: 'light',
};

export default VLcard;
