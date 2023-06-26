import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandNavbar() {
  return (
    <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand className='text-white'>option.json 選項配置介面</Navbar.Brand>
        </Container>
    </Navbar>
  );
}

export default BrandNavbar;