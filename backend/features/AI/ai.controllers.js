import Report from "../ReportProblem/report.model.js";
import MasterProblem from "../MasterProblem/masterProblem.model.js";

import {
  calculateMatchScore,
} from "./matching/matching.service.js";

import University from "../../features/University/university.model.js";

import {
  calculateUniversityScore,
} from "./recommendation/universityRecommendation.service.js";


export const findMasterProblemMatches = async (
  req,
  res
) => {
  try {
    const { reportId } = req.params;

    const report =
      await Report.findById(reportId).lean();

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    if (report.status !== "verified") {
      return res.status(400).json({
        success: false,
        message:
          "Only verified reports can be matched.",
      });
    }

    const masterProblems =
      await MasterProblem.find({
        status: {
          $in: [
            "active",
            "under_solution",
          ],
        },
        domain:
          report.classification?.domain,
      }).lean();

    const matches = masterProblems.map(
      (problem) => {
        const domainMatch =
          problem.domain ===
          report.classification?.domain
            ? 1
            : 0;

        const subdomainMatch =
          problem.subdomain &&
          problem.subdomain ===
            report.classification?.subdomain
            ? 1
            : 0;

        const problemTypeMatch =
          problem.problemType &&
          problem.problemType ===
            report.classification?.problemType
            ? 1
            : 0;

        /*
         * Temporary semantic score.
         *
         * Replace this with embedding
         * similarity once embedding service
         * is connected.
         */
        const semanticSimilarity = 0.5;

        const locationScore = 0.5;

        const score =
          calculateMatchScore({
            semanticSimilarity,
            domainMatch,
            subdomainMatch,
            problemTypeMatch,
            locationScore,
          });

        return {
          masterProblem: problem,
          score,
          explanation: {
            domainMatch: Boolean(
              domainMatch
            ),
            subdomainMatch: Boolean(
              subdomainMatch
            ),
            problemTypeMatch: Boolean(
              problemTypeMatch
            ),
          },
        };
      }
    );

    matches.sort(
      (a, b) => b.score - a.score
    );

    return res.status(200).json({
      success: true,
      reportId,
      matches: matches.slice(0, 5),
    });
  } catch (error) {
    console.error(
      "findMasterProblemMatches error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to find master problem matches.",
    });
  }
};

export const recommendUniversities =
  async (req, res) => {
    try {
      const { masterProblemId } =
        req.params;

      const masterProblem =
        await MasterProblem.findById(
          masterProblemId
        ).lean();

      if (!masterProblem) {
        return res.status(404).json({
          success: false,
          message:
            "Master problem not found.",
        });
      }

      const universities =
        await University.find({
          active: true,
        }).lean();

      const requiredDomain =
        masterProblem.domain;

      const requiredSubdomain =
        masterProblem.subdomain;

      const recommendations =
        universities.map(
          (university) => {
            const domainMatch =
              university.domains?.includes(
                requiredDomain
              )
                ? 1
                : 0;

            const subdomainMatch =
              university.subdomains?.includes(
                requiredSubdomain
              )
                ? 1
                : 0;

            const expertiseMatch =
              university.expertise?.some(
                (item) =>
                  item
                    .toLowerCase()
                    .includes(
                      String(
                        masterProblem.problemType ||
                          ""
                      ).toLowerCase()
                    )
              )
                ? 1
                : 0;

            const researchMatch =
              university.researchAreas?.length
                ? 0.7
                : 0;

            const facilityMatch =
              university.facilities?.length
                ? 0.7
                : 0;

            const locationScore =
              university.location
                ?.district &&
              masterProblem.location
                ?.address
                ?.toLowerCase()
                .includes(
                  university.location.district.toLowerCase()
                )
                ? 1
                : 0.5;

            const innovationScore =
              university.incubation ||
              university.startupSupport
                ? 1
                : 0.5;

            const score =
              calculateUniversityScore({
                domainMatch,
                subdomainMatch,
                expertiseMatch,
                researchMatch,
                facilityMatch,
                locationScore,
                innovationScore,
              });

            return {
              university,
              score,

              reasons: [
                domainMatch &&
                  "Relevant academic domain",
                subdomainMatch &&
                  "Relevant subdomain",
                expertiseMatch &&
                  "Relevant expertise",
                researchMatch &&
                  "Research capability",
                facilityMatch &&
                  "Relevant facilities",
                innovationScore === 1 &&
                  "Strong innovation ecosystem",
              ].filter(Boolean),
            };
          }
        );

      recommendations.sort(
        (a, b) =>
          b.score - a.score
      );

      return res.status(200).json({
        success: true,
        masterProblemId,
        recommendations:
          recommendations.slice(0, 10),
      });
    } catch (error) {
      console.error(
        "recommendUniversities error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to recommend universities.",
      });
    }
  };