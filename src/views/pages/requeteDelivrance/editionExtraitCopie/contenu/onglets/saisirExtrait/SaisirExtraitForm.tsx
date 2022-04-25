import React, { useCallback } from "react";
import * as Yup from "yup";
import {
  FicheActe,
  IFicheActe
} from "../../../../../../../model/etatcivil/acte/IFicheActe";
import { IFiliation } from "../../../../../../../model/etatcivil/acte/IFiliation";
import {
  ITitulaireActe,
  TitulaireActe
} from "../../../../../../../model/etatcivil/acte/ITitulaireActe";
import { ReinitialiserValiderFormBoutons } from "../../../../../../common/composant/formulaire/boutons/ReinitialiserValiderBoutons";
import {
  PARENT_NAISS,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2
} from "../../../../../../common/composant/formulaire/ConstantesNomsForm";
import { useReinitialisationComposant } from "../../../../../../common/util/form/useReinitialisation";
import { getLibelle } from "../../../../../../common/util/Utils";
import { AccordionRece } from "../../../../../../common/widget/accordion/AccordionRece";
import { StaticField } from "../../../../../../common/widget/formulaire/champFixe/StaticField";
import { Formulaire } from "../../../../../../common/widget/formulaire/Formulaire";
import { withNamespace } from "../../../../../../common/widget/formulaire/utils/FormUtil";
import { IEvenement } from "./../../../../../../../model/etatcivil/acte/IEvenement";
import { NatureActe } from "./../../../../../../../model/etatcivil/enum/NatureActe";
import { ParentNaissanceForm } from "./contenu/sousFormulaires/ParentNaissanceForm";
import { TitulaireEvenementForm } from "./contenu/sousFormulaires/TitulaireEvenementForm";
import { TitulaireEvtValidationSchema } from "./contenu/sousFormulaires/validation/TitulaireEvenementFormValidation";
import { mappingActeVerFormulaireSaisirExtrait } from "./mappingActeVerFormulaireSaisirExtrait";
import "./scss/FormulaireSaisirExtrait.scss";

// Schéma de validation en sortie de champs
const ExtraitValidationSchema = Yup.object({
  [TITULAIRE_EVT_1]: TitulaireEvtValidationSchema,
  // FIXME: verififer que la validation s'effectue bien si un seul titulaire (à mon avis non). Idem dans le cas de un ou deux parents
  [TITULAIRE_EVT_2]: TitulaireEvtValidationSchema
});

interface ComponentFormProps {
  acte: IFicheActe;
}

type SaisirExtraitFormProps = ComponentFormProps;

export const SaisirExtraitForm: React.FC<SaisirExtraitFormProps> = props => {
  const { cleReinitialisation, reinitialisation } =
    useReinitialisationComposant();

  const onSubmitValiderExtraitSaisi = useCallback(() => {
    /*TODO*/
  }, []);

  const titulairesAMs = FicheActe.getTitulairesAMDansLeBonOrdre(props.acte);
  const evenement = props.acte.evenement;
  const titulaire1Parents = TitulaireActe.getParents(props.acte.titulaires[0]);
  const titulaire2Parents = TitulaireActe.getParents(props.acte.titulaires[1]);
  const natureActe = props.acte.nature;

  const formDefaultValues = mappingActeVerFormulaireSaisirExtrait(
    props.acte,
    titulairesAMs
  );

  return (
    <Formulaire
      key={cleReinitialisation}
      className="FormulaireSaisirExtrait"
      formDefaultValues={formDefaultValues}
      formValidationSchema={ExtraitValidationSchema}
      onSubmit={onSubmitValiderExtraitSaisi}
    >
      <div className="DeuxColonnes">
        <StaticField
          libelle={getLibelle("Nature")}
          valeur={props.acte.nature.libelle}
        ></StaticField>
        <StaticField
          libelle={getLibelle("Référence")}
          valeur={FicheActe.getReference(props.acte)}
        ></StaticField>
      </div>

      {getTitulairesEvenementsEtParentsForm(
        titulairesAMs,
        natureActe,
        titulaire1Parents,
        titulaire2Parents,
        evenement
      )}

      <ReinitialiserValiderFormBoutons
        onClickReInitialiser={reinitialisation}
      />
    </Formulaire>
  );
};

function getTitulairesEvenementsEtParentsForm(
  titulairesAMs: (ITitulaireActe | undefined)[],
  natureActe: NatureActe,
  titulaire1Parents: IFiliation[],
  titulaire2Parents: IFiliation[],
  evenement?: IEvenement
) {
  return (
    <>
      {/* Premier titulaire avec accordéon */}
      {titulairesAMs[0] &&
        getTitulaireEvenementForm(
          TITULAIRE_EVT_1,
          titulairesAMs[0],
          evenement,
          natureActe
        )}
      {/* Parents titulaire 1 */}
      {getTitulaireParentsForm(TITULAIRE_EVT_1, titulaire1Parents)}

      {/* Deuxième titulaire avec accordéon */}
      {titulairesAMs[1] &&
        getTitulaireEvenementForm(
          TITULAIRE_EVT_2,
          titulairesAMs[1],
          evenement,
          natureActe
        )}
      {/* Parents titulaire 2 */}
      {getTitulaireParentsForm(TITULAIRE_EVT_2, titulaire2Parents)}
    </>
  );
}

function getTitulaireParentsForm(
  nomFormTitulaire: string,
  parents: IFiliation[]
) {
  return parents.map((parent: IFiliation, index: number) => {
    const titreAccordeonParent = getLibelle(`Parent ${index + 1}`);
    return (
      <AccordionRece
        key={titreAccordeonParent}
        expanded={true}
        titre={titreAccordeonParent}
      >
        <ParentNaissanceForm
          nom={withNamespace(nomFormTitulaire, `${PARENT_NAISS}${index + 1}`)}
          parent={parent}
        />
      </AccordionRece>
    );
  });
}

function getTitulaireEvenementForm(
  nomFormTitulaire1: string,
  titulaire: ITitulaireActe,
  evenement: IEvenement | undefined,
  natureActe: NatureActe
) {
  return (
    <AccordionRece expanded={true} titre={getLibelle("Titulaire / Evénement")}>
      <TitulaireEvenementForm
        nom={nomFormTitulaire1}
        titulaire={titulaire}
        evenement={evenement}
        natureActe={natureActe}
      ></TitulaireEvenementForm>
    </AccordionRece>
  );
}
