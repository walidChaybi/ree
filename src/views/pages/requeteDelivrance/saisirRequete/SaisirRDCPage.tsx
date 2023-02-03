import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAutoDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import {
  CreationActionHookParams,
  useCreationAction
} from "@hook/requete/CreationAction";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import {
  TypePieceJointe,
  usePostPiecesJointesApi
} from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
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
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { PATH_MODIFIER_RDC, receUrl } from "@router/ReceUrls";
import { PieceJointe } from "@util/FileUtils";
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
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { mappingRequeteDelivranceToRequeteTableau } from "../../requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
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
  getPiecesJointesForm,
  getRequerantForm,
  getRequeteForm,
  getTitulaire1Form,
  getTitulaire2Form
} from "./contenu/SaisirRDCPageForms";
import { useCreationRequeteDelivranceRDC } from "./hook/CreerRDCApiHook";
import { mappingRequeteDelivranceVersFormulaireRDC } from "./hook/mappingRequeteDelivranceVersFormulaireRDC";
import { useUpdateRequeteDelivranceRDC } from "./hook/UpdateRDCApiHook";
import {
  ADRESSE,
  CreationRequeteRDC,
  EVENEMENT,
  LIEN_TITULAIRE,
  MANDANT,
  PIECES_JOINTES,
  REQUERANT,
  REQUETE,
  SaisieRequeteRDC,
  TITULAIRE1,
  TITULAIRE2,
  UpdateRequeteRDC
} from "./modelForm/ISaisirRDCPageModel";
import {
  NATURE_ACTE,
  TYPE_REQUERANT
} from "./modelForm/ISaisirRequetePageModel";
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

interface IComplementCreationUpdateRequete {
  statutFinal?: StatutRequete;
}

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
  const [modeModification, setModeModification] = useState(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [saisieRequeteRDC, setSaisieRequeteRDC] = useState<SaisieRequeteRDC>();
  const [creationRequeteRDC, setCreationRequeteRDC] = useState<
    CreationRequeteRDC & IComplementCreationUpdateRequete
  >();
  const [piecesjointesAMettreAJour, setPiecesjointesAMettreAJour] =
    useState<PieceJointe[]>();
  const [updateRequeteRDC, setUpdateRequeteRDC] = useState<
    UpdateRequeteRDC & IComplementCreationUpdateRequete
  >();
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();
  const [idRequete, setIdRequete] = useState<string>();
  const [requete, setRequete] = useState<SaisieRequeteRDC>();
  const [paramsCreationAction, setParamsCreationAction] = useState<
    CreationActionHookParams | undefined
  >();
  const [
    creationActionMiseAjourStatutParams,
    setCreationActionMiseAjourStatutParams
  ] = useState<ICreationActionMiseAjourStatutHookParams>();

  const { idRequeteParam } = useParams<IUuidRequeteParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);
  const creationRequeteDelivranceRDCResultat =
    useCreationRequeteDelivranceRDC(creationRequeteRDC);
  const updateRequeteDelivranceRDCResultat =
    useUpdateRequeteDelivranceRDC(updateRequeteRDC);
  useCreationAction(paramsCreationAction);
  useCreationActionMiseAjourStatut(creationActionMiseAjourStatutParams);
  useNavigationApercuRMCAutoDelivrance(paramsRMCAuto);

  const getIdRequeteCreee = useCallback(() => {
    if (updateRequeteDelivranceRDCResultat) {
      return updateRequeteDelivranceRDCResultat.requete.id;
    } else if (creationRequeteDelivranceRDCResultat) {
      return creationRequeteDelivranceRDCResultat.requete.id;
    }
    return undefined;
  }, [
    creationRequeteDelivranceRDCResultat,
    updateRequeteDelivranceRDCResultat
  ]);

  const postPiecesJointesApiResultat = usePostPiecesJointesApi(
    TypePieceJointe.PIECE_JUSTIFICATIVE,
    getIdRequeteCreee(),
    piecesjointesAMettreAJour
  );

  useEffect(() => {
    setIdRequete(idRequeteParam);
  }, [idRequeteParam]);

  useEffect(() => {
    if (detailRequeteState) {
      const requeteForm = mappingRequeteDelivranceVersFormulaireRDC(
        detailRequeteState as IRequeteDelivrance
      );

      setRequete(requeteForm);
      onChangeNature(requeteForm[REQUETE][NATURE_ACTE]);
      onChangeRequerant(requeteForm[REQUERANT][TYPE_REQUERANT]);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (
      creationRequeteDelivranceRDCResultat?.requete ||
      updateRequeteDelivranceRDCResultat?.requete
    ) {
      const resultat =
        creationRequeteDelivranceRDCResultat ??
        updateRequeteDelivranceRDCResultat;
      // Une fois la requête créée ou mise à jour, la mise à jour des pièces jointes peut se faire
      const pjAMettreAjour = getPiecesJointesAMettreAJour(
        saisieRequeteRDC?.[PIECES_JOINTES]
      );
      if (pjAMettreAjour && pjAMettreAjour.length > 0) {
        setPiecesjointesAMettreAJour(pjAMettreAjour);
      } else if (modeModification) {
        majActionEtRedirection(resultat);
      } else {
        majStatutRequeteSiBesoinEtRedirection();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    creationRequeteDelivranceRDCResultat,
    updateRequeteDelivranceRDCResultat
  ]);

  useEffect(() => {
    // Une fois les pièces jointes mises à jour, la maj du bon statut de la requête puis la redirection sont effectuées
    if (postPiecesJointesApiResultat && !postPiecesJointesApiResultat.erreur) {
      if (modeModification) {
        majActionEtRedirection(
          updateRequeteDelivranceRDCResultat ??
            creationRequeteDelivranceRDCResultat
        );
      } else {
        majStatutRequeteSiBesoinEtRedirection();
      }
    } else if (postPiecesJointesApiResultat?.erreur) {
      setOperationEnCours(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPiecesJointesApiResultat]);

  useEffect(() => {
    if (history) {
      const url = receUrl.getUrlCourante(history);
      setModeModification(url.includes(PATH_MODIFIER_RDC));
    }
  }, [history]);

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

  const redirectApresCreationOuModification = useCallback(() => {
    if (updateRequeteDelivranceRDCResultat && updateRequeteRDC) {
      // Maj du statut de la requête suite à l'appel d'api de mise à jour de statut de la requête
      //   pour éviter de faire un nouvelle appel d'api pour recharger la requête avec le bon statut
      redirectionPage(updateRequeteDelivranceRDCResultat.requete);
    } else if (creationRequeteDelivranceRDCResultat && creationRequeteRDC) {
      // Maj du statut de la requête suite à l'appel d'api de mise à jour de statut de la requête
      //   pour éviter de faire un nouvelle appel d'api pour recharger la requête avec le bon statut
      redirectionPage(creationRequeteDelivranceRDCResultat.requete);
    }
  }, [
    creationRequeteDelivranceRDCResultat,
    creationRequeteRDC,
    redirectionPage,
    updateRequeteDelivranceRDCResultat,
    updateRequeteRDC
  ]);

  const majActionEtRedirection = useCallback(
    async (requeteSauvegardee: any) => {
      setParamsCreationAction({
        libelleAction: "Requête modifiée",
        requete: {
          idRequete: requeteSauvegardee.requete.id
        } as IRequeteTableauDelivrance,
        callback: () => redirectApresCreationOuModification()
      });
    },
    [redirectApresCreationOuModification]
  );

  const majStatutRequeteSiBesoinEtRedirection = useCallback(() => {
    const statutFinal: StatutRequete | undefined =
      updateRequeteRDC?.statutFinal || creationRequeteRDC?.statutFinal;
    const futurStatut: StatutRequete | undefined =
      updateRequeteRDC?.futurStatut || creationRequeteRDC?.futurStatut;
    if (statutFinal && statutFinal !== futurStatut) {
      setCreationActionMiseAjourStatutParams({
        libelleAction: statutFinal.libelle,
        statutRequete: statutFinal,
        requete: {
          idRequete: getIdRequeteCreee()
        } as IRequeteTableauDelivrance,
        // redirection ensuite
        callback: () => redirectApresCreationOuModification()
      });
    } else {
      redirectApresCreationOuModification();
    }
  }, [
    creationRequeteRDC,
    getIdRequeteCreee,
    redirectApresCreationOuModification,
    updateRequeteRDC
  ]);

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

  function getPiecesJointesAMettreAJour(
    formulairePiecesJointes?: PieceJointe[]
  ) {
    // On ne prend que les pjs dont le contenu est renseigné,
    //   en effet si le contenu est vide c'est qu'il a été écrasé par la requête lors de la sauvegarde (la requête ramène ses pièces jointes mais sans le contenu)
    return formulairePiecesJointes?.filter(
      formulairePj => formulairePj.base64File.base64String
    );
  }

  const onSubmitSaisirRequete = (values: SaisieRequeteRDC) => {
    setSaisieRequeteRDC(values);
    if (verifierDonneesObligatoires(values)) {
      const requeteRDC = {
        saisie: values,
        refus: false,
        futurStatut: isBrouillon
          ? StatutRequete.BROUILLON
          : StatutRequete.PRISE_EN_CHARGE
      };

      setOperationEnCours(true);
      idRequete
        ? setUpdateRequeteRDC({
            idRequete,
            ...requeteRDC
          })
        : setCreationRequeteRDC(requeteRDC);
    } else {
      // popin confirmation
      setDonneesIncompletes(true);
    }
  };

  const validerSaisie = () => {
    if (saisieRequeteRDC) {
      const requeteRDC = {
        saisie: saisieRequeteRDC,
        futurStatut: StatutRequete.PRISE_EN_CHARGE
      };

      setOperationEnCours(true);
      idRequete
        ? setUpdateRequeteRDC({
            idRequete,
            ...requeteRDC
          })
        : setCreationRequeteRDC(requeteRDC);
    }
  };

  const boutonsProps = {
    setIsBrouillon,
    modeModification
  } as SaisirRequeteBoutonsProps;

  const blocsForm: JSX.Element[] = [
    getRequeteForm(onChangeNature),
    getEvenementForm(evenementVisible),
    getTitulaire1Form(detailRequeteState),
    getTitulaire2Form(detailRequeteState, titulaire2Visible),
    getRequerantForm(detailRequeteState, optionsRequerant, onChangeRequerant),
    getMandantForm(mandantVisible),
    getLienTitulaireForm(lienTitulaireVisible, optionsLienTitulaire),
    getAdresseForm(),
    getPiecesJointesForm()
  ];

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
        formDefaultValues={requete ?? DefaultValuesRDCRequete}
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
