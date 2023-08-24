import React, { useEffect, useRef } from 'react';
import "./list_item.css";


const LazyImage = ({ src }) => {
  const imgRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          imgRef.current.src = src;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return <img className='grid-image' ref={imgRef} />;
};

export default LazyImage;