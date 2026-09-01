
 import "./AminitiesSection.css";

import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import DirectionsCarFilledRoundedIcon from "@mui/icons-material/DirectionsCarFilledRounded";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import TvRoundedIcon from "@mui/icons-material/TvRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import LocalLaundryServiceRoundedIcon from "@mui/icons-material/LocalLaundryServiceRounded";
import BalconyRoundedIcon from "@mui/icons-material/BalconyRounded";
import PoolRoundedIcon from "@mui/icons-material/PoolRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import FireplaceRoundedIcon from "@mui/icons-material/FireplaceRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const iconMap = {
    Wifi: <WifiRoundedIcon />,
    Parking: <DirectionsCarFilledRoundedIcon />,
    Kitchen: <KitchenRoundedIcon />,
    AC: <AcUnitRoundedIcon />,
    TV: <TvRoundedIcon />,
    Pets: <PetsRoundedIcon />,
    Laundry: <LocalLaundryServiceRoundedIcon />,
    Balcony: <BalconyRoundedIcon />,
    Pool: <PoolRoundedIcon />,
    Gym: <FitnessCenterRoundedIcon />,
    Fireplace: <FireplaceRoundedIcon />,
};

export default function AmenitiesSection({ features = [] }) {
    if (!features.length) return null;

    return (
        <section className="amenities-section">

            <div className="section-heading">
                <h2>Amenities & Features</h2>
                <p>Everything you'll have access to during your stay.</p>
            </div>

            <div className="amenities-grid">
                {features.map((feature, index) => (
                    <div className="amenity-card" key={index}>
                        <div className="amenity-icon">
                            {iconMap[feature] || <CheckCircleRoundedIcon />}
                        </div>

                        <span>{feature}</span>
                    </div>
                ))}
            </div>

        </section>
    );
}