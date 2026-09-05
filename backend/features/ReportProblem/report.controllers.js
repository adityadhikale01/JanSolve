import Report from "./report.model.js";

export const createReport = async (req, res, next) => {
   console.log("Received request to create report:", req.body); 
   //parsing the reportValue from the request body
    const reportValue =
    typeof req.body.reportValue === "string"
      ? JSON.parse(req.body.reportValue)
      : req.body.reportValue;
    const {
      description,
      location,
      media,
      impact,
      duration,
      urgency,
    } = reportValue || {};
    console.log("Received report data:", {
      description,
      location,
      media,
      impact,
      duration,
      urgency,
    });
    // -------------------------
    // Basic validation
    // -------------------------

    if (!description || description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid problem description.",
      });
    }
  
    if (
      !location ||
      !Array.isArray(location.coordinates) ||
      location.coordinates.length !== 2
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid problem location is required.",
      });
    }

    const [longitude, latitude] = location.coordinates;

    // Validate coordinates
    if (
      typeof longitude !== "number" ||
      typeof latitude !== "number" ||
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid geographic coordinates.",
      });
    }
   
    // -------------------------
    // Create report
    // -------------------------
    console.log("Creating report with data:");
    console.log(req.user,req.user._id);
    const report = await Report.create({
      description: description.trim(),

      location: {
        type: "Point",
        coordinates: [longitude, latitude],
        address: location.address?.trim() || undefined,
      },

      media: Array.isArray(media) ? media : [],

      impact: {
        affectedRange:
          impact?.affectedRange || "unknown",
      },

      duration: duration || "unknown",

      urgency: urgency || "normal",

      // IMPORTANT:
      // Never take this from req.body
      createdBy: req.user.id,

      status: "submitted",
    });
    console.log("Report created successfully:", report);

    return res.status(201).json({
      success: true,
      message: "Problem reported successfully.",
      report: {
        id: report._id,
        description: report.description,
        status: report.status,
        createdAt: report.createdAt,
      },
    });

};

export const getMyReports = async (req, res, next) => {
 
    const reports = await Report.find({
      createdBy: req.user.id,
    })
      .sort({ createdAt: -1 })
      .select(
        "description media impact duration urgency location status createdAt"
      )
      .lean();

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports: reports.map((report) => ({
        id: report._id,
        description: report.description,
        media: report.media || [],
        impact: {
          affectedRange:
            report.impact?.affectedRange || "unknown",
        },
        duration: report.duration || "unknown",
        urgency: report.urgency || "normal",
        location: {
          type: report.location?.type,
          coordinates: report.location?.coordinates || [],
          address: report.location?.address || "Location not available",
        },
        status: report.status,
        createdAt: report.createdAt,
      })),
    });
};

export const getReportById = async (req, res, next) => {
    const { id } = req.params;

    const report = await Report.findOne({
      _id: id,
      createdBy: req.user.id,
    }).lean();

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    return res.status(200).json({
      success: true,
      report: {
        id: report._id,
        description: report.description,
        media: report.media || [],

        impact: {
          affectedRange:
            report.impact?.affectedRange || "unknown",
        },

        duration: report.duration || "unknown",
        urgency: report.urgency || "normal",

        location: {
          type: report.location?.type,
          coordinates: report.location?.coordinates || [],
          address:
            report.location?.address ||
            "Location not available",
        },

        status: report.status,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      },
    });

};