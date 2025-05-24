 import React from 'react';

const SortByDrop = ({ onSortChange, isSmallScreen = false }) => {
  const handleChange = (event) => {
    onSortChange(event.target.value); // Pass the selected value to the parent component
  };

  return (
    <div
      style={{
        width: 'auto',
        margin: '10px 0',
        minWidth: isSmallScreen ? '140px' : '150px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingRight: '10px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '-8px',
              left: '15px',
              fontSize: isSmallScreen ? '9px' : '10px',
              fontWeight: '500',
              color: '#6c757d',
              zIndex: 2,
              backgroundColor: '#fff',
              padding: '0 5px',
              transform: 'translateY(-50%)',
            }}
          >
            SORT BY:
          </span>
          <select
            className="form-select"
            onChange={handleChange}
            defaultValue=""
            style={{
              backgroundColor: '#fff',
              border: '1px solid #000',
              padding: isSmallScreen ? '10px' : '8px 12px',
              fontSize: isSmallScreen ? '11px' : '12px',
              width: '100%',
              minWidth: isSmallScreen ? '120px' : '140px',
              maxWidth: '200px',
              textAlign: 'left',
              cursor: 'pointer',
              color: '#000',
              appearance: 'auto', // Ensure native dropdown arrow
              borderRadius: '4px',
              zIndex: 1,
              touchAction: 'manipulation', // Improve touch responsiveness
              height: isSmallScreen ? '40px' : '36px', // Larger touch target
            }}
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