import React, { FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, Drawer, List, ListItem, ListItemText } from '@material-ui/core';

import logo1 from '../../../assets/img/ms-logo-blue-black.svg';

const Header: FC = () => {
	const { pathname } = useLocation();
	const [menuIsVisible, setMenuIsVisible] = useState(false);

	return (
		<div className="header">
			<a href="https://www.monacosolicitors.co.uk/?from=vl-ui&source=mobile" target="_blank" rel="noreferrer">
				<img className="header__logo-1" alt="Monaco Solicitors" src={logo1} />
			</a>
			<div className="header__breadcrumb">
				<NavLink to="/help" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Help
				</NavLink>
				<NavLink to="/terms" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Terms of Use
				</NavLink>
				<Button
					variant="contained"
					className="header__breadcrumb__text"
					color="primary"
					href="https://www.monacosolicitors.co.uk/contact-us/?source=vl"
					target="_blank"
				>
					Request callback
				</Button>
			</div>
			<button className="header__burger-btn" onClick={() => setMenuIsVisible(true)} type="button">
				<i className="fas fa-bars" />
			</button>
			<Drawer open={menuIsVisible} onClose={() => setMenuIsVisible(false)}>
				<List component="nav">
					<ListItem
						button
						component={NavLink}
						to="/help"
						onClick={() => setMenuIsVisible(false)}
						selected={pathname === '/help'}
					>
						<ListItemText primary="Help" />
					</ListItem>
					<ListItem
						button
						component={NavLink}
						to="/terms"
						onClick={() => setMenuIsVisible(false)}
						selected={pathname === '/terms'}
					>
						<ListItemText primary="Terms of Use" />
					</ListItem>
					<ListItem
						button
						component="a"
						href="https://www.monacosolicitors.co.uk/contact-us/?source=vl"
						onClick={() => setMenuIsVisible(false)}
						target="_blank"
					>
						<ListItemText primary="Request callback" />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
};

export default Header;
