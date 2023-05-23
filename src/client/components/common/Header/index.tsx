import React, { FC, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Button, Drawer, IconButton, Link, List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';

import logo1 from '../../../assets/img/grapple-logo.svg';

const Header: FC = () => {
	const { pathname } = useLocation();
	const [menuIsVisible, setMenuIsVisible] = useState(false);
	const history = useHistory();

	const goToCDF = () => {
		history.push('/cdf/form');
	};

	return (
		<div className="header" data-testid="header-component">
			<Link href="https://www.grapple.uk/?from=vl-ui&source=mobile" target="_blank" rel="noreferrer">
				<img className="header__logo-1" alt="grapple" src={logo1} />
			</Link>
			<div className="header__breadcrumb">
				<a className="header__breadcrumb__text" target="_blank" href="https://www.grapple.uk/" rel="noreferrer">
					Home
				</a>
				<NavLink to="/help" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Help
				</NavLink>
				<NavLink to="/terms" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Terms of Use
				</NavLink>
				{/* <Button variant="contained" className="header__breadcrumb__text" color="primary" onClick={goToCDF}>
					Request callback
				</Button> */}
			</div>
			<div className="header_mobile-buttons">
				<IconButton onClick={() => setMenuIsVisible(true)}>
					<MenuIcon fontSize="large" />
				</IconButton>
			</div>
			<Drawer open={menuIsVisible} onClose={() => setMenuIsVisible(false)}>
				<List component="nav">
					<a
						className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button MuiTypography-body1"
						target="_blank"
						href="https://www.grapple.uk/"
						rel="noreferrer"
					>
						Home
					</a>
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
					{/* <ListItem button component={NavLink} to="/cdf/form" onClick={() => setMenuIsVisible(false)}>
						<ListItemText primary="Request callback" />
					</ListItem> */}
				</List>
			</Drawer>
		</div>
	);
};

export default Header;
