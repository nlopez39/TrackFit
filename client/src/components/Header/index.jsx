import { Link, useLocation } from "react-router-dom";

// import { Menu } from "antd";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-dark text-light mb-4">
      <div className="d-flex justify-content-between navbar navbar-expand-lg pl-2 main-navbar">
        <nav>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="mr-5" style={{ fontSize: "35px" , fontWeight: "Bold" }}>
            <Link to="/" style={{ color: "#06b4d4" }}>
            🏋️ TrackFit
              </Link>

            </li>
        
            <li className="nav-item ml-10 mr-4 mt-2">
              <Link to="/workout" style={{ fontSize: "25px" , color: "#FAF9F0" }}>
                Workout
              </Link>
            </li>
            <li className="nav-item mr-4 mt-2">
              <Link to="/progress" style={{ fontSize: "25px" , color: "#FAF9F0" }}>
                Progress
              </Link>
            </li>
            <li className="nav-item mr-4 mt-2 ">
              <Link to="/diet" style={{ fontSize: "25px" , color: "#FAF9F0" }}>
                Diet
              </Link>
            </li>
            {/* <li className="nav-item mr-2">
              <Link to="/Account" style={{ color: "#ABA9A9" }}>
                Profile
              </Link>
            </li> */}
          </ul>
        </nav>

        <div>
          {Auth.loggedIn() ? (
            <>
         
              <div
                className="m-2"
                style={{ border: "none", color: "#06b4d4" , fontSize:"15pt" }}
                onClick={logout}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <Link className="m-2" style={{ color: "#06b4d4" }} to="/login">
                Login
              </Link>
              <Link className="m-2" style={{ color: "#06b4d4" }} to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
