import { createContext, useContext, useEffect, useState } from "react";

const viewportContext = createContext({
  width: 0,
  height: 0,
});

export const ViewportProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNodeArray;
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

export const useViewport = () => {
  const { width, height } = useContext(viewportContext);
  const breakpoint = 560;
  return { width, height, isMobile: width <= breakpoint };
};
