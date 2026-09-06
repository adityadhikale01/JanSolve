import {
  FileText,
  Clock3,
  CircleCheck,
  Layers3,
  Users,
  FolderKanban,
  Rocket,
  ArrowRight,
  Network,
} from "lucide-react";

import {
  problemPipeline,
} from "../../data/dashboardDummyData";


const PIPELINE_ICONS = [
  FileText,
  Clock3,
  CircleCheck,
  Layers3,
  Users,
  FolderKanban,
  Rocket,
];


export default function InnovationPipeline() {

  return (
    <div className="dashboard-panel dashboard-pipeline-panel">

      <div className="dashboard-panel-header">

        <div className="dashboard-section-title-row">

          <div className="dashboard-section-icon">
            <Network size={18} />
          </div>

          <div>

            <h2>
              Problem Innovation Pipeline
            </h2>

            <p>
              From citizen report to deployed solution
            </p>

          </div>

        </div>


        <span className="dashboard-pipeline-label">
          Lifecycle
        </span>

      </div>


      <div className="dashboard-pipeline">

        {problemPipeline.map((item, index) => {

          const Icon =
            PIPELINE_ICONS[index];

          const isLast =
            index === problemPipeline.length - 1;


          return (
            <div
              className="dashboard-pipeline-stage"
              key={item.key}
            >

              <div
                className={
                  `dashboard-pipeline-node ${
                    isLast
                      ? "dashboard-pipeline-node-final"
                      : ""
                  }`
                }
              >

                <Icon size={18} />

              </div>


              <div className="dashboard-pipeline-stage-info">

                <strong>
                  {item.value.toLocaleString()}
                </strong>

                <span>
                  {item.label}
                </span>

              </div>


              {!isLast && (

                <div className="dashboard-pipeline-connector">

                  <div className="dashboard-pipeline-line" />

                  <ArrowRight size={12} />

                </div>

              )}

            </div>
          );
        })}

      </div>


      <div className="dashboard-pipeline-summary">

        <div>

          <strong>
            1,248
          </strong>

          <span>
            citizen reports
          </span>

        </div>


        <div className="dashboard-pipeline-summary-arrow">
          →
        </div>


        <div>

          <strong>
            312
          </strong>

          <span>
            unique problems
          </span>

        </div>


        <div className="dashboard-pipeline-summary-arrow">
          →
        </div>


        <div>

          <strong>
            27
          </strong>

          <span>
            deployed solutions
          </span>

        </div>

      </div>

    </div>
  );
}