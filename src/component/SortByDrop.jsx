 

import React from 'react';

const SortByDrop = ({ onSortChange }) => {
  const handleChange = (event) => {
    onSortChange(event.target.value); // Pass the selected value to the parent component
  };

  return (
    <div style={{ width: '100%', margin: '30px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', paddingRight: '10px', position: 'relative' }}>
        <div className="dropdown sort" style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              top: '-10px',
              left: '20px',
              fontSize: '10px',
              fontWeight: '500',
              color: 'grey',
              zIndex: 1,
              backgroundColor: '#fff',
              padding: '0 5px',
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
              padding: '6px 12px',
              fontSize: '12px',
              minWidth: '120px',
              textAlign: 'left',
              cursor: 'pointer',
              color: '#000',
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