import React from 'react'

const Account = () => {
  return (
    <>

                <div className="container border rounded mt-5 ">
                    <div className="row">
                        <div className="col-sm-6 my-5">
                                <h6 className='fw-bold text-center'>Login</h6>

                                        <div className="form p-5 border-end">
                                        
                                             
                                            <div className="mb-3 mt-3">
                                                <label for="exampleInputEmail1" className="form-label" style={{fontSize:'12px'}}>E-mail</label>
                                                <input type="Email" className="form-control border-danger" placeholder="Joe@gmail.com" id="exampleInputEmail1" />
                                            </div>

                                            <div className="mb-3 mt-3">
                                                <label for="exampleInputPassword1" className="form-label" style={{fontSize:'12px'}}>Password</label>
                                                <input type="Password" className="form-control border-danger" placeholder="Joelove1@" id="exampleInputPassword1" />
                                            </div>

                                             
                                            <div className="row">
                                                <div className="col-sm-6">
                                                <div className="form-check">
                                                <input className="form-check-input mt-4"  type="radio" name="flexRadioDefault" style={{borderColor:'#BD3A3A'}} id="flexRadioDefault1"/>
                                                <label className="form-check-label  mt-4 ms-2 mb-3 display-7" style={{fontSize:'13px'}} for="flexRadioDefault1">
                                                    Remember me
                                                </label> 
                                                
                                                </div>
                                                </div>
                                                <div className="col-sm-6">
                                                <div className="form-check mt-3">
                                                <a href="#" className="text-dark display-7" style={{fontSize:'13px', textDecoration:"none"}}>Forgot your password?</a>
                                                </div>
                                                </div>
                                            </div>
                                            
                                            <div className="d-grid mt-5">
                                                <button className="btn btn-danger fw-bold" style={{fontSize:'12px'}} type="button">LOGIN</button>
                                                
                                            </div>
                                            
                                        
                                        
                                            
                    
                                        </div>
                                        </div>
                        
                        <div className="col-sm-6 my-5">


                                <h6 className='fw-bold text-center'style={{marginBottom:'100px'}}>Create your an account</h6>

                                <p className='text-center mt-5' style={{fontSize:'10px', marginBottom:'220px'}}>Create your customer account in just a few clicks! <br />
                                You can register using your e-mail address </p>
                                
                                <div className="d-grid mt-5">
                                                <button className="btn btn-danger fw-bold" style={{fontSize:'12px'}} type="button">CREATE AN ACCOUNT VIA E-MAIL</button>
                                                
                                    </div>
                        </div>


                    </div>
               </div>
      
    </>
  )
}

export default Account
