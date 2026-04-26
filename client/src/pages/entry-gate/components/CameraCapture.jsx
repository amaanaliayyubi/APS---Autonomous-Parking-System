import React, { useEffect, useRef, useState } from "react";
import { recognizePlate } from "../../../services/gate.service";

export default function CameraCapture({ setUIState, setLicensePlateNum }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🎥 Start camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError("Camera access denied");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 📸 Capture image
  const captureImage = async () => {
    const video = videoRef.current;

    if (!video || video.videoWidth === 0) {
      setError("Camera not ready yet");
      return;
    }

    setLoading(true);
    setError("");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 🔥 Resize for better performance
    const targetWidth = 800;
    const scale = targetWidth / video.videoWidth;

    canvas.width = targetWidth;
    canvas.height = video.videoHeight * scale;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 🔥 Compress image
    const base64 = canvas.toDataURL("image/jpeg", 0.7);

    try {
      const res = await recognizePlate(base64);

      if (res?.plate) {
        setLicensePlateNum(res.plate);
      } else {
        setError("Plate not detected. Enter manually.");
      }

      setUIState("USER_INPUT");
    } catch (err) {
      console.error(err);
      setError("Recognition failed");
      setUIState("USER_INPUT");
    }

    setLoading(false);
  };

  return (
    <section className="camera-capture">
      <h2>Scan License Plate</h2>

      <video ref={videoRef} autoPlay playsInline />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {error && <p className="error">{error}</p>}

      <button onClick={captureImage} disabled={loading}>
        {loading ? "Processing..." : "Capture"}
      </button>

      <button onClick={() => setUIState("USER_INPUT")}>
        Enter Manually
      </button>
    </section>
  );
}