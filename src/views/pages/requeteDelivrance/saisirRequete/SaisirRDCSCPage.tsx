import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { IReponseSansDelivranceCS } from "../../../../model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "../../../../model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAuto
} from "../../../common/hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import {
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../../../common/hook/requete/CreationActionMiseAjourStatutHook";
import {
  TypePieceJointe,
  usePostPiecesJointesApi
} from "../../../common/hook/requete/piecesJointes/PostPiecesJointesHook";
import { PieceJointe } from "../../../common/util/FileUtils";
import messageManager from "../../../common/util/messageManager";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { getLibelle } from "../../../common/util/Utils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "../../../common/widget/formulaire/adresse/AdresseForm";
import { Formulaire } from "../../../common/widget/formulaire/Formulaire";
import { DOCUMENT_OBLIGATOIRE } from "../../../common/widget/formulaire/FormulaireMessages";
import { ConfirmationPopin } from "../../../common/widget/popin/ConfirmationPopin";
import { useReponseSansDelivranceCS } from "../../requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/hook/ChoixReponseSansDelivranceCSHook";
import { mappingRequeteDelivranceToRequeteTableau } from "../../requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import {
  createReponseSansDelivranceCS,
  getMessagesPopin
} from "./contenu/SaisirRDCSCPageFonctions";
import { getBlocsForm, getBoutonsPopin } from "./contenu/SaisirRDCSCPageForms";
import { useCreationRequeteDelivranceRDCSC } from "./hook/CreerRDCSCApiHook";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "./hook/mappingRequeteDelivranceVersFormulaireRDCSC";
import { useUpdateRequeteDelivranceRDCSC } from "./hook/UpdateRDCSCApiHook";
import {
  ADRESSE,
  CreationRequeteRDCSC,
  DOCUMENT,
  INTERESSE,
  PIECES_JOINTES,
  REQUERANT,
  SaisieRequeteRDCSC,
  UpdateRequeteRDCSC
} from "./modelForm/ISaisirRDCSCPageModel";
import "./scss/SaisirRequetePage.scss";
import {
  IdentiteFormDefaultValuesRDCSC,
  IdentiteFormValidationSchema
} from "./sousFormulaires/identite/IdentiteForm";
import {
  RequerantFormDefaultValues,
  RequerantFormValidationSchema
} from "./sousFormulaires/requerant/RequerantForm";

// Valeurs par défaut des champs
const DefaultValuesSaisirRDCSC = {
  [DOCUMENT]: "",
  [INTERESSE]: IdentiteFormDefaultValuesRDCSC,
  [REQUERANT]: RequerantFormDefaultValues,
  [ADRESSE]: AdresseFormDefaultValues,
  [PIECES_JOINTES]: null
};

// Schéma de validation en sortie de champs
const ValidationSchemaSaisirRDCSC = Yup.object({
  [DOCUMENT]: Yup.string().required(DOCUMENT_OBLIGATOIRE),
  [INTERESSE]: IdentiteFormValidationSchema,
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

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [
    donneesNaissanceIncomplete,
    setDonneesNaissanceIncomplete
  ] = React.useState<boolean>(false);

  const [saisieRequeteRDCSC, setSaisieRequeteRDCSC] = useState<
    SaisieRequeteRDCSC
  >();

  const [creationRequeteRDCSC, setCreationRequeteRDCSC] = useState<
    CreationRequeteRDCSC & IComplementCreationUpdateRequete
  >();
  const [updateRequeteRDCSC, setUpdateRequeteRDCSC] = useState<
    UpdateRequeteRDCSC & IComplementCreationUpdateRequete
  >();

  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();

  const [piecesjointesAMettreAJour, setPiecesjointesAMettreAJour] = useState<
    PieceJointe[]
  >();

  const [
    metAJourStatutRequeteApresMajPiecesJointes,
    setMetAJourStatutRequeteApresMajPiecesJointes
  ] = useState<CreationActionMiseAjourStatutHookParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const creationRequeteDelivranceRDCSCResultat = useCreationRequeteDelivranceRDCSC(
    creationRequeteRDCSC
  );
  const updateRequeteDelivranceRDCSCResultat = useUpdateRequeteDelivranceRDCSC(
    updateRequeteRDCSC
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

  useCreationActionMiseAjourStatut(metAJourStatutRequeteApresMajPiecesJointes);

  useNavigationApercuRMCAuto(paramsRMCAuto);

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    idRequete,
    StatutRequete.TRAITE_A_IMPRIMER.libelle,
    StatutRequete.TRAITE_A_IMPRIMER,
    reponseSansDelivranceCS
  );

  const documentDemandeOptions = DocumentDelivrance.getAllCertificatSituationDemandeAsOptions();

  const boutonsProps = { setIsBrouillon } as SaisirRequeteBoutonsProps;

  useEffect(() => {
    if (
      detailRequeteState &&
      detailRequeteState.statutCourant.statut === StatutRequete.BROUILLON
    ) {
      setSaisieRequeteRDCSC(
        mappingRequeteDelivranceVersFormulaireRDCSC(
          detailRequeteState as IRequeteDelivrance
        )
      );
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
          messageManager.showSuccessAndClose(
            getLibelle("La requête a bien été enregistrée")
          );
          setParamsRMCAuto({
            requete: mappingRequeteDelivranceToRequeteTableau(
              requeteSauvegardee
            ),
            urlCourante: history.location.pathname
          });
        }
      }

      setOperationEnCours(false);
    },
    [history]
  );

  const redirectApresCreationOuModification = useCallback(
    (statutFinal: StatutRequete) => {
      if (updateRequeteDelivranceRDCSCResultat && updateRequeteRDCSC) {
        // Maj du statut de la requête suite à l'appel d'api de mise à jour de statut de la requête
        //   pour éviter de faire un nouvelle appel d'api pour recharger la requête avec le bon statut
        updateRequeteDelivranceRDCSCResultat.requete.statutCourant.statut = statutFinal;
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
        creationRequeteDelivranceRDCSCResultat.requete.statutCourant.statut = statutFinal;
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
      majStatutRequeteSiBesoinEtRedirection();
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
    const villeNaissance = values.interesse.naissance.villeEvenement;
    const paysNaissance = values.interesse.naissance.paysEvenement;
    const anneeNaissance = values.interesse.naissance.dateEvenement.annee;
    setSaisieRequeteRDCSC(values);
    if (
      (villeNaissance !== "" &&
        paysNaissance !== "" &&
        anneeNaissance !== "") ||
      isBrouillon
    ) {
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
    } else {
      // Pop-in
      setDonneesNaissanceIncomplete(true);
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
          {getBlocsForm(
            documentDemandeOptions,
            detailRequeteState,
            boutonsProps
          )}
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
