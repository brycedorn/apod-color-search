export const lazyLoad = (image, options) => {
  const { src, callback } = options;

  const onLoad = () => {
    if (callback) {
      callback();
    }
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (!image.src) {
        image.src = src;
      }

      if (image.complete) {
        onLoad();
      } else {
        image.addEventListener("load", onLoad);
      }
    }
  });

  observer.observe(image);

  return {
    destroy() {
      image.removeEventListener("load", onLoad);
    },
  };
};
