import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileThunk } from "../state/slices/linkSlice";

gsap.registerPlugin(gsap.plugins.ModifiersPlugin);

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const stepsRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.link);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) return;
    dispatch(uploadFileThunk(file));
  };

  useEffect(() => {
    if (status == "succeeded") {
      setFile(null);
    }
  }, [status]);

  useEffect(() => {
    const el = stepsRef.current;

    gsap.to(el, {
      backgroundPosition: "200% center",
      ease: "linear",
      duration: 8,
      repeat: -1,
    });

    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    const textWidth = text.offsetWidth / 2;

    gsap.to(text, {
      x: -textWidth,
      duration: 15,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          let val = parseFloat(x);
          return val <= -textWidth ? val + textWidth : val;
        }),
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center md:px-16 px-10 pb-10">
      {/* Upload & Steps Container */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Upload Box */}
        <div className="md:w-[55%] w-full h-fit border border-zinc-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center text-center border-2 border-dashed border-white p-6 rounded-md transition-all duration-200 active:scale-95"
          >
            <FaUpload className="text-white text-3xl mb-2 animate-pulse" />
            <p className="md:text-lg">Upload your files...</p>
            <p className="md:text-sm text-xs mt-1 text-zinc-400">
              Click to browse
            </p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <div className="mt-4 p-3 bg-zinc-800 rounded-md md:text-sm text-xs break-words">
              <p>
                <span className="text-zinc-400">Filename:</span> {file.name}
              </p>
              <p>
                <span className="text-zinc-400">Size:</span>{" "}
                {(file.size / 1024).toFixed(2)} KB
              </p>
              <p>
                <span className="text-zinc-400">Type:</span> {file.type}
              </p>
            </div>
          )}
        </div>

        {/* Steps Box */}
        <div className="md:w-[45%]">
          <div
            ref={stepsRef}
            className="h-fit w-full border border-zinc-700 rounded-lg p-8 shadow-md space-y-4 flex justify-center flex-col bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-[length:200%_100%]"
          >
            <h2 className="text-xl text-white mb-4 underline underline-offset-4">
              Steps:
            </h2>
            <div className="space-y-2 md:text-sm text-xs">
              <p>1. Upload a file.</p>
              <p>2. Copy generated link.</p>
              <p>3. Share to anyone you want!</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              ref={containerRef}
              className={`relative w-72 mt-6 h-12 overflow-hidden border border-zinc-700 bg-zinc-900 rounded-md flex items-center ${
                file == null || status == "loading"
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={file == null || status == "loading"}
              onClick={handleUpload}
            >
              <div
                ref={textRef}
                className="absolute top-0 left-0 flex whitespace-nowrap h-full items-center"
                style={{ willChange: "transform" }}
              >
                <span className="px-4">
                  🚀 Upload file... 🚀 Upload file... 🚀 Upload file...{" "}
                </span>
                <span className="px-4">
                  🚀 Upload file... 🚀 Upload file... 🚀 Upload file...{" "}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
