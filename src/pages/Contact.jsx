import React, {useRef} from 'react'
import { Mail, Map, Fone, Address } from '../asset'
import Sing from '../component/Sing'
import emailjs from 'emailjs-com';

    
  
const Contact = () => {
    const formRef = useRef();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      emailjs.sendForm(
        'YOUR_SERVICE_ID',     // 🔁 Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID',    // 🔁 Replace with your template ID
        formRef.current,
        'YOUR_USER_ID'         // 🔁 Replace with your public user ID
      )
      .then(() => {
        alert('Message sent successfully!');
        formRef.current.reset();
      })
      .catch((error) => {
        alert('Failed to send message: ' + error.text);
      });
    };
    
  return (
    <>
        <div>


        <nav aria-label="breadcrumb " className='container ms-2'>
  <ol className="breadcrumb">
    <li className="breadcrumb-item">  <a style={{textDecoration:'none'}} href="#">Home</a></li>
    <li className="breadcrumb-item active" aria-current="page">Contact us</li>
  </ol>
              </nav>

            <div className='text-center my-5'>
                    <h5 className='fw-bolder'>CONTACT US</h5>
             </div>

            <div className='container'>
                <img src={Map}  className='img-fluid pb-5' alt="" />
            </div>

            <div className="container">
                <div className="row ml-5">   
                    <div className="col-md-1">
                        
                        <img src={Address} className='img-fluid' alt="" />
                        
                    </div>
                    <div className="col-md-3 mt-2">
                        <h4 style={{fontSize:'10px', fontWeight:"bolder"}}>ADDRESS</h4>
                        <p style={{fontSize:'9px'}}> (Head Office)  <br /> 175 Cameroun Road Aba, Abia State.</p>
                         
                        
                    </div>

                    <div className="col-md-1">
                        
                        <img src={Fone} className='img-fluid' alt="" />

                        
                    </div>
                    <div className="col-md-3 mt-2">
                        <h4 style={{fontSize:'10px', fontWeight:"bold"}}>PHONE</h4>
                        <p style={{fontSize:'9px'}}>  08101375376 09053403403</p>
                         
                        
                    </div>

                    <div className="col-md-1">
                        
                        <img src={Mail} className='img-fluid' alt="" />

                        
                    </div>
                    <div className="col-md-3 mt-2">
                        <h4 style={{fontSize:'10px', fontWeight:"bold"}}>EMAIL ADDRESS</h4>
                        <p style={{fontSize:'9px'}}>  BYCAFRICA@gmail.com</p>
                         
                        
                    </div>
            
                </div>
            </div>

                <div className='ms-3 mt-5'>
                    <h4 className='fw-bolder'>Drop a message</h4>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="form ms-3">
      <div className="col-md-4">
        <div className="mb-3 mt-5">
          <label htmlFor="exampleInputPhone1" className="form-label" style={{ fontSize: '12px' }}>
            Phone
          </label>
          <input
            type="text"
            name="phone"
            className="form-control border-danger"
            placeholder="0123456789"
            id="exampleInputPhone1"
          />
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ fontSize: '12px' }}>
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control border-danger"
            placeholder="joe@gmail.com"
            id="exampleInputEmail1"
            required
          />
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="Textarea" className="form-label" style={{ fontSize: '12px' }}>
            Note
          </label>
          <textarea
            className="form-control border-danger"
            style={{ height: '90px' }}
            placeholder="Leave a comment here"
            id="Textarea"
            name="message"
            required
          />
        </div>

        <div className="d-grid mt-5">
          <button className="btn btn-danger" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>

                {/* <div className="form ms-3">
                    <div className="col-md-4">
                        <div class="mb-3 mt-5">
                            <label for="exampleInputPhone1" class="form-label"  style={{fontSize:'12px'}}>Phone</label>
                            <input type="phone" class="form-control border-danger" placeholder="0123456789" id="exampleInputPhone1" aria-describedby="phoneHelp" />
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="exampleInputEmail1" class="form-label" style={{fontSize:'12px'}}>Email address</label>
                            <input type="Email" class="form-control border-danger" placeholder="Samson@gmail.com" id="exampleInputEmail1" />
                        </div>

                        <div class="mb-3 mt-3">
                            <label for="Textarea" class="form-label" style={{fontSize:'12px' }}>Note</label>
                            <textarea class="form-control border-danger" style={{height:'90px'}} placeholder="Leave a comment here" id="Textarea"></textarea>
                            
                        </div>
                        
                        <div class="d-grid mt-5">
                            <button class="btn btn-danger" type="button"
                            onClick={handleSubmit}>Submit</button>
                            
                        </div>
                        
                    
                    </div>
                     
  
                </div> */}
            
                <Sing />
            
 
      
            
            
            
             
        </div>
    </>
  )
}

export default Contact
