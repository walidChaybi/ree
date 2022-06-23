import React, { useCallback, useContext, useState } from "react";
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
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { ReinitialiserValiderFormBoutons } from "../../../../../../common/composant/formulaire/boutons/ReinitialiserValiderBoutons";
import {
  PARENT_NAISS,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2
} from "../../../../../../common/composant/formulaire/ConstantesNomsForm";
import { IExtraitSaisiAEnvoyer } from "../../../../../../common/hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import {
  ISauvegardeValidationSaisieExtraitParams,
  useSauvegardeValidationSaisieExtrait
} from "../../../../../../common/hook/requete/ValidationSaisieExtraitHook";
import { useReinitialisationComposant } from "../../../../../../common/util/form/useReinitialisation";
import { getLibelle } from "../../../../../../common/util/Utils";
import { AccordionRece } from "../../../../../../common/widget/accordion/AccordionRece";
import { StaticField } from "../../../../../../common/widget/formulaire/champFixe/StaticField";
import { Formulaire } from "../../../../../../common/widget/formulaire/Formulaire";
import { withNamespace } from "../../../../../../common/widget/formulaire/utils/FormUtil";
import { ConfirmationPopin } from "../../../../../../common/widget/popin/ConfirmationPopin";
import { EditionExtraitCopiePageContext } from "../../../EditionExtraitCopiePage";
import { DocumentEC } from "../../../enum/DocumentEC";
import { IEvenement } from "./../../../../../../../model/etatcivil/acte/IEvenement";
import { NatureActe } from "./../../../../../../../model/etatcivil/enum/NatureActe";
import { ParentNaissanceForm } from "./contenu/sousFormulaires/ParentNaissanceForm";
import { TitulaireEvenementForm } from "./contenu/sousFormulaires/TitulaireEvenementForm";
import { TitulaireEvtValidationSchema } from "./contenu/sousFormulaires/validation/TitulaireEvenementFormValidation";
import {
  ISaisieExtraitForm,
  mappingActeVerFormulaireSaisirExtrait
} from "./mapping/mappingActeVerFormulaireSaisirExtrait";
import { mappingFormulaireSaisirExtraitNaissanceVersExtraitAEnvoyer } from "./mapping/mappingFormulaireSaisirExtraitNaissanceVersExtraitAEnvoyer";
import { parentMemeSexeOuExtraitPlurilingue } from "./SaisirExtraitFormUtil";
import "./scss/FormulaireSaisirExtrait.scss";

// Schéma de validation en sortie de champs
const ExtraitValidationUnTitulaireSchema = Yup.object({
  [TITULAIRE_EVT_1]: TitulaireEvtValidationSchema
});

const ExtraitValidationDeuxTitulairesSchema = Yup.object({
  [TITULAIRE_EVT_1]: TitulaireEvtValidationSchema,
  [TITULAIRE_EVT_2]: TitulaireEvtValidationSchema
});

interface ComponentFormProps {
  acte: IFicheActe;
  requete: IRequeteDelivrance;
  handleDocumentEnregistre: (index: DocumentEC) => void;
}

type SaisirExtraitFormProps = ComponentFormProps;

export const SaisirExtraitForm: React.FC<SaisirExtraitFormProps> = props => {
  const { setOperationEnCours } = useContext(EditionExtraitCopiePageContext);

  const [popinOuverte, setPopinOuverte] = useState<boolean>(false);
  const [sauvegarderSaisieParams, setSauvegarderSaisieParams] =
    useState<ISauvegardeValidationSaisieExtraitParams>();
  const { cleReinitialisation, reinitialisation } =
    useReinitialisationComposant();
  const [extraitSaisiAEnvoyer, setExtraitSaisiAEnvoyer] =
    useState<IExtraitSaisiAEnvoyer>();

  useSauvegardeValidationSaisieExtrait(sauvegarderSaisieParams);

  const onSubmitValiderExtraitSaisi = (extraitSaisi: ISaisieExtraitForm) => {
    const extraitAEnvoyer =
      mappingFormulaireSaisirExtraitNaissanceVersExtraitAEnvoyer(
        extraitSaisi,
        props.acte
      );
    setExtraitSaisiAEnvoyer(extraitAEnvoyer);
    const problemePlurilingue = parentMemeSexeOuExtraitPlurilingue(
      [extraitAEnvoyer.titulaire1, extraitAEnvoyer.titulaire2],
      props.requete.documentsReponses
    );
    if (problemePlurilingue) {
      setPopinOuverte(true);
    } else {
      setOperationEnCours(true);
      setSauvegarderSaisieParams({
        requete: props.requete,
        acte: props.acte,
        extraitSaisiAEnvoyer: extraitAEnvoyer,
        callBack: (documentEC: DocumentEC) => {
          props.handleDocumentEnregistre(documentEC);
        },
        problemePlurilingue
      });
    }
  };

  const handlePopinOui = useCallback(() => {
    if (extraitSaisiAEnvoyer) {
      const problemePlurilingue = parentMemeSexeOuExtraitPlurilingue(
        [extraitSaisiAEnvoyer.titulaire1, extraitSaisiAEnvoyer.titulaire2],
        props.requete.documentsReponses
      );
      setSauvegarderSaisieParams({
        requete: props.requete,
        acte: props.acte,
        extraitSaisiAEnvoyer,
        callBack: props.handleDocumentEnregistre,
        problemePlurilingue
      });
    }
  }, [extraitSaisiAEnvoyer, props]);

  const titulairesAMs = FicheActe.getTitulairesAMDansLOrdreAvecMajDeclConj(
    props.acte
  );
  const evenement = props.acte.evenement;

  const titulaire1Parents = TitulaireActe.getAuMoinsDeuxParentsDirects(
    props.acte.titulaires[0]
  );
  const titulaire2Parents = TitulaireActe.getAuMoinsDeuxParentsDirects(
    props.acte.titulaires[1]
  );
  const natureActe = props.acte.nature;

  const formDefaultValues = mappingActeVerFormulaireSaisirExtrait(
    props.acte,
    titulairesAMs
  );

  return (
    <>
      <Formulaire
        key={cleReinitialisation}
        className="FormulaireSaisirExtrait"
        formDefaultValues={formDefaultValues}
        formValidationSchema={
          titulairesAMs.length > 1
            ? ExtraitValidationDeuxTitulairesSchema
            : ExtraitValidationUnTitulaireSchema
        }
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
          validerDisabled={false}
        />
      </Formulaire>
      <ConfirmationPopin
        isOpen={popinOuverte}
        messages={[
          getLibelle(
            "Au moins une personne (le titulaire ou les parents) est de genre indéterminé ou les parents sont de même sexe."
          ),
          getLibelle(
            "Si vous continuez, l'extrait plurilingue généré sera en erreur."
          ),
          getLibelle("Voulez-vous continuer ?")
        ]}
        boutons={[
          {
            label: getLibelle("Oui"),
            action: () => {
              handlePopinOui();
              setPopinOuverte(false);
            }
          },
          {
            label: getLibelle("Non"),
            action: () => {
              setPopinOuverte(false);
            }
          }
        ]}
      />
    </>
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
      {titulairesAMs[0] &&
        getTitulaireParentsForm(TITULAIRE_EVT_1, titulaire1Parents)}

      {/* Deuxième titulaire avec accordéon */}
      {titulairesAMs[1] &&
        getTitulaireEvenementForm(
          TITULAIRE_EVT_2,
          titulairesAMs[1],
          evenement,
          natureActe
        )}
      {/* Parents titulaire 2 */}
      {titulairesAMs[1] &&
        getTitulaireParentsForm(TITULAIRE_EVT_2, titulaire2Parents)}
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
