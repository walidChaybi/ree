import { IAdresseRequerant } from "@model/requete/IAdresseRequerant";
import { IRequerant, Requerant } from "@model/requete/IRequerant";
import { resume } from "@pages/requeteCreation/commun/Labels";
import { getLibelle } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import { LigneAccordion } from "./LigneAccordion";

export interface AccordionTranscriptionRequerantProps {
  requerant?: IRequerant;
}

export const AccordionTranscriptionRequerant: React.FC<
  AccordionTranscriptionRequerantProps
> = props => {
  function formatCoordonneesRequerant(
    requerant?: IRequerant
  ): string | undefined {
    let identiteFormate = "";
    if (requerant) {
      identiteFormate += Requerant.getNomPrenom(requerant);
      identiteFormate += formatAdresseRequerant(requerant.adresse);
    }
    return identiteFormate;
  }

  function formatAdresseRequerant(
    adresseRequerant?: IAdresseRequerant
  ): string | undefined {
    let lignesFormates = "";

    if (adresseRequerant?.ligne2) {
      lignesFormates += `${adresseRequerant?.ligne2} \n`;
    }

    if (adresseRequerant?.ligne3) {
      lignesFormates += `${adresseRequerant?.ligne3} \n`;
    }

    if (adresseRequerant?.ligne4) {
      lignesFormates += `${adresseRequerant?.ligne4} \n`;
    }

    if (adresseRequerant?.ligne5) {
      lignesFormates += `${adresseRequerant?.ligne5} \n`;
    }

    if (adresseRequerant?.codePostal) {
      lignesFormates += `${adresseRequerant.codePostal} `;
      if (adresseRequerant?.ville) {
        lignesFormates += `${adresseRequerant.ville}\n`;
      } else {
        lignesFormates += "\n";
      }
    }
    if (LieuxUtils.estRenseigneEtPaysEtranger(adresseRequerant?.pays)) {
      lignesFormates += `${adresseRequerant?.pays}`;
    }

    return lignesFormates;
  }

  return (
    <div className="AccordionTranscriptionRequerant">
      <AccordionRece
        key={`${props.requerant}`}
        titre={`${getLibelle(resume.requerant)}`}
        className={{
          container: "accordionContainer",
          content: "accordionContent",
          title: "tagTitleAccordion"
        }}
        expanded={false}
      >
        <LigneAccordion
          label={getLibelle("Requérant")}
          texte={props.requerant?.lienRequerant?.lien.libelle}
          ariaLabel={getLibelle("Requérant")}
        />

        <div className="adressRequerant">
          <LigneAccordion
            label={getLibelle("Coordonnées")}
            texte={formatCoordonneesRequerant(props.requerant)}
            ariaLabel={getLibelle("Coordonnées")}
          />
        </div>

        <div className="adresseCourrielRequerant">
          <LigneAccordion
            label={" "}
            texte={props.requerant?.courriel}
            ariaLabel={getLibelle("Adresse courriel")}
          />
          <LigneAccordion
            label={getLibelle("Tél")}
            texte={props.requerant?.telephone}
            ariaLabel={getLibelle("Tél")}
          />
        </div>

        <div className="adresseCourrielRequerant">
          <LigneAccordion
            label={getLibelle("Autre courriel")}
            texte={props.requerant?.courrielAutreContact}
            ariaLabel={getLibelle("Autre courriel")}
          />
          <LigneAccordion
            label={getLibelle("Autre tél")}
            texte={props.requerant?.telephoneAutreContact}
            ariaLabel={getLibelle("Autre tél")}
          />
        </div>
      </AccordionRece>
    </div>
  );
};
