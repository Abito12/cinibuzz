import {useState} from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse
} from 'shards-react';
import {useHistory} from 'react-router-dom';
import './style.css';

const Header = () => {
    const history = useHistory();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigateToMovies = () => {
        history.push('/');
    };

    const toggleNavBar = () => {
        setIsMenuOpen((open) => !open);
    };

    return (
        <Navbar type="light" theme="light" expand="md">
            <NavbarBrand className="brand-name" onClick={navigateToMovies}>
                Cinibuzz
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavBar} />
            <Collapse open={isMenuOpen} navbar>
                <Nav navbar className="ml-auto">
                    <NavItem>
                        <NavLink active onClick={navigateToMovies}>
                            Movies
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active
                            onClick={() => history.push('/movies/tv')}>
                            TV Shows
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Header;
