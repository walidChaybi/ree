import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { IReponseRequeteInfo } from "../../../../../../model/requete/v2/IReponseRequeteInfo";
import {
  TypePieceJointe,
  usePostPiecesJointesApi
} from "../../../../../common/hook/v2/PiecesJointesHook";
import { PieceJointe } from "../../../../../common/util/FileUtils";
import { OperationEnCours } from "../../../../../common/widget/attente/OperationEnCours";
import { Fieldset } from "../../../../../common/widget/fieldset/Fieldset";
import { Formulaire } from "../../../../../common/widget/formulaire/Formulaire";
import {
  FormikComponentProps,
  SubFormProps
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import { URL_MES_REQUETES_INFORMATION } from "../../../../../router/ReceUrls";
import {
  ISauvegarderReponseReqInfoParams,
  useSauvegarderReponsesReqInfoHook
} from "../hook/SauvegarderReponseReqInfoHook";
import "../scss/ReponseReqInfo.scss";
import PiecesJointesReqInfoForm from "./PiecesJointesReqInfoForm";
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
export const PIECES_JOINTES = "piecesJointes";

const DefaultValuesReponseInfoForm = {
  [REPONSE]: DefaultValuesReponseInfoSubForm,
  [PIECES_JOINTES]: null
};

interface IReponseInfoFormValue {
  [REPONSE]: IReponseInfoSubFormValue;
  [PIECES_JOINTES]: PieceJointe[];
}

const ValidationSchemaReponseInfoForm = Yup.object({
  [REPONSE]: ValidationSchemaReponseInfoSubForm
});

export const ReponseReqInfoForm: React.FC<ReponseReqInfoProps> = ({
  reponse,
  requeteId
}) => {
  const history = useHistory();
  const blocsForm: JSX.Element[] = getReponseForm(reponse);
  const [reponseAEnvoyer, setReponseAEnvoyer] = useState<
    ISauvegarderReponseReqInfoParams | undefined
  >();
  const [reponseSaisie, setReponseSaisie] = useState<
    ISauvegarderReponseReqInfoParams | undefined
  >();
  const [piecesAEnvoyer, setPiecesAEnvoyer] = useState<
    PieceJointe[] | undefined
  >();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [
    ajoutPieceJointeTermine,
    setAjoutPieceJointeTermine
  ] = useState<boolean>(false);

  const onSubmit = (reponseForm: IReponseInfoFormValue) => {
    setOperationEnCours(true);
    if (reponseForm[PIECES_JOINTES]) {
      setPiecesAEnvoyer(reponseForm[PIECES_JOINTES]);
    } else {
      setAjoutPieceJointeTermine(true);
    }
    setReponseSaisie({
      idRequete: requeteId,
      corpsMail: reponseForm.reponse.corpsMail,
      idReponse: reponse?.id
    });
  };

  const [receptionRetourAjoutPieceJointe] = usePostPiecesJointesApi(
    TypePieceJointe.PIECE_COMPLEMENT_INFORMATION,
    requeteId,
    piecesAEnvoyer
  );

  const idReponse = useSauvegarderReponsesReqInfoHook(reponseAEnvoyer);

  useEffect(() => {
    if (receptionRetourAjoutPieceJointe) {
      setAjoutPieceJointeTermine(true);
    }
  }, [receptionRetourAjoutPieceJointe]);

  useEffect(() => {
    if (ajoutPieceJointeTermine) {
      setReponseAEnvoyer(reponseSaisie);
    }
  }, [ajoutPieceJointeTermine, reponseSaisie]);

  useEffect(() => {
    if (idReponse) {
      setOperationEnCours(false);
      history.push(URL_MES_REQUETES_INFORMATION);
    }
  }, [idReponse, history]);

  const boutonsProps = {} as FormikComponentProps;

  return (
    <div className="ReponseReqInfo">
      <OperationEnCours
        visible={operationEnCours}
        onClick={() => {
          setOperationEnCours(false);
        }}
        onTimeoutEnd={() => {
          setOperationEnCours(false);
        }}
      />
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

export function getReponseForm(reponse?: IReponseRequeteInfo): JSX.Element[] {
  const reponseReqInfoFromProps = {
    reponse
  } as ReponseReqInfoSubFormProps;
  const piecesJointesFormProps = {
    nom: PIECES_JOINTES,
    titre: getLibelle("Pièces justificatives")
  } as SubFormProps;
  return [
    <PiecesJointesReqInfoForm
      key={PIECES_JOINTES}
      {...piecesJointesFormProps}
    />,
    <ReponseReqInfoSubForm key={REPONSE} {...reponseReqInfoFromProps} />
  ];
}
