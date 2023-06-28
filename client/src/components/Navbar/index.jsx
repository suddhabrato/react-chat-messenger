import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut, signInWithGoogle } from "../../redux/actions/authActions";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 backdrop-blur bg-opacity-60 lg:px-8">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Messenger App
        </Link>
      </div>
      <div className="navbar-end">
        {user ? (
          <button className="btn btn-outline" onClick={logOut}>
            Log out
          </button>
        ) : (
          <button className="btn btn-outline" onClick={signInWithGoogle}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
