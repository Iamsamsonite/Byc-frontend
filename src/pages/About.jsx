import React from 'react'
import {  Award, Frame178, Arrowright} from '../asset'
import Sing from '../component/Sing'

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
                        <div className="card mb-3 border-0 ps-5 ms-5" >
                                    <div className="row g-5">
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
            </div>

            

            <div className="container">
                    <div className='text-center m-5'>
                        <h4 className='fw-bolder'>WHAT OUR RECORD SAYS</h4>
                    </div>

                <div class="row">
                    <div class="col-sm-3 mb-3 mb-sm-0 m-2">
                        <div class="card shadow-lg border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#BD3A3A0A"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> Gold Prize for the Best Listed Firm awarded
                                by Daesin Economy Research Institute.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 1990</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-1'></div>

                    <div class="col-sm-3">
                    
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> Selected as representaive enterprise of Korea for
                                successful stategies on globalization of Korean brands 
                                by Korean Traders Association.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 1993</h4>
                            </div>
                        </div>
                    
                    </div>
                    <div className='col-sm-1'></div>
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
                </div>

                <div class="row mt-5">
                    <div class="col-sm-3 mb-3 mb-sm-0 m-2">
                        <div class="card shadow-md border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> Selected as the official commercializer of underwear for
                                1988 France Worldcup.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 1997</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-1'></div>

                    <div class="col-sm-3">
                    
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
                    <div className='col-sm-1'></div>
                    <div class="col-sm-3">
                    <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> "The 10th Prize for the Enterprise of Economical
                                Justice" by the enterprise Assessment commission.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 2001</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-5">
                    <div class="col-sm-3 mb-3 mb-sm-0 m-2">
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
                    <div className='col-sm-1'></div>

                    <div class="col-sm-3">
                    
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}>  Tselected by korea management association as no.1 
                            in brand influence among the men's underwear
                            companies</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 2006</h4>
                            </div>
                        </div>
                    
                    </div>
                    <div className='col-sm-1'></div>
                    <div class="col-sm-3">
                    <div class="card shadow-sm border-0">
                            <div class="card-body p-4" style={{backgroundColor:"#FBFBFB"}}>
                                <img src={Award}  className='img-fluid mb-2' alt="" />
                                <p classname="card-text" style={{fontSize:'10px'}}> Selected as the Best Korean Enterprise of 1992 by
                                Korean Management Association.</p>
                                <h4 className='fw-bolder text-danger' style={{fontSize:'12px'}}>Year 2011</h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        <div>
            

            
          <Sing />


               
        </div>

        

      
    </>
  )
}

export default About 
