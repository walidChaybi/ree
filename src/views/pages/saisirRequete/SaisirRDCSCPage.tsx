import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { IReponseSansDelivranceCS } from "../../../model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "../../../model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { DocumentDelivrance } from "../../../model/requete/v2/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../model/requete/v2/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../model/requete/v2/IRequeteDelivrance";
import messageManager from "../../common/util/messageManager";
import { ProtectionApercu } from "../../common/util/route/Protection/ProtectionApercu";
import { Options } from "../../common/util/Type";
import { OperationEnCours } from "../../common/widget/attente/OperationEnCours";
import {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "../../common/widget/formulaire/adresse/AdresseForm";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";
import { DOCUMENT_OBLIGATOIRE } from "../../common/widget/formulaire/FormulaireMessages";
import { ConfirmationPopin } from "../../common/widget/popin/ConfirmationPopin";
import { getLibelle } from "../../common/widget/Text";
import { useReponseSansDelivranceCS } from "../apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/hook/ChoixReponseSansDelivranceCSHook";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import {
  createReponseSansDelivranceCS,
  getMessagesPopin,
  getRedirectionVersApercuRequete
} from "./contenu/SaisirRDCSCPageFonctions";
import { getBlocsForm, getBoutonsPopin } from "./contenu/SaisirRDCSCPageForms";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "./hook/mappingRequeteDelivranceVersFormulaireRDCSC";
import { useCreationRequeteDelivranceRDCSC } from "./hook/SaisirRDCSCApiHook";
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
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema
} from "./sousFormulaires/identite/IdentiteForm";
import {
  RequerantFormDefaultValues,
  RequerantFormValidationSchema
} from "./sousFormulaires/requerant/RequerantForm";

// Valeurs par défaut des champs
const DefaultValuesSaisirRDCSC = {
  [DOCUMENT]: "",
  [INTERESSE]: IdentiteFormDefaultValues,
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

  const [documentDemandeOptions, setDocumentDemandeOptions] = useState<Options>(
    []
  );

  const [reponseSansDelivranceCS, setReponseSansDelivranceCS] = useState<
    IReponseSansDelivranceCS | undefined
  >();

  useState(async () => {
    const documentDelivrance = DocumentDelivrance.getAllCertificatSituationAsOptions();
    setDocumentDemandeOptions(documentDelivrance);
  });

  /** Enregistrer la requête */
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

  const boutonsProps = { setIsBrouillon } as SaisirRequeteBoutonsProps;

  const redirectionPage = useCallback(
    async (idRequeteSauvegardee: string, brouillon = false, refus = false) => {
      // Si l'appel c'est terminé sans erreur
      if (idRequeteSauvegardee) {
        setIdRequete(idRequeteSauvegardee);
        // Redirection si l'enregistrement n'est pas un brouillon
        if (!brouillon) {
          if (refus) {
            const reponse = createReponseSansDelivranceCS(
              saisieRequeteRDCSC,
              detailRequeteState?.numero
            );
            setReponseSansDelivranceCS({
              contenu: reponse,
              fichier: NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
            });
          } else {
            messageManager.showSuccessAndClose(
              getLibelle("La requête a bien été enregistrée")
            );
            const pathname = history.location.pathname;
            history.push(
              getRedirectionVersApercuRequete(pathname, idRequeteSauvegardee)
            );
          }
        }
      }
      setOperationEnCours(false);
    },
    [history, saisieRequeteRDCSC, detailRequeteState]
  );

  const creationRequeteDelivranceRDCSCResultat = useCreationRequeteDelivranceRDCSC(
    creationRequeteRDCSC
  );
  const UpdateRequeteDelivranceRDCSCResultat = useUpdateRequeteDelivranceRDCSC(
    updateRequeteRDCSC
  );
  useEffect(() => {
    if (creationRequeteDelivranceRDCSCResultat) {
      redirectionPage(
        creationRequeteDelivranceRDCSCResultat.idRequete,
        creationRequeteDelivranceRDCSCResultat.brouillon,
        creationRequeteDelivranceRDCSCResultat.refus
      );
    }
  }, [creationRequeteDelivranceRDCSCResultat, redirectionPage]);
  useEffect(() => {
    if (UpdateRequeteDelivranceRDCSCResultat) {
      redirectionPage(
        UpdateRequeteDelivranceRDCSCResultat.idRequete,
        UpdateRequeteDelivranceRDCSCResultat.brouillon,
        UpdateRequeteDelivranceRDCSCResultat.refus
      );
    }
  }, [UpdateRequeteDelivranceRDCSCResultat, redirectionPage]);

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    StatutRequete.TRAITE_A_IMPRIMER.libelle,
    StatutRequete.TRAITE_A_IMPRIMER,
    reponseSansDelivranceCS,
    idRequete
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
          brouillon: isBrouillon
        });
      } else {
        setCreationRequeteRDCSC({
          saisie: values,
          refus: false,
          brouillon: isBrouillon
        });
      }
    } else {
      // Pop-in
      setDonneesNaissanceIncomplete(true);
    }
  };

  const enregistrerValider = (refus: boolean) => {
    if (saisieRequeteRDCSC) {
      setOperationEnCours(true);
      if (idRequete) {
        setUpdateRequeteRDCSC({
          idRequete,
          saisie: saisieRequeteRDCSC,
          refus,
          brouillon: isBrouillon
        });
      } else {
        setCreationRequeteRDCSC({ saisie: saisieRequeteRDCSC, refus });
      }
    }
  };

  return (
    <ProtectionApercu statut={detailRequeteState?.statutCourant.statut}>
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
        <div>{getBlocsForm(documentDemandeOptions, detailRequeteState)}</div>
        <SaisirRequeteBoutons {...boutonsProps} />
      </Formulaire>
      <ConfirmationPopin
        isOpen={donneesNaissanceIncomplete}
        messages={getMessagesPopin()}
        boutons={getBoutonsPopin(
          enregistrerValider,
          setDonneesNaissanceIncomplete
        )}
      />
    </ProtectionApercu>
  );
};
