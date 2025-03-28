/* v8 ignore start a faire Lundi 31 Mars @ Adrien_Bonvin */
import TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT from "@api/traitements/projetActe/transcription/TraitementProjetActeTranscrit";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { Form, Formik } from "formik";
import React from "react";
import useTraitementApi from "../../../../../hooks/api/TraitementApiHook";

import {
  IProjetActeTranscritForm,
  IProjetActeTranscritProps,
  ProjetTranscriptionForm
} from "@model/form/creation/transcription/IProjetActeTranscritForm";
import messageManager from "@util/messageManager";
import Bouton from "../../../../commun/bouton/Bouton";
import { ConteneurBoutonBasDePage } from "../../../../commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import PageChargeur from "../../../../commun/chargeurs/PageChargeur";
import ConteneurAccordeon from "../../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import { mapProjetActeTranscritFormVersDto } from "../mapping/mapProjetActeTranscritFormVersDto";
import BlocActeEtranger from "./BlocActeEtranger";
import BlocAutresEnonciations from "./BlocAutresEnonciations";
import BlocDeclarant from "./BlocDeclarant";
import BlocFormuleFinale from "./BlocFormuleFinale";
import BlocMentions from "./BlocMentions";
import BlocParent from "./BlocParent";
import BlocTitulaire from "./BlocTitulaire";

const FormulaireSaisieProjet: React.FC<IProjetActeTranscritProps> = ({ requete }) => {
  const { lancerTraitement: lancerEnregistrement, traitementEnCours: enregistrementEnCours } = useTraitementApi(
    TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT
  );

  const enregistrerEtVisualiser = (valeurProjectActeForm: IProjetActeTranscritForm) => {
    const data: IProjetActeTranscritDto = mapProjetActeTranscritFormVersDto(valeurProjectActeForm);
    lancerEnregistrement({
      parametres: { projetActe: data, idRequete: requete.id, numeroDossierNational: requete.numero },
      apresSucces: () => {
        messageManager.showSuccessAndClose("Le projet d'acte a bien été enregistré");
      },
      apresErreur: messageErreur => {
        console.error(`Erreur lors de l'enregistrement du projet d'acte transcrit : ${messageErreur}`);
      }
    });
  };

  return (
    <Formik<IProjetActeTranscritForm>
      validationSchema={ProjetTranscriptionForm.schemaValidation()}
      initialValues={ProjetTranscriptionForm.valeursInitiales(requete)}
      onSubmit={values => {
        enregistrerEtVisualiser(values);
      }}
    >
      <Form>
        <>
          <ConteneurAccordeon
            titre="Titulaire"
            ouvertParDefaut
          >
            <BlocTitulaire />
          </ConteneurAccordeon>

          <ConteneurAccordeon
            titre="Parents"
            ouvertParDefaut
          >
            <BlocParent estparent1 />
            <BlocParent />
          </ConteneurAccordeon>

          <ConteneurAccordeon
            titre="Déclarant"
            ouvertParDefaut
          >
            <BlocDeclarant />
          </ConteneurAccordeon>

          <ConteneurAccordeon
            titre="Autres énonciations intéressant l'état civil"
            ouvertParDefaut
          >
            <BlocAutresEnonciations />
          </ConteneurAccordeon>

          <ConteneurAccordeon
            titre="Acte étranger"
            ouvertParDefaut
          >
            <BlocActeEtranger />
          </ConteneurAccordeon>

          <ConteneurAccordeon
            titre="Mentions figurant dans l'acte étranger"
            ouvertParDefaut
          >
            <BlocMentions />
          </ConteneurAccordeon>

          <ConteneurAccordeon
            titre="Formule finale"
            ouvertParDefaut
          >
            <BlocFormuleFinale />
          </ConteneurAccordeon>
          {enregistrementEnCours && <PageChargeur />}
          <ConteneurBoutonBasDePage position="droite">
            <Bouton
              title="Enregistrer et visualiser"
              type="submit"
              disabled={enregistrementEnCours}
            >
              {"Enregistrer et visualiser"}
            </Bouton>
          </ConteneurBoutonBasDePage>
        </>
      </Form>
    </Formik>
  );
};
export default FormulaireSaisieProjet;

/* v8 ignore end */
