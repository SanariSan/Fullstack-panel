import type { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useScreenDetails } from '../../hooks/use-screen-details';
import s from './main.module.scss';

const MainComponent: FC = () => {
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();

  return (
    <Container>
      <Row xs={2}>
        <Col xs={12}>
          <p>Sections</p>
          <pre className={s.test}>Current page size - {`${w} x ${h}`}</pre>
        </Col>
      </Row>
    </Container>
  );
};

export { MainComponent };
