import React, { useState, useRef, useEffect } from 'react';

// CSS to be included in your stylesheet
const searchStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  input: {
    width: '0',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderBottom: '1px solid #ccc',
    outline: 'none',
    transition: 'width 0.3s ease',
    backgroundColor: 'transparent',
  },
  inputActive: {
    width: '100%',
  },
  icon: {
    position: 'absolute',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    zIndex: 1,
  }
};

const ExpandableSearch = () => {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);

  const toggleSearch = () => {
    setIsActive(!isActive);
  };

  // Focus the input when search is activated
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target) && 
          event.target.id !== 'search-icon') {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search submission here
    console.log('Searching for:', inputRef.current.value);
  };

  return (
    <div style={searchStyles.container}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Products"
          style={{
            ...searchStyles.input,
            ...(isActive ? searchStyles.inputActive : {})
          }}
        />
      </form>
      <button 
        id="search-icon"
        onClick={toggleSearch} 
        style={{
          ...searchStyles.icon,
          backgroundColor: 'transparent',
          border: 'none',
          height: '20px',
        }}
        aria-label="Search">
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
};

export default ExpandableSearch;