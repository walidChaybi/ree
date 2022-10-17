import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { BoutonGaucheAccordionTitle } from "@widget/accordion/BoutonGaucheAccordionTitle";
import React, { useState } from "react";
import "./scss/LibelleEditable.scss";

interface ILibelleEditable {
  libelle?: string;
  handleMiseAJourLibelle?: (e: any) => void;
}

export const LibelleEditable: React.FC<ILibelleEditable> = props => {
  const [modeEdition, setModeEdition] = useState<boolean>(false);

  const fermerInputEdition = (nouveauTitre: string) => {
    if (props.handleMiseAJourLibelle) {
      props.handleMiseAJourLibelle(nouveauTitre);
      setModeEdition(false);
    }
  };

  return (
    <div className="LibelleEditable">
      {modeEdition ? (
        <input
          id={`input-creation-${props.libelle}`}
          name={`input-creation-${props.libelle}`}
          title={props.libelle}
          aria-label={`input-creation-${props.libelle}`}
          type="text"
          defaultValue={props.libelle}
          onBlur={e => fermerInputEdition(e.target.value)}
          autoFocus
        />
      ) : (
        props.libelle
      )}
      {props.handleMiseAJourLibelle && (
        <BoutonGaucheAccordionTitle
          iconeBouton={faEdit}
          titreBouton={"Modifier le libellé"}
          onClickBouton={() => setModeEdition(true)}
        />
      )}
    </div>
  );
};
