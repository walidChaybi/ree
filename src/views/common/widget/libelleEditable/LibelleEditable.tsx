import { faEdit, faRotateBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLibelle } from "@util/Utils";
import React, { useState } from "react";
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
    return (
      props.handleMiseAJourLibelle &&
      props.libelle &&
      props.libelle !== props.libelleOrigine
    );
  }

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
        props.libelle
      )}
      <div className={"flexAccordion"}>
        {afficherBoutonAnnuler() && (
          <FontAwesomeIcon
            icon={faRotateBackward}
            className={`BoutonActionLibelleEditable`}
            title={getLibelle("Annuler la modification du libellé")}
            onClick={e => {
              e.stopPropagation();
              fermerInputEdition(props.libelleOrigine ?? "");
            }}
          />
        )}
        {props.handleMiseAJourLibelle && (
          <FontAwesomeIcon
            icon={faEdit}
            className={`BoutonActionLibelleEditable`}
            title={getLibelle("Modifier le libellé")}
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
