import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SousTypeDelivrance } from "../../../model/requete/v2/SousTypeDelivrance";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";

export const SaisirRequetePage: React.FC = () => {
  const history = useHistory();

  const [dataUrl] = useState<any>(history.location.state);

  const titreForm = SousTypeDelivrance.getEnumFor(dataUrl.nomRequete).libelle;

  const onSubmitSaisirRequete = () => {};

  return (
    <>
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={{}}
        formValidationSchema={{}}
        onSubmit={onSubmitSaisirRequete}
      ></Formulaire>
    </>
  );
};
