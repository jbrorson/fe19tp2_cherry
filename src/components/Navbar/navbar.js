import React from 'react';
import Logo from "../../assets/logo_transparent.png";
import Theme from "../../__config/theme";
import * as IconesSolid from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Nav, MenuItems, A, AccountA, StyledLogo, Menu, StyledImgLogo } from './styledNavbar';

class Navbar extends React.Component {
  mediaQuery = window.matchMedia('(max-width: ' + Theme.screenSize.xsmall + ')')
  listnerMobileSize = (event) => {
    this.setState({
      isMobile: event.matches
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      isMobile: this.mediaQuery.matches
    }
  }

  componentDidMount() {
    this.mediaQuery.addListener(this.listnerMobileSize);
  }

  componentWillUnmount() {
    this.mediaQuery.removeListener(this.listnerMobileSize);
  }

  menuBtnClick() {
    this.setState({ 
      showMenu: !this.state.showMenu,
      isMobile: this.state.isMobile
    })
  }

  renderMenu() {
    if ((this.state.isMobile && this.state.showMenu) || !this.state.isMobile) {
      return (
        <MenuItems>
          <A><Link to="/">Home</Link></A>
          <A><Link to="/solutions">Solutions</Link></A>
          <A><Link to="/about">About</Link></A>
        </MenuItems>
      )
    }
  }

  render() {
    return (
      <Nav>
        <StyledLogo><StyledImgLogo src={Logo} alt="website logo" /></StyledLogo>
        { this.renderMenu() }
        <AccountA><Link to="/account">Account</Link></AccountA>
        <i><Menu onClick={() => this.menuBtnClick()} icon={IconesSolid.faBars} /></i>
      </Nav>
    );
  }
}

export default Navbar;
