import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Automatically scrolls the window to the top (scrollY: 0) on every route navigation,
 * or scrolls smoothly to the target element if a hash (#id) is present.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly for any page transition rendering
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        return;
      }
    }

    // Immediately reset scroll position to the top of the page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, hash]);

  return null;
}
