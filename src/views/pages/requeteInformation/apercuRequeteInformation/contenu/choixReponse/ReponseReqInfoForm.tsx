import React from "react";
import * as Yup from "yup";
import { IReponseRequeteInfo } from "../../../../../../model/requete/v2/IReponseRequeteInfo";
import { Fieldset } from "../../../../../common/widget/fieldset/Fieldset";
import { Formulaire } from "../../../../../common/widget/formulaire/Formulaire";
import { FormikComponentProps } from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import "../scss/ChoixReponseReqInfo.scss";
import ReponseReqInfoBoutons, {
  ReponseReqInfoBoutonsProps
} from "./ReponseReqInfoBoutons";
import ReponseReqInfoForm, {
  DefaultValuesReponseInfoSubForm,
  IReponseInfoSubFormValue,
  ReponseReqInfoSubFormProps,
  ValidationSchemaReponseInfoSubForm
} from "./ReponseReqInfoSubForm";

export interface ReponseReqInfoProps {
  reponse?: IReponseRequeteInfo;
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

export const ReponseReqInfo: React.FC<ReponseReqInfoProps> = ({ reponse }) => {
  const blocsForm: JSX.Element[] = [getReponseForm(reponse)];

  const onSubmit = () => {};

  const boutonsProps = {} as ReponseReqInfoBoutonsProps;

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
  return <ReponseReqInfoForm key={REPONSE} {...reponseReqInfoFromProps} />;
}
