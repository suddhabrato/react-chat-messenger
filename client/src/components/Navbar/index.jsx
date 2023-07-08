import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut, signInWithGoogle } from "../../redux/actions/authActions";
import { toggleTheme } from "../../redux/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const hasFetched = useSelector((state) => state.auth.completedFetch);
  const theme = useSelector((state) => state.user?.personalisations?.theme);

  document.documentElement.setAttribute("data-theme", theme);
  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 backdrop-blur bg-opacity-60 lg:px-8 h-16 box-border">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <svg
            className="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            width="2485"
            height="2500"
            viewBox="96 93 322 324"
            id="messenger"
          >
            <path
              fill="#0084ff"
              d="M257 93c-88.918 0-161 67.157-161 150 0 47.205 23.412 89.311 60 116.807V417l54.819-30.273C225.449 390.801 240.948 393 257 393c88.918 0 161-67.157 161-150S345.918 93 257 93zm16 202l-41-44-80 44 88-94 42 44 79-44-88 94z"
            ></path>
          </svg>{" "}
          Messenger
        </Link>
      </div>
      {hasFetched && (
        <div className="navbar-end">
          {user ? (
            <div className="flex gap-4 items-center flex-none cursor-pointer">
              <div className="dropdown dropdown-end dropdown-bottom cursor-pointer">
                <label
                  tabIndex={0}
                  className="btn btn-ghost p-1 box-border rounded-3xl"
                >
                  <div className="normal-case font-normal h-auto rounded-2xl truncate">
                    <div className="flex items-center gap-3 w-full">
                      <div className="avatar online">
                        <div className="w-10 rounded-full">
                          <img src={user.avatar} referrerPolicy="no-referrer" />
                        </div>
                      </div>
                      <div className="hidden lg:flex flex-col justify-center items-start gap-0 truncate w-full">
                        <h3 className="text-lg font-medium truncate leading-tight">
                          {user.displayname}
                        </h3>
                        <p className="text-xs leading-tight">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100/95 backdrop-blur-md rounded-box w-52"
                >
                  <li onClick={() => dispatch(toggleTheme())}>
                    <a>
                      <label className="swap swap-rotate">
                        <input
                          type="checkbox"
                          readOnly
                          checked={theme === "light"}
                        />
                        <svg
                          className="swap-on fill-current w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        <svg
                          className="swap-off fill-current w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                      </label>
                      Switch theme
                    </a>
                  </li>
                </ul>
              </div>

              <button className="btn btn-outline" onClick={logOut}>
                Log out
              </button>
            </div>
          ) : (
            <button className="btn btn-outline" onClick={signInWithGoogle}>
              <svg className="w-6 h-6 pb-0.5" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
              Log In
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
