/* eslint-disable react/prop-types */
const Loader = ({ spinner, ring, ball, bars, infinity, text }) => {
  if (spinner)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="animate-pulse">{text}</p>
      </div>
    );

  if (ring)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
        <p className="animate-pulse">{text}</p>
      </div>
    );

  if (ball)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-ball loading-lg"></span>
        <p className="animate-pulse">{text}</p>
      </div>
    );

  if (bars)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
        <p className="animate-pulse">{text}</p>
      </div>
    );

  if (infinity)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
        <p className="animate-pulse">{text}</p>
      </div>
    );
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <span className="loading loading-dots loading-lg"></span>
      <p className="animate-pulse">{text}</p>
    </div>
  );
};

export default Loader;
