import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Warning } from "@material-ui/icons";
import { getLibelle } from "@util/Utils";
import React from "react";

import "./scss/BoutonVerrouillage.scss";

interface BoutonVerrouillageProps {
  estVerrouille: boolean;
  toggleVerrouilllage: () => void;
  libelle?: string;
}

export const BoutonVerrouillage: React.FC<BoutonVerrouillageProps> = props => {
  const nomAction = getLibelle(
    props.estVerrouille ? "Déverrouiller" : "Verrouiller"
  );

  return (
    <div className="BoutonVerrouillage">
      <FormControlLabel
        title={getLibelle(`Cliquer pour ${nomAction.toLowerCase()}`)}
        control={
          <Switch
            checked={!props.estVerrouille}
            onChange={() => props.toggleVerrouilllage()}
            color="primary"
          />
        }
        label={getLibelle(
          props.libelle ? `${nomAction} ${props.libelle}` : nomAction
        )}
      />
      <Warning />
    </div>
  );
};
