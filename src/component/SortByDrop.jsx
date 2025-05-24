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
    <div style={{ width: '100%', margin: '8px 0', maxWidth: '150px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '6px',
          position: 'relative',
        }}
      >
        <div className="dropdown sort" style={{ position: 'relative', width: '100%' }}>
          <span
            style={{
              position: 'absolute',
              top: '-6px',
              left: '6px',
              fontSize: '9px',
              fontWeight: '500',
              color: '#6c757d',
              zIndex: 10,
              backgroundColor: '#fff',
              padding: '0 3px',
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
              padding: '8px 10px',
              fontSize: isSmallScreen ? '14px' : '15px',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              color: '#333',
              borderRadius: '4px',
              height: '40px', // Reduced but still touch-friendly
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              zIndex: 5,
              // Remove default arrow
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
              backgroundSize: '16px',
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