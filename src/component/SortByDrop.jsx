 import React from 'react';

const SortByDrop = ({ onSortChange, isSmallScreen }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    console.log('SortByDrop: Selected value:', value);
    onSortChange(value);
    // Close dropdown on mobile
    if (isSmallScreen) {
      event.target.blur();
    }
  };

  return (
    <div style={{ width: '100%', margin: '10px 0', maxWidth: '180px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '8px',
          position: 'relative',
        }}
      >
        <div className="dropdown sort" style={{ position: 'relative', width: '100%' }}>
          <span
            style={{
              position: 'absolute',
              top: '-8px',
              left: '8px',
              fontSize: '10px',
              fontWeight: '500',
              color: '#6c757d',
              zIndex: 10,
              backgroundColor: '#fff',
              padding: '0 4px',
            }}
          >
            SORT BY:
          </span>
          <select
            className="form-select"
            onChange={handleChange}
            onTouchStart={() => console.log('SortByDrop: Touch started')}
            defaultValue=""
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ced4da',
              padding: '10px 12px',
              fontSize: isSmallScreen ? '15px' : '16px',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              color: '#333',
              borderRadius: '4px',
              appearance: 'auto',
              height: '44px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              zIndex: 5,
            }}
            aria-label="Sort products by"
          >
            <option value="" disabled>
              Sort By
            </option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortByDrop;