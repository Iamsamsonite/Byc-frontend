import React from 'react'
import {Frame169, Frame169a, Frame169b, Authorview} from '../asset'


const Africa = () => {
  return (
    <>
          <div className="container m-5">
                         <div className="card-group">
         
                             <div className="card col-md-3 shadow-lg border-0">
                                 <img src={Frame169} className="card-img-top" alt="..."/>
                                 <div className="card-body mt-2">
                                     <img src={Authorview} className="img-fluid" alt="" />
                                     <small><b> Wade Warren.</b> <span className='ml-5'>Fashion Designer</span></small>
                                     <h5 className="card-title mt-4">How important are clothes <br /> in your style?</h5>
                                     <p className="card-text fs-6 mt-4">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet</p>
                                 </div>
                                 <div className="card-footer">
                                     <button className='btn border-dark rounded-0'>Read more <i class="bi bi-arrow-right"></i></button>
                                 </div>
                             </div>
                             
                             <div className="col-md-1"></div>
                             <div className="card col-md-3 shadow-lg border-0">
                                 <img src={Frame169a} className="card-img-top" alt="..."/>
                                 <div className="card-body mt-2">
                                     <img src={Authorview} className="img-fluid" alt="" />
                                     <small><b> Wade Warren.</b> <span className='ml-5'>Fashion Designer</span></small>
                                     <h5 className="card-title mt-4">How important are pants <br /> in your style?</h5>
                                     <p className="card-text mt-4">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet</p>
                                 </div>
                                 <div className="card-footer">
                                     <button className='btn border-dark rounded-0'>Read more <i class="bi bi-arrow-right"></i></button>
                                 </div>
                             </div>
                             <div className="col-md-1"></div>
                             <div className="card col-md-3 shadow-lg border-0">
                                 <img src={Frame169b} className="card-img-top" alt="..."/>
                                 <div className="card-body mt-2">
                                     <img src={Authorview} className="img-fluid" alt="" />
                                     <small><b> Wade Warren.</b> <span className='ml-5'>Fashion Designer</span></small>
                                     <h5 className="card-title mt-4">How important are shoes <br /> in your style?</h5>
                                     <p className="card-text fs-6 mt-4">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet</p>
                                 </div>
                                 <div className="card-footer">
                                     <button className='btn border-dark rounded-0'>Read more <i class="bi bi-arrow-right"></i></button>
                                 </div>
                                 <div className="col-md-1"></div>
                             </div>
                         </div>
                     </div>
      
    </>
  )
}

export default Africa
