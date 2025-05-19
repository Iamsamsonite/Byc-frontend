 // src/pages/admin/AdminBlogs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Modal, Form, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    blogImage: [''],
    blogTitle: '',
    blogDescription: '',
    authorImage: [''],
    authorName: '',
    authorProfession: '',
    likes: 0,
    views: 0,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/admin/blogs', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000,
        });
        console.log('AdminBlogs: Fetched blogs:', response.data);
        setBlogs(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Failed to fetch blogs');
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.blogTitle.trim() || !formData.blogDescription.trim() || !formData.authorName.trim() || !formData.authorProfession.trim()) {
      toast.error('Title, description, author name, and profession are required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const payload = {
        blogImage: formData.blogImage[0] ? [formData.blogImage[0]] : [''],
        blogTitle: formData.blogTitle,
        blogDescription: formData.blogDescription,
        authorImage: formData.authorImage[0] ? [formData.authorImage[0]] : [''],
        authorName: formData.authorName,
        authorProfession: formData.authorProfession,
        likes: formData.likes,
        views: formData.views,
      };
      console.log('AdminBlogs: Submitting payload:', payload);
      let res;
      if (editingId) {
        res = await axios.patch(
          `https://byc-backend-hkgk.onrender.com/api/byc/admin/blogs/${editingId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBlogs(blogs.map((blog) => (blog._id === editingId ? res.data : blog)));
        toast.success('Blog updated');
      } else {
        res = await axios.post('https://byc-backend-hkgk.onrender.com/api/byc/admin/blogs', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs([res.data, ...blogs]);
        toast.success('Blog added');
      }
      console.log('AdminBlogs: API response:', res.data);
      setShowModal(false);
      setFormData({
        blogImage: [''],
        blogTitle: '',
        blogDescription: '',
        authorImage: [''],
        authorName: '',
        authorProfession: '',
        likes: 0,
        views: 0,
      });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving blog:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    console.log('AdminBlogs: Editing blog:', blog);
    setFormData({
      blogImage: blog.blogImage || [''],
      blogTitle: blog.blogTitle || '',
      blogDescription: blog.blogDescription || '',
      authorImage: blog.authorImage || [''],
      authorName: blog.authorName || '',
      authorProfession: blog.authorProfession || '',
      likes: blog.likes || 0,
      views: blog.views || 0,
    });
    setEditingId(blog._id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('AdminBlogs: Deleting blog:', deleteId);
      await axios.delete(`https://byc-backend-hkgk.onrender.com/api/byc/admin/blogs/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== deleteId));
      toast.success('Blog deleted');
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting blog:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to delete blog');
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleRowClick = (blog) => {
    console.log('AdminBlogs: Row clicked:', blog);
    setSelectedBlog(blog);
    setShowDetailsModal(true);
  };

  const handleDeleteClick = (blogId) => {
    console.log('AdminBlogs: Delete clicked:', blogId);
    setDeleteId(blogId);
    setShowDeleteModal(true);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <style>
        {`
          .blogs-table th, .blogs-table td {
            vertical-align: middle;
            padding: 8px;
            font-size: 14px;
            white-space: nowrap;
          }
          .blogs-table th {
            background-color: #f8f9fa;
          }
          .blogs-table img {
            border-radius: 4px;
          }
          .custom-modal .modal-dialog {
            max-width: 90%;
            width: 600px;
          }
          .custom-modal .modal-body {
            max-height: 70vh;
            overflow-y: auto;
          }
          .details-modal .modal-dialog {
            max-width: 90%;
            width: 800px;
          }
          .details-modal .modal-body {
            max-height: 80vh;
            overflow-y: auto;
          }
          @media (max-width: 768px) {
            .blogs-table th, .blogs-table td {
              font-size: 12px;
              padding: 6px;
            }
            .blogs-table th:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(7)),
            .blogs-table td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(7)) {
              display: none;
            }
            .blogs-table .btn {
              font-size: 12px;
              padding: 4px 8px;
            }
            .blogs-table td.text-truncate {
              max-width: 100px;
            }
            .details-modal img {
              max-height: 200px;
            }
          }
          @media (max-width: 576px) {
            .blogs-table th, .blogs-table td {
              font-size: 10px;
              padding: 4px;
            }
            .custom-modal .modal-dialog,
            .details-modal .modal-dialog {
              width: 95%;
              margin: 10px auto;
            }
            .custom-modal .form-control,
            .custom-modal .btn,
            .details-modal .btn {
              font-size: 12px;
            }
            .details-modal img {
              max-height: 150px;
            }
            .details-modal img[style*="border-radius: 50%"] {
              width: 80px;
              height: 80px;
            }
          }
        `}
      </style>

      <h2>Blogs</h2>
      <Button variant="danger" className="mb-3" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faPlus} /> Add Blog
      </Button>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="blogs-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Profession</th>
                <th>Likes</th>
                <th>Views</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  onClick={() => handleRowClick(blog)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    {blog.blogTitle}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '100px' }}>
                    {blog.authorName}
                  </td>
                  <td>{blog.authorProfession}</td>
                  <td>{blog.likes}</td>
                  <td>{blog.views}</td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(blog)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(blog._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Blog' : 'Add Blog'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.blogTitle}
                onChange={(e) => setFormData({ ...formData, blogTitle: e.target.value })}
                required
                maxLength={100}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={formData.blogDescription}
                onChange={(e) => setFormData({ ...formData, blogDescription: e.target.value })}
                required
                maxLength={5000}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Blog Image URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.blogImage[0]}
                onChange={(e) => setFormData({ ...formData, blogImage: [e.target.value] })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                required
                maxLength={50}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author Profession</Form.Label>
              <Form.Control
                type="text"
                value={formData.authorProfession}
                onChange={(e) => setFormData({ ...formData, authorProfession: e.target.value })}
                required
                maxLength={50}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author Image URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.authorImage[0]}
                onChange={(e) => setFormData({ ...formData, authorImage: [e.target.value] })}
              />
            </Form.Group>
            <Button variant="danger" type="submit">
              {editingId ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered dialogClassName="details-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlog?.blogTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <div>
              {selectedBlog.blogImage[0] && (
                <img
                  src={selectedBlog.blogImage[0]}
                  alt={selectedBlog.blogTitle}
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '15px' }}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
                />
              )}
              <p><strong>Description:</strong> {selectedBlog.blogDescription}</p>
              <p><strong>Author:</strong> {selectedBlog.authorName}</p>
              <p><strong>Profession:</strong> {selectedBlog.authorProfession}</p>
              {selectedBlog.authorImage[0] && (
                <img
                  src={selectedBlog.authorImage[0]}
                  alt={selectedBlog.authorName}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
                />
              )}
              <p><strong>Likes:</strong> {selectedBlog.likes}</p>
              <p><strong>Views:</strong> {selectedBlog.views}</p>
              <p><strong>Created At:</strong> {new Date(selectedBlog.createdAt).toLocaleString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button variant="warning" onClick={() => { setShowDetailsModal(false); handleEdit(selectedBlog); }}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this blog? This action cannot be undone.
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

export default AdminBlogs;