const Navbar = () => {
  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 backdrop-blur bg-opacity-60 lg:px-8">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Messenger App</a>
      </div>
      <div className="navbar-end">
        <a className="btn">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
