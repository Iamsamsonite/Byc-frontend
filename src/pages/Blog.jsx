import React from 'react'
import { Frame170a,  Arthur, Frame170, Frame171} from '../asset'

const Blog = () => {
  return (
    <>

            <div className='text-center fw-bolder m-5'>
                <h3>BYC AFRICA Blog News</h3>
            </div>

        <div className="container">
            
            <div className="card mb-3 border-0 ps-5 ms-5" >
                <div className="row g-5">
                        <div className="col-md-5">
                            <img src={Frame170} className="img-fluid" style={{width:'550px', height:'300px'}} alt="..."/>
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Fashion trend forecast for  Summer 2021</h5>
                                <p className="card-text" style={{fontSize:'10px'}}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet <br />sint. Velit officia consequat duis enim velit mollit. Exercitation veniam <br />consequat sunt nostrud ametAmet minim mollit non deserunt ullamco <br />est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit <br />mollit. Exercitation veniam consequat sunt nostrud amet..</p>
                                <button className="btn btn-outline-secondary btn-md border border-2 border-black rounded-0 my-2"> <a className='text-decoration-none text-dark' href="Blogtwo"> Read More</a> <i className="bi bi-arrow-right"></i></button>
                                
                                <p><img src={Arthur} className="img-fluid mt-2" style={{width:'200px'}} alt="" /></p>
                                <p> <span className='fw-bold' style={{fontSize:'10px'}}>Wade Warren</span> <small className='p-4' style={{fontSize:'9px'}}>Fashion Designer</small></p>
                                
                            </div>
                        </div>
                </div>
            </div>

            <div className="card mb-3 border-0 p-5 m-5" >
                <div className="row g-0 pl-4">
                       
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Fashion trend forecast for  Summer 2021</h5>
                                <p className="card-text" style={{fontSize:'10px'}}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet <br />sint. Velit officia consequat duis enim velit mollit. Exercitation veniam <br />consequat sunt nostrud ametAmet minim mollit non deserunt ullamco <br />est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit <br />mollit. Exercitation veniam consequat sunt nostrud amet..</p>
                                <button className="btn btn-outline-secondary btn-md border border-2 border-black rounded-0 mt-2 mb-3"> <a className='text-decoration-none text-dark' href="Blogtwo">Read More </a><i className="bi bi-arrow-right"></i></button>
                                
                                <p><img src={Arthur} className="img-fluid" style={{width:'200px'}} alt="" /></p>
                                <p> <span className='fw-bold' style={{fontSize:'10px'}}>Wade Warren</span> <small className='p-4' style={{fontSize:'9px'}}>Fashion Designer</small></p>
                                
                            </div>
                        </div>
                        <div className="col-md-5">
                            <img src={Frame171} className="img-fluid" style={{width:'550px', height:'300px'}} alt="..."/>
                        </div>
                        
                </div>
            </div>

            <div className="card mb-3 border-0 ps-5 ms-5" >
                <div className="row g-5">
                        <div className="col-md-5">
                            <img src={Frame170a} className="img-fluid" style={{width:'550px', height:'300px'}} alt="..."/>
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Fashion trend forecast for  Summer 2021</h5>
                                <p className="card-text" style={{fontSize:'10px'}}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet <br />sint. Velit officia consequat duis enim velit mollit. Exercitation veniam <br />consequat sunt nostrud ametAmet minim mollit non deserunt ullamco <br />est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit <br />mollit. Exercitation veniam consequat sunt nostrud amet..</p>
                                <button className="btn btn-outline-secondary btn-md border border-2 border-black rounded-0 my-2" > <a  className='text-decoration-none text-dark' href="Blogtwo">Read More</a> <i className="bi bi-arrow-right"></i></button>
                                
                                <p><img src={Arthur} className="img-fluid mt-2" style={{width:'200px'}} alt="" /></p>
                                <p> <span className='fw-bold' style={{fontSize:'10px'}}>Wade Warren</span> <small className='p-4' style={{fontSize:'9px'}}>Fashion Designer</small></p>
                                
                            </div>
                        </div>
                </div>
            </div>
        </div>

        
       <div className='text-center'>
       <div className="btn-group rounded-0 shadow-sm gap-2 my-5 " role="group">
            <button type="button" className="btn shadow-sm "><i className="bi bi-arrow-left-short"></i></button>
            <button type="button" className="btn shadow-sm">1</button>
            <button type="button" className="btn shadow-sm ">2</button>
            <button type="button" className="btn shadow-sm " style={{borderColor:'#FB8200'}}>3</button>
            <button type="button" className="btn shadow-sm"><i className="bi bi-arrow-right-short"></i></button>

        </div>

       </div>








        
      
    </>
  )
}

export default Blog
