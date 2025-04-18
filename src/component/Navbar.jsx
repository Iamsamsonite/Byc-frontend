import React, { useState } from 'react'
import '../index.css'
import { BYC } from '../asset'
import ExpandableSearch from './ExpandableSearch'


const styles = {
  
  
  productCategories: {
    backgroundColor: 'white',
    display: 'block',
  },
  categoryContainer: {
    marginBottom: '15px',
  
    
  },
  categoryHeader: {
    
    color: 'white',
    padding: '12px 20px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    margin: 0,
    fontSize: '18px',
  },
  arrow: {
    transition: 'transform 0.3s',
  },
  arrowRotated: {
    transform: 'rotate(180deg)',
  },
  subcategories: {
    padding: 0,
  },
  subcategory: {
    backgroundColor: '#f9f9f9',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
  },
  products: {
    padding: 0,
  },
  product: {
    padding: '10px 30px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  },
  hidden: {
    display: 'none',
  }
};



const Navbar = () => {

  const [bground, setbground] = useState();

   
    // Toggle main menu
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    
    // Toggle category
    const toggleCategory = (category) => {
      setOpenCategories({
        ...openCategories,
        [category]: !openCategories[category]
      });
    };
    
    // Toggle subcategory
    const toggleSubcategory = (subcategory) => {
      setOpenSubcategories({
        ...openSubcategories,
        [subcategory]: !openSubcategories[subcategory]
      });
    };
    
   // State for main menu visibility
   const [isMenuOpen, setIsMenuOpen] = useState(false);
    
   // State for category visibility
   const [openCategories, setOpenCategories] = useState({
     children: false,
     men: false,
     women: false
   });
   
   // State for subcategory visibility
   const [openSubcategories, setOpenSubcategories] = useState({
     childrenMale: false,
     childrenFemale: false
   });

  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  id="Shop-product"
                  href="#"
                  onClick={toggleMenu}
                >
                  Shop Product
                </a>
                <div className="container" >
                  {isMenuOpen && (
                    <div>
                      <div style={styles.productCategories}>
                        <h5 className="fw-bold"> <a className='text-decoration-none text-black' href="product">ALL PRODUCTS</a></h5>
                        <div className="row " style={{backgroundColor:'#BD3A3A'}}>
                          <div className="col-sm-4">
                            {/* CHILDREN Category */}
                            <div style={styles.categoryContainer}>
                              <div
                                style={styles.categoryHeader}
                                onClick={() => toggleCategory("children")}
                              >
                                <h2 style={styles.categoryTitle}>CHILDREN</h2>
                                <span
                                  style={
                                    openCategories.children
                                      ? { ...styles.arrow, ...styles.arrowRotated }
                                      : styles.arrow
                                  }
                                >
                                  ▼
                                </span>
                              </div>
                              {openCategories.children && (
                                <>
                                  {/* Male Subcategory */}
                                  <div
                                    style={styles.subcategory}
                                    onClick={() => toggleSubcategory("childrenMale")}
                                  >
                                    <span>MALE</span>
                                    <span>➤</span>
                                  </div>
                                  {openSubcategories.childrenMale && (
                                    <div style={styles.products}>
                                      <div style={styles.product}>Boxers</div>
                                      <div style={styles.product}>Pants</div>
                                      <div style={styles.product}>T-shirts</div>
                                      <div style={styles.product}>Singlet</div>
                                      <div style={styles.product}>Towels</div>
                                      <div style={styles.product}>Socks</div>
                                    </div>
                                  )}
                                  {/* Female Subcategory */}
                                  <div
                                    style={styles.subcategory}
                                    onClick={() => toggleSubcategory("childrenFemale")}
                                  >
                                    <span>FEMALE</span>
                                    <span>➤</span>
                                  </div>
                                  {openSubcategories.childrenFemale && (
                                    <div style={styles.products}>
                                      <div style={styles.product}>Panties</div>
                                      <div style={styles.product}>Pants</div>
                                      <div style={styles.product}>T-shirts</div>
                                      <div style={styles.product}>Singlet</div>
                                      <div style={styles.product}>Towels</div>
                                      <div style={styles.product}>Socks</div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          <div className="col-sm-4">
                            {/* MEN Category */}
                            <div style={styles.categoryContainer}>
                              <div
                                style={styles.categoryHeader}
                                onClick={() => toggleCategory("men")}
                              >
                                <h2 style={styles.categoryTitle}>MEN</h2>
                                <span
                                  style={
                                    openCategories.men
                                      ? { ...styles.arrow, ...styles.arrowRotated }
                                      : styles.arrow
                                  }
                                >
                                  ▼
                                </span>
                              </div>
                              {openCategories.men && (
                                <div style={styles.products}>
                                  <div style={styles.product}>Boxers</div>
                                  <div style={styles.product}>Pants</div>
                                  <div style={styles.product}>T-shirts</div>
                                  <div style={styles.product}>Singlet</div>
                                  <div style={styles.product}>Towels</div>
                                  <div style={styles.product}>Socks</div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-sm-4">
                            {/* WOMEN Category */}
                            <div style={styles.categoryContainer}>
                              <div
                                style={styles.categoryHeader}
                                onClick={() => toggleCategory("women")}
                              >
                                <h2 style={styles.categoryTitle}>WOMEN</h2>
                                <span
                                  style={
                                    openCategories.women
                                      ? { ...styles.arrow, ...styles.arrowRotated }
                                      : styles.arrow
                                  }
                                >
                                  ▼
                                </span>
                              </div>
                              {openCategories.women && (
                                <div style={styles.products}>
                                  <div style={styles.product}>Panties</div>
                                  <div style={styles.product}>Pants</div>
                                  <div style={styles.product}>T-shirts</div>
                                  <div style={styles.product}>Singlet</div>
                                  <div style={styles.product}>Towels</div>
                                  <div style={styles.product}>Socks</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
              </li>

              <li className="nav-item">
                  <a className="nav-link active" id="Blog" href="Blog">
                    Blog
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link active" id="Faq" href="Faq">
                    FAQ
                  </a>
                </li>
            </ul>
            <div className="img-fluid md-d-none" style={{ marginRight: "300px" }}>
              <img src={BYC} alt="" />
            </div>
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" id="About" href="About">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="Contact" href="Contact">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <ExpandableSearch />
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="person" href="Account">
                    <i className="bi bi-person"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${bground ? "bg-dark" : "bg-light"}`}
                    onClick={() => setbground(!bground)}
                    id="heart"
                    href="Mac"
                  >
                    <i className="bi bi-heart"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="cart" href="carttwo">
                    <i className="bi bi-cart3"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

 
export default Navbar
