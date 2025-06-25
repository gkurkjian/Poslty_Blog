import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <small>© 2025 Geo_Production</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
