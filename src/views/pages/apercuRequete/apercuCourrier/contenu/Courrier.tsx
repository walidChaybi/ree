import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { DocumentDelivrance } from "../../../../../model/requete/v2/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { OptionsCourrier } from "../../../../../model/requete/v2/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import messageManager from "../../../../common/util/messageManager";
import { getUrlWithParam } from "../../../../common/util/route/routeUtil";
import { Formulaire } from "../../../../common/widget/formulaire/Formulaire";
import { getLibelle } from "../../../../common/widget/Text";
import { URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID } from "../../../../router/ReceUrls";
import BoutonsCourrier, {
  BoutonsCourrierProps
} from "./contenuForm/BoutonsCourrier";
import {
  courrierExiste,
  getDefaultValuesCourrier,
  getDocumentReponseAModifier,
  getTypesCourrier
} from "./contenuForm/CourrierFonctions";
import {
  getAdresseCourrierForm,
  getChoixCourrier,
  getOptionsCourrier,
  getRequerantCourrierForm,
  getRequeteCourrierForm,
  getTexteLibre
} from "./contenuForm/CourrierForms";
import { ValidationSchemaChoixCourrier } from "./contenuForm/sousFormulaires/ChoixCourrierForm";
import { ValidationSchemaOptionCourrier } from "./contenuForm/sousFormulaires/OptionsCourrierForm";
import { useGenerationCourrierHook } from "./hook/GenerationCourrierHook";
import {
  CHOIX_COURRIER,
  OPTION,
  SaisieCourrier
} from "./modelForm/ISaisiePageModel";
import "./scss/Courrier.scss";

interface ModificationCourrierProps {
  requete: IRequeteDelivrance;
  acte?: IResultatRMCActe;
}

// Schéma de validation en sortie de champs
const ValidationSchemaCourrier = Yup.object({
  [CHOIX_COURRIER]: ValidationSchemaChoixCourrier,
  [OPTION]: ValidationSchemaOptionCourrier
});

export const Courrier: React.FC<ModificationCourrierProps> = props => {
  const typesCourrier = getTypesCourrier(props.requete);
  const titre = courrierExiste(props.requete)
    ? getLibelle("Modification du courrier")
    : getLibelle("Création du courrier");

  const [idTypeCourrier, setIdTypeCourrier] = useState<string>();

  const [
    documentDelivranceChoisi,
    setDocumentDelivranceChoisi
  ] = useState<DocumentDelivrance>();

  const onChangeTypeCourrier = (idTypeCourrierSelectionne: string) => {
    setIdTypeCourrier(idTypeCourrierSelectionne);
  };

  useEffect(() => {
    if (idTypeCourrier) {
      setDocumentDelivranceChoisi(
        DocumentDelivrance.getDocumentDelivrance(idTypeCourrier)
      );
    }
  }, [idTypeCourrier]);

  useEffect(() => {
    if (props.requete) {
      const documentReponse = getDocumentReponseAModifier(props.requete);
      if (documentReponse) {
        setIdTypeCourrier(documentReponse.typeDocument);
      } else {
        setIdTypeCourrier(typesCourrier[0].value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.requete]);

  const isSousTypeRDC = props.requete.sousType === SousTypeDelivrance.RDC;

  const blocsForm: JSX.Element[] = [
    getChoixCourrier(typesCourrier, onChangeTypeCourrier),
    getOptionsCourrier(props.requete, documentDelivranceChoisi),
    getTexteLibre(props.requete, documentDelivranceChoisi),
    getRequerantCourrierForm(isSousTypeRDC),
    getAdresseCourrierForm(isSousTypeRDC),
    getRequeteCourrierForm(isSousTypeRDC)
  ];

  const boutonsProps = {
    requete: props.requete
  } as BoutonsCourrierProps;

  /** Saisie du courrier */
  const history = useHistory();
  const [saisieCourrier, setSaisieCourrier] = useState<SaisieCourrier>();

  const optionsChoisies: OptionsCourrier = [];

  const generationCourrier = useGenerationCourrierHook({
    saisieCourrier,
    optionsChoisies,
    requete: props.requete,
    acte: props.acte
  });

  const onSubmit = (values: SaisieCourrier) => {
    setSaisieCourrier(values);
  };

  useEffect(() => {
    if (generationCourrier) {
      messageManager.showSuccessAndClose(
        getLibelle("Le courrier a bien été enregistrée")
      );
      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID,
          props.requete.id
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generationCourrier]);

  return (
    <>
      <title>{titre}</title>
      <Formulaire
        titre={titre}
        formDefaultValues={
          saisieCourrier || getDefaultValuesCourrier(props.requete)
        }
        formValidationSchema={ValidationSchemaCourrier}
        onSubmit={onSubmit}
        className="FormulaireCourrier"
      >
        <div>{blocsForm}</div>
        <BoutonsCourrier {...boutonsProps} />
      </Formulaire>
    </>
  );
};
