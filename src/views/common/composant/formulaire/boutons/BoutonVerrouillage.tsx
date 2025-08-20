import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import React from "react";
import { MdWarning } from "react-icons/md";
import "./scss/BoutonVerrouillage.scss";

interface BoutonVerrouillageProps {
  estVerrouille: boolean;
  toggleVerrouilllage: () => void;
  libelle?: string;
}

export const BoutonVerrouillage: React.FC<BoutonVerrouillageProps> = props => {
  const nomAction = props.estVerrouille ? "Déverrouiller" : "Verrouiller";

  return (
    <div className="BoutonVerrouillage">
      <FormControlLabel
        title={`Cliquer pour ${nomAction.toLowerCase()}`}
        control={
          <Switch
            checked={!props.estVerrouille}
            onChange={() => props.toggleVerrouilllage()}
            color="primary"
          />
        }
        label={props.libelle ? `${nomAction} ${props.libelle}` : nomAction}
      />
      <MdWarning
        className="text-2xl"
        aria-hidden
      />
    </div>
  );
};
