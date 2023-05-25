import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);

  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        //3 - pick the result and store the token
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

  return (
    <div
      className="hero min-h-screen -mt-16"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/6146933/pexels-photo-6146933.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">
            {isLoggedIn
              ? `Welcome ${JSON.parse(localStorage.getItem("user")).name}`
              : "Hello there"}
          </h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {!isLoggedIn ? (
            <button
              className="btn btn-primary btn-outline btn-wide"
              onClick={SignInWithGoogle}
            >
              Login with Google
            </button>
          ) : (
            <button className="btn btn-success btn-outline btn-wide">
              <Link to="/conversations">Go to conversations</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
