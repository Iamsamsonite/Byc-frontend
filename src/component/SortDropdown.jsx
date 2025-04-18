import React, { useState, useRef, useEffect } from 'react';

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Most Sold');
  const dropdownRef = useRef(null);
  
  const options = [
    'Most Sold',
    'Newest',
    'Price: Low to High',
    'Price: High to Low',
    'Rating'
  ];
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative" ref={dropdownRef}>
        <div className="text-center text-black uppercase" style={{fontSize:'8px'}} >
          
          SORT BY
        </div>
        
        <button
          className="border bg-white" style={{fontSize:'8px', width:'80px', height:'23px'}}
          onClick={toggleDropdown}
        >
          <span className="text-base">{selectedOption}</span>
          <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} style={{marginLeft:'5px'}}>
            ▼
          </span>
        </button>
        
        {isOpen && (
          <div className="absolute">
            {options.map((option) => (
              <div
                key={option}
                className="text-black ms-2" style={{fontSize:'8px', width:'80px', height:'23px'}}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#F5F5F5')}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;