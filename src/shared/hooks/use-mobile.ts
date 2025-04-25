
import { useEffect, useState } from "react";

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkMobile();

    // Set up event listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
