/* eslint-disable react/prop-types */
const ImageUploadCarousel = ({ files, handleCancel }) => {
  const images = files;

  return (
    <div className="w-full h-24 flex items-center backdrop-blur-md bg-opacity-90 bg-base-300 absolute -top-24 overflow-x-auto p-4 border-b-2 border-neutral-300 border-opacity-70 rounded-t-2xl">
      <div className="flex items-center h-full gap-4">
        {images?.map((image) => (
          <div className="relative" key={image.id}>
            <img
              className="w-16 h-16 rounded-lg object-cover"
              src={image.previewUrl}
            />
            <button
              className="btn btn-xs btn-circle absolute -top-2 -right-2"
              onClick={() => handleCancel(image.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadCarousel;
