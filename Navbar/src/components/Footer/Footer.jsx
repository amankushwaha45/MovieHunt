import "./Footer.css";

import footerData from "./footerData";


import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";



const Footer = () => {


  return (

    <footer className="moviehunt-footer">



      {/* FOOTER LINKS */}


      <div className="moviehunt-footer-top">


        {footerData.map((section)=>(


          <div

          className="moviehunt-footer-section"

          key={section.title}

          >



            <h4>

              {section.title}

            </h4>





            <div className="moviehunt-footer-links">


              {section.links.map((link,index)=>(



                <span key={index}>


                  {link}



                  {index !== section.links.length - 1 && (


                    <span className="moviehunt-footer-divider">

                      {" | "}

                    </span>


                  )}



                </span>


              ))}



            </div>



          </div>



        ))}



      </div>









      {/* BRAND */}



      <div className="moviehunt-footer-brand">


        <div className="moviehunt-footer-line"></div>



        <h2>

          MovieHunt

        </h2>



        <div className="moviehunt-footer-line"></div>



      </div>









      {/* SOCIAL ICONS */}



      <div className="moviehunt-footer-social">





        <a

        href="https://www.facebook.com/"

        target="_blank"

        rel="noopener noreferrer"

        >

          <FaFacebookF />

        </a>







        <a

        href="https://twitter.com/"

        target="_blank"

        rel="noopener noreferrer"

        >

          <FaXTwitter />

        </a>







        <a

        href="https://www.instagram.com/"

        target="_blank"

        rel="noopener noreferrer"

        >

          <FaInstagram />

        </a>







        <a

        href="https://www.youtube.com/"

        target="_blank"

        rel="noopener noreferrer"

        >

          <FaYoutube />

        </a>







        <a

        href="https://www.pinterest.com/"

        target="_blank"

        rel="noopener noreferrer"

        >

          <FaPinterestP />

        </a>







        <a

        href="https://www.linkedin.com/"

        target="_blank"

        rel="noopener noreferrer"

        >

          <FaLinkedinIn />

        </a>





      </div>









      {/* COPYRIGHT */}




      <div className="moviehunt-footer-copy">



        <p>

          © 2026 MovieHunt Pvt. Ltd. All Rights Reserved.

        </p>




        <p>

          The content and images used on this website are copyright protected and belong to their respective owners.

        </p>



      </div>





    </footer>

  );


};



export default Footer;