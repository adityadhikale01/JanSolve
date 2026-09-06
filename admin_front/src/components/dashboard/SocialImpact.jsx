import {
  HeartHandshake,
  UsersRound,
  Rocket,
  MapPinned,
  Lightbulb,
  FileBadge,
} from "lucide-react";

import {
  socialImpact,
} from "../../data/dashboardDummyData";


const impactItems = [
  {
    key: "people",
    value: socialImpact.peopleBenefited,
    label: "People benefited",
    icon: UsersRound,
  },

  {
    key: "communities",
    value: socialImpact.communitiesReached,
    label: "Communities reached",
    icon: HeartHandshake,
  },

  {
    key: "solutions",
    value: socialImpact.solutionsDeployed,
    label: "Solutions deployed",
    icon: Rocket,
  },

  {
    key: "districts",
    value: socialImpact.districtsImpacted,
    label: "Districts impacted",
    icon: MapPinned,
  },

  {
    key: "startups",
    value: socialImpact.startupsCreated,
    label: "Startups created",
    icon: Lightbulb,
  },

  {
    key: "patents",
    value: socialImpact.patentsFiled,
    label: "Patents filed",
    icon: FileBadge,
  },
];


function formatValue(value) {

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return value.toLocaleString();
}


export default function SocialImpact() {

  return (
    <div className="dashboard-panel dashboard-impact-panel">

      <div className="dashboard-panel-header">

        <div className="dashboard-section-title-row">

          <div className="dashboard-impact-icon">
            <HeartHandshake size={18} />
          </div>

          <div>

            <h2>
              Social Impact
            </h2>

            <p>
              Outcomes generated through the innovation ecosystem
            </p>

          </div>

        </div>

      </div>


      <div className="dashboard-impact-grid">

        {impactItems.map((item) => {

          const Icon = item.icon;

          return (
            <div
              className="dashboard-impact-stat"
              key={item.key}
            >

              <div className="dashboard-impact-stat-icon">

                <Icon size={15} />

              </div>


              <strong>
                {formatValue(item.value)}
              </strong>


              <span>
                {item.label}
              </span>

            </div>
          );

        })}

      </div>

    </div>
  );
}