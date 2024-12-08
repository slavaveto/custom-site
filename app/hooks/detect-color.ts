import { useEffect, useState } from "react";

const useDetectColorMode = () => {
  const [colorMode, setColorMode] = useState<string>("light");

  useEffect(() => {
    // Check the initial color scheme preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

    // Set the color mode based on the user's system preference
    const updateColorMode = () => {
      setColorMode(matchMedia.matches ? "dark" : "light");
    };

    // Listen for changes in the color scheme
    matchMedia.addEventListener("change", updateColorMode);

    // Initial color mode setup
    updateColorMode();

    // Clean up the event listener
    return () => matchMedia.removeEventListener("change", updateColorMode);
  }, []);

  console.log({ colorMode });

  return colorMode;
};

export default useDetectColorMode;
