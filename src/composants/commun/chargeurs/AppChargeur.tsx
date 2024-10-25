import CircularProgress from "@mui/material/CircularProgress";
import logoRECE from "../../../img/logo-rece.svg";
import "./AppChargeur.scss";

const AppChargeur: React.FC = () => (
  <div className="conteneur-app-chargeur">
    <div className="app-chargeur">
      <img src={logoRECE} alt="Logo RECE" />
      <CircularProgress />
    </div>
  </div>
);

export default AppChargeur;
