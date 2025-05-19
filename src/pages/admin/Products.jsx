 // src/pages/admin/Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

// Predefined color name to hex code map
const colorMap = {
  black: '#000000',
  blue: '#0000FF',
  orange: '#FFA500',
  pink: '#FF69B4',
  red: '#FF0000',
  green: '#008000',
  yellow: '#FFFF00',
  white: '#FFFFFF',
  purple: '#800080',
  gray: '#808080',
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    productNumber: '',
    productDescription: '',
    productPrice: '',
    category: '',
    productStock: '',
    productImage: [''],
    colors: [],
    sizes: [],
  });
  const [colorInput, setColorInput] = useState('');
  const [colorCodeInput, setColorCodeInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/products');
      const normalizedProducts = res.data.map(product => ({
        ...product,
        colors: Array.isArray(product.colors)
          ? product.colors.map(color =>
              typeof color === 'object' && color
                ? { name: color.name || String(color), code: color.code || '' }
                : { name: String(color), code: '' }
            )
          : [],
        sizes: Array.isArray(product.sizes) ? product.sizes.map(size => String(size)) : [],
      }));
      setProducts(normalizedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.response?.data?.message || 'Failed to load products');
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error(error.response?.data?.message || 'Failed to load categories');
    }
  };

  const fetchProductById = async (id) => {
    try {
      const res = await axios.get(`https://byc-backend-hkgk.onrender.com/api/byc/products/${id}`);
      const product = {
        ...res.data,
        colors: Array.isArray(res.data.colors)
          ? res.data.colors.map(color =>
              typeof color === 'object' && color
                ? { name: color.name || String(color), code: color.code || '' }
                : { name: String(color), code: '' }
            )
          : [],
        sizes: Array.isArray(res.data.sizes) ? res.data.sizes.map(size => String(size)) : [],
      };
      setSelectedProduct(product);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error(error.response?.data?.message || 'Failed to load product details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, productImage: [e.target.value.trim()] });
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setColorInput(value);
    const normalizedColor = value.trim().toLowerCase();
    setColorCodeInput(colorMap[normalizedColor] || '');
  };

  const handleColorCodeChange = (e) => {
    setColorCodeInput(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSizeInput(e.target.value);
  };

  const addColors = () => {
    if (colorInput.trim() && colorCodeInput.trim()) {
      const newColor = {
        name: colorInput.trim(),
        code: colorCodeInput.trim(),
      };
      setFormData({ ...formData, colors: [...formData.colors, newColor] });
      setColorInput('');
      setColorCodeInput('');
    } else {
      toast.error('Please enter both a color name and hex code');
    }
  };

  const removeColor = (index) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index),
    });
  };

  const addSizes = () => {
    if (sizeInput.trim()) {
      const newSizes = sizeInput
        .split(',')
        .map(size => size.trim())
        .filter(size => size)
        .map(size => String(size));
      setFormData({ ...formData, sizes: [...formData.sizes, ...newSizes] });
      setSizeInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const payload = {
        productName: formData.productName.trim(),
        productNumber: formData.productNumber.trim(),
        productDescription: formData.productDescription.trim(),
        productPrice: parseFloat(formData.productPrice) || 0,
        category: formData.category,
        productStock: parseInt(formData.productStock) || 0,
        productImage: formData.productImage.filter(img => img.trim()),
        colors: formData.colors.map(color => ({
          name: color.name,
          code: color.code,
        })),
        sizes: formData.sizes.map(size => String(size)),
      };

      if (!payload.productName) {
        setFormError('Product name is required');
        return;
      }
      if (!payload.productPrice || payload.productPrice <= 0) {
        setFormError('Valid price is required');
        return;
      }
      if (!payload.category) {
        setFormError('Category is required');
        return;
      }
      if (payload.productStock < 0) {
        setFormError('Stock cannot be negative');
        return;
      }
      if (payload.colors.length > 0 && payload.colors.some(color => !color.name || !color.code)) {
        setFormError('All colors must have a name and valid hex code');
        return;
      }

      console.log('Submitting payload:', payload);

      if (editingId) {
        await axios.put(`https://byc-backend-hkgk.onrender.com/api/byc/products/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Product updated successfully');
      } else {
        await axios.post(`https://byc-backend-hkgk.onrender.com/api/byc/products`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Product added successfully');
      }
      fetchProducts();
      setShowModal(false);
      setFormData({
        productName: '',
        productNumber: '',
        productDescription: '',
        productPrice: '',
        category: '',
        productStock: '',
        productImage: [''],
        colors: [],
        sizes: [],
      });
      setColorInput('');
      setColorCodeInput('');
      setSizeInput('');
      setEditingId(null);
    } catch (error) {
      console.error('Error saving product:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || 'Failed to save product';
      setFormError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      await axios.delete(`https://byc-backend-hkgk.onrender.com/api/byc/products/${deleteProductId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(error.response?.data?.message || 'Error deleting product');
    } finally {
      setShowDeleteModal(false);
      setDeleteProductId(null);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      productName: product.productName || '',
      productNumber: product.productNumber || '',
      productDescription: product.productDescription || '',
      productPrice: product.productPrice || '',
      category: product.category?._id || product.category || '',
      productStock: product.productStock || '',
      productImage: product.productImage?.length > 0 ? product.productImage : [''],
      colors: Array.isArray(product.colors)
        ? product.colors.map(color =>
            typeof color === 'object' && color
              ? { name: color.name || String(color), code: color.code || '' }
              : { name: String(color), code: '' }
          )
        : [],
      sizes: Array.isArray(product.sizes) ? product.sizes.map(size => String(size)) : [],
    });
    setEditingId(product._id);
    setFormError(null);
    setShowModal(true);
  };

  const handleRowClick = (id) => {
    fetchProductById(id);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <style>
        {`
          .products-table th, .products-table td {
            vertical-align: middle;
            padding: 8px;
            font-size: 14px;
            white-space: nowrap;
          }
          .products-table img {
            border-radius: 4px;
          }
          .products-table th {
            background-color: #f8f9fa;
          }
          .products-table .color-swatch {
            display: inline-block;
            width: 15px;
            height: 15px;
            border: 1px solid #ccc;
            margin-right: 5px;
          }
          .custom-modal .modal-dialog {
            max-width: 90%;
            width: 600px;
          }
          .custom-modal .modal-body {
            max-height: 70vh;
            overflow-y: auto;
          }
          @media (max-width: 768px) {
            .products-table th, .products-table td {
              font-size: 12px;
              padding: 6px;
            }
            .products-table th:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(4)):not(:nth-child(8)),
            .products-table td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(4)):not(:nth-child(8)) {
              display: none;
            }
            .products-table img {
              width: 40px;
              height: 40px;
            }
            .products-table .btn {
              font-size: 12px;
              padding: 4px 8px;
            }
          }
          @media (max-width: 576px) {
            .products-table th, .products-table td {
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

      <h2>Product Management</h2>
      <Button variant="danger" className="mb-3" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faPlus} /> Add Product
      </Button>
      <div className="table-responsive">
        <Table striped bordered hover className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Colors</th>
              <th>Sizes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                onClick={() => handleRowClick(product._id)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  {product.productImage?.[0] ? (
                    <Image
                      src={product.productImage[0]}
                      alt={product.productName}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="text-truncate" style={{ maxWidth: '150px' }}>
                  {product.productName}
                </td>
                <td>{product.category?.name || 'N/A'}</td>
                <td>₦{product.productPrice?.toLocaleString() || '0'}</td>
                <td>{product.productStock}</td>
                <td>
                  {Array.isArray(product.colors) && product.colors.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {product.colors.map((color, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span
                            className="color-swatch"
                            style={{
                              backgroundColor: color.code || '#000000',
                            }}
                          />
                          <span>{color.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    'None'
                  )}
                </td>
                <td>{Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes.join(', ') : 'None'}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(product)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <Form.Text className="text-danger mb-3">{formError}</Form.Text>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Number</Form.Label>
              <Form.Control
                type="text"
                name="productNumber"
                value={formData.productNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="productStock"
                value={formData.productStock}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.productImage[0]}
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color Name</Form.Label>
              <Form.Control
                type="text"
                value={colorInput}
                onChange={handleColorChange}
                placeholder="e.g., black"
              />
              <Form.Label className="mt-2">Color Code (hex)</Form.Label>
              <Form.Control
                type="text"
                value={colorCodeInput}
                onChange={handleColorCodeChange}
                placeholder="e.g., #000000"
              />
              <Button variant="secondary" className="mt-2" onClick={addColors}>
                Add Color
              </Button>
              <div className="mt-2">
                <strong>Current colors:</strong>
                {formData.colors.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {formData.colors.map((color, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          className="color-swatch"
                          style={{
                            backgroundColor: color.code || '#000000',
                          }}
                        />
                        <span>
                          {color.name} ({color.code})
                        </span>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeColor(index)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ' None'
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sizes (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={sizeInput}
                onChange={handleSizeChange}
                placeholder="e.g., S, M, L"
              />
              <Button variant="secondary" className="mt-2" onClick={addSizes}>
                Add Sizes
              </Button>
              <div>Current sizes: {formData.sizes.join(', ') || 'None'}</div>
            </Form.Group>
            <Button variant="danger" type="submit">
              {editingId ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Product Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct ? (
            <div>
              <p><strong>Name:</strong> {selectedProduct.productName}</p>
              <p><strong>Product Number:</strong> {selectedProduct.productNumber || 'N/A'}</p>
              <p><strong>Description:</strong> {selectedProduct.productDescription || 'N/A'}</p>
              <p><strong>Price:</strong> ₦{selectedProduct.productPrice?.toLocaleString() || '0'}</p>
              <p><strong>Category:</strong> {selectedProduct.category?.name || 'N/A'}</p>
              <p><strong>Stock:</strong> {selectedProduct.productStock}</p>
              <p>
                <strong>Colors:</strong>{' '}
                {Array.isArray(selectedProduct.colors) && selectedProduct.colors.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {selectedProduct.colors.map((color, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span
                          className="color-swatch"
                          style={{
                            backgroundColor: color.code || '#000000',
                          }}
                        />
                        <span>{color.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  'None'
                )}
              </p>
              <p>
                <strong>Sizes:</strong>{' '}
                {Array.isArray(selectedProduct.sizes) && selectedProduct.sizes.length > 0
                  ? selectedProduct.sizes.join(', ')
                  : 'None'}
              </p>
              {selectedProduct.productImage?.[0] && (
                <div>
                  <strong>Image:</strong>
                  <Image
                    src={selectedProduct.productImage[0]}
                    alt={selectedProduct.productName}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
                  />
                </div>
              )}
            </div>
          ) : (
            <p>Loading product details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;