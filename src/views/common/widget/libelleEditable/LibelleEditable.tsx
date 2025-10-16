import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRotateLeft } from "react-icons/fa6";
import "./scss/LibelleEditable.scss";

interface ILibelleEditable {
  libelle?: string;
  handleMiseAJourLibelle?: (e: any) => void;
  libelleOrigine?: string;
}

export const LibelleEditable: React.FC<ILibelleEditable> = props => {
  const [modeEdition, setModeEdition] = useState<boolean>(false);

  const fermerInputEdition = (nouveauTitre: string) => {
    if (props.handleMiseAJourLibelle) {
      props.handleMiseAJourLibelle(nouveauTitre);
      setModeEdition(false);
    }
  };

  function afficherBoutonAnnuler() {
    return props.handleMiseAJourLibelle && props.libelle && props.libelle !== props.libelleOrigine;
  }

  return (
    <div className="LibelleEditable">
      {modeEdition ? (
        <input
          id={`input-creation-${props.libelle ?? props.libelleOrigine}`}
          name={`input-creation-${props.libelle ?? props.libelleOrigine}`}
          title={props.libelle}
          aria-label={props.libelle ?? props.libelleOrigine}
          type="text"
          defaultValue={props.libelle ?? props.libelleOrigine}
          onBlur={e => fermerInputEdition(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
              fermerInputEdition(e.currentTarget.value);
            } else if (e.key === "Escape") {
              e.currentTarget.blur();
              setModeEdition(false);
            }
          }}
          autoFocus
        />
      ) : (
        (props.libelle ?? props.libelleOrigine)
      )}
      <div className={"flexAccordion"}>
        {afficherBoutonAnnuler() && (
          <FaRotateLeft
            className="BoutonActionLibelleEditable"
            title="Annuler la modification du libellé"
            aria-label="Annuler la modification du libellé"
            onClick={e => {
              e.stopPropagation();
              fermerInputEdition(props.libelleOrigine ?? "");
            }}
          />
        )}
        {props.handleMiseAJourLibelle && (
          <FaEdit
            className="BoutonActionLibelleEditable"
            title="Modifier le libellé"
            aria-label="Modifier le libellé"
            onClick={e => {
              e.stopPropagation();
              setModeEdition(true);
            }}
          />
        )}
      </div>
    </div>
  );
};
