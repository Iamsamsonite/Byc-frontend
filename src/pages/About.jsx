 import React from 'react';
import { Award, Frame178 } from '../asset';
import Sing from '../component/Sing';

const awards = [
  { id: 1, title: 'Gold Prize for the Best Listed Firm Daesin Economy Research Institute', year: 1990 },
  { id: 2, title: 'Selected as representative enterprise of Korea for successful strategies on globalization of Korean brands by Korean Traders Association', year: 1993 },
  { id: 3, title: 'BYC selected as the most preferred brand for underwear by the Federation of Korean Women Economists', year: 1997 },
  { id: 4, title: 'Selected as the official commercializer of underwear for 1988 France Worldcup.', year: 1997 },
  { id: 5, title: 'The Prize for Export of Original Brands awarded as recommended by the Korean Assoiatioon of Textile Industries', year: 1999 },
  { id: 6, title: 'The 10th Prize for the Enterprise of Economical Justice by the enterprise Assessment commission', year: 2001 },
  { id: 7, title: 'The Prize for Export of Original Brands awarded as recommended by the Korean Assoiatioon of Textile Industries', year: 2006 },
  { id: 8, title: 'Selected by korea management association as no.1 in brand influence among the mens underwear companies', year: 2006 },
  { id: 9, title: 'Selected as the Best Korean Enterprise of 1992 by Korean Management Association.', year: 2011 },
];

const About = () => {
  return (
    <>
      <style>
        {`
          .award-card {
            background-color: #FBFBFB;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .award-img {
            max-width: 50px;
            height: auto;
          }
          .about-img {
            max-width: 100%;
            height: auto;
            object-fit: cover;
          }
          .breadcrumb {
            margin-left: 0;
            padding: 10px 15px;
          }
          .card-body p {
            line-height: 1.6;
          }
          /* Prevent overflow and shaking */
          body, html {
            overflow-x: hidden;
          }
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .card-body {
              padding: 15px;
            }
            .card-title {
              font-size: 1.25rem;
            }
            .card-text {
              font-size: 12px;
            }
            .award-card {
              padding: 15px;
            }
            .award-card p {
              font-size: 12px;
            }
            .award-card h4 {
              font-size: 10px;
            }
            .award-img {
              max-width: 40px;
            }
            .ms-5, .ps-5 {
              margin-left: 0 !important;
              padding-left: 0 !important;
            }
          }
          @media (max-width: 576px) {
            .breadcrumb {
              font-size: 14px;
            }
            .card-title {
              font-size: 1.1rem;
            }
            .card-text {
              font-size: 11px;
            }
            .award-card {
              padding: 10px;
            }
            .award-card p {
              font-size: 11px;
            }
            .award-card h4 {
              font-size: 9px;
            }
            .award-img {
              max-width: 35px;
            }
          }
        `}
      </style>

      <nav aria-label="breadcrumb" className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a style={{ textDecoration: 'none' }} href="#">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">About us</li>
        </ol>
      </nav>

      <div className="text-center my-4">
        <h5 className="fw-bolder">ABOUT US</h5>
      </div>

      <div className="container">
        <div className="card mb-3 border-0">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-6 order-md-2">
              <img src={Frame178} className="about-img img-fluid" alt="BYC Africa" />
            </div>
            <div className="col-12 col-md-6 order-md-1">
              <div className="card-body">
                <h5 className="card-title mt-3 mb-3 fw-bolder">ABOUT BYC AFRICA</h5>
                <p className="card-text">
                  We are the sole distributor of BYC products in Africa. We import BYC products from Korea and distribute them to African countries through Onamik Holdings Limited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center my-5">
        <h3 className="fw-bolder">WHAT OUR RECORD SAYS</h3>
      </div>

      <div className="container py-5">
        <div className="row g-3">
          {awards.map((award) => (
            <div key={award.id} className="col-12 col-sm-6 col-md-4">
              <div
                className="award-card p-3 h-100"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(189, 58, 58, 0.04)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FBFBFB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img src={Award} alt="Award" className="award-img img-fluid mb-3" />
                <p>{award.title}</p>
                <h4 className="fw-bolder text-danger mb-0">Year: {award.year}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sing />
    </>
  );
};

export default About;