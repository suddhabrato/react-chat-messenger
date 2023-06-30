const EmptyState = ({ title, subtitle, image, large }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-full">
        {image && (
          <img
            className={`${large ? "w-96" : "w-52"} object-cover`}
            src={image}
          />
        )}
        <h2 className="text-lg font-semibold text-center">{title}</h2>
        <p className="text-center px-4">{subtitle}</p>
      </div>
    </div>
  );
};

export default EmptyState;
