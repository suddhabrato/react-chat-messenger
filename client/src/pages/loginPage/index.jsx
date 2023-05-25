const LoginPage = () => {
  return (
    <div
      className="hero min-h-screen -mt-16"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/6146933/pexels-photo-6146933.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary btn-outline btn-wide">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
