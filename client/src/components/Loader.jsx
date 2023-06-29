const Loader = ({ spinner, ring, ball, bars, infinity }) => {
  if (spinner)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (ring)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  if (ball)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );

  if (bars)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (infinity)
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loader;
