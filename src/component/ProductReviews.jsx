import React, { useState } from 'react';

const ProductReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      title: 'Good product',
      content: 'The product lasts, the design is perfect I love it',
      rating: 4.5,
      date: '12-08-2021',
      author: 'JAMES JOHN',
    },
    {
      id: 2,
      title: 'Excellent quality',
      content: 'Very comfortable and durable. Highly recommend!',
      rating: 5,
      date: '15-09-2021',
      author: 'SARAH SMITH',
    },
    {
      id: 3,
      title: 'Value for money',
      content: 'Affordable and great quality. Will buy again.',
      rating: 4,
      date: '20-10-2021',
      author: 'MARK DOE',
    },
    {
      id: 4,
      title: 'Not bad',
      content: 'The product is okay, but could be better.',
      rating: 3.5,
      date: '25-11-2021',
      author: 'JANE DOE',
    },
    {
      id: 5,
      title: 'Amazing!',
      content: 'Exceeded my expectations. Will recommend to others.',
      rating: 5,
      date: '01-12-2021',
      author: 'JOHN SMITH',
    },
  ]);

  const [showAll, setShowAll] = useState(false); // State to toggle between "See all" and "See less"
  const [newReview, setNewReview] = useState({
    title: '',
    content: '',
    rating: '',
    author: '',
  });

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleAddReview = () => {
    if (!newReview.title || !newReview.content || !newReview.rating || !newReview.author) {
      alert('Please fill in all fields');
      return;
    }

    const newReviewData = {
      ...newReview,
      id: reviews.length + 1,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReviewData, ...reviews]);
    setNewReview({ title: '', content: '', rating: '', author: '' });
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3); // Show all or limit to 3 reviews

  return (
    <div className="container mt-5 pt-3">
      <div className="row pt-3">
        <div className="col-md-2 border-bottom">
          <p className="display-7" style={{ fontSize: '10px' }}>
            PRODUCT REVIEWS ({reviews.length})
          </p>
        </div>
        <div className="col-md-9 border-bottom"></div>
        <div className="col-md-1 border-bottom">
          <p
            className="text-danger"
            style={{ fontSize: '10px', cursor: 'pointer' }}
            onClick={toggleShowAll}
          >
            <b>
              {showAll ? 'See less' : 'See all'}{' '}
              <i
                className={`bi ${
                  showAll ? 'bi-chevron-compact-up' : 'bi-chevron-compact-right'
                }`}
              ></i>
            </b>
          </p>
        </div>
      </div>

      <div className="row">
        {displayedReviews.map((review) => (
          <div key={review.id} className="col-sm-12 my-4 border-bottom">
            <h6 className="fw-bold">{review.title}</h6>
            <small style={{ fontSize: '10px' }}>{review.content}</small>
            <p className="mt-4 gap-2">
              {[...Array(Math.floor(review.rating))].map((_, i) => (
                <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
              ))}
              {review.rating % 1 !== 0 && (
                <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
              )}
              <span className="pl-4" style={{ fontSize: '10px', marginLeft: '10px' }}>
                {review.date} by {review.author}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h6>Add a Review</h6>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            placeholder="Review Title"
            className="form-control"
            value={newReview.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="content"
            placeholder="Review Content"
            className="form-control"
            rows="3"
            value={newReview.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            className="form-control"
            value={newReview.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="author"
            placeholder="Your Name"
            className="form-control"
            value={newReview.author}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;