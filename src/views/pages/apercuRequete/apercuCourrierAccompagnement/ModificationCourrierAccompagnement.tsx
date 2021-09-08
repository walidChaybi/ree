import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { NatureActe } from "../../../../model/etatcivil/enum/NatureActe";
import { TypeDocument } from "../../../../model/requete/TypeDocument";
import { ChoixDelivrance } from "../../../../model/requete/v2/enum/ChoixDelivrance";
import {
  ACTE_NAISSANCE_NON_TROUVE_MARIAGE,
  ACTE_NON_TROUVE,
  ACTE_NON_TROUVE_ALGERIE,
  ATTESTATION_PENSION,
  CourrierDelivrance,
  DELIVRANCE_ACTE,
  DELIVRANCE_ACTE_INCOMPLET,
  DELIVRANCE_ACTE_NON_ANTHENTIQUE,
  DIVERS,
  INFORMATION_DIVERSES_MANQUANTE,
  JUSTIFICATIF_REPRESENTANT_MANQUANT,
  MANDAT_GENEALOGIQUE,
  PROPOSITION_TRANSCRIPTION,
  REFUS_DELIVRANCE_MARIAGE
} from "../../../../model/requete/v2/enum/CourrierDelivrance";
import { MotifDelivrance } from "../../../../model/requete/v2/enum/MotifDelivrance";
import { Requerant } from "../../../../model/requete/v2/IRequerant";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { Option, Options } from "../../../common/util/Type";
import { getValeurOuVide } from "../../../common/util/Utils";
import { Formulaire } from "../../../common/widget/formulaire/Formulaire";
import { getLibelle } from "../../../common/widget/Text";
import {
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_MOTIF,
  COMPLEMENT_POINT_GEO,
  LIEU_DIT,
  MOTIF,
  NB_EXEMPLAIRE,
  PAYS,
  VOIE
} from "../../saisirRequete/modelForm/ISaisirRequetePageModel";
import BoutonsCourrierAccompagnement, {
  BoutonsCourrierAccompagnementProps
} from "./BoutonsCourrierAccompagnement";
import { CourrierAccompagnementForm } from "./CourrierAccompagnementForm";
import {
  ADRESSE,
  COURRIER,
  DELIVRANCE,
  EN_TETE,
  REQUERANT,
  REQUERANT_LIGNE_1,
  REQUERANT_LIGNE_2,
  REQUETE,
  SaisieAccompagnement
} from "./modelForm/ISaisieAccompagnementPageModel";

interface ModificationCourrierAccompagnementProps {
  requete: IRequeteDelivrance;
  acteSelected?: IResultatRMCActe[];
}

// Schéma de validation en sortie de champs
const ValidationSchemaAccompagnement = Yup.object({
  [EN_TETE]: Yup.object().shape({
    [DELIVRANCE]: Yup.string(),
    [COURRIER]: Yup.string()
  })
});

export const ModificationCourrierAccompagnement: React.FC<ModificationCourrierAccompagnementProps> =
  props => {
    const optionsCourrier = getOptionsCourrier(
      props.requete,
      props.acteSelected
    );

    const titre = accompagnementExiste(props.requete)
      ? getLibelle("Modification du courrier")
      : getLibelle("Création du courrier");

    // TODO Modification du courrier existant
    // eslint-disable-next-line
    const [saisieAccompagnement, setSaisieAccompagnement] =
      useState<SaisieAccompagnement>();

    const boutonsProps = {} as BoutonsCourrierAccompagnementProps;

    const onSubmit = () => {};

    useEffect(() => {}, []);

    return (
      <>
        <title>{titre}</title>
        <Formulaire
          titre={titre}
          formDefaultValues={
            saisieAccompagnement ||
            getDefaultValuesAccompagnement(props.requete, optionsCourrier[0])
          }
          formValidationSchema={ValidationSchemaAccompagnement}
          onSubmit={onSubmit}
          className="FormulaireAccompagnement"
        >
          <CourrierAccompagnementForm
            optionsCourrier={optionsCourrier}
            requete={props.requete}
          />
          <BoutonsCourrierAccompagnement
            {...boutonsProps}
          ></BoutonsCourrierAccompagnement>
        </Formulaire>
      </>
    );
  };

export const getOptionsCourrier = (
  requete: IRequeteDelivrance,
  acteSelected: IResultatRMCActe[] | undefined
): Options => {
  let courrierOptions: Options = [];
  switch (requete.choixDelivrance) {
    case ChoixDelivrance.REP_SANS_DEL_EC_REQUETE_INCOMPLETE:
      courrierOptions = [
        CourrierDelivrance.getOptionFromLibelle(INFORMATION_DIVERSES_MANQUANTE),
        CourrierDelivrance.getOptionFromLibelle(MANDAT_GENEALOGIQUE),
        CourrierDelivrance.getOptionFromLibelle(
          JUSTIFICATIF_REPRESENTANT_MANQUANT
        )
      ];
      break;
    case ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC:
      courrierOptions = [
        CourrierDelivrance.getOptionFromLibelle(ACTE_NON_TROUVE),
        CourrierDelivrance.getOptionFromLibelle(ACTE_NON_TROUVE_ALGERIE),
        CourrierDelivrance.getOptionFromLibelle(
          ACTE_NAISSANCE_NON_TROUVE_MARIAGE
        ),
        CourrierDelivrance.getOptionFromLibelle(ATTESTATION_PENSION),
        CourrierDelivrance.getOptionFromLibelle(PROPOSITION_TRANSCRIPTION)
      ];
      break;
    case ChoixDelivrance.REP_SANS_DEL_EC_DIVERS:
      courrierOptions = [CourrierDelivrance.getOptionFromLibelle(DIVERS)];
      if (
        acteSelected &&
        acteSelected.some(
          element =>
            element.nature === NatureActe.NAISSANCE.libelle ||
            element.nature === NatureActe.DECES.libelle
        )
      ) {
        courrierOptions.push(
          CourrierDelivrance.getOptionFromLibelle(REFUS_DELIVRANCE_MARIAGE)
        );
      }
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
      courrierOptions = [
        CourrierDelivrance.getOptionFromLibelle(DELIVRANCE_ACTE_NON_ANTHENTIQUE)
      ];
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
      courrierOptions = [
        CourrierDelivrance.getOptionFromLibelle(DELIVRANCE_ACTE),
        CourrierDelivrance.getOptionFromLibelle(DELIVRANCE_ACTE_INCOMPLET)
      ];
      break;
  }
  return courrierOptions;
};

export const getDefaultValuesAccompagnement = (
  requete: IRequeteDelivrance,
  optionCourrier: Option
) => {
  const documentReponse = requete.documentsReponses.find(
    element => element.typeDocument === TypeDocument.CourrierAccompagnement
  );

  const identiteRequerant = Requerant.organiserIdentite(requete.requerant);

  return {
    [EN_TETE]: {
      [DELIVRANCE]: requete.choixDelivrance?.libelle,
      [COURRIER]: documentReponse?.typeDocument
        ? documentReponse?.typeDocument
        : optionCourrier?.value
    },
    [REQUERANT]: {
      [REQUERANT_LIGNE_1]: identiteRequerant.premiereLigne,
      [REQUERANT_LIGNE_2]: identiteRequerant.deuxiemeLigne
    },
    [ADRESSE]: {
      [VOIE]: requete.requerant.adresse?.ligne4,
      [LIEU_DIT]: requete.requerant.adresse?.ligne5,
      [COMPLEMENT_DESTINATAIRE]: requete.requerant.adresse?.ligne2,
      [COMPLEMENT_POINT_GEO]: requete.requerant.adresse?.ligne3,
      [CODE_POSTAL]: requete.requerant.adresse?.codePostal,
      [COMMUNE]: requete.requerant.adresse?.ville,
      [PAYS]: requete.requerant.adresse?.pays
    },
    [REQUETE]: {
      [MOTIF]: requete.motif ? MotifDelivrance.getKey(requete.motif) : "",
      [COMPLEMENT_MOTIF]: getValeurOuVide(requete.complementMotif),
      [NB_EXEMPLAIRE]: getValeurOuVide(requete.nbExemplaireImpression)
    }
  };
};

const accompagnementExiste = (requete: IRequeteDelivrance) => {
  return requete.documentsReponses.some(
    element => element.typeDocument === TypeDocument.CourrierAccompagnement
  );
};
