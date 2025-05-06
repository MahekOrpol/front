import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';

const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); // delay to show the bar briefly

    return () => clearTimeout(timer);
  }, [location]);

  return null;
};

export default ProgressBar;
