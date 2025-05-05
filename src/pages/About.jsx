import React from 'react';
import {  Award, Frame178} from '../asset'
import Sing from '../component/Sing'


const awards = [
    { id: 1, title: 'Gold Prize for the Best Listed Firm Daesin Economy Research Institute', year: 1990 },
    { id: 2, title: 'Selected as representative enterprise of Korea for successful strategies on globalization of Korean brands by Korean Traders Association', year: 1993 },
    { id: 3, title: 'BYC selected as the most preferred brand for underwear by the Federation of Korean Women Economists', year: 1997 },
    { id: 4, title: 'Selected as the official commercializer of underwear for 1988 France Worldcup.', year: 1997 },
    { id: 5, title: 'The Prize for Export of Original Brands awarded as recommended by the Korean Assoiatioon of Textile Industries', year: 1999 },
    { id: 6, title: 'The 10th Prize for the Enterprise of Economical Justice by the enterprise Assessment commission',  year: 2001 },
    { id: 7, title: ' The Prize for Export of Original Brands awarded a recommended by the Korean Assoiatioon of Textile Industries', year: 2006 },
    { id: 8, title: 'Selected by korea management association as no.1 in brand influence among the mens underwear companies', year: 2006 },
    { id: 9, title: 'Selected as the Best Korean Enterprise of 1992 by Korean Management Association.',  year: 2011 }
  ];
  

const About = () => {

     


  return (
    <>
                         <nav aria-label="breadcrumb " className='container ms-2'>
  <ol className="breadcrumb">
    <li className="breadcrumb-item">  <a style={{textDecoration:'none'}} href="#">Home</a></li>
    <li className="breadcrumb-item active" aria-current="page">About us</li>
  </ol>
              </nav>

                <div className='text-center'>
                    <h5 className='fw-bolder'>ABOUT US</h5>
             </div>

            <div className="container">
            </div>
                        <div className="card mb-3 border-0 ps-5 ms-5" >
                                    <div className="row g-5 mt-3">
                                        <div className="col-md-1"></div>
                                            <div className="col-md-5">
                                                <img src={Frame178} className="img-fluid" alt="..."/>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <h5 className="card-title mt-5 mb-3 fw-bolder">ABOUT BYC AFRICA</h5>
                                                    <p className="card-text" style={{fontSize:'14px'}}>We are the sole distributor of BYC products in <br />Africa.
                                                     We import BYC products from Korea <br /> and distribute them to African countries <br />
                                                      through Onamik Holdings Limited.</p>                                                    
                                                </div>
                                            </div>
                                    </div>
                        </div> 
            

            
                <div className='text-center mt-5'>
                    <h3 className='fw-bolder'>WHAT OUR RECORD SAYS</h3>
                </div>
            
            <div className="container py-5">
      <div className="row g-4">
        {awards.map((award) => (
          <div key={award.id} className="col-12 col-sm-6 col-md-4">
            <div className="award-card p-4 h-100"
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'rgba(189, 58, 58, 0.04)';
    e.currentTarget.style.transform = 'scale(1.1)'; // Add scale for pop-up effect
    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)'; // Add shadow
    e.currentTarget.style.transition = 'all 0.3s ease'; // Smooth transition
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '#FBFBFB';
    e.currentTarget.style.transform = 'scale(1)'; // Reset scale to normal
    e.currentTarget.style.boxShadow = 'none'; // Remove shadow
  }}>
              <img src={Award} alt="Award" className="award-img img-fluid mb-3" />
              <p style={{fontSize:'14px'}}>{award.title}</p>
              
              <h4 className="fw-bolder text-danger mb-0" style={{fontSize:'12px'}} >Year: {award.year}</h4>
            </div>
          </div>
        ))}
      </div>
    


                    {/* <div className="award-grid">
      {awards.map((award) => (
        <div
          key={award.id}
          className={`award-card ${activeId === award.id ? 'active' : ''}`}
          onClick={() => setActiveId(award.id === activeId ? null : award.id)}
        >
          <img src={Award} alt="Award" className="img-fluid mb-2" />
          <h6 className="award-title" >{award.title}</h6>
           {activeId === award.id && (
            <h4 className="award-year text-danger" style={{fontSize:'12px'}}>Year: {award.year}</h4>
          )}
        </div>
      ))}
    </div> */}

                {/* <div class="row"> */}
                    {/* <div class="col-sm-3 mb-3 mb-sm-0 m-2">
                        <div class="card shadow-lg border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#BD3A3A0A"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> Gold Prize for the Best Listed Firm awarded
                                by Daesin Economy Research Institute.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 1990</h4>
                            </div>
                        </div>
                    // </div>
                    <div className='col-sm-1'></div> */}

                    {/* <div class="col-sm-3">
                    
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> Selected as representaive enterprise of Korea for
                                successful stategies on globalization of Korean brands 
                                by Korean Traders Association.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 1993</h4>
                            </div>
                        </div>
                    
                    </div> */}
                    {/* <div className='col-sm-1'></div>
                    <div class="col-sm-3">
                    <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> BYC' selected as the most preferred brand for
                            underwear by the Federation of Korean Women
                            Economists..</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 1997</h4>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* <div class="row mt-5"> */}
                    {/* <div class="col-sm-3 mb-3 mb-sm-0 m-2">
                        <div class="card shadow-md border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> Selected as the official commercializer of underwear for
                                1988 France Worldcup.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 1997</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-1'></div> */}

                    {/* <div class="col-sm-3">
                    
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}>  The Prize for Export of Original Brands awarded as 
                                        recommended by the Korean Assoiatioon of Textile
                                    Industries</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 1999</h4>
                            </div>
                        </div>
                    
                    </div>
                    <div className='col-sm-1'></div> */}
                    {/* <div class="col-sm-3">
                    <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> "The 10th Prize for the Enterprise of Economical
                                Justice" by the enterprise Assessment commission.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 2001</h4>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* <div class="row mt-5"> */}
                    {/* <div class="col-sm-3 mb-3 mb-sm-0 m-2">
                        <div class="card shadow-md border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> The Prize for Export of Original Brands awarded as
                            recommended by the Korean Assoiatioon of Textile
                                Industries</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 2006</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-1'></div> */}

                    {/* <div class="col-sm-3">
                    
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}>  Selected by korea management association as no.1 
                            in brand influence among the men's underwear
                            companies</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 2006</h4>
                            </div>
                        </div>
                    
                    </div>
                    <div className='col-sm-1'></div> */}
                    {/* <div class="col-sm-3">
                    <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> Selected as the Best Korean Enterprise of 1992 by
                                Korean Management Association.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 2011</h4>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>


        <div>
            

            
          <Sing />


               
        </div>

        

      
    </>
  )
}

export default About 
