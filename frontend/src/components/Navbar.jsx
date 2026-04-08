import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Smart Campus
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/book" className="nav-link">
              Book Resource
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bookings" className="nav-link">
              View Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/check-access" className="nav-link">
              Check Access
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/navigation" className="nav-link">
              Campus Navigation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
