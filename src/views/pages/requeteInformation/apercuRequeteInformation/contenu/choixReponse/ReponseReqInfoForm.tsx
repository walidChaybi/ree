import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { IReponseRequeteInfo } from "../../../../../../model/requete/IReponseRequeteInfo";
import { IRequeteInformation } from "../../../../../../model/requete/IRequeteInformation";
import {
  TypePieceJointe,
  usePostPiecesJointesApi
} from "../../../../../common/hook/PiecesJointesHook";
import { PieceJointe } from "../../../../../common/util/FileUtils";
import { getLibelle } from "../../../../../common/util/Utils";
import { OperationEnCours } from "../../../../../common/widget/attente/OperationEnCours";
import { Fieldset } from "../../../../../common/widget/fieldset/Fieldset";
import { Formulaire } from "../../../../../common/widget/formulaire/Formulaire";
import {
  FormikComponentProps,
  SubFormProps
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import { URL_MES_REQUETES_INFORMATION } from "../../../../../router/ReceUrls";
import {
  IEnvoyerReponseReqInfoParams,
  useEnvoyerReponsesReqInfoHook
} from "../hook/EnvoyerReponseReqInfoHook";
import {
  ISauvegarderReponseReqInfoParams,
  useSauvegarderReponsesReqInfoHook
} from "../hook/SauvegarderReponseReqInfoHook";
import "../scss/ReponseReqInfo.scss";
import PiecesJointesReqInfoForm from "./PiecesJointesReqInfoForm";
import ReponseReqInfoBoutons, {
  BoutonsReponseReqInfoProps
} from "./ReponseReqInfoBoutons";
import ReponseReqInfoSubForm, {
  DefaultValuesReponseInfoSubForm,
  IReponseInfoSubFormValue,
  ReponseReqInfoSubFormProps,
  ValidationSchemaReponseInfoSubForm
} from "./ReponseReqInfoSubForm";

export interface ReponseReqInfoProps {
  requete: IRequeteInformation;
  formulaireDisabled: boolean;
  boutonVisible: boolean;
  reponse?: IReponseRequeteInfo;
  retourVisible?: boolean;
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
  requete,
  formulaireDisabled,
  boutonVisible,
  reponse,
  retourVisible
}) => {
  const history = useHistory();
  const blocsForm: JSX.Element[] = getReponseForm(
    formulaireDisabled,
    boutonVisible,
    reponse
  );
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [reponseSaisie, setReponseSaisie] =
    useState<ISauvegarderReponseReqInfoParams | undefined>();
  const [reponseASauvegarder, setReponseASauvegarder] =
    useState<ISauvegarderReponseReqInfoParams | undefined>();
  const [reponseAEnvoyer, setReponseAEnvoyer] =
    useState<IEnvoyerReponseReqInfoParams | undefined>();
  const [ajoutPieceJointeTermine, setAjoutPieceJointeTermine] =
    useState<boolean>(false);
  const [piecesAEnvoyer, setPiecesAEnvoyer] =
    useState<PieceJointe[] | undefined>();

  const onSubmit = (reponseForm: IReponseInfoFormValue) => {
    setOperationEnCours(true);
    if (reponseForm[PIECES_JOINTES]) {
      setPiecesAEnvoyer(reponseForm[PIECES_JOINTES]);
    } else {
      setAjoutPieceJointeTermine(true);
    }
    setReponseSaisie({
      idRequete: requete.id,
      corpsMail: reponseForm.reponse.corpsMail,
      idReponse: reponse?.id
    });
  };

  // 1 - On sauvegarde les pièces jointes
  const [receptionRetourAjoutPieceJointe] = usePostPiecesJointesApi(
    TypePieceJointe.PIECE_COMPLEMENT_INFORMATION,
    requete.id,
    piecesAEnvoyer
  );

  useEffect(() => {
    if (receptionRetourAjoutPieceJointe) {
      setAjoutPieceJointeTermine(true);
    }
  }, [receptionRetourAjoutPieceJointe]);

  useEffect(() => {
    if (ajoutPieceJointeTermine && reponseSaisie) {
      setReponseAEnvoyer({
        reponseSaisie,
        requete,
        piecesJointes: piecesAEnvoyer
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ajoutPieceJointeTermine, reponseSaisie]);

  // 2 - On envoi le mail avec la réponse et les pièces jointes
  const mailEnvoyer = useEnvoyerReponsesReqInfoHook(reponseAEnvoyer);

  useEffect(() => {
    if (mailEnvoyer) {
      setReponseASauvegarder(reponseSaisie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mailEnvoyer]);

  // 3 - On sauvegarde la requête et on change son statut
  const idReponse = useSauvegarderReponsesReqInfoHook(reponseASauvegarder);

  useEffect(() => {
    if (idReponse) {
      setOperationEnCours(false);
      history.push(URL_MES_REQUETES_INFORMATION);
    }
  }, [idReponse, history]);

  const boutonsProps = {
    formulaireDisabled
  } as BoutonsReponseReqInfoProps;

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
          <ReponseReqInfoBoutons
            {...boutonsProps}
            formulaireDisabled={formulaireDisabled}
            retourVisible={retourVisible}
          />
        </Formulaire>
      </Fieldset>
    </div>
  );
};

export function getReponseForm(
  formulaireDisabled: boolean,
  boutonVisible: boolean,
  reponse?: IReponseRequeteInfo
): JSX.Element[] {
  const piecesJointesFormProps = {
    nom: PIECES_JOINTES,
    titre: getLibelle("Pièces justificatives"),
    visible: boutonVisible,
    disabled: formulaireDisabled
  } as SubFormProps;

  const reponseReqInfoFromProps = {
    reponse,
    formulaireDisabled
  } as ReponseReqInfoSubFormProps;

  return [
    <PiecesJointesReqInfoForm
      key={PIECES_JOINTES}
      {...piecesJointesFormProps}
    />,
    <ReponseReqInfoSubForm key={REPONSE} {...reponseReqInfoFromProps} />
  ];
}
