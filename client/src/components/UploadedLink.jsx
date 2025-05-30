import { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

const UploadedLink = () => {
  const [copied, setCopied] = useState(false);
  const { linkUrl, status } = useSelector((state) => state.link);
  const scrollRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  useEffect(() => {
    if ((status === "succeeded" || status=="failed") && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  return (
    <div
      className="md:mx-16 mx-10 border border-zinc-700 rounded-lg p-6 mb-20 mt-10 mt shadow-lg"
      ref={scrollRef}
    >
      {status == "succeeded" && (
        <div>
          <h2 className="text-lg text-green-400 mb-4">
            ✅ File uploaded successfully!
          </h2>
          <div className="flex items-center justify-between bg-zinc-800 px-4 py-3 rounded-md">
            <p className="md:text-sm text-xs text-white truncate">{linkUrl}</p>
            <button
              onClick={handleCopy}
              className="text-white hover:text-green-400 transition duration-200 ml-4"
            >
              <FaCopy className="text-xl" />
            </button>
          </div>

          {copied && (
            <p className="text-green-400 text-xs mt-2 animate-pulse">
              Link copied to clipboard!
            </p>
          )}
          <p className="text-zinc-400 text-xs mt-6">
            Share this link with anyone — they can click to download the file
            directly.
          </p>
        </div>
      )}
      {status == "failed" && (
        <div>
          <h2 className="text-lg text-red-400 mb-4">
            ❌ Error Uploading file!
          </h2>
          <p className="text-xs text-zinc-400">
            Looks like that didn’t go through. Give it another shot — even
            dial-up had retries.
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadedLink;
