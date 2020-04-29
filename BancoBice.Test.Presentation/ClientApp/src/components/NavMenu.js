import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/"><img src="data:image/png;base64,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" /></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/last-elements">&Uacute;ltimos elementos</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/elements-by-date">Elementos por fecha</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/historical-information">&Uacute;ltimo a&ntilde;o por elemento</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}