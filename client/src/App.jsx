import { useSelector } from "react-redux";
import FileUpload from "./components/FileUpload";
import UploadedLink from "./components/UploadedLink";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function App() {
  const { status } = useSelector((state) => state.link);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const uploadRef = useRef(null);
  const linkRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.children, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
      });

      gsap.from(uploadRef.current.children, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-[1300px] mx-auto">
      <div
        ref={headingRef}
        className="flex flex-col justify-center items-center text-center gap-4 py-20 px-10"
      >
        <h1 className="font-extrabold md:text-7xl text-4xl md:leading-[80px] leading-[50px]">
          Share these Bits
        </h1>
        <p className="text-gray-200 tracking-tighter">
          Share your files from anywhere to anyone, securely with zero
          authentication hassle.
        </p>
      </div>

      <div ref={uploadRef}>
        <FileUpload />
      </div>

      {status !== "idle" && (
        <div ref={linkRef}>
          <UploadedLink />
        </div>
      )}
    </div>
  );
}

export default App;
