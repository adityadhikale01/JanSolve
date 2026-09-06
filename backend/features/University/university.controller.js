import mongoose from "mongoose";
import University from "./university.model.js";

// ============================================================
// CREATE UNIVERSITY
// ============================================================

export const createUniversity = async (req, res) => {
  try {
    const {
      name,
      shortName,
      type,
      description,
      website,
      location,
      domains,
      subdomains,
      expertise,
      researchAreas,
      departments,
      facilities,
      innovationCapabilities,
      incubation,
      startupSupport,
      industryCollaboration,
      active,
    } = req.body;

    // --------------------------------------------------------
    // Basic validation
    // --------------------------------------------------------

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "University name is required.",
      });
    }

    if (!location?.district) {
      return res.status(400).json({
        success: false,
        message: "University district is required.",
      });
    }

    // --------------------------------------------------------
    // Prevent duplicate institution names
    // --------------------------------------------------------

    const existingUniversity = await University.findOne({
      name: {
        $regex: `^${name.trim()}$`,
        $options: "i",
      },
    });

    if (existingUniversity) {
      return res.status(409).json({
        success: false,
        message: "A university with this name already exists.",
      });
    }

    // --------------------------------------------------------
    // Create university
    // --------------------------------------------------------

    const university = await University.create({
      name,
      shortName,
      type,
      description,
      website,
      location,
      domains,
      subdomains,
      expertise,
      researchAreas,
      departments,
      facilities,
      innovationCapabilities,
      incubation,
      startupSupport,
      industryCollaboration,
      active,
    });

    return res.status(201).json({
      success: true,
      message: "University created successfully.",
      university,
    });
  } catch (error) {
    console.error("Create university error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create university.",
    });
  }
};


// ============================================================
// GET ALL UNIVERSITIES
// ============================================================

export const getUniversities = async (req, res) => {
  try {
    const {
      active,
      type,
      domain,
      search,
    } = req.query;

    const filter = {};

    // --------------------------------------------------------
    // Active filter
    // --------------------------------------------------------

    if (active !== undefined) {
      filter.active = active === "true";
    }

    // --------------------------------------------------------
    // Institution type filter
    // --------------------------------------------------------

    if (type) {
      filter.type = type;
    }

    // --------------------------------------------------------
    // Domain filter
    // --------------------------------------------------------

    if (domain) {
      filter.domains = domain;
    }

    // --------------------------------------------------------
    // Search
    // --------------------------------------------------------

    if (search?.trim()) {
      filter.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          shortName: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          "location.district": {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    const universities = await University.find(filter)
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: universities.length,
      universities,
    });
  } catch (error) {
    console.error("Get universities error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch universities.",
    });
  }
};


// ============================================================
// GET UNIVERSITY BY ID
// ============================================================

export const getUniversityById = async (req, res) => {
  try {
    const { id } = req.params;

    // --------------------------------------------------------
    // Validate MongoDB ID
    // --------------------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid university ID.",
      });
    }

    const university = await University.findById(id).lean();

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found.",
      });
    }

    return res.status(200).json({
      success: true,
      university,
    });
  } catch (error) {
    console.error("Get university error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch university.",
    });
  }
};


// ============================================================
// UPDATE UNIVERSITY
// ============================================================

export const updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid university ID.",
      });
    }

    // --------------------------------------------------------
    // Prevent changing to an existing university name
    // --------------------------------------------------------

    if (req.body.name) {
      const existingUniversity = await University.findOne({
        name: {
          $regex: `^${req.body.name.trim()}$`,
          $options: "i",
        },

        _id: {
          $ne: id,
        },
      });

      if (existingUniversity) {
        return res.status(409).json({
          success: false,
          message: "A university with this name already exists.",
        });
      }
    }

    // --------------------------------------------------------
    // Fields allowed to be updated
    // --------------------------------------------------------

    const allowedFields = [
      "name",
      "shortName",
      "type",
      "description",
      "website",
      "location",
      "domains",
      "subdomains",
      "expertise",
      "researchAreas",
      "departments",
      "facilities",
      "innovationCapabilities",
      "incubation",
      "startupSupport",
      "industryCollaboration",
      "active",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const university = await University.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "University updated successfully.",
      university,
    });
  } catch (error) {
    console.error("Update university error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update university.",
    });
  }
};


// ============================================================
// DELETE / DEACTIVATE UNIVERSITY
// ============================================================

export const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid university ID.",
      });
    }

    // --------------------------------------------------------
    // Soft delete
    // --------------------------------------------------------

    const university = await University.findByIdAndUpdate(
      id,
      {
        active: false,
      },
      {
        new: true,
      }
    );

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "University deactivated successfully.",
      university,
    });
  } catch (error) {
    console.error("Delete university error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to deactivate university.",
    });
  }
};