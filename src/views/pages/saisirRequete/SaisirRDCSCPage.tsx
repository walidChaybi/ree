import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { DocumentDelivrance } from "../../../model/requete/v2/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeRequerant } from "../../../model/requete/v2/enum/TypeRequerant";
import messageManager from "../../common/util/messageManager";
import { storeRece } from "../../common/util/storeRece";
import { Options } from "../../common/util/Type";
import { OperationEnCours } from "../../common/widget/attente/OperationEnCours";
import { SelectField } from "../../common/widget/formulaire/champsSaisie/SelectField";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";
import { DOCUMENT_OBLIGATOIRE } from "../../common/widget/formulaire/FormulaireMessages";
import PiecesJointesForm from "../../common/widget/formulaire/piecesJointes/PiecesJointesForm";
import { SubFormProps } from "../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../common/widget/Text";
import { URL_ACCUEIL } from "../../router/ReceUrls";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import { useCreationRequeteDelivrance } from "./hook/SaisirRDCSCApiHook";
import {
  ADRESSE,
  DOCUMENT,
  INTERESSE,
  PIECES_JOINTES,
  REQUERANT,
  SaisieRequeteRDCSC
} from "./modelForm/ISaisirRDCSCPageModel";
import "./scss/SaisirRequetePage.scss";
import AdresseForm, {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "./sousFormulaires/adresse/AdresseForm";
import IdentiteForm, {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema
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
  const history = useHistory();

  const [documentDemandeOptions, setDocumentDemandeOptions] = useState<Options>(
    []
  );

  const [
    creationRequeteRDCSC,
    setCreationRequeteRDCSC
  ] = useState<SaisieRequeteRDCSC>();

  useState(async () => {
    const documentDelivrance = await DocumentDelivrance.getAllCertificatSituation();
    setDocumentDemandeOptions(documentDelivrance);
  });

  const blocsForm: JSX.Element[] = [
    getDocumentDemande(documentDemandeOptions),
    getInteresseForm(),
    getRequerantForm(),
    getAdresseForm(),
    getPiecesJointesForm()
  ];

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const idNouvelleRequete = useCreationRequeteDelivrance(
    SousTypeDelivrance.RDCSC,
    creationRequeteRDCSC
  );

  useEffect(() => {
    if (idNouvelleRequete) {
      // FIXME comportement à valider
      messageManager.showInfoAndClose(
        getLibelle("La requête a bien été enregistrée")
      );
      history.push(storeRece.retourUrl ? storeRece.retourUrl : URL_ACCUEIL);
    }
  }, [idNouvelleRequete, history]);

  const onSubmitSaisirRDCSC = (values: SaisieRequeteRDCSC) => {
    setOperationEnCours(true);
    setCreationRequeteRDCSC({ ...values });
  };

  const boutonsProps = {} as SaisirRequeteBoutonsProps;

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onClick={() => setOperationEnCours(false)}
      />
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={DefaultValuesSaisirRDCSC}
        formValidationSchema={ValidationSchemaSaisirRDCSC}
        onSubmit={onSubmitSaisirRDCSC}
        className="FormulaireSaisirRDCSC"
      >
        <div>{blocsForm}</div>
        <SaisirRequeteBoutons {...boutonsProps} />
      </Formulaire>
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
  } as SubFormProps;
  return <IdentiteForm key={INTERESSE} {...interesseFormProps} />;
}

function getRequerantForm(): JSX.Element {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: getLibelle("Identité du requérant"),
    type: TypeRequerant.getAllEnumsAsOptions()
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
