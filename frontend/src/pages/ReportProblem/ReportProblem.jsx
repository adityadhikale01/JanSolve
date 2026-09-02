import { useRef, useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";

import {
  ArrowLeft,
  Camera,
  Upload,
  MapPin,
  Users,
  Clock3,
  AlertTriangle,
  X,
  Image as ImageIcon,
  Video,
} from "lucide-react";

import CameraCapture from "./CameraCapture";
import LocationPicker from "./LocationPicker";
import "./ReportProblem.css";

const MAX_IMAGES = 5;
const MAX_VIDEOS = 2;

function ReportProblem() {
  const navigation = useNavigation();
  const actionData = useActionData();

//   const imageInputRef = useRef(null);
//   const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [media, setMedia] = useState([]);
  const [cameraMode, setCameraMode] = useState(null);
  const isSubmitting = navigation.state === "submitting";

  // -----------------------------
  // Camera Handler
  // -----------------------------
  const openPhotoCamera = () => {
  setCameraMode("photo");
  };

  const openVideoCamera = () => {
    setCameraMode("video");
  };

  const closeCamera = () => {
    setCameraMode(null);
  };

  const handleCameraCapture = (capturedMedia) => {
    const currentImages = media.filter(
      (item) => item.type === "image"
    ).length;

    const currentVideos = media.filter(
      (item) => item.type === "video"
    ).length;

    if (
      capturedMedia.type === "image" &&
      currentImages >= MAX_IMAGES
    ) {
      alert("You can add a maximum of 5 photos.");
      return;
    }

    if (
      capturedMedia.type === "video" &&
      currentVideos >= MAX_VIDEOS
    ) {
      alert("You can add a maximum of 2 videos.");
      return;
    }

    setMedia((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        file: capturedMedia.file,
        type: capturedMedia.type,
        preview: capturedMedia.preview,
      },
    ]);
  };

  // -----------------------------
  // Handle media selection
  // -----------------------------

  const handleMediaChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    const currentImages = media.filter(
      (item) => item.type === "image"
    ).length;

    const currentVideos = media.filter(
      (item) => item.type === "video"
    ).length;

    const newItems = [];

    for (const file of selectedFiles) {
      const type = file.type.startsWith("video/")
        ? "video"
        : "image";

      if (
        type === "image" &&
        currentImages +
          newItems.filter((item) => item.type === "image").length >=
          MAX_IMAGES
      ) {
        continue;
      }

      if (
        type === "video" &&
        currentVideos +
          newItems.filter((item) => item.type === "video").length >=
          MAX_VIDEOS
      ) {
        continue;
      }

      newItems.push({
        id: crypto.randomUUID(),
        file,
        type,
        preview: URL.createObjectURL(file),
      });
    }

    setMedia((prev) => [...prev, ...newItems]);

    event.target.value = "";
  };

  // -----------------------------
  // Remove media
  // -----------------------------

  const removeMedia = (id) => {
    setMedia((prev) => {
      const item = prev.find((mediaItem) => mediaItem.id === id);

      if (item?.preview) {
        URL.revokeObjectURL(item.preview);
      }

      return prev.filter((mediaItem) => mediaItem.id !== id);
    });
  };

  return (
    <main className="report-page">
      {/* Header */}

      <header className="report-header">
        <button
          type="button"
          className="back-button"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>Report a Problem</h1>
          <p>
            Help your community by reporting a local issue.
          </p>
        </div>
      </header>

      {/* Error / success message */}

      {actionData?.error && (
        <div className="report-alert report-alert-error">
          {actionData.error}
        </div>
      )}

      <Form
        method="post"
        className="report-form"
        onSubmit={(event) => {
          if (!location) {
            event.preventDefault();
            alert("Please capture the problem location.");
            return;
          }

          // Attach location to the submitted form
          const locationInput =
            document.createElement("input");

          locationInput.type = "hidden";
          locationInput.name = "location";
          locationInput.value = JSON.stringify(location);

          event.currentTarget.appendChild(locationInput);

          // Attach media references.
          // Actual Cloudinary upload will be handled
          // inside reportProblemAction.
          const mediaInput =
            document.createElement("input");

          mediaInput.type = "hidden";
          mediaInput.name = "mediaFiles";

          // Store files temporarily for action.
          // We'll replace this mechanism with a cleaner
          // upload manager in the next iteration.
          mediaInput.value = "";

          event.currentTarget.appendChild(mediaInput);
        }}
      >
      {/* -------------------------------- */}
      {/* LOCATION */}
      {/* -------------------------------- */}

      <section className="report-section">
        <div className="section-heading">
          <div className="section-icon">
            <MapPin size={20} />
          </div>

          <div>
            <h2>Problem Location</h2>

            <p>
              Mark the exact place where the problem exists.
            </p>
          </div>
        </div>

        <LocationPicker
          value={location}
          onChange={setLocation}
        />
      </section>

        {/* -------------------------------- */}
        {/* EVIDENCE */}
        {/* -------------------------------- */}

        <section className="report-section">
          <div className="section-heading">
            <div className="section-icon">
              <Camera size={20} />
            </div>

            <div>
              <h2>Evidence</h2>
              <p>
                Photos and videos help verify the problem.
              </p>
            </div>
          </div>


        <div className="evidence-actions">

            {/* Take Photo */}

            <button
              type="button"
              className="evidence-button"
              onClick={openPhotoCamera}
            >
              <Camera size={24} />

              <span>Take Photo</span>

              <small>Use your camera</small>
            </button>
            {/* Record Video */}

              <button
                type="button"
                className="evidence-button"
                onClick={openVideoCamera}
              >
                <Video size={24} />

                <span>Record Video</span>

                <small>Use your camera</small>
              </button>
            {/* Upload */}

            <button
              type="button"
              className="evidence-button"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <Upload size={24} />

              <span>Upload Files</span>

              <small>Photos & videos</small>
            </button>

          </div>

          {/* Device upload */}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={handleMediaChange}
          />

          {media.length > 0 && (
            <div className="media-preview-grid">
              {media.map((item) => (
                <div
                  className="media-preview"
                  key={item.id}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.preview}
                      alt="Problem evidence"
                    />
                  ) : (
                    <video
                      src={item.preview}
                      controls
                    />
                  )}

                  <button
                    type="button"
                    className="remove-media"
                    onClick={() =>
                      removeMedia(item.id)
                    }
                  >
                    <X size={16} />
                  </button>

                  <span className="media-type">
                    {item.type === "image" ? (
                      <ImageIcon size={13} />
                    ) : (
                      <Video size={13} />
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="evidence-note">
            Photos: max 10 MB each · Videos: max 50 MB each
          </p>
        </section>

        {/* -------------------------------- */}
        {/* DESCRIPTION */}
        {/* -------------------------------- */}

        <section className="report-section">
          <div className="section-heading">
            <div className="section-number">
              1
            </div>

            <div>
              <h2>Describe the Problem</h2>
              <p>
                Explain what is happening in your own words.
              </p>
            </div>
          </div>

          <textarea
            name="description"
            className="problem-textarea"
            placeholder="Example: There is a large pothole near the main road. It becomes dangerous for vehicles during rainfall..."
            maxLength={500}
            required
          />

          <span className="field-hint">
            Be specific about what you observed.
          </span>
        </section>

        {/* -------------------------------- */}
        {/* IMPACT */}
        {/* -------------------------------- */}

        <section className="report-section">
          <div className="section-heading">
            <div className="section-icon">
              <Users size={20} />
            </div>

            <div>
              <h2>Community Impact</h2>
              <p>
                Approximately how many people are affected?
              </p>
            </div>
          </div>

          <div className="option-grid">
            {[
              ["just_me", "Just me"],
              ["few", "A few people"],
              ["10_50", "10–50 people"],
              ["50_100", "50–100 people"],
              ["100_plus", "100+ people"],
              ["unknown", "Not sure"],
            ].map(([value, label]) => (
              <label
                className="option-card"
                key={value}
              >
                <input
                  type="radio"
                  name="affectedRange"
                  value={value}
                  defaultChecked={value === "unknown"}
                />

                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* -------------------------------- */}
        {/* DURATION */}
        {/* -------------------------------- */}

        <section className="report-section">
          <div className="section-heading">
            <div className="section-icon">
              <Clock3 size={20} />
            </div>

            <div>
              <h2>How Long Has This Been Happening?</h2>
              <p>
                An approximate duration is enough.
              </p>
            </div>
          </div>

          <div className="option-grid">
            {[
              ["today", "Today"],
              ["few_days", "A few days"],
              ["1_4_weeks", "1–4 weeks"],
              [
                "more_than_month",
                "More than a month",
              ],
              ["unknown", "Don't know"],
            ].map(([value, label]) => (
              <label
                className="option-card"
                key={value}
              >
                <input
                  type="radio"
                  name="duration"
                  value={value}
                  defaultChecked={value === "unknown"}
                />

                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* -------------------------------- */}
        {/* URGENCY */}
        {/* -------------------------------- */}

        <section className="report-section">
          <div className="section-heading">
            <div className="section-icon">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h2>Urgency</h2>
              <p>
                How urgently does this need attention?
              </p>
            </div>
          </div>

          <div className="urgency-options">
            {[
              ["normal", "Normal", "Not immediately dangerous"],
              [
                "attention",
                "Needs Attention",
                "Should be addressed soon",
              ],
              [
                "urgent",
                "Urgent / Dangerous",
                "Immediate safety concern",
              ],
            ].map(([value, label, description]) => (
              <label
                className="urgency-card"
                key={value}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={value}
                  defaultChecked={value === "normal"}
                />

                <div>
                  <strong>{label}</strong>
                  <span>{description}</span>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* -------------------------------- */}
        {/* SUBMIT */}
        {/* -------------------------------- */}

        <div className="submit-area">
          <p>
            By submitting, your report will be shared with
            the appropriate authorities for review.
          </p>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || !location}
          >
            {isSubmitting
              ? "Submitting Report..."
              : "Submit Report"}
          </button>
        </div>
        {cameraMode && (
      <CameraCapture
        mode={cameraMode}
        onCapture={handleCameraCapture}
        onClose={closeCamera}
          />
        )} 
      </Form>
    </main>
  );
}

export default ReportProblem;