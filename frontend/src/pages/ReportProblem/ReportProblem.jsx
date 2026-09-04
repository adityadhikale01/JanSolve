import { useEffect, useRef, useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
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
import { uploadMedia } from "../../utils/uploadMedia";
import { validateMedia } from "../../utils/validateMedia";
import "./ReportProblem.css";

const MAX_IMAGES = 5;
const MAX_VIDEOS = 2;

const IMPACT_VALUES = [
  "just_me",
  "few",
  "10_50",
  "50_100",
  "100_plus",
  "unknown",
];

const DURATION_VALUES = [
  "today",
  "few_days",
  "1_4_weeks",
  "more_than_month",
  "unknown",
];

const URGENCY_VALUES = [
  "normal",
  "attention",
  "urgent",
];

const validateLocation = (selectedLocation) => {
  const coordinates = selectedLocation?.coordinates;

  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return "Please select the problem location on the map.";
  }

  const [longitude, latitude] = coordinates;

  if (
    typeof longitude !== "number" ||
    typeof latitude !== "number" ||
    Number.isNaN(longitude) ||
    Number.isNaN(latitude) ||
    longitude < -180 ||
    longitude > 180 ||
    latitude < -90 ||
    latitude > 90
  ) {
    return "The selected location looks invalid. Please choose it again on the map.";
  }

  return "";
};

const normalizeLocation = (selectedLocation) => ({
  type: "Point",
  coordinates: selectedLocation.coordinates,
  address: selectedLocation.address || "Selected location",
});

function ReportProblem() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();

  const fileInputRef = useRef(null);
  const mediaRef = useRef([]);

  const [location, setLocation] = useState(null);
  const [media, setMedia] = useState([]);
  const [cameraMode, setCameraMode] = useState(null);
  const [formError, setFormError] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [expectedSuccessId, setExpectedSuccessId] = useState(null);

  const isRouterSubmitting = navigation.state === "submitting";
  const isUploading = !!uploadStatus;
  const isSubmitting = isRouterSubmitting || isUploading;
  const showSuccess =
    actionData?.success &&
    actionData.submissionId === expectedSuccessId;

  useEffect(() => {
    mediaRef.current = media;
  }, [media]);

  useEffect(() => {
    return () => {
      mediaRef.current.forEach((item) => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, []);

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
    const validation = validateMedia(capturedMedia.file);

    if (!validation.valid) {
      setFormError(validation.message);
      URL.revokeObjectURL(capturedMedia.preview);
      return;
    }

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
      setFormError("You can add a maximum of 5 photos.");
      URL.revokeObjectURL(capturedMedia.preview);
      return;
    }

    if (
      capturedMedia.type === "video" &&
      currentVideos >= MAX_VIDEOS
    ) {
      setFormError("You can add a maximum of 2 videos.");
      URL.revokeObjectURL(capturedMedia.preview);
      return;
    }

    setFormError("");
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
    const errors = [];

    for (const file of selectedFiles) {
      const validation = validateMedia(file);

      if (!validation.valid) {
        errors.push(validation.message);
        continue;
      }

      const type = file.type.startsWith("video/")
        ? "video"
        : "image";

      if (
        type === "image" &&
        currentImages +
          newItems.filter((item) => item.type === "image").length >=
          MAX_IMAGES
      ) {
        errors.push("You can add a maximum of 5 photos.");
        continue;
      }

      if (
        type === "video" &&
        currentVideos +
          newItems.filter((item) => item.type === "video").length >=
          MAX_VIDEOS
      ) {
        errors.push("You can add a maximum of 2 videos.");
        continue;
      }

      newItems.push({
        id: crypto.randomUUID(),
        file,
        type,
        preview: URL.createObjectURL(file),
      });
    }

    if (newItems.length) {
      setMedia((prev) => [...prev, ...newItems]);
    }

    setFormError([...new Set(errors)].join(" "));
    event.target.value = "";
  };

  const removeMedia = (id) => {
    setMedia((prev) => {
      const item = prev.find((mediaItem) => mediaItem.id === id);

      if (item?.preview) {
        URL.revokeObjectURL(item.preview);
      }

      return prev.filter((mediaItem) => mediaItem.id !== id);
    });
  };

  const validateReportMedia = () => {
    const imageCount = media.filter(
      (item) => item.type === "image"
    ).length;
    const videoCount = media.filter(
      (item) => item.type === "video"
    ).length;

    if (imageCount > MAX_IMAGES) {
      return "You can add a maximum of 5 photos.";
    }

    if (videoCount > MAX_VIDEOS) {
      return "You can add a maximum of 2 videos.";
    }

    for (const item of media) {
      const validation = validateMedia(item.file);

      if (!validation.valid) {
        return validation.message;
      }
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setFormError("");
    setUploadStatus(null);
   
    const formData = new FormData(event.currentTarget);
    
    const description = String(
      formData.get("description") || ""
    ).trim();
    const affectedRange =
      formData.get("affectedRange") || "unknown";
    const duration = formData.get("duration") || "unknown";
    const urgency = formData.get("urgency") || "normal";

    const locationError = validateLocation(location);

    if (locationError) {
      setFormError(locationError);
      return;
    }

    if (description.length < 10) {
      setFormError(
        "Please describe the problem in at least 10 characters."
      );
      return;
    }

    if (description.length > 500) {
      setFormError(
        "Please keep the description under 500 characters."
      );
      return;
    }

    if (!IMPACT_VALUES.includes(affectedRange)) {
      setFormError("Please select a valid community impact.");
      return;
    }

    if (!DURATION_VALUES.includes(duration)) {
      setFormError("Please select a valid duration.");
      return;
    }

    if (!URGENCY_VALUES.includes(urgency)) {
      setFormError("Please select a valid urgency.");
      return;
    }

    const mediaError = validateReportMedia();

    if (mediaError) {
      setFormError(mediaError);
      return;
    }

    try {
      const uploadedMedia = [];

      for (let index = 0; index < media.length; index += 1) {
        setUploadStatus({
          current: index + 1,
          total: media.length,
          progress: 0,
        });

        const uploaded = await uploadMedia(
          media[index].file,
          (progress) => {
            setUploadStatus({
              current: index + 1,
              total: media.length,
              progress,
            });
          }
        );

        uploadedMedia.push(uploaded);
      }

      setUploadStatus(null);

      const reportPayload = {
        description,
        location: normalizeLocation(location),
        media: uploadedMedia,
        impact: {
          affectedRange,
        },
        duration,
        urgency,
      };

      const actionFormData = new FormData();
      const submissionId = crypto.randomUUID();

      actionFormData.set(
        "report",
        JSON.stringify(reportPayload)
      );
      actionFormData.set("submissionId", submissionId);
      setExpectedSuccessId(submissionId);

      submit(actionFormData, {
        method: "post",
        action: "/issues/new",
      });
    } catch (error) {
      console.error("Report submission error:", error);
      setUploadStatus(null);
      setFormError(
        "We couldn't upload your evidence. Please check your internet connection and try again."
      );
    }
  };

  const handleReportAnother = () => {
    mediaRef.current.forEach((item) => {
      if (item.preview) {
        URL.revokeObjectURL(item.preview);
      }
    });

    mediaRef.current = [];
    setMedia([]);
    setLocation(null);
    setCameraMode(null);
    setFormError("");
    setUploadStatus(null);
    setExpectedSuccessId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (showSuccess && actionData?.success) {
    return (
      <main className="report-page">
        <section className="report-success">
          <div className="report-success-icon">✓</div>
          <h1>Report Submitted</h1>
          <p>
            Thank you for helping improve your community.
          </p>
          <p>
            Your report has been prepared successfully.
          </p>
          <button
            type="button"
            className="submit-button"
            onClick={handleReportAnother}
          >
            Report Another Problem
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="report-page">
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

      {actionData?.error && (
        <div className="report-alert report-alert-error">
          {actionData.error}
        </div>
      )}

      {formError && (
        <div className="report-alert report-alert-error">
          {formError}
        </div>
      )}

      <Form
        method="post"
        className="report-form"
        onSubmit={handleSubmit}
      >
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
            <button
              type="button"
              className="evidence-button"
              onClick={openPhotoCamera}
              disabled={isSubmitting}
            >
              <Camera size={24} />
              <span>Take Photo</span>
              <small>Use your camera</small>
            </button>

            <button
              type="button"
              className="evidence-button"
              onClick={openVideoCamera}
              disabled={isSubmitting}
            >
              <Video size={24} />
              <span>Record Video</span>
              <small>Use your camera</small>
            </button>

            <button
              type="button"
              className="evidence-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
            >
              <Upload size={24} />
              <span>Upload Files</span>
              <small>Photos & videos</small>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            disabled={isSubmitting}
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
                    onClick={() => removeMedia(item.id)}
                    disabled={isSubmitting}
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
            Photos: max 10 MB each. Videos: max 50 MB each.
          </p>
        </section>

        <section className="report-section">
          <div className="section-heading">
            <div className="section-number">1</div>

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
              ["10_50", "10-50 people"],
              ["50_100", "50-100 people"],
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
              ["1_4_weeks", "1-4 weeks"],
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

        <div className="submit-area">
          {uploadStatus && (
            <div className="upload-status">
              Uploading evidence {uploadStatus.current} of{" "}
              {uploadStatus.total}
              {uploadStatus.progress
                ? ` (${uploadStatus.progress}%)`
                : ""}
            </div>
          )}

          <p>
            By submitting, your report will be shared with
            the appropriate authorities for review.
          </p>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || !location}
          >
            {isUploading
              ? "Uploading Evidence..."
              : isRouterSubmitting
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
