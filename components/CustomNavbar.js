import { Navbar, Container, Nav} from 'react-bootstrap';
import Link from 'next/link';

export default function CustomNavbar() {
    return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} href="/">Home Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="ms-auto"></Nav> */}
        </Navbar.Collapse>
        <Navbar.Brand as={Link} href="/about">About</Navbar.Brand>
        <Navbar.Brand as={Link} href="/posts">Posts</Navbar.Brand>
      </Container>
    </Navbar>
  )
}