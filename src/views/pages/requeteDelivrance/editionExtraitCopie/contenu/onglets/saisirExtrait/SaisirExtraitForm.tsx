import { BoutonVerrouillage } from "@composant/formulaire/boutons/BoutonVerrouillage";
import { ReinitialiserValiderFormBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import {
  PARENT_ADOPTANT_NAISS1,
  PARENT_ADOPTANT_NAISS2,
  TITULAIRE_EVT_1
} from "@composant/formulaire/ConstantesNomsForm";
import { RECEContext } from "@core/body/RECEContext";
import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import {
  ISauvegardeValidationSaisieExtraitParams,
  useSauvegardeValidationSaisieExtrait
} from "@hook/requete/ValidationSaisieExtraitHook";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import { TitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "@model/requete/IRequeteDelivrance";
import { useReinitialisationComposant } from "@util/form/useReinitialisation";
import { getLibelle } from "@util/Utils";
import { StaticField } from "@widget/formulaire/champFixe/StaticField";
import { Formulaire } from "@widget/formulaire/Formulaire";
import FormikEffect from "@widget/formulaire/utils/FormikEffect";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { FormikProps, FormikValues } from "formik";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { EditionExtraitCopiePageContext } from "../../../EditionExtraitCopiePage";
import {
  ISaisieExtraitForm,
  mappingActeVerFormulaireSaisirExtrait
} from "./mapping/mappingActeVerFormulaireSaisirExtrait";
import { mappingFormulaireSaisirExtraitVersExtraitAEnvoyer } from "./mapping/mappingFormulaireSaisirExtraitVersExtraitAEnvoyer";
import {
  getTitulairesEvenementsEtParentsForm,
  getValidationSchema,
  initProprietesFormulaire,
  IProprietesFormulaire,
  parentMemeSexeOuIndeterminCasPlurilingue,
  titulairesMemeSexeOuIndeterminCasPlurilingue
} from "./SaisirExtraitFormUtil";
import "./scss/FormulaireSaisirExtrait.scss";

interface ComponentFormProps {
  acte: IFicheActe;
  requete: IRequeteDelivrance;
}

type SaisirExtraitFormProps = ComponentFormProps;

export const SaisirExtraitFormContext = React.createContext({
  setAfficheParentsAdoptantsTitulaire: (
    formik: FormikProps<FormikValues>,
    nomComposantTitulaire: string,
    afficheParentsAdoptants: boolean
  ) => {},
  saisieVerrouillee: true
});

interface IPopinMessageErreur {
  ouverte: boolean;
  problemePlurilingueActeMariage: boolean;
  problemePlurilingueActeNaissanceOuDeces: boolean;
}

export const SaisirExtraitForm: React.FC<SaisirExtraitFormProps> = props => {
  const { setOperationEnCours, rafraichirRequete } = useContext(
    EditionExtraitCopiePageContext
  );
  const { setIsDirty } = useContext(RECEContext);

  const [proprietesFormulaire, setProprietesFormulaire] =
    useState<IProprietesFormulaire>(initProprietesFormulaire());

  const [popinMessageErreur, setPopinMessageErreur] =
    useState<IPopinMessageErreur>({
      ouverte: false,
      problemePlurilingueActeMariage: false,
      problemePlurilingueActeNaissanceOuDeces: false
    });
  const [sauvegarderSaisieParams, setSauvegarderSaisieParams] =
    useState<ISauvegardeValidationSaisieExtraitParams>();
  const { cleReinitialisation, reinitialisation } =
    useReinitialisationComposant();
  const [extraitSaisiAEnvoyer, setExtraitSaisiAEnvoyer] =
    useState<IExtraitSaisiAEnvoyer>();

  const [titulaire1ParentsAdoptants, setTitulaire1ParentsAdoptants] = useState<
    IFiliation[]
  >(initTitulaire1ParentAdoptants(props.acte));
  const [titulaire2ParentsAdoptants, setTitulaire2ParentsAdoptants] = useState<
    IFiliation[]
  >(initTitulaire2ParentAdoptants(props.acte));

  const [saisieVerrouillee, setSaisieVerrouillee] = useState<boolean>(true);

  useSauvegardeValidationSaisieExtrait(sauvegarderSaisieParams);

  const onSubmitValiderExtraitSaisi = (extraitSaisi: ISaisieExtraitForm) => {
    const extraitAEnvoyer = mappingFormulaireSaisirExtraitVersExtraitAEnvoyer(
      extraitSaisi,
      props.acte
    );
    setExtraitSaisiAEnvoyer(extraitAEnvoyer);
    const problemePlurilingueActeNaissanceOuDeces =
      !FicheActe.estActeMariage(props.acte) &&
      parentMemeSexeOuIndeterminCasPlurilingue(
        [extraitAEnvoyer.titulaire1, extraitAEnvoyer.titulaire2],
        props.requete.documentsReponses
      );

    const problemePlurilingueActeMariage =
      FicheActe.estActeMariage(props.acte) &&
      titulairesMemeSexeOuIndeterminCasPlurilingue(
        [extraitAEnvoyer.titulaire1, extraitAEnvoyer.titulaire2],
        props.requete.documentsReponses
      );
    if (
      problemePlurilingueActeNaissanceOuDeces ||
      problemePlurilingueActeMariage
    ) {
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
        callBack: rafraichirRequete,
        problemePlurilingue: false
      });
    }
  };

  const handlePopinOui = useCallback(() => {
    if (extraitSaisiAEnvoyer) {
      setOperationEnCours(true);
      setSauvegarderSaisieParams({
        requete: props.requete,
        acte: props.acte,
        extraitSaisiAEnvoyer,
        callBack: () => {
          setOperationEnCours(false);
          rafraichirRequete();
        },
        problemePlurilingue:
          popinMessageErreur.problemePlurilingueActeNaissanceOuDeces ||
          popinMessageErreur.problemePlurilingueActeMariage
      });
    }
  }, [
    extraitSaisiAEnvoyer,
    popinMessageErreur.problemePlurilingueActeMariage,
    popinMessageErreur.problemePlurilingueActeNaissanceOuDeces,
    props,
    setOperationEnCours,
    rafraichirRequete
  ]);

  useEffect(() => {
    if (props.acte) {
      const titulairesAMCompletes =
        FicheActe.getTitulairesAMDansLOrdreAvecMajDonneesTitulaireActe(
          props.acte
        );

      const titulairesActe = FicheActe.getTitulairesActeTabDansLOrdre(
        props.acte
      );

      setProprietesFormulaire({
        initialise: true,
        titulairesAMs: titulairesAMCompletes,
        evenement: props.acte.evenement,
        titulaireActe1: titulairesActe[0],
        titulaireActe2: titulairesActe[1],
        titulaire1Parents: TitulaireActe.getAuMoinsDeuxParentsDirects(
          titulairesActe[0]
        ),
        titulaire2Parents: TitulaireActe.getAuMoinsDeuxParentsDirects(
          titulairesActe[1]
        ),
        natureActe: props.acte.nature,
        formDefaultValues: mappingActeVerFormulaireSaisirExtrait(
          props.acte,
          titulairesAMCompletes
        )
      });
    }
  }, [props.acte]);

  const {
    titulairesAMs,
    evenement,
    titulaireActe1,
    titulaireActe2,
    titulaire1Parents,
    titulaire2Parents,
    natureActe,
    formDefaultValues
  } = proprietesFormulaire;

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
          onChange={dirty => {
            setIsDirty(dirty);
          }}
        />
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

        <BoutonVerrouillage
          estVerrouille={saisieVerrouillee}
          toggleVerrouilllage={() => setSaisieVerrouillee(!saisieVerrouillee)}
          libelle={getLibelle("la saisie des champs")}
        />

        <SaisirExtraitFormContext.Provider
          value={{
            setAfficheParentsAdoptantsTitulaire,
            saisieVerrouillee
          }}
        >
          {getTitulairesEvenementsEtParentsForm({
            titulairesAMs,
            natureActe,
            titulaire1Parents,
            titulaire2Parents,
            titulaire1ParentsAdoptants,
            titulaire2ParentsAdoptants,
            donneesComplementairesPlurilingue:
              RequeteDelivrance.possedeUnDocumentPlurilingue(props.requete),
            evenement,
            naissanceTitulaire1: titulaireActe1?.naissance,
            naissanceTitulaire2: titulaireActe2?.naissance
          })}
        </SaisirExtraitFormContext.Provider>

        <ReinitialiserValiderFormBoutons
          onClickReInitialiser={() => {
            reinitialisation();
            setTitulaire1ParentsAdoptants(
              initTitulaire1ParentAdoptants(props.acte)
            );
            setTitulaire2ParentsAdoptants(
              initTitulaire2ParentAdoptants(props.acte)
            );
          }}
          validerDisabled={false}
          afficherBouton={
            !StatutRequete.estTransmiseAValideur(
              props.requete.statutCourant.statut
            )
          }
        />
      </Formulaire>
      <ConfirmationPopin
        isOpen={popinMessageErreur?.ouverte}
        messages={[
          getMessageErreur(),
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
              setPopinMessageErreur({
                ...popinMessageErreur,
                ouverte: false
              });
            }
          },
          {
            label: getLibelle("Non"),
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

  function getMessageErreur(): string {
    return popinMessageErreur.problemePlurilingueActeNaissanceOuDeces
      ? getLibelle(
          "Au moins une personne (le titulaire ou les parents) est de genre indéterminé ou les parents sont de même sexe."
        )
      : getLibelle("Les titulaires sont de même sexe ou de genre indéterminé");
  }

  function setAfficheParentsAdoptantsTitulaire(
    formik: FormikProps<FormikValues>,
    nomComposantTitulaire: string,
    afficheParentsAdoptants: boolean
  ) {
    if (afficheParentsAdoptants) {
      if (nomComposantTitulaire === TITULAIRE_EVT_1) {
        setTitulaire1ParentsAdoptants(
          TitulaireActe.getDeuxParentsAdoptantsVides()
        );
      } else {
        setTitulaire2ParentsAdoptants(
          TitulaireActe.getDeuxParentsAdoptantsVides()
        );
      }
    } else {
      if (nomComposantTitulaire === TITULAIRE_EVT_1) {
        setTitulaire1ParentsAdoptants([]);
      } else {
        setTitulaire2ParentsAdoptants([]);
      }
      formik.setFieldValue(
        withNamespace(nomComposantTitulaire, PARENT_ADOPTANT_NAISS1),
        undefined
      );
      formik.setFieldValue(
        withNamespace(nomComposantTitulaire, PARENT_ADOPTANT_NAISS2),
        undefined
      );
    }
  }
};

function initTitulaireParentAdoptants(
  acte: IFicheActe,
  numeroTitulaire: number
): IFiliation[] | (() => IFiliation[]) {
  return TitulaireActe.getDeuxParentsAdoptantsOuVide(
    FicheActe.getTitulairesActeTabDansLOrdre(acte)[numeroTitulaire]
  );
}

function initTitulaire1ParentAdoptants(
  acte: IFicheActe
): IFiliation[] | (() => IFiliation[]) {
  return initTitulaireParentAdoptants(acte, 0);
}

function initTitulaire2ParentAdoptants(
  acte: IFicheActe
): IFiliation[] | (() => IFiliation[]) {
  return initTitulaireParentAdoptants(acte, 1);
}
