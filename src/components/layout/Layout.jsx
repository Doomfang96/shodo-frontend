import PropTypes from "prop-types";
import Header from "./Header.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./Layout.scss";

function Layout(props) {

  return (
    <div className="layout">
      <Header/>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
