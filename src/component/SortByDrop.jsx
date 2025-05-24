 import React from 'react';

const SortByDrop = ({ onSortChange, isSmallScreen = false }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    console.log('SortByDrop selected:', value); // Debug
    if (value) {
      onSortChange(value); // Pass the selected value to the parent
    }
  };

  return (
    <div
      style={{
        width: 'auto',
        margin: '10px 0',
        minWidth: isSmallScreen ? '160px' : '180px',
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
              fontSize: isSmallScreen ? '10px' : '12px',
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
              border: '1px solid #dee2e6',
              padding: isSmallScreen ? '12px' : '10px 14px',
              fontSize: isSmallScreen ? '12px' : '14px',
              width: '100%',
              minWidth: isSmallScreen ? '140px' : '160px',
              maxWidth: '220px',
              textAlign: 'left',
              cursor: 'pointer',
              color: '#000',
              appearance: 'auto',
              borderRadius: '4px',
              zIndex: 1,
              touchAction: 'manipulation',
              height: isSmallScreen ? '44px' : '48px', // Larger touch target
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <option value="" disabled>
              Select Sort Option
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