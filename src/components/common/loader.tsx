import { LoaderCircle } from "lucide-react";

const MiniSpinner = () => {
  return <LoaderCircle className="animate-rotate size-5" />;
};

const Loader = () => {
  return (
    <div>
      <div
        className="animate-spin mx-auto my-10 aspect-square w-12 rounded-full"
        style={{
          background:
            "radial-gradient(farthest-side, #1a1a1a 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, #1a1a1a)",
          mask: "radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)",
        }}
      ></div>
      <p className="mx-auto my-10 aspect-square w-12 rounded-full">Loading...</p>
    </div>
  );
};

export { Loader, MiniSpinner };
