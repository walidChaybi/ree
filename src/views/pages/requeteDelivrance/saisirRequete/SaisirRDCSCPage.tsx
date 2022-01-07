import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { IReponseSansDelivranceCS } from "../../../../model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "../../../../model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAuto
} from "../../../common/hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
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

export const titreForm = SousTypeDelivrance.getEnumFor("RDCSC").libelle;

export const SaisirRDCSCPage: React.FC = () => {
  /** Formulaire */
  const history = useHistory();
  const [idRequete, setIdRequete] = useState<string>(
    useParams<IdRequeteParam>().idRequete
  );

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);
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

  const documentDemandeOptions = DocumentDelivrance.getAllCertificatSituationDemandeAsOptions();

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
  const [
    saisieRequeteRDCSC,
    setSaisieRequeteRDCSC
  ] = useState<SaisieRequeteRDCSC>();
  const [
    creationRequeteRDCSC,
    setCreationRequeteRDCSC
  ] = useState<CreationRequeteRDCSC>();
  const [
    updateRequeteRDCSC,
    setUpdateRequeteRDCSC
  ] = useState<UpdateRequeteRDCSC>();

  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();
  useNavigationApercuRMCAuto(paramsRMCAuto);

  const boutonsProps = { setIsBrouillon } as SaisirRequeteBoutonsProps;

  const redirectionPage = useCallback(
    async (
      requeteSauvegardee: IRequeteDelivrance,
      futurStatut: StatutRequete,
      refus = false
    ) => {
      // Si l'appel c'est terminé sans erreur
      if (requeteSauvegardee) {
        setIdRequete(requeteSauvegardee.id);
        // Redirection si l'enregistrement n'est pas un brouillon
        if (futurStatut !== StatutRequete.BROUILLON) {
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
      }
      setOperationEnCours(false);
    },
    [history]
  );

  const creationRequeteDelivranceRDCSCResultat = useCreationRequeteDelivranceRDCSC(
    creationRequeteRDCSC
  );
  const updateRequeteDelivranceRDCSCResultat = useUpdateRequeteDelivranceRDCSC(
    updateRequeteRDCSC
  );
  useEffect(() => {
    if (creationRequeteDelivranceRDCSCResultat) {
      redirectionPage(
        creationRequeteDelivranceRDCSCResultat.requete,
        creationRequeteDelivranceRDCSCResultat.futurStatut,
        creationRequeteDelivranceRDCSCResultat.refus
      );
    }
  }, [creationRequeteDelivranceRDCSCResultat, redirectionPage]);
  useEffect(() => {
    if (updateRequeteDelivranceRDCSCResultat) {
      redirectionPage(
        updateRequeteDelivranceRDCSCResultat.requete,
        updateRequeteDelivranceRDCSCResultat.futurStatut,
        updateRequeteDelivranceRDCSCResultat.refus
      );
    }
  }, [updateRequeteDelivranceRDCSCResultat, redirectionPage]);

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    idRequete,
    StatutRequete.TRAITE_A_IMPRIMER.libelle,
    StatutRequete.TRAITE_A_IMPRIMER,
    reponseSansDelivranceCS
  );
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
      if (idRequete) {
        setUpdateRequeteRDCSC({
          idRequete,
          saisie: values,
          refus: false,
          futurStatut: isBrouillon
            ? StatutRequete.BROUILLON
            : StatutRequete.PRISE_EN_CHARGE
        });
      } else {
        setCreationRequeteRDCSC({
          saisie: values,
          refus: false,
          futurStatut: isBrouillon
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
    if (saisieRequeteRDCSC) {
      setOperationEnCours(true);
      if (idRequete) {
        setUpdateRequeteRDCSC({
          idRequete,
          saisie: saisieRequeteRDCSC,
          refus,
          futurStatut: refus
            ? StatutRequete.A_TRAITER
            : StatutRequete.PRISE_EN_CHARGE
        });
      } else {
        setCreationRequeteRDCSC({
          saisie: saisieRequeteRDCSC,
          refus,
          futurStatut: refus
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
