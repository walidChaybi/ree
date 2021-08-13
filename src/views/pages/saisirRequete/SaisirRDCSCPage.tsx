import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { IReponseNegativeDemandeIncompleteComposition } from "../../../model/composition/IReponseNegativeDemandeIncompleteComposition";
import { OBJET_COURRIER_CERTIFICAT_SITUATION } from "../../../model/composition/ObjetsComposition";
import { DocumentDelivrance } from "../../../model/requete/v2/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../model/requete/v2/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../model/requete/v2/IRequeteDelivrance";
import { logError } from "../../common/util/LogManager";
import messageManager from "../../common/util/messageManager";
import { Options } from "../../common/util/Type";
import { OperationEnCours } from "../../common/widget/attente/OperationEnCours";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";
import { DOCUMENT_OBLIGATOIRE } from "../../common/widget/formulaire/FormulaireMessages";
import { ConfirmationPopin } from "../../common/widget/popin/ConfirmationPopin";
import { getLibelle } from "../../common/widget/Text";
import { useReponseNegativeDemandeIncomplete } from "../apercuRequete/apercuRequeteEnpriseEnCharge/contenu/hook/ChoixReponseNegativeDemandeIncompleteHook";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import {
  createReponseNegative,
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
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "./sousFormulaires/adresse/AdresseForm";
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

interface idRequeteParam {
  idRequete: string;
}

export const titreForm = SousTypeDelivrance.getEnumFor("RDCSC").libelle;

export const SaisirRDCSCPage: React.FC = () => {
  /** Formulaire */
  const history = useHistory();
  const [idRequete, setIdRequete] = useState<string>(
    useParams<idRequeteParam>().idRequete
  );

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  useEffect(() => {
    if (detailRequeteState) {
      if (detailRequeteState.statutCourant.statut === StatutRequete.BROUILLON) {
        setSaisieRequeteRDCSC(
          mappingRequeteDelivranceVersFormulaireRDCSC(
            detailRequeteState as IRequeteDelivrance
          )
        );
      } else {
        logError({
          messageUtilisateur:
            "La requête doit être un brouillon pour être ouverte ici"
        });
      }
    }
  }, [detailRequeteState]);

  const [documentDemandeOptions, setDocumentDemandeOptions] = useState<Options>(
    []
  );

  const [reponseNegative, setReponseNegative] =
    useState<IReponseNegativeDemandeIncompleteComposition | undefined>();

  useState(async () => {
    const documentDelivrance =
      DocumentDelivrance.getAllCertificatSituationAsOptions();
    setDocumentDemandeOptions(documentDelivrance);
  });

  /** Enregistrer la requête */
  const [isBrouillon, setIsBrouillon] = useState<boolean>(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [donneesNaissanceIncomplete, setDonneesNaissanceIncomplete] =
    React.useState<boolean>(false);
  const [saisieRequeteRDCSC, setSaisieRequeteRDCSC] =
    useState<SaisieRequeteRDCSC>();
  const [creationRequeteRDCSC, setCreationRequeteRDCSC] =
    useState<CreationRequeteRDCSC>();
  const [updateRequeteRDCSC, setUpdateRequeteRDCSC] =
    useState<UpdateRequeteRDCSC>();

  const boutonsProps = { setIsBrouillon } as SaisirRequeteBoutonsProps;

  const redirectionPage = useCallback(
    async (idRequeteSauvegardee: string, brouillon = false, refus = false) => {
      // Si l'appel c'est terminé sans erreur
      if (idRequeteSauvegardee) {
        setIdRequete(idRequeteSauvegardee);
        // Redirection si l'enregistrement n'est pas un brouillon
        if (!brouillon) {
          if (refus) {
            const reponse = createReponseNegative(
              OBJET_COURRIER_CERTIFICAT_SITUATION,
              saisieRequeteRDCSC
            );

            setReponseNegative(reponse);
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
    [history, saisieRequeteRDCSC]
  );

  const creationRequeteDelivranceRDCSCResultat =
    useCreationRequeteDelivranceRDCSC(creationRequeteRDCSC);

  const UpdateRequeteDelivranceRDCSCResultat =
    useUpdateRequeteDelivranceRDCSC(updateRequeteRDCSC);

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

  const resultatReponseNegative = useReponseNegativeDemandeIncomplete(
    StatutRequete.TRAITE_A_IMPRIMER.libelle,
    StatutRequete.TRAITE_A_IMPRIMER,
    reponseNegative,
    idRequete
  );

  useEffect(() => {
    if (resultatReponseNegative) {
      messageManager.showSuccessAndClose(
        getLibelle("Le refus a bien été enregistré")
      );

      history.goBack();
    }
  }, [resultatReponseNegative, history]);

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
    <>
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
        <div>{getBlocsForm(documentDemandeOptions)}</div>
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
    </>
  );
};
