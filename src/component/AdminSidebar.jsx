 // src/component/AdminSidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBox, faShoppingCart, faUsers, faList, faBlog } from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div
      className="bg-danger border-right"
      style={{
        width: '250px',
        minHeight: '100vh',
        paddingTop: '20px',
      }}
    >
      <Nav className="flex-column">
        <Nav.Item>
          <NavLink
            to="/admin/dashboard"
            className={`nav-link text-white ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="me-2 text-white" /> Dashboard
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/admin/products"
            className={`nav-link text-white ${location.pathname === '/admin/products' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faBox} className="me-2 text-white" /> Products
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/admin/orders"
            className={`nav-link text-white ${location.pathname === '/admin/orders' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="me-2 text-white" /> Orders
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/admin/users"
            className={`nav-link text-white ${location.pathname === '/admin/users' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faUsers} className="me-2 text-white" /> Users
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/admin/categories"
            className={`nav-link text-white ${location.pathname === '/admin/categories' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faList} className="me-2 text-white" /> Categories
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/admin/blogs"
            className={`nav-link text-white ${location.pathname === '/admin/blogs' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faBlog} className="me-2 text-white" /> Blogs
          </NavLink>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AdminSidebar;