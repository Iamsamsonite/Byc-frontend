import React, {useState} from 'react'

const ToggleButton = () => {
    const [activeView, setActiveView] = useState('grid');

    const handleToggle = (view) => {
        setActiveView(view);
        console.log(`switched to ${view} view`);
        // Implement logic to switch between grid and list views here
    }
  return (
    <>
      <div className="d-flex me-5" >
      <button className={`btn ${activeView === 'list' ? 'btn-primary ' : 'btn-light card-list-btn'}`} onClick={() => handleToggle('list')}>
       <span className='card-list'><i className="bi bi-card-list"></i></span>
      </button>

        <button className={`btn ${activeView === 'grid' ? 'btn-white grid-fill-btn' : 'btn-light'} me-2`} onClick={() => handleToggle('grid')}>
        <span className='grid-fill'><i className="bi bi-grid-fill"></i></span>
        </button>
        
      </div>
    </>
  )
}

export default ToggleButton