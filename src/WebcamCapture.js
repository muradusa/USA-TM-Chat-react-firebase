import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

  return (
    <>
      {/* <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        videoConstraints={videoConstraints}
      /> */}
      <button onClick={capture}>Capture photo</button>
    </>
  );
};

export default WebcamCapture;
