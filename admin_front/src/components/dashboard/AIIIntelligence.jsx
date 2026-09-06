import {
  BrainCircuit,
  FileSearch,
  Tags,
  CopyCheck,
  Network,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import {
  aiInsights,
} from "../../data/dashboardDummyData";

import { Link } from "react-router-dom";


export default function AIIntelligence() {

  return (
    <div className="dashboard-panel dashboard-ai-panel">

      {/* Header */}

      <div className="dashboard-panel-header">

        <div className="dashboard-section-title-row">

          <div className="dashboard-ai-icon">
            <BrainCircuit size={18} />
          </div>

          <div>

            <h2>
              AI Problem Intelligence
            </h2>

            <p>
              Automated classification, deduplication and clustering
            </p>

          </div>

        </div>

      </div>


      {/* AI Metrics */}

      <div className="dashboard-ai-grid">

        <div className="dashboard-ai-metric">

          <FileSearch size={14} />

          <span>
            Reports analysed
          </span>

          <strong>
            {aiInsights.reportsProcessed.toLocaleString()}
          </strong>

        </div>


        <div className="dashboard-ai-metric">

          <Tags size={14} />

          <span>
            Auto categorized
          </span>

          <strong>
            {aiInsights.autoCategorized.toLocaleString()}
          </strong>

        </div>


        <div className="dashboard-ai-metric">

          <CopyCheck size={14} />

          <span>
            Potential duplicates
          </span>

          <strong>
            {aiInsights.duplicateReports}
          </strong>

        </div>


        <div className="dashboard-ai-metric">

          <Network size={14} />

          <span>
            Problem clusters
          </span>

          <strong>
            {aiInsights.problemClusters}
          </strong>

        </div>

      </div>


      {/* Confidence */}

      <div className="dashboard-ai-confidence">

        <div className="dashboard-ai-confidence-header">

          <span>
            Average AI confidence
          </span>

          <strong>
            {aiInsights.averageConfidence}%
          </strong>

        </div>


        <div className="dashboard-confidence-track">

          <div
            className="dashboard-confidence-fill"
            style={{
              width: `${aiInsights.averageConfidence}%`,
            }}
          />

        </div>

      </div>


      {/* Manual Review */}

      <div className="dashboard-ai-review">

        <div className="dashboard-ai-review-icon">
          <AlertTriangle size={16} />
        </div>


        <div className="dashboard-ai-review-content">

          <strong>
            {aiInsights.manualReviewRequired} reports
          </strong>

          <span>
            Require manual verification
          </span>

        </div>


        <Link
          to="/reports?filter=ai-review"
          className="dashboard-ai-review-button"
        >
          Review
          <ArrowRight size={12} />
        </Link>

      </div>


      {/* AI workflow */}

      <div className="dashboard-ai-process">

        <div className="dashboard-ai-process-step">
          <FileSearch size={12} />
          Analyse
        </div>

        <ArrowRight size={11} />

        <div className="dashboard-ai-process-step">
          <Tags size={12} />
          Categorize
        </div>

        <ArrowRight size={11} />

        <div className="dashboard-ai-process-step">
          <CopyCheck size={12} />
          Deduplicate
        </div>

        <ArrowRight size={11} />

        <div className="dashboard-ai-process-step">
          <Network size={12} />
          Cluster
        </div>

      </div>

    </div>
  );
}