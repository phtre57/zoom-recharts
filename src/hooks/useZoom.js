import { useEffect, useState } from "react";

const increment = 0.1;
const minusIncrement = -0.1;

export const useZoom = (defaultValues) => {
  const [transform, setTransform] = useState(defaultValues);
  const [hovered, setHovered] = useState(false);
  const [isDown, setIsDown] = useState(false);

  console.log(isDown);

  useEffect(() => {
    window.addEventListener("mousedown", () => setIsDown(true));
    return () =>
      window.removeEventListener("mousedown", () => setIsDown(false));
  });

  useEffect(() => {
    window.addEventListener("mouseup", () => setIsDown(false));
    return () => window.removeEventListener("mouseup", () => setIsDown(false));
  });

  useEffect(() => {
    window.addEventListener("mousemove", handlePan);
    return () => window.removeEventListener("mousemove", handlePan);
  });

  const onMouseLeave = () => {
    setHovered(false);
  };

  const onMouseEnter = () => {
    setHovered(true);
  };

  const zoom = (delta) => {
    setTransform({
      ...transform,
      scale: transform.scale + delta
    });
  };

  const handleZoom = (e) => {
    if (hovered) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? increment : minusIncrement;
      zoom(delta);
    }
  };

  const handlePan = (e) => {
    if (hovered && isDown) {
      e.preventDefault();
      const deltaX = e.movementX;
      const deltaY = e.movementY;
      setTransform({
        ...transform,
        x: transform.x + deltaX,
        y: transform.y + deltaY
      });
    }
  };

  const zoomOut = () => {
    zoom(minusIncrement);
  };

  const zoomIn = () => {
    zoom(increment);
  };

  const zoomPercentage = transform.scale * 100;

  return {
    transform,
    onMouseLeave,
    onMouseEnter,
    handleZoom,
    handlePan,
    zoomIn,
    zoomOut,
    zoomPercentage
  };
};
