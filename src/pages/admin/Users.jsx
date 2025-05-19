 // src/pages/admin/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Modal, Form, Button, Alert, Table } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'delete'
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    password: '',
    isAdmin: false,
  });
  const [formError, setFormError] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'Failed to fetch users');
        toast.error(error.response?.data?.message || 'Failed to fetch users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (userId, currentIsAdmin) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `https://byc-backend-hkgk.onrender.com/api/byc/admin/users/${userId}`,
        { isAdmin: !currentIsAdmin },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUsers(users.map((user) => (user._id === userId ? res.data : user)));
      toast.success('User role updated');
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
    setModalMode('delete');
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://byc-backend-hkgk.onrender.com/api/byc/admin/users/${deleteUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== deleteUserId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to delete user');
    } finally {
      setShowModal(false);
      setDeleteUserId(null);
      setModalMode('add');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      if (!formData.name || !formData.emailAddress || !formData.password) {
        setFormError('All fields (Name, Email, Password) are required');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
        setFormError('Please enter a valid email address');
        return;
      }
      if (formData.password.length < 6) {
        setFormError('Password must be at least 6 characters long');
        return;
      }

      const response = await axios.post('https://byc-backend-hkgk.onrender.com/api/byc/users/register', formData);
      const token = localStorage.getItem('token');
      const res = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setShowModal(false);
      setFormData({ name: '', emailAddress: '', password: '', isAdmin: false });
      toast.success('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || 'Failed to add user';
      setFormError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleModalOpen = () => {
    setFormError(null);
    setFormData({ name: '', emailAddress: '', password: '', isAdmin: false });
    setModalMode('add');
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <style>
        {`
          .users-table th, .users-table td {
            vertical-align: middle;
            padding: 8px;
            font-size: 14px;
            white-space: nowrap;
          }
          .users-table th {
            background-color: #f8f9fa;
          }
          .custom-modal .modal-dialog {
            max-width: 90%;
            width: 500px;
          }
          .custom-modal .modal-body {
            max-height: 70vh;
            overflow-y: auto;
          }
          @media (max-width: 768px) {
            .users-table th, .users-table td {
              font-size: 12px;
              padding: 6px;
            }
            .users-table th:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(5)),
            .users-table td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(5)) {
              display: none;
            }
            .users-table .btn {
              font-size: 12px;
              padding: 4px 8px;
            }
            .users-table td.text-truncate {
              max-width: 100px;
            }
          }
          @media (max-width: 576px) {
            .users-table th, .users-table td {
              font-size: 10px;
              padding: 4px;
            }
            .custom-modal .modal-dialog {
              width: 95%;
              margin: 10px auto;
            }
            .custom-modal .form-control,
            .custom-modal .btn {
              font-size: 12px;
            }
          }
        `}
      </style>

      <h2>Users</h2>
      <Button variant="danger" className="mb-3" onClick={handleModalOpen}>
        Add User
      </Button>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    {user.name}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    {user.emailAddress}
                  </td>
                  <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant={user.isAdmin ? 'warning' : 'success'}
                      size="sm"
                      className="me-2"
                      onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                    >
                      {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="custom-modal">
        {modalMode === 'add' ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {formError && <Alert variant="danger">{formError}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Admin"
                    checked={formData.isAdmin}
                    onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                  />
                </Form.Group>
                <Button variant="danger" type="submit">
                  Add User
                </Button>
              </Form>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this user? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Users;