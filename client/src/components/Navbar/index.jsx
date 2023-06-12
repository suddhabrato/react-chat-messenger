import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);

  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        const token = await auth?.currentUser?.getIdToken(true);
        if (token) {
          localStorage.setItem("@token", token);
          localStorage.setItem("user", JSON.stringify(user));
          setLoggedIn(true);
          console.log("success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const LogoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("@token");

        setLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 backdrop-blur bg-opacity-60 lg:px-8">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Messenger App
        </Link>
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <button className="btn btn-outline" onClick={LogoutHandler}>
            Log out
          </button>
        ) : (
          <button className="btn btn-outline" onClick={SignInWithGoogle}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
