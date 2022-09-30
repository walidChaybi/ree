import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAutoDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import {
  TypeLienRequerant,
  TYPE_LIEN_REQUERANT_POUR_TITULAIRE
} from "@model/requete/enum/TypeLienRequerant";
import {
  TypeRequerantRDC,
  UN_TITULAIRE
} from "@model/requete/enum/TypeRequerantRDC";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import messageManager from "@util/messageManager";
import { Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "@widget/formulaire/adresse/AdresseForm";
import { Formulaire } from "@widget/formulaire/Formulaire";
import {
  RequeteFormDefaultValues,
  RequeteFormValidationSchema
} from "@widget/formulaire/requete/RequeteForm";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { mappingRequeteDelivranceToRequeteTableau } from "../../requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import {
  getMessagesPopin,
  verifierDonneesObligatoires
} from "./contenu/SaisirRDCPageFonctions";
import {
  getAdresseForm,
  getBoutonsPopin,
  getEvenementForm,
  getLienTitulaireForm,
  getMandantForm,
  getRequerantForm,
  getRequeteForm,
  getTitulaire1Form,
  getTitulaire2Form
} from "./contenu/SaisirRDCPageForms";
import { useCreationRequeteDelivranceRDC } from "./hook/CreerRDCApiHook";
import {
  ADRESSE,
  CreationRequeteRDC,
  EVENEMENT,
  LIEN_TITULAIRE,
  MANDANT,
  REQUERANT,
  REQUETE,
  SaisieRequeteRDC,
  TITULAIRE1,
  TITULAIRE2
} from "./modelForm/ISaisirRDCPageModel";
import "./scss/SaisirRequetePage.scss";
import {
  EvenementFormDefaultValues,
  EvenementFormValidationSchema
} from "./sousFormulaires/evenement/EvenementForm";
import {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema
} from "./sousFormulaires/identite/IdentiteForm";
import {
  LienTitulaireFormDefaultValues,
  LienTitulaireFormValidationSchema
} from "./sousFormulaires/lienTitulaire/LienTitulaireForm";
import {
  MandantFormDefaultValues,
  MandantFormValidationSchema
} from "./sousFormulaires/mandant/MandantForm";
import {
  RequerantFormValidationSchema,
  TitulairesFormDefaultValues
} from "./sousFormulaires/requerant/RequerantForm";

// Valeurs par défaut des champs
const DefaultValuesRDCRequete = {
  [REQUETE]: RequeteFormDefaultValues,
  [EVENEMENT]: EvenementFormDefaultValues,
  [TITULAIRE1]: IdentiteFormDefaultValues,
  [TITULAIRE2]: IdentiteFormDefaultValues,
  [REQUERANT]: TitulairesFormDefaultValues,
  [MANDANT]: MandantFormDefaultValues,
  [LIEN_TITULAIRE]: LienTitulaireFormDefaultValues,
  [ADRESSE]: AdresseFormDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRDCRequete = Yup.object({
  [REQUETE]: RequeteFormValidationSchema,
  [EVENEMENT]: EvenementFormValidationSchema,
  [TITULAIRE1]: IdentiteFormValidationSchema,
  [TITULAIRE2]: IdentiteFormValidationSchema,
  [REQUERANT]: RequerantFormValidationSchema,
  [MANDANT]: MandantFormValidationSchema,
  [LIEN_TITULAIRE]: LienTitulaireFormValidationSchema,
  [ADRESSE]: AdresseFormValidationSchema
});

export const titreForm = SousTypeDelivrance.getEnumFor("RDC").libelle;

export const SaisirRDCPage: React.FC = () => {
  const history = useHistory();

  const [evenementVisible, setEvenementVisible] = useState<boolean>(false);
  const [titulaire2Visible, setTitulaire2Visible] = useState<boolean>(false);
  const [mandantVisible, setMandantVisible] = useState<boolean>(false);
  const [lienTitulaireVisible, setLienTitulaireVisible] =
    useState<boolean>(true);

  const [optionsRequerant, setOptionsRequerant] = useState<Options>(
    TypeRequerantRDC.getListEnumsAsOptions(UN_TITULAIRE)
  );

  const [optionsLienTitulaire, setOptionsLienTitulaire] = useState<Options>(
    TypeLienRequerant.getListEnumsAsOptions(TYPE_LIEN_REQUERANT_POUR_TITULAIRE)
  );

  const [donneesIncompletes, setDonneesIncompletes] =
    React.useState<boolean>(false);
  const [isBrouillon, setIsBrouillon] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [saisieRequeteRDC, setSaisieRequeteRDC] = useState<SaisieRequeteRDC>();
  const [creationRequeteRDC, setCreationRequeteRDC] =
    useState<CreationRequeteRDC>();
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();
  useNavigationApercuRMCAutoDelivrance(paramsRMCAuto);

  const onChangeNature = (nature: string) => {
    setEvenementVisible(
      NatureActeRequete.getEnumFor(nature) !== NatureActeRequete.NAISSANCE
    );
    setTitulaire2Visible(
      NatureActeRequete.getEnumFor(nature) === NatureActeRequete.MARIAGE
    );

    if (NatureActeRequete.getEnumFor(nature) === NatureActeRequete.MARIAGE) {
      setOptionsRequerant(TypeRequerantRDC.getAllEnumsAsOptions());
    } else {
      setOptionsRequerant(TypeRequerantRDC.getListEnumsAsOptions(UN_TITULAIRE));
    }
  };

  const onChangeRequerant = (typeRequerant: string) => {
    setMandantVisible(
      TypeRequerantRDC.getEnumFor(typeRequerant) === TypeRequerantRDC.MANDATAIRE
    );

    setLienTitulaireVisible(
      !(
        TypeRequerantRDC.getEnumFor(typeRequerant) ===
          TypeRequerantRDC.INSTITUTIONNEL ||
        TypeRequerantRDC.getEnumFor(typeRequerant) ===
          TypeRequerantRDC.AUTRE_PROFESSIONNEL
      )
    );

    if (
      TypeRequerantRDC.getEnumFor(typeRequerant) ===
        TypeRequerantRDC.TITULAIRE1 ||
      TypeRequerantRDC.getEnumFor(typeRequerant) === TypeRequerantRDC.TITULAIRE2
    ) {
      setOptionsLienTitulaire(
        TypeLienRequerant.getListEnumsAsOptions(
          TYPE_LIEN_REQUERANT_POUR_TITULAIRE
        )
      );
    } else if (
      TypeRequerantRDC.getEnumFor(typeRequerant) ===
      TypeRequerantRDC.PARTICULIER
    ) {
      setOptionsLienTitulaire(TypeLienRequerant.getAllEnumsAsOptions());
    } else if (
      TypeRequerantRDC.getEnumFor(typeRequerant) === TypeRequerantRDC.MANDATAIRE
    ) {
      setOptionsLienTitulaire(TypeLienMandant.getAllEnumsAsOptions());
    }
  };

  const blocsForm: JSX.Element[] = [
    getRequeteForm(onChangeNature),
    getEvenementForm(evenementVisible),
    getTitulaire1Form(),
    getTitulaire2Form(titulaire2Visible),
    getRequerantForm(optionsRequerant, onChangeRequerant),
    getMandantForm(mandantVisible),
    getLienTitulaireForm(lienTitulaireVisible, optionsLienTitulaire),
    getAdresseForm()
  ];

  const creationRequeteDelivranceRDCResultat =
    useCreationRequeteDelivranceRDC(creationRequeteRDC);

  const redirectionPage = useCallback(
    async (requeteSauvegardee: IRequeteDelivrance) => {
      // Si l'appel c'est terminé sans erreur
      if (requeteSauvegardee) {
        messageManager.showSuccessAndClose(
          getLibelle("La requête a bien été enregistrée")
        );
        setParamsRMCAuto({
          requete: mappingRequeteDelivranceToRequeteTableau(requeteSauvegardee),
          urlCourante: history.location.pathname
        });
      }
      setOperationEnCours(false);
    },
    [history]
  );

  useEffect(() => {
    if (creationRequeteDelivranceRDCResultat) {
      redirectionPage(creationRequeteDelivranceRDCResultat.requete);
    }
  }, [creationRequeteDelivranceRDCResultat, redirectionPage]);

  const onSubmitSaisirRequete = (values: SaisieRequeteRDC) => {
    setSaisieRequeteRDC(values);
    if (verifierDonneesObligatoires(values)) {
      setCreationRequeteRDC({
        saisie: values,
        refus: false,
        futurStatut: isBrouillon
          ? StatutRequete.BROUILLON
          : StatutRequete.PRISE_EN_CHARGE
      });
    } else {
      // popin confirmation
      setDonneesIncompletes(true);
    }
  };

  const validerSaisie = () => {
    if (saisieRequeteRDC) {
      setOperationEnCours(true);
      setCreationRequeteRDC({
        saisie: saisieRequeteRDC,
        futurStatut: StatutRequete.PRISE_EN_CHARGE
      });
    }
  };

  const boutonsProps = { setIsBrouillon } as SaisirRequeteBoutonsProps;

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={DefaultValuesRDCRequete}
        formValidationSchema={ValidationSchemaRDCRequete}
        onSubmit={onSubmitSaisirRequete}
        className="FormulaireSaisirRDC"
      >
        <div>{blocsForm}</div>
        <SaisirRequeteBoutons {...boutonsProps} />
      </Formulaire>
      <ConfirmationPopin
        isOpen={donneesIncompletes}
        messages={getMessagesPopin()}
        boutons={getBoutonsPopin(validerSaisie, setDonneesIncompletes)}
      />
    </>
  );
};
