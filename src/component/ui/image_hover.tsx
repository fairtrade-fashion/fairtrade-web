import * as React from "react";

const ImageHover: React.FC<{
  defaultImage: string;
  hoverImage: string;
  className?: string;
}> = ({ defaultImage, hoverImage, className }) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src={defaultImage}
        alt="Default"
        className="w-full h-full object-cover absolute transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0"
      />
      <img
        src={hoverImage}
        alt="Hover"
        className="w-full h-full object-cover absolute transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100"
      />
    </div>
  );
};

export default ImageHover;
