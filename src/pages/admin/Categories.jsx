 // src/pages/admin/Categories.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Modal, Form, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get('http://localhost:4000/api/byc/admin/categories', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        });
        console.log('Categories: Fetched categories:', response.data);
        setCategories(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Failed to fetch categories');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const payload = {
        name: formData.name,
        description: formData.description || '',
      };
      console.log('Categories: Submitting payload:', payload);
      let res;
      if (editingId) {
        res = await axios.patch(
          `http://localhost:4000/api/byc/admin/categories/${editingId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(categories.map((category) => (category._id === editingId ? res.data : category)));
        toast.success('Category updated');
      } else {
        res = await axios.post('http://localhost:4000/api/byc/admin/categories', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories([res.data, ...categories]);
        toast.success('Category added');
      }
      console.log('Categories: API response:', res.data);
      setShowModal(false);
      setFormData({
        name: '',
        description: '',
      });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving category:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleEdit = (category) => {
    console.log('Categories: Editing category:', category);
    setFormData({
      name: category.name || '',
      description: category.description || '',
    });
    setEditingId(category._id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Categories: Deleting category:', deleteId);
      await axios.delete(`http://localhost:4000/api/byc/admin/categories/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((category) => category._id !== deleteId));
      toast.success('Category deleted');
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting category:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to delete category');
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleRowClick = (category) => {
    console.log('Categories: Row clicked:', category);
    setSelectedCategory(category);
    setShowDetailsModal(true);
  };

  const handleDeleteClick = (categoryId) => {
    console.log('Categories: Delete clicked:', categoryId);
    setDeleteId(categoryId);
    setShowDeleteModal(true);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Categories</h2>
      <Button variant="danger" className="mb-3" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faPlus} /> Add Category
      </Button>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category._id}
                onClick={() => handleRowClick(category)}
                style={{ cursor: 'pointer' }}
              >
                <td>{category.name}</td>
                <td>{category.description || 'N/A'}</td>
                <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(category)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(category._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                maxLength={50}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength={500}
              />
            </Form.Group>
            <Button variant="danger" type="submit">
              {editingId ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCategory && (
            <div>
              <p><strong>Name:</strong> {selectedCategory.name}</p>
              <p><strong>Description:</strong> {selectedCategory.description || 'N/A'}</p>
              <p><strong>Created At:</strong> {new Date(selectedCategory.createdAt).toLocaleString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              setShowDetailsModal(false);
              handleEdit(selectedCategory);
            }}
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this category? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;