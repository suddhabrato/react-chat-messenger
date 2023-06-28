import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signInWithGoogle } from "../../redux/actions/authActions";

const LoginPage = () => {
  const user = useSelector((state) => state.auth.user);

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
            {user ? `Welcome ${user.displayname}` : "Hello there"}
          </h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {!user ? (
            <button
              className="btn btn-primary btn-outline btn-wide"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
          ) : (
            <Link to="/conversations">
              <button className="btn btn-success btn-outline btn-wide">
                Go to conversations
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
