import React, {useState} from 'react'

const SortByDrop = () => {
        const [sortOption, setSortOption] = useState('');
    
        const handleSort = (option ) => {
            setSortOption(option);
            console.log('selected sort option:', option);
            // Implement sorting logic here based on the selected option
        };
    
        const sortOptions = [
            { value: 'Most Sold', label: 'Most Sold' },
            { value: 'price LowToHigh', label: 'Price: Low to High' },
            { value: 'price HighToLow', label: 'Price: High to Low' },
            { value: 'newest', label: 'Newest' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'best rated', label: 'Best Rated' },
            { value: 'most popular', label: 'Most Popular' },
          
        ];
      return (
        <>
          <div className="container">
             <div className="position-relative sort-by-wrapper ">
                <span className='sort-by-text'>Sort By</span>
                
                <div className="dropdown">
                <button className="btn btn-white dropdown-btn-ds dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className='me-4'>{sortOption || 'most sold'}</span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {sortOptions.map((option) => (
                    <li key={option.value}>
                        <button className="dropdown-item" onClick={() => handleSort(option.value)}>
                        {option.label}
                        </button>
                    </li>
                    ))}
                </ul>     
                </div>
             </div>
          </div>
        </>
      )
}

export default SortByDrop