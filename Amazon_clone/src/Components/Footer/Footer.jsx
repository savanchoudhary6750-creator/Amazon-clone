import "./Footer.css";

function Footer() {

  // Scroll To Top Function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      {/* Back To Top */}
      <div className="footerTop">
        <button onClick={scrollToTop} className="topBtn">
          Back To Top
        </button>
      </div>

      {/* Footer Links */}
      <div className="footerContainer">

        <div className="footerSection">
          <h3>Get to Know Us</h3>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press Releases</p>
          <p>Amazon Science</p>
        </div>

        <div className="footerSection">
          <h3>Connect With Us</h3>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>

        <div className="footerSection">
          <h3>Make Money With Us</h3>
          <p>Sell on Amazon</p>
          <p>Affiliate Program</p>
          <p>Advertise Products</p>
        </div>

        <div className="footerSection">
          <h3>Help</h3>
          <p>Your Account</p>
          <p>Returns Centre</p>
          <p>Help Support</p>
          <p>100% Purchase Protection</p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footerBottom">
        <h2>Amazon Clone</h2>
        <p>© 2026 Amazon Clone. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;