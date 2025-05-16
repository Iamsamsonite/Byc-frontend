import React from 'react';

const ToggleButton = ({ activeView, onToggle }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginBottom: '20px',
  };

  const buttonBaseStyle = {
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, color 0.3s',
    minWidth: '70px',
  };

  const activeStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
  };

  const inactiveStyle = {
    backgroundColor: '#BD3A3A0F',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      {/* List View Button */}
      <button
        style={{
          ...buttonBaseStyle,
          ...(activeView === 'list' ? activeStyle : inactiveStyle),
        }}
        onClick={() => onToggle('list')}
        aria-label="List View"
      >
        <i className="bi bi-card-list"></i>
      </button>

      {/* Grid View Button */}
      <button
        style={{
          ...buttonBaseStyle,
          ...(activeView === 'grid' ? activeStyle : inactiveStyle),
        }}
        onClick={() => onToggle('grid')}
        aria-label="Grid View"
      >
        <i className="bi bi-grid-fill"></i>
      </button>
    </div>
  );
};

export default ToggleButton;
