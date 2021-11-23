import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { IReponseRequeteInfo } from "../../../../../../model/requete/v2/IReponseRequeteInfo";
import { Fieldset } from "../../../../../common/widget/fieldset/Fieldset";
import { Formulaire } from "../../../../../common/widget/formulaire/Formulaire";
import { FormikComponentProps } from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import { URL_MES_REQUETES_INFORMATION } from "../../../../../router/ReceUrls";
import {
  ISauvegarderReponseReqInfoParams,
  useSauvegarderReponsesReqInfoHook
} from "../hook/SauvegarderReponseReqInfoHook";
import "../scss/ReponseReqInfo.scss";
import ReponseReqInfoBoutons from "./ReponseReqInfoBoutons";
import ReponseReqInfoSubForm, {
  DefaultValuesReponseInfoSubForm,
  IReponseInfoSubFormValue,
  ReponseReqInfoSubFormProps,
  ValidationSchemaReponseInfoSubForm
} from "./ReponseReqInfoSubForm";

export interface ReponseReqInfoProps {
  reponse?: IReponseRequeteInfo;
  requeteId: string;
}

export type ReponseReqInfoFormProps = FormikComponentProps &
  ReponseReqInfoProps;

export const REPONSE = "reponse";

const DefaultValuesReponseInfoForm = {
  [REPONSE]: DefaultValuesReponseInfoSubForm
};

interface IReponseInfoFormValue {
  [REPONSE]: IReponseInfoSubFormValue;
}

const ValidationSchemaReponseInfoForm = Yup.object({
  [REPONSE]: ValidationSchemaReponseInfoSubForm
});

export const ReponseReqInfoForm: React.FC<ReponseReqInfoProps> = ({
  reponse,
  requeteId
}) => {
  const history = useHistory();
  const blocsForm: JSX.Element[] = [getReponseForm(reponse)];
  const [reponseAEnvoyer, setReponseAEnvoyer] = useState<
    ISauvegarderReponseReqInfoParams | undefined
  >();

  const onSubmit = (reponseSaisie: IReponseInfoFormValue) => {
    setReponseAEnvoyer({
      idRequete: requeteId,
      corpsMail: reponseSaisie.reponse.corpsMail,
      idReponse: reponse?.id
    });
  };

  const idReponse = useSauvegarderReponsesReqInfoHook(reponseAEnvoyer);

  useEffect(() => {
    if (idReponse) {
      history.push(URL_MES_REQUETES_INFORMATION);
    }
  }, [idReponse, history]);

  const boutonsProps = {} as FormikComponentProps;

  return (
    <div className="ReponseReqInfo">
      <Fieldset titre={getLibelle("Votre réponse")}>
        <Formulaire
          formDefaultValues={DefaultValuesReponseInfoForm}
          formValidationSchema={ValidationSchemaReponseInfoForm}
          onSubmit={onSubmit}
        >
          <div>{blocsForm}</div>
          <ReponseReqInfoBoutons {...boutonsProps} />
        </Formulaire>
      </Fieldset>
    </div>
  );
};

export function getReponseForm(reponse?: IReponseRequeteInfo): JSX.Element {
  const reponseReqInfoFromProps = {
    reponse
  } as ReponseReqInfoSubFormProps;
  return <ReponseReqInfoSubForm key={REPONSE} {...reponseReqInfoFromProps} />;
}
