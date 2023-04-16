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
import style from './navbar.dashboard.module.scss';
import type { TDashboardNavbar } from './navbar.dashboard.type';

const DashboardNavbarComponent: FC<TDashboardNavbar> = ({ theme }) => {
  const a = 1;
  // todo: don't do like that
  const dispatch = useAppDispatch();

  return (
    <Container fluid className={classNames('w-100 p-0 position-sticky top-0')}>
      <Navbar className={classNames(style[`${theme}-alt`])} expand={false}>
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`}>
            <span
              className={classNames(
                'navbar-toggler-icon',
                theme === 'light' ? 'navbar-light' : 'navbar-dark',
              )}
            />
          </Navbar.Toggle>
          <Navbar.Brand>
            <Button
              className="ms-2 me-3"
              onClick={() => {
                void dispatch(logoutUserAsync());
              }}
            >
              logout
            </Button>
          </Navbar.Brand>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
            className={style[`${theme}-alt`]}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                <p
                  style={{ fontSize: '20px', cursor: 'pointer' }}
                  onClick={() => {
                    changeRoute('/');
                  }}
                >
                  Fullstack panel
                </p>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id={`offcanvasNavbarDropdown-expand-${false}`}>
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Container>
  );
};

export { DashboardNavbarComponent };
