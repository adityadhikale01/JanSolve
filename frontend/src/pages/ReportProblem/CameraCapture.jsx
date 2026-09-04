import { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  Circle,
  RotateCcw,
  Square,
  X,
  Check,
  Video,
} from "lucide-react";

import "./CameraCapture.css";

function CameraCapture({ mode = "photo", onCapture, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [cameraError, setCameraError] = useState("");
  const [cameraLoading, setCameraLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const [capturedMedia, setCapturedMedia] = useState(null);

  const [facingMode, setFacingMode] = useState("environment");

  // ------------------------------------
  // Stop camera
  // ------------------------------------

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }
  }, []);

  // ------------------------------------
  // Start camera
  // ------------------------------------

  const startCamera = useCallback(async () => {
    try {
      setCameraLoading(true);
      setCameraError("");

      stopCamera();

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera access is not supported by this browser."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: {
              ideal: 1920,
            },
            height: {
              ideal: 1080,
            },
          },

          audio: mode === "video",
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraLoading(false);
    } catch (error) {
      console.error("Camera error:", error);

      setCameraLoading(false);

      if (error.name === "NotAllowedError") {
        setCameraError(
          "Camera permission was denied. Please allow camera access in your browser settings."
        );
      } else if (error.name === "NotFoundError") {
        setCameraError(
          "No camera was found on this device."
        );
      } else if (error.name === "NotReadableError") {
        setCameraError(
          "Unable to access the camera. Please close other apps using the camera and try again."
        );
      } else {
        setCameraError(
          "Unable to access the camera. Please check your browser permissions."
        );
      }
    }
  }, [facingMode, mode, stopCamera]);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) {
        startCamera();
      }
    });

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // ------------------------------------
  // Switch front / rear camera
  // ------------------------------------

  const switchCamera = () => {
    setFacingMode((current) =>
      current === "environment"
        ? "user"
        : "environment"
    );
  };

  // ------------------------------------
  // Capture photo
  // ------------------------------------

  const capturePhoto = () => {
    const video = videoRef.current;

    if (!video) return;

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File(
          [blob],
          `problem-photo-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        const preview = URL.createObjectURL(blob);

        setCapturedMedia({
          type: "image",
          file,
          preview,
        });

        stopCamera();
      },
      "image/jpeg",
      0.9
    );
  };

  // ------------------------------------
  // Start video recording
  // ------------------------------------

  const startRecording = () => {
    if (!streamRef.current) return;

    if (!window.MediaRecorder) {
      setCameraError(
        "Video recording is not supported by this browser."
      );
      return;
    }

    chunksRef.current = [];

    const supportedMimeType = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
      "video/mp4",
    ].find((type) =>
      MediaRecorder.isTypeSupported(type)
    );

    if (!supportedMimeType) {
      setCameraError(
        "Video recording is not supported by this browser."
      );
      return;
    }

    const recorder = new MediaRecorder(
      streamRef.current,
      {
        mimeType: supportedMimeType,
      }
    );

    recorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(
        chunksRef.current,
        {
          type: supportedMimeType,
        }
      );

      const extension = supportedMimeType.includes("webm")
        ? "webm"
        : "mp4";

      const file = new File(
        [blob],
        `problem-video-${Date.now()}.${extension}`,
        {
          type: supportedMimeType,
        }
      );

      const preview = URL.createObjectURL(blob);

      setCapturedMedia({
        type: "video",
        file,
        preview,
      });

      stopCamera();
    };

    recorder.start();

    setIsRecording(true);
    setRecordingTime(0);
  };

  // ------------------------------------
  // Stop recording
  // ------------------------------------

  const stopRecording = () => {
    if (
      recorderRef.current &&
      recorderRef.current.state !== "inactive"
    ) {
      recorderRef.current.stop();
    }

    setIsRecording(false);
  };

  // ------------------------------------
  // Recording timer
  // ------------------------------------

  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setRecordingTime(
        (current) => current + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // ------------------------------------
  // Accept captured media
  // ------------------------------------

  const useCapturedMedia = () => {
    if (!capturedMedia) return;

    onCapture(capturedMedia);

    setCapturedMedia(null);
    onClose();
  };

  // ------------------------------------
  // Retake
  // ------------------------------------

  const retake = async () => {
    if (capturedMedia?.preview) {
      URL.revokeObjectURL(
        capturedMedia.preview
      );
    }

    setCapturedMedia(null);

    await startCamera();
  };

  // ------------------------------------
  // Close
  // ------------------------------------

  const handleClose = () => {
    stopCamera();

    if (capturedMedia?.preview) {
      URL.revokeObjectURL(
        capturedMedia.preview
      );
    }

    onClose();
  };

  const formattedTime = `${String(
    Math.floor(recordingTime / 60)
  ).padStart(2, "0")}:${String(
    recordingTime % 60
  ).padStart(2, "0")}`;

  return (
    <div className="camera-overlay">
      <div className="camera-modal">

        {/* Header */}

        <div className="camera-header">
          <div>
            <strong>
              {mode === "photo"
                ? "Take Photo"
                : "Record Video"}
            </strong>

            <span>
              {mode === "photo"
                ? "Capture evidence of the problem"
                : "Record evidence of the problem"}
            </span>
          </div>

          <button
            type="button"
            className="camera-close"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Camera */}

        {!capturedMedia ? (
          <>
            <div className="camera-preview">

              {cameraLoading && (
                <div className="camera-loading">
                  Opening camera...
                </div>
              )}

              {cameraError && (
                <div className="camera-error">
                  <Camera size={32} />

                  <p>{cameraError}</p>

                  <button
                    type="button"
                    onClick={startCamera}
                  >
                    Try Again
                  </button>
                </div>
              )}

              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="camera-video"
              />

              {!cameraError &&
                !cameraLoading && (
                  <div className="camera-guide">
                    <div className="camera-guide-frame" />
                  </div>
                )}

              {/* Recording indicator */}

              {isRecording && (
                <div className="recording-indicator">
                  <Circle
                    size={10}
                    fill="currentColor"
                  />

                  {formattedTime}
                </div>
              )}

            </div>

            {/* Controls */}

            <div className="camera-controls">

              <button
                type="button"
                className="camera-switch"
                onClick={switchCamera}
                disabled={
                  cameraLoading ||
                  isRecording
                }
              >
                <RotateCcw size={21} />
                <span>Switch</span>
              </button>

              {mode === "photo" ? (
                <button
                  type="button"
                  className="capture-button"
                  onClick={capturePhoto}
                  disabled={
                    cameraLoading ||
                    !!cameraError
                  }
                >
                  <span>
                    <Camera size={27} />
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  className={`capture-button video-capture ${
                    isRecording
                      ? "recording"
                      : ""
                  }`}
                  onClick={
                    isRecording
                      ? stopRecording
                      : startRecording
                  }
                  disabled={
                    cameraLoading ||
                    !!cameraError
                  }
                >
                  <span>
                    {isRecording ? (
                      <Square
                        size={22}
                        fill="currentColor"
                      />
                    ) : (
                      <Video size={27} />
                    )}
                  </span>
                </button>
              )}

              <div className="camera-control-placeholder" />
            </div>
          </>
        ) : (
          <>
            {/* Captured preview */}

            <div className="captured-preview">

              {capturedMedia.type ===
              "image" ? (
                <img
                  src={
                    capturedMedia.preview
                  }
                  alt="Captured evidence"
                />
              ) : (
                <video
                  src={
                    capturedMedia.preview
                  }
                  controls
                  autoPlay
                  playsInline
                />
              )}

            </div>

            <div className="captured-actions">

              <button
                type="button"
                className="retake-button"
                onClick={retake}
              >
                <RotateCcw size={18} />
                Retake
              </button>

              <button
                type="button"
                className="use-media-button"
                onClick={useCapturedMedia}
              >
                <Check size={18} />
                Use This
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CameraCapture;
