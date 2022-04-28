import { Navbar,Container,Nav,NavDropdown } from 'react-bootstrap';
export default function Header(){
    return(


        <Navbar bg="light" expand="lg">
  <Container style={{ backgroundColor: '#e#f2fd' }}>
    <Navbar.Brand href="#home">Blog</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/addblog">addblog</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


    );
}
