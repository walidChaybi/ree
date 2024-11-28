import { PARENT_ADOPTANT_NAISS1, PARENT_ADOPTANT_NAISS2, TITULAIRE_EVT_1 } from "@composant/formulaire/ConstantesNomsForm";
import { BoutonVerrouillage } from "@composant/formulaire/boutons/BoutonVerrouillage";
import { ReinitialiserValiderFormBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import { RECEContextActions } from "@core/contexts/RECEContext";
import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { ISauvegardeValidationSaisieExtraitParams, useSauvegardeValidationSaisieExtrait } from "@hook/requete/ValidationSaisieExtraitHook";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import { TitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { ISaisieExtraitForm } from "@model/form/delivrance/ISaisieExtraitForm";
import { IRequeteDelivrance, RequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { getDefaultValuesCourrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierFonctions";
import { useReinitialisationComposant } from "@util/form/useReinitialisation";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { StaticField } from "@widget/formulaire/champFixe/StaticField";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import FormikEffect from "@widget/formulaire/utils/FormikEffect";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { FormikProps, FormikValues } from "formik";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ECleOngletDocumentDelivre } from "../../../../../../../composants/pages/requetesDelivrance/editionRequete/partieDocument/voletDocuments/VoletDocumentDelivre";
import { EditionDelivranceContext } from "../../../../../../../contexts/EditionDelivranceContextProvider";
import { EditionExtraitCopiePageContext } from "../../../EditionExtraitCopiePage";
import {
  IProprietesFormulaire,
  getTitulairesEvenementsEtParentsForm,
  getValidationSchema,
  initProprietesFormulaire,
  parentMemeSexeOuIndeterminCasPlurilingue,
  titulairesMemeSexeOuIndeterminCasPlurilingue
} from "./SaisirExtraitFormUtil";
import { mappingActeVerFormulaireSaisirExtrait } from "./mapping/mappingActeVerFormulaireSaisirExtrait";
import { mappingFormulaireSaisirExtraitVersExtraitAEnvoyer } from "./mapping/mappingFormulaireSaisirExtraitVersExtraitAEnvoyer";
import "./scss/FormulaireSaisirExtrait.scss";

interface IComponentFormProps {
  acte: IFicheActe;
  requete: IRequeteDelivrance;
}

type ISaisirExtraitFormProps = IComponentFormProps & { setOngletDocumentDelivre?: (nouvelOnglet: ECleOngletDocumentDelivre) => void };

export const SaisirExtraitFormContext = React.createContext({
  setAfficheParentsAdoptantsTitulaire: (
    formik: FormikProps<FormikValues>,
    nomComposantTitulaire: string,
    afficheParentsAdoptants: boolean
  ) => {},
  saisieVerrouillee: true,
  mapPrenomAffiche: new Map<string, number>()
});

interface IPopinMessageErreur {
  ouverte: boolean;
  problemePlurilingueActeMariage: boolean;
  problemePlurilingueActeNaissanceOuDeces: boolean;
}

export const SaisirExtraitForm: React.FC<ISaisirExtraitFormProps> = props => {
  const { setOperationEnCours, rafraichirRequete } = useContext(EditionExtraitCopiePageContext);
  const { setIsDirty } = useContext(RECEContextActions);
  const { mapPrenomAffiche } = useContext(SaisirExtraitFormContext);
  const { rechargerRequete } = useContext(EditionDelivranceContext);

  const [proprietesFormulaire, setProprietesFormulaire] = useState<IProprietesFormulaire>(initProprietesFormulaire());

  const [popinMessageErreur, setPopinMessageErreur] = useState<IPopinMessageErreur>({
    ouverte: false,
    problemePlurilingueActeMariage: false,
    problemePlurilingueActeNaissanceOuDeces: false
  });
  const [sauvegarderSaisieParams, setSauvegarderSaisieParams] = useState<ISauvegardeValidationSaisieExtraitParams>();
  const { cleReinitialisation, reinitialisation } = useReinitialisationComposant();
  const [extraitSaisiAEnvoyer, setExtraitSaisiAEnvoyer] = useState<IExtraitSaisiAEnvoyer>();

  const [titulaire1ParentsAdoptants, setTitulaire1ParentsAdoptants] = useState<IFiliation[]>(initTitulaire1ParentAdoptants(props.acte));
  const [titulaire2ParentsAdoptants, setTitulaire2ParentsAdoptants] = useState<IFiliation[]>(initTitulaire2ParentAdoptants(props.acte));

  const [saisieVerrouillee, setSaisieVerrouillee] = useState<boolean>(true);

  useSauvegardeValidationSaisieExtrait(sauvegarderSaisieParams);

  const onSubmitValiderExtraitSaisi = (extraitSaisi: ISaisieExtraitForm) => {
    const extraitAEnvoyer = mappingFormulaireSaisirExtraitVersExtraitAEnvoyer(extraitSaisi, props.acte);
    setExtraitSaisiAEnvoyer(extraitAEnvoyer);
    const problemePlurilingueActeNaissanceOuDeces =
      !FicheActe.estActeMariage(props.acte) &&
      parentMemeSexeOuIndeterminCasPlurilingue([extraitAEnvoyer.titulaire1, extraitAEnvoyer.titulaire2], props.requete.documentsReponses);

    const problemePlurilingueActeMariage =
      FicheActe.estActeMariage(props.acte) &&
      titulairesMemeSexeOuIndeterminCasPlurilingue(
        [extraitAEnvoyer.titulaire1, extraitAEnvoyer.titulaire2],
        props.requete.documentsReponses
      );
    if (problemePlurilingueActeNaissanceOuDeces || problemePlurilingueActeMariage) {
      setPopinMessageErreur({
        ouverte: true,
        problemePlurilingueActeNaissanceOuDeces,
        problemePlurilingueActeMariage
      });
    } else {
      setOperationEnCours(true);
      setSauvegarderSaisieParams({
        requete: props.requete,
        acte: props.acte,
        extraitSaisiAEnvoyer: extraitAEnvoyer,
        callBack: fermerOngletApresValidation,
        problemePlurilingue: false,
        valeursCourrierParDefaut: getDefaultValuesCourrier(props.requete)
      });
    }
  };

  const fermerOngletApresValidation = useCallback(() => {
    setOperationEnCours(false);
    setSaisieVerrouillee(true);
    rechargerRequete();
    rafraichirRequete();
    props.setOngletDocumentDelivre?.(ECleOngletDocumentDelivre.DOCUMENT_EDITE);
  }, []);

  const handlePopinOui = useCallback(() => {
    if (extraitSaisiAEnvoyer) {
      setOperationEnCours(true);
      setSauvegarderSaisieParams({
        requete: props.requete,
        acte: props.acte,
        extraitSaisiAEnvoyer,
        valeursCourrierParDefaut: getDefaultValuesCourrier(props.requete),
        callBack: fermerOngletApresValidation,
        problemePlurilingue: popinMessageErreur.problemePlurilingueActeNaissanceOuDeces || popinMessageErreur.problemePlurilingueActeMariage
      });
    }
  }, [
    extraitSaisiAEnvoyer,
    popinMessageErreur.problemePlurilingueActeMariage,
    popinMessageErreur.problemePlurilingueActeNaissanceOuDeces,
    props,
    setOperationEnCours,
    rafraichirRequete,
    rechargerRequete
  ]);

  useEffect(() => {
    if (props.acte) {
      mapPrenomAffiche.clear();
      const titulairesAMCompletes = FicheActe.getTitulairesAMDansLOrdreAvecMajDonneesTitulaireActe(props.acte);

      const titulairesActe = FicheActe.getTitulairesActeTabDansLOrdre(props.acte);

      setProprietesFormulaire({
        initialise: true,
        titulairesAMs: titulairesAMCompletes,
        evenement: props.acte.evenement,
        titulaireActe1: titulairesActe[0],
        titulaireActe2: titulairesActe[1],
        titulaire1Parents: TitulaireActe.getAuMoinsDeuxParentsDirects(titulairesActe[0]),
        titulaire2Parents: TitulaireActe.getAuMoinsDeuxParentsDirects(titulairesActe[1]),
        natureActe: props.acte.nature,
        formDefaultValues: mappingActeVerFormulaireSaisirExtrait(props.acte, titulairesAMCompletes)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.acte]);

  const getMessageErreur = (): string => {
    return popinMessageErreur.problemePlurilingueActeNaissanceOuDeces
      ? "Au moins une personne (le titulaire ou les parents) est de genre indéterminé ou les parents sont de même sexe."
      : "Les titulaires sont de même sexe ou de genre indéterminé";
  };

  const setAfficheParentsAdoptantsTitulaire = (
    formik: FormikProps<FormikValues>,
    nomComposantTitulaire: string,
    afficheParentsAdoptants: boolean
  ) => {
    if (afficheParentsAdoptants) {
      if (nomComposantTitulaire === TITULAIRE_EVT_1) {
        setTitulaire1ParentsAdoptants(TitulaireActe.getDeuxParentsAdoptantsVides());
      } else {
        setTitulaire2ParentsAdoptants(TitulaireActe.getDeuxParentsAdoptantsVides());
      }
    } else {
      if (nomComposantTitulaire === TITULAIRE_EVT_1) {
        setTitulaire1ParentsAdoptants([]);
      } else {
        setTitulaire2ParentsAdoptants([]);
      }
      formik.setFieldValue(withNamespace(nomComposantTitulaire, PARENT_ADOPTANT_NAISS1), undefined);
      formik.setFieldValue(withNamespace(nomComposantTitulaire, PARENT_ADOPTANT_NAISS2), undefined);
    }
  };

  const { titulairesAMs, evenement, titulaireActe1, titulaireActe2, titulaire1Parents, titulaire2Parents, natureActe, formDefaultValues } =
    proprietesFormulaire;

  return proprietesFormulaire.initialise ? (
    <>
      <Formulaire
        key={cleReinitialisation}
        className="FormulaireSaisirExtrait"
        formDefaultValues={formDefaultValues}
        formValidationSchema={getValidationSchema(natureActe, titulairesAMs)}
        onSubmit={onSubmitValiderExtraitSaisi}
      >
        <FormikEffect
          onChange={(dirty: boolean) => {
            setIsDirty(dirty);
          }}
        />
        <div className="DeuxColonnes">
          <StaticField
            libelle={"Nature"}
            valeur={props.acte.nature.libelle}
          ></StaticField>
          <StaticField
            libelle={"Référence"}
            valeur={FicheActe.getReference(props.acte)}
          ></StaticField>
        </div>

        <BoutonVerrouillage
          estVerrouille={saisieVerrouillee}
          toggleVerrouilllage={() => setSaisieVerrouillee(!saisieVerrouillee)}
          libelle={"la saisie des champs"}
        />

        <SaisirExtraitFormContext.Provider
          value={{
            setAfficheParentsAdoptantsTitulaire,
            saisieVerrouillee,
            mapPrenomAffiche
          }}
        >
          {getTitulairesEvenementsEtParentsForm({
            titulairesAMs,
            natureActe,
            titulaire1Parents,
            titulaire2Parents,
            titulaire1ParentsAdoptants,
            titulaire2ParentsAdoptants,
            donneesComplementairesPlurilingue: RequeteDelivrance.possedeUnDocumentPlurilingue(props.requete),
            evenement,
            naissanceTitulaire1: titulaireActe1?.naissance,
            naissanceTitulaire2: titulaireActe2?.naissance,
            saisieVerrouillee
          })}
        </SaisirExtraitFormContext.Provider>
        <div className="h-16">
          <div className="fixed bottom-[5.5rem] right-16">
            <ReinitialiserValiderFormBoutons
              onClickReInitialiser={() => {
                mapPrenomAffiche.clear();
                reinitialisation();
                setTitulaire1ParentsAdoptants(initTitulaire1ParentAdoptants(props.acte));
                setTitulaire2ParentsAdoptants(initTitulaire2ParentAdoptants(props.acte));
              }}
              validerDisabled={false}
              afficherBouton={!StatutRequete.estTransmiseAValideur(props.requete.statutCourant.statut)}
            />
          </div>
        </div>
      </Formulaire>
      <ConfirmationPopin
        estOuvert={popinMessageErreur?.ouverte}
        messages={[getMessageErreur(), "Si vous continuez, l'extrait plurilingue généré sera en erreur.", "Voulez-vous continuer ?"]}
        boutons={[
          {
            label: "Oui",
            action: () => {
              handlePopinOui();
              setPopinMessageErreur({
                ...popinMessageErreur,
                ouverte: false
              });
            }
          },
          {
            label: "Non",
            action: () => {
              setPopinMessageErreur({
                ...popinMessageErreur,
                ouverte: false
              });
            }
          }
        ]}
      />
    </>
  ) : (
    <></>
  );
};

const initTitulaireParentAdoptants = (acte: IFicheActe, numeroTitulaire: number): IFiliation[] | (() => IFiliation[]) =>
  TitulaireActe.getDeuxParentsAdoptantsOuVide(FicheActe.getTitulairesActeTabDansLOrdre(acte)[numeroTitulaire]);

const initTitulaire1ParentAdoptants = (acte: IFicheActe): IFiliation[] | (() => IFiliation[]) => initTitulaireParentAdoptants(acte, 0);

const initTitulaire2ParentAdoptants = (acte: IFicheActe): IFiliation[] | (() => IFiliation[]) => initTitulaireParentAdoptants(acte, 1);
