import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAutoDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import { CreationActionHookParams, useCreationAction } from "@hook/requete/CreationAction";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import {
  TypePieceJointe,
  usePostPiecesJointesApi
} from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_ATTESTATION_PACS } from "@model/requete/enum/DocumentDelivranceConstante";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { PATH_MODIFIER_RDCSC, receUrl } from "@router/ReceUrls";
import { PieceJointe } from "@util/FileUtils";
import messageManager from "@util/messageManager";
import { ProtectionApercu } from "@util/route/Protection/ProtectionApercu";
import { DEUX, getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "@widget/formulaire/adresse/AdresseForm";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { DOCUMENT_OBLIGATOIRE } from "@widget/formulaire/FormulaireMessages";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { FormikProps, FormikValues } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useReponseSansDelivranceCS } from "../../requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/hook/ChoixReponseSansDelivranceCSHook";
import { mappingRequeteDelivranceToRequeteTableau } from "../../requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
import { ADonneesTitulaireRequeteAbsentes } from "../espaceDelivrance/EspaceDelivranceUtils";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import {
  createReponseSansDelivranceCS,
  getMessagesPopin
} from "./contenu/SaisirRDCSCPageFonctions";
import {
  getAdresseForm,
  getBoutonsPopin,
  getDocumentDemandeForm,
  getPiecesJointesForm,
  getRequerantForm,
  getTitulairesForm
} from "./contenu/SaisirRDCSCPageForms";
import { useCreationRequeteDelivranceRDCSC } from "./hook/CreerRDCSCApiHook";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "./hook/mappingRequeteDelivranceVersFormulaireRDCSC";
import { useUpdateRequeteDelivranceRDCSC } from "./hook/UpdateRDCSCApiHook";
import {
  ADRESSE,
  CreationRequeteRDCSC,
  DOCUMENT,
  PIECES_JOINTES,
  REQUERANT,
  SaisieRequeteRDCSC,
  TITULAIRES,
  UpdateRequeteRDCSC
} from "./modelForm/ISaisirRDCSCPageModel";
import "./scss/SaisirRequetePage.scss";
import {
  IdentiteFormDefaultValuesRDCSC,
  IdentiteFormValidationSchema,
  IdentiteSubFormProps
} from "./sousFormulaires/identite/IdentiteForm";
import {
  RequerantFormDefaultValues,
  RequerantFormValidationSchema
} from "./sousFormulaires/requerant/RequerantForm";

// Valeurs par défaut des champs
const DefaultValuesSaisirRDCSC = {
  [DOCUMENT]: "",
  [TITULAIRES]: {
    titulaire1: IdentiteFormDefaultValuesRDCSC,
    titulaire2: IdentiteFormDefaultValuesRDCSC
  },
  [REQUERANT]: RequerantFormDefaultValues,
  [ADRESSE]: AdresseFormDefaultValues,
  [PIECES_JOINTES]: null
};

// Schéma de validation en sortie de champs
const ValidationSchemaSaisirRDCSC = Yup.object({
  [DOCUMENT]: Yup.string().required(DOCUMENT_OBLIGATOIRE),
  [TITULAIRES]: IdentiteFormValidationSchema,
  [REQUERANT]: RequerantFormValidationSchema,
  [ADRESSE]: AdresseFormValidationSchema
});

interface IdRequeteParam {
  idRequete: string;
}

interface IComplementCreationUpdateRequete {
  statutFinal: StatutRequete;
}

export const titreForm = SousTypeDelivrance.getEnumFor("RDCSC").libelle;

export type TitulairesStateType = {
  titulaires: IdentiteSubFormProps[];
  maxTitulaires: number;
};

export const enum limitesTitulaires {
  MIN = 1,
  MAX = 2
}

export const SaisirRDCSCPage: React.FC = () => {
  /** Formulaire */
  const history = useHistory();
  const [idRequete, setIdRequete] = useState<string>(
    useParams<IdRequeteParam>().idRequete
  );

  const [reponseSansDelivranceCS, setReponseSansDelivranceCS] = useState<
    IReponseSansDelivranceCS | undefined
  >();

  /** Sauvegarder la requête */
  const [isBrouillon, setIsBrouillon] = useState<boolean>(false);

  const [modeModification, setModeModification] = useState(false);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [donneesNaissanceIncomplete, setDonneesNaissanceIncomplete] =
    React.useState<boolean>(false);

  const [saisieRequeteRDCSC, setSaisieRequeteRDCSC] =
    useState<SaisieRequeteRDCSC>();

  const [creationRequeteRDCSC, setCreationRequeteRDCSC] = useState<
    CreationRequeteRDCSC & IComplementCreationUpdateRequete
  >();
  const [updateRequeteRDCSC, setUpdateRequeteRDCSC] = useState<
    UpdateRequeteRDCSC & IComplementCreationUpdateRequete
  >();

  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();

  const [piecesjointesAMettreAJour, setPiecesjointesAMettreAJour] =
    useState<PieceJointe[]>();

  const [paramsCreationAction, setParamsCreationAction] = useState<
    CreationActionHookParams | undefined
  >();

  const [
    metAJourStatutRequeteApresMajPiecesJointes,
    setMetAJourStatutRequeteApresMajPiecesJointes
  ] = useState<ICreationActionMiseAjourStatutHookParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const [titulairesState, setTitulairesState] = useState<TitulairesStateType>({
    titulaires: [creerTitulaire()],
    maxTitulaires: limitesTitulaires.MIN // Le nb max de titulaires autorisés à l'instant T, en fonction du type de document demandé
  });

  // ↴ Initialiser titulairesState lorsque detailRequeteState a été rempli par l'API
  useEffect(() => {
    if (detailRequeteState && detailRequeteState.titulaires) {
      const { titulaires, documentDemande } =
        detailRequeteState as IRequeteDelivrance;

      setTitulairesState({
        titulaires: initialiserTitulaires(titulaires?.length),
        maxTitulaires:
          documentDemande.code === CODE_ATTESTATION_PACS
            ? limitesTitulaires.MAX
            : limitesTitulaires.MIN
      });
    }
  }, [detailRequeteState]);

  const creationRequeteDelivranceRDCSCResultat =
    useCreationRequeteDelivranceRDCSC(
      creationRequeteRDCSC,
      titulairesState.titulaires.length
    );
  const updateRequeteDelivranceRDCSCResultat = useUpdateRequeteDelivranceRDCSC(
    updateRequeteRDCSC,
    titulairesState.titulaires.length
  );

  const getIdRequeteCreee = useCallback(() => {
    if (updateRequeteDelivranceRDCSCResultat) {
      return updateRequeteDelivranceRDCSCResultat.requete.id;
    } else if (creationRequeteDelivranceRDCSCResultat) {
      return creationRequeteDelivranceRDCSCResultat.requete.id;
    }
    return undefined;
  }, [
    creationRequeteDelivranceRDCSCResultat,
    updateRequeteDelivranceRDCSCResultat
  ]);

  const postPiecesJointesApiResultat = usePostPiecesJointesApi(
    TypePieceJointe.PIECE_JUSTIFICATIVE,
    getIdRequeteCreee(),
    piecesjointesAMettreAJour
  );

  useCreationAction(paramsCreationAction);

  useCreationActionMiseAjourStatut(metAJourStatutRequeteApresMajPiecesJointes);

  useNavigationApercuRMCAutoDelivrance(paramsRMCAuto);

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    idRequete,
    StatutRequete.TRAITE_A_IMPRIMER.libelle,
    StatutRequete.TRAITE_A_IMPRIMER,
    reponseSansDelivranceCS
  );

  const documentDemandeOptions =
    DocumentDelivrance.getAllCertificatSituationDemandeEtAttestationAsOptions();

  const boutonsProps = {
    setIsBrouillon,
    modeModification
  } as SaisirRequeteBoutonsProps;

  const { idRequeteParam } = useParams<IUuidRequeteParams>();

  useEffect(() => {
    setIdRequete(idRequeteParam);
  }, [idRequeteParam]);

  useEffect(() => {
    if (detailRequeteState) {
      const requeteForm = mappingRequeteDelivranceVersFormulaireRDCSC(
        detailRequeteState as IRequeteDelivrance
      );
      setSaisieRequeteRDCSC(requeteForm);
    }
  }, [detailRequeteState]);

  const redirectionPage = useCallback(
    async (
      requeteSauvegardee: IRequeteDelivrance,
      statutFinal: StatutRequete,
      refus = false
    ) => {
      // Si l'appel c'est terminé sans erreur
      if (requeteSauvegardee && statutFinal !== StatutRequete.BROUILLON) {
        // Redirection si l'enregistrement n'est pas un brouillon
        if (refus) {
          const reponse = createReponseSansDelivranceCS(requeteSauvegardee);
          setReponseSansDelivranceCS({
            contenu: reponse,
            fichier: NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
          });
        } else {
          let pasDeTraitementAuto;

          messageManager.showSuccessAndClose(
            getLibelle("La requête a bien été enregistrée")
          );

          if (SousTypeDelivrance.estRDCSC(requeteSauvegardee.sousType)) {
            pasDeTraitementAuto =
              ADonneesTitulaireRequeteAbsentes(requeteSauvegardee) || modeModification;
          }
          setParamsRMCAuto({
            requete:
              mappingRequeteDelivranceToRequeteTableau(requeteSauvegardee),
            urlCourante: history.location.pathname,
            pasDeTraitementAuto
          });
        }
      }

      setOperationEnCours(false);
    },
    [history, modeModification]
  );

  const redirectApresCreationOuModification = useCallback(
    (statutFinal: StatutRequete) => {
      if (updateRequeteDelivranceRDCSCResultat && updateRequeteRDCSC) {
        // Maj du statut de la requête suite à l'appel d'api de mise à jour de statut de la requête
        //   pour éviter de faire un nouvelle appel d'api pour recharger la requête avec le bon statut
        updateRequeteDelivranceRDCSCResultat.requete.statutCourant.statut =
          statutFinal;
        redirectionPage(
          updateRequeteDelivranceRDCSCResultat.requete,
          statutFinal,
          updateRequeteDelivranceRDCSCResultat.refus
        );
      } else if (
        creationRequeteDelivranceRDCSCResultat &&
        creationRequeteRDCSC
      ) {
        // Maj du statut de la requête suite à l'appel d'api de mise à jour de statut de la requête
        //   pour éviter de faire un nouvelle appel d'api pour recharger la requête avec le bon statut
        creationRequeteDelivranceRDCSCResultat.requete.statutCourant.statut =
          statutFinal;
        redirectionPage(
          creationRequeteDelivranceRDCSCResultat.requete,
          statutFinal,
          creationRequeteDelivranceRDCSCResultat.refus
        );
      }
    },
    [
      creationRequeteDelivranceRDCSCResultat,
      creationRequeteRDCSC,
      redirectionPage,
      updateRequeteDelivranceRDCSCResultat,
      updateRequeteRDCSC
    ]
  );

  const majIdRequete = useCallback(() => {
    const idReq = getIdRequeteCreee();
    if (idReq) {
      setIdRequete(idReq);
    }
  }, [getIdRequeteCreee]);

  const majStatutRequeteSiBesoinEtRedirection = useCallback(() => {
    const statutFinal: StatutRequete | undefined =
      updateRequeteRDCSC?.statutFinal || creationRequeteRDCSC?.statutFinal;
    const futurStatut: StatutRequete | undefined =
      updateRequeteRDCSC?.futurStatut || creationRequeteRDCSC?.futurStatut;
    majIdRequete();
    if (statutFinal && statutFinal !== futurStatut) {
      setMetAJourStatutRequeteApresMajPiecesJointes({
        libelleAction: statutFinal.libelle,
        statutRequete: statutFinal,
        requete: {
          idRequete: getIdRequeteCreee()
        } as IRequeteTableauDelivrance,
        // redirection ensuite
        callback: () => redirectApresCreationOuModification(statutFinal)
      });
    } else if (statutFinal) {
      redirectApresCreationOuModification(statutFinal);
    }
  }, [
    creationRequeteRDCSC,
    getIdRequeteCreee,
    majIdRequete,
    redirectApresCreationOuModification,
    updateRequeteRDCSC
  ]);

  const majActionEtRedirection = useCallback(() => {
    const statutFinal: StatutRequete | undefined =
      updateRequeteRDCSC?.statutFinal;
    majIdRequete();
    if (statutFinal) {
      setParamsCreationAction({
        libelleAction: "Requête modifiée",
        requete: {
          idRequete: getIdRequeteCreee()
        } as IRequeteTableauDelivrance,
        // redirection ensuite
        callback: () => redirectApresCreationOuModification(statutFinal)
      });
    }
  }, [
    updateRequeteRDCSC,
    majIdRequete,
    getIdRequeteCreee,
    redirectApresCreationOuModification
  ]);

  // Après la création ou la mise à jour de la requête, la mise à jour des pièces jointes est effectuée
  useEffect(() => {
    if (
      creationRequeteDelivranceRDCSCResultat?.requete ||
      updateRequeteDelivranceRDCSCResultat?.requete
    ) {
      // Une fois la requête créée ou mise à jour, la mise à jour des pièces jointes peut se faire
      const pjAMettreAjour = getPiecesJointesAMettreAJour(
        saisieRequeteRDCSC?.[PIECES_JOINTES]
      );
      if (pjAMettreAjour && pjAMettreAjour.length > 0) {
        setPiecesjointesAMettreAJour(pjAMettreAjour);
      } else if (modeModification) {
        majActionEtRedirection();
      } else {
        majStatutRequeteSiBesoinEtRedirection();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    creationRequeteDelivranceRDCSCResultat,
    updateRequeteDelivranceRDCSCResultat
  ]);

  useEffect(() => {
    // Une fois les pièces jointes mises à jour, la maj du bon statut de la requête puis la redirection sont effectuées
    if (postPiecesJointesApiResultat && !postPiecesJointesApiResultat.erreur) {
      if (modeModification) {
        majActionEtRedirection();
      } else {
        majStatutRequeteSiBesoinEtRedirection();
      }
    } else if (postPiecesJointesApiResultat?.erreur) {
      setOperationEnCours(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPiecesJointesApiResultat]);

  useEffect(() => {
    if (resultatReponseSansDelivranceCS) {
      messageManager.showSuccessAndClose(
        getLibelle("Le refus a bien été enregistré")
      );

      history.goBack();
    }
  }, [resultatReponseSansDelivranceCS, history]);

  const onSubmitSaisirRDCSC = (values: SaisieRequeteRDCSC) => {
    setSaisieRequeteRDCSC(values);
    if (
      champManquantTitulaire(values, titulairesState.titulaires) ||
      isBrouillon
    ) {
      // Pop-in
      setDonneesNaissanceIncomplete(true);
    } else {
      // La requête est envoyé au back
      setOperationEnCours(true);
      // Le stockage de la requête s'effectue au statut BROUILON (futurSatut),
      //  lorsque les pièces jointes auront été stockées sans erreur alors la requête passera au "statutFinal"
      if (idRequete) {
        setUpdateRequeteRDCSC({
          idRequete,
          saisie: values,
          refus: false,
          futurStatut: StatutRequete.BROUILLON,
          statutFinal: isBrouillon
            ? StatutRequete.BROUILLON
            : StatutRequete.PRISE_EN_CHARGE
        });
      } else {
        setCreationRequeteRDCSC({
          saisie: values,
          refus: false,
          futurStatut: StatutRequete.BROUILLON,
          statutFinal: isBrouillon
            ? StatutRequete.BROUILLON
            : StatutRequete.PRISE_EN_CHARGE
        });
      }
    }
  };

  const validerRefus = (refus: boolean) => {
    // Après validation ou non du refus, le stockage de la requête s'effectue au statut BROUILON (futurSatut),
    //  lorsque les pièces jointes auront été stockées sans erreur alors la requête passera au "statutFinal"

    if (saisieRequeteRDCSC) {
      setOperationEnCours(true);
      if (idRequete) {
        setUpdateRequeteRDCSC({
          idRequete,
          saisie: saisieRequeteRDCSC,
          refus,
          futurStatut: StatutRequete.BROUILLON,
          statutFinal: refus
            ? StatutRequete.A_TRAITER
            : StatutRequete.PRISE_EN_CHARGE
        });
      } else {
        setCreationRequeteRDCSC({
          saisie: saisieRequeteRDCSC,
          refus,
          futurStatut: StatutRequete.BROUILLON,
          statutFinal: refus
            ? StatutRequete.A_TRAITER
            : StatutRequete.PRISE_EN_CHARGE
        });
      }
    }
  };

  const onChangeTitulaires = (
    titulaires: IdentiteSubFormProps[],
    formik: FormikProps<FormikValues>
  ) => {
    const nomTitulaire2 = withNamespace(TITULAIRES, "titulaire2");
    const nomTypeRequerant = withNamespace(REQUERANT, "typeRequerant");
    const defautTitulaire2 = DefaultValuesSaisirRDCSC[TITULAIRES].titulaire2;
    const defautTypeRequerant =
      DefaultValuesSaisirRDCSC[REQUERANT].typeRequerant;
    const futurNbTitulaires =
      titulairesState.titulaires.length === limitesTitulaires.MAX
        ? limitesTitulaires.MIN
        : limitesTitulaires.MAX;

    if (futurNbTitulaires === limitesTitulaires.MIN) {
      formik.setFieldValue(nomTitulaire2, defautTitulaire2);
      if (formik.getFieldProps(nomTypeRequerant).value === "TITULAIRE2") {
        formik.setFieldValue(nomTypeRequerant, defautTypeRequerant);
      }
    }

    setTitulairesState(precTitulaires => ({
      ...precTitulaires,
      titulaires
    }));
  };

  const onAjoutTitulaire = (formik: FormikProps<FormikValues>) => {
    onChangeTitulaires(
      [
        ...titulairesState.titulaires,
        creerTitulaire(titulairesState.titulaires.length + 1)
      ],
      formik
    );
  };

  const onRetraitTitulaire = (formik: FormikProps<FormikValues>) => {
    onChangeTitulaires(titulairesState.titulaires.slice(0, -1), formik);
  };

  const onChangeMaxTitulaires = (
    maxTitulaires: number,
    formik: FormikProps<FormikValues>
  ) => {
    setTitulairesState(precTitulaires => ({
      ...precTitulaires,
      maxTitulaires
    }));

    if (formik && titulairesState.titulaires.length > maxTitulaires) {
      onRetraitTitulaire(formik);
    }
  };

  useEffect(() => {
    if (history) {
      const url = receUrl.getUrlCourante(history);
      setModeModification(url.includes(PATH_MODIFIER_RDCSC));
    }
  }, [history]);

  return (
    <ProtectionApercu
      statut={detailRequeteState?.statutCourant.statut}
      type={detailRequeteState?.type}
    >
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={saisieRequeteRDCSC || DefaultValuesSaisirRDCSC}
        formValidationSchema={ValidationSchemaSaisirRDCSC}
        onSubmit={onSubmitSaisirRDCSC}
        className="FormulaireSaisirRDCSC"
      >
        <div>
          {
            // Eléments du formulaire:
            [
              getDocumentDemandeForm(
                documentDemandeOptions,
                onChangeMaxTitulaires
              ),
              getTitulairesForm({
                requete: detailRequeteState,
                titulaires: titulairesState.titulaires,
                maxTitulaires: titulairesState.maxTitulaires,
                onAjoutTitulaire,
                onRetraitTitulaire
              }),
              getRequerantForm({
                requete: detailRequeteState,
                nbTitulaires: titulairesState.titulaires.length
              }),
              getAdresseForm(),
              getPiecesJointesForm()
            ]
          }
        </div>
        <SaisirRequeteBoutons {...boutonsProps} />
      </Formulaire>
      <ConfirmationPopin
        isOpen={donneesNaissanceIncomplete}
        messages={getMessagesPopin()}
        boutons={getBoutonsPopin(validerRefus, setDonneesNaissanceIncomplete)}
      />
    </ProtectionApercu>
  );
};

function getPiecesJointesAMettreAJour(formulairePiecesJointes?: PieceJointe[]) {
  // On ne prend que les pjs dont le contenu est renseigné,
  //   en effet si le contenu est vide c'est qu'il a été écrasé par la requête lors de la sauvegarde (la requête ramène ses pièces jointes mais sans le contenu)
  return formulairePiecesJointes?.filter(
    formulairePj => formulairePj.base64File.base64String
  );
}

const initialiserTitulaires = (nbTitulaires = 1) => {
  const titulaires = [];

  for (let i = 1; i <= nbTitulaires; i++) {
    titulaires.push(creerTitulaire(i));
  }

  return titulaires;
};

export const creerTitulaire = (numTitulaire = 1) => {
  return {
    nom: withNamespace(TITULAIRES, `titulaire${numTitulaire}`),
    titre: getLibelle(`Titulaire ${numTitulaire}`)
  } as IdentiteSubFormProps;
};

function champManquantTitulaire(
  values: SaisieRequeteRDCSC,
  titulaires: IdentiteSubFormProps[]
) {
  const villeNaissance = values.titulaires.titulaire1.naissance.villeEvenement;
  const paysNaissance = values.titulaires.titulaire1.naissance.paysEvenement;
  const anneeNaissance =
    values.titulaires.titulaire1.naissance.dateEvenement.annee;
  const villeNaissance2 = values.titulaires.titulaire2.naissance.villeEvenement;
  const paysNaissance2 = values.titulaires.titulaire2.naissance.paysEvenement;
  const anneeNaissance2 =
    values.titulaires.titulaire2.naissance.dateEvenement.annee;
  return (
    villeNaissance === "" ||
    paysNaissance === "" ||
    anneeNaissance === "" ||
    (DocumentDelivrance.estAttestationPacs(values[DOCUMENT]) &&
      titulaires.length === DEUX &&
      (villeNaissance2 === "" ||
        paysNaissance2 === "" ||
        anneeNaissance2 === ""))
  );
}
