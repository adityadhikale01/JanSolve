// seed/seed.js

import "dotenv/config";
import mongoose from "mongoose";

import User from "../features/user/users.js";
import Report from "../features/ReportProblem/report.model.js";
import MasterProblem from "../features/MasterProblem/masterProblem.model.js";
import University from "../features/University/university.model.js";

import {
  reports as reportData,
  masterProblems as masterProblemData,
} from "./data.js";


import {
  universities as universityData,
} from "./universityData.js";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}


// ------------------------------------------------------------
// CONNECT DATABASE
// ------------------------------------------------------------

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
}


// ------------------------------------------------------------
// FIND USERS
// ------------------------------------------------------------

async function getSeedUsers() {
  const admin = await User.findOne({ role: "admin" });

  const users = await User.find({
    role: { $in: ["user", "host"] },
  }).limit(10);

  if (!admin) {
    throw new Error(
      "No admin user found. Please create an admin user before running the seed."
    );
  }

  if (users.length === 0) {
    console.log(
      "⚠️ No normal users found. Reports will use the admin user as createdBy."
    );

    return {
      admin,
      users: [admin],
    };
  }

  return {
    admin,
    users,
  };
}


// ------------------------------------------------------------
// CREATE MASTER PROBLEMS
// ------------------------------------------------------------

async function seedMasterProblems(admin) {
  console.log("\n🌱 Creating master problems...");

  const masterProblemMap = new Map();

  for (const data of masterProblemData) {
    const masterProblem = await MasterProblem.create({
      title: data.title,
      summary: data.summary,

      domain: data.domain,
      subdomain: data.subdomain,
      problemType: data.problemType,

      location: data.location,

      status: data.status,
      severity: data.severity,

      createdBy: admin._id,
    });

    masterProblemMap.set(data.key, masterProblem);

    console.log(`   ✓ ${masterProblem.title}`);
  }

  return masterProblemMap;
}


// ------------------------------------------------------------
// CREATE REPORTS
// ------------------------------------------------------------

async function seedReports(users, masterProblemMap) {
  console.log("\n🌱 Creating reports...");

  const reportMap = new Map();

  for (let i = 0; i < reportData.length; i++) {
    const data = reportData[i];

    // Rotate through available users
    const createdBy = users[i % users.length];

    const masterProblem = data.masterProblemKey
      ? masterProblemMap.get(data.masterProblemKey)
      : null;

    const report = await Report.create({
      description: data.description,

      media: [],

      impact: data.impact,

      duration: data.duration,

      urgency: data.urgency,

      location: data.location,

      createdBy: createdBy._id,

      status: data.status,

      classification: data.classification,

      masterProblemId: masterProblem
        ? masterProblem._id
        : null,

      verification:
        data.status === "verified"
          ? {
              verifiedBy: users[0]._id,
              verifiedAt: new Date(),
              adminNote:
                "Seeded development report marked as verified.",
              rejectionReason: null,
            }
          : data.status === "rejected"
          ? {
              verifiedBy: users[0]._id,
              verifiedAt: new Date(),
              adminNote: null,
              rejectionReason:
                "Insufficient information or evidence for validation.",
            }
          : {
              verifiedBy: null,
              verifiedAt: null,
              adminNote: null,
              rejectionReason: null,
            },
    });

    reportMap.set(data.key, report);

    console.log(
      `   ✓ ${report._id} | ${data.status} | ${
        masterProblem
          ? masterProblem.title
          : "No Master Problem"
      }`
    );
  }

  return reportMap;
}

// ------------------------------------------------------------
// CREATE UNIVERSITIES
// ------------------------------------------------------------

async function seedUniversities() {
  console.log("\n🌱 Creating universities...");

  const universityMap = new Map();

  for (const data of universityData) {
    const university = await University.create({
      name: data.name,
      shortName: data.shortName,
      type: data.type,

      description: data.description,
      website: data.website,

      location: data.location,

      domains: data.domains,
      subdomains: data.subdomains,
      expertise: data.expertise,
      researchAreas: data.researchAreas,

      departments: data.departments,

      facilities: data.facilities,
      innovationCapabilities:
        data.innovationCapabilities,

      incubation: data.incubation,
      startupSupport: data.startupSupport,
      industryCollaboration:
        data.industryCollaboration,

      active: data.active,
    });

    universityMap.set(data.key, university);

    console.log(
      `   ✓ ${university.shortName}`
    );
  }

  return universityMap;
}

// ------------------------------------------------------------
// MAIN SEED FUNCTION
// ------------------------------------------------------------

async function seed() {
  try {
    await connectDB();

    console.log("\n====================================");
    console.log("       SIH26043 DEVELOPMENT SEED");
    console.log("====================================");


    // --------------------------------------------------------
    // SAFETY CHECK
    // --------------------------------------------------------

    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "❌ Seed script cannot run in production."
      );
    }


    // --------------------------------------------------------
    // GET EXISTING USERS
    // --------------------------------------------------------

    const { admin, users } = await getSeedUsers();

    console.log(`\n👤 Admin: ${admin.email}`);
    console.log(`👥 Users available: ${users.length}`);


    // --------------------------------------------------------
    // CLEAR ONLY DEVELOPMENT DATA
    // --------------------------------------------------------

  console.log(
        "\n🧹 Clearing existing universities, reports and master problems..."
      );

      await University.deleteMany({});
      await Report.deleteMany({});
      await MasterProblem.deleteMany({});

      console.log("   ✓ Universities cleared");
      console.log("   ✓ Reports cleared");
      console.log("   ✓ Master problems cleared");


      const universityMap =
            await seedUniversities();
    // --------------------------------------------------------
    // CREATE MASTER PROBLEMS FIRST
    // --------------------------------------------------------

    const masterProblemMap =
      await seedMasterProblems(admin);


    // --------------------------------------------------------
    // CREATE REPORTS + LINK THEM
    // --------------------------------------------------------

    await seedReports(
      users,
      masterProblemMap
    );


    // --------------------------------------------------------
    // FINAL COUNTS
    // --------------------------------------------------------

    const reportCount =
      await Report.countDocuments();

    const masterProblemCount =
      await MasterProblem.countDocuments();

    const verifiedCount =
      await Report.countDocuments({
        status: "verified",
      });

    const rejectedCount =
      await Report.countDocuments({
        status: "rejected",
      });

    const pendingCount =
      await Report.countDocuments({
        status: {
          $in: [
            "submitted",
            "under_review",
          ],
        },
      });
      const universityCount =
            await University.countDocuments();

    console.log("\n====================================");
    console.log("          SEED COMPLETE ✅");
    console.log("====================================");

    console.log(
      `Master Problems : ${masterProblemCount}`
    );

    console.log(
      `Total Reports   : ${reportCount}`
    );

    console.log(
      `Verified        : ${verifiedCount}`
    );

    console.log(
      `Rejected        : ${rejectedCount}`
    );

    console.log(
      `Pending/Review  : ${pendingCount}`
    );
    console.log(
      `Universities    : ${universityCount}`
    );

    console.log("====================================\n");


    await mongoose.connection.close();

    process.exit(0);

  } catch (error) {

    console.error("\n❌ SEED FAILED");
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
}


seed();