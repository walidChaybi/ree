import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { DocumentDelivrance } from "../../../model/requete/v2/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeRequerant } from "../../../model/requete/v2/enum/TypeRequerant";
import { logError } from "../../common/util/LogManager";
import { Options } from "../../common/util/Type";
import { OperationEnCours } from "../../common/widget/attente/OperationEnCours";
import { SelectField } from "../../common/widget/formulaire/champsSaisie/SelectField";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";
import { DOCUMENT_OBLIGATOIRE } from "../../common/widget/formulaire/FormulaireMessages";
import PiecesJointesForm from "../../common/widget/formulaire/piecesJointes/PiecesJointesForm";
import { SubFormProps } from "../../common/widget/formulaire/utils/FormUtil";
import { ConfirmationPopin } from "../../common/widget/popin/ConfirmationPopin";
import { getLibelle } from "../../common/widget/Text";
import {
  URL_MES_REQUETES_SAISIR_RDCSC,
  URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE,
  URL_REQUETES_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE
} from "../../router/ReceUrls";
import { getUrlWithParam } from "./../../common/util/route/routeUtil";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
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
import AdresseForm, {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "./sousFormulaires/adresse/AdresseForm";
import IdentiteForm, {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema,
  IdentiteSubFormProps
} from "./sousFormulaires/identite/IdentiteForm";
import RequerantForm, {
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

export const titreForm = SousTypeDelivrance.getEnumFor("RDCSC").libelle;

export const SaisirRDCSCPage: React.FC = () => {
  /** Formulaire */
  const history = useHistory();

  const [documentDemandeOptions, setDocumentDemandeOptions] = useState<Options>(
    []
  );

  useState(async () => {
    const documentDelivrance = await DocumentDelivrance.getAllCertificatSituationAsOptions();
    setDocumentDemandeOptions(documentDelivrance);
  });

  const blocsForm: JSX.Element[] = [
    getDocumentDemande(documentDemandeOptions),
    getInteresseForm(),
    getRequerantForm(),
    getAdresseForm(),
    getPiecesJointesForm()
  ];

  /** Enregistrer la requête */
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
    CreationRequeteRDCSC
  >();
  const [updateRequeteRDCSC, setUpdateRequeteRDCSC] = useState<
    UpdateRequeteRDCSC
  >();

  const boutonsProps = { setIsBrouillon } as SaisirRequeteBoutonsProps;

  const [idRequete, setIdRequete] = useState<string>();

  const handleSave = (id: string, brouillon: boolean, refus: boolean) => {
    // Reset des valeurs pour les hooks
    setCreationRequeteRDCSC(undefined);
    setUpdateRequeteRDCSC(undefined);

    setOperationEnCours(false);

    // Si l'appel c'est terminé sans erreur
    if (id) {
      setIdRequete(id);
      // Redirection si l'enregistrement n'est pas un brouillon
      if (!brouillon) {
        if (refus) {
          history.goBack();
        } else {
          const pathname = history.location.pathname;
          if (pathname.startsWith(URL_MES_REQUETES_SAISIR_RDCSC)) {
            const url = getUrlWithParam(
              URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE,
              id
            );
            history.push(url);
          }
          if (pathname.startsWith(URL_REQUETES_SERVICE_SAISIR_RDCSC)) {
            const url = getUrlWithParam(
              URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE,
              id
            );
            history.push(url);
          }
        }
      }
    }
  };

  useCreationRequeteDelivranceRDCSC(handleSave, creationRequeteRDCSC);

  useUpdateRequeteDelivranceRDCSC(handleSave, updateRequeteRDCSC);

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
      if (refus) {
        logError({
          errorInfo:
            "appel du Hook de l'US 137 : Réponse automatique - req Certificat Situation incomplète"
        });
        // TODO appel du Hook de l'US 137 : Réponse automatique - req Certificat Situation incomplète
      }
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

  /** Elements Popin "Courrier de refus" */
  const messagesPopin = [
    getLibelle(
      "Des données obligatoires de la naissance du titulaire sont manquantes."
    ),
    getLibelle(
      "Un courrier de refus va être automatiquement envoyé au requérant (Veuillez vérifier son adresse postale)."
    ),
    getLibelle("Voulez-vous valider le refus ?")
  ];

  const boutonsPopin = [
    {
      label: getLibelle("oui"),
      action: () => {
        enregistrerValider(true);
        setDonneesNaissanceIncomplete(false);
      }
    },
    {
      label: getLibelle("non"),
      action: () => {
        enregistrerValider(false);
        setDonneesNaissanceIncomplete(false);
      }
    },
    {
      label: getLibelle("annuler"),
      action: () => {
        setDonneesNaissanceIncomplete(false);
      }
    }
  ];

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
      />
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={saisieRequeteRDCSC || DefaultValuesSaisirRDCSC}
        formValidationSchema={ValidationSchemaSaisirRDCSC}
        onSubmit={onSubmitSaisirRDCSC}
        className="FormulaireSaisirRDCSC"
      >
        <div>{blocsForm}</div>
        <SaisirRequeteBoutons {...boutonsProps} />
      </Formulaire>
      <ConfirmationPopin
        isOpen={donneesNaissanceIncomplete}
        messages={messagesPopin}
        boutons={boutonsPopin}
      />
    </>
  );
};

function getDocumentDemande(documentDemandeOptions: Options): JSX.Element {
  return (
    <div className="DocumentInput" key={DOCUMENT}>
      <SelectField
        name={DOCUMENT}
        label={getLibelle("Document demandé")}
        options={documentDemandeOptions}
      />
    </div>
  );
}

function getInteresseForm(): JSX.Element {
  const interesseFormProps = {
    nom: INTERESSE,
    titre: getLibelle("Intéressé")
  } as IdentiteSubFormProps;
  return <IdentiteForm key={INTERESSE} {...interesseFormProps} />;
}

function getRequerantForm(): JSX.Element {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: getLibelle("Identité du requérant"),
    options: TypeRequerant.getAllEnumsAsOptions()
  } as SubFormProps;
  return <RequerantForm key={REQUERANT} {...requerantFromProps} />;
}

function getAdresseForm(): JSX.Element {
  const adresseFormProps = {
    nom: ADRESSE,
    titre: getLibelle("Adresse postale du requérant")
  } as SubFormProps;
  return <AdresseForm key={ADRESSE} {...adresseFormProps} />;
}

function getPiecesJointesForm(): JSX.Element {
  const piecesJointesFormProps = {
    nom: PIECES_JOINTES,
    titre: getLibelle("Pièces justificatives")
  } as SubFormProps;
  return <PiecesJointesForm key={PIECES_JOINTES} {...piecesJointesFormProps} />;
}
