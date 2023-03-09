import classNames from 'classnames';
import type { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { changeRoute } from '../../../containers/history-catcher';
import { useAppDispatch } from '../../../hooks/redux';
import { logoutUserAsync } from '../../../store';
import style from './navbar.landing.module.scss';
import type { TLandingNavbar } from './navbar.landing.type';

const LandingNavbarComponent: FC<TLandingNavbar> = ({ theme }) => {
  const a = 1;
  return (
    <Container fluid className={classNames('w-100 p-0 position-absolute top-0')}>
      <Navbar className={classNames(style[`${theme}-alt`])} expand={false}>
        <Container fluid>
          <Navbar.Brand className={classNames(style[`${theme}`], 'fw-bold')}>
            <p
              className="ms-2"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                changeRoute('/');
              }}
            >
              Fullstack panel
            </p>
          </Navbar.Brand>
          <Navbar.Brand>
            <Button
              className="me-3"
              onClick={() => {
                changeRoute('/login');
              }}
            >
              login
            </Button>
            <Button
              className="me-3"
              onClick={() => {
                changeRoute('/register');
              }}
            >
              signup
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
};

export { LandingNavbarComponent };
