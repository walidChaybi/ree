import { PIECES_JOINTES, REPONSE } from "@composant/formulaire/ConstantesNomsForm";
import { usePostPiecesJointesApi } from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { IReponseRequeteInfo } from "@model/requete/IReponseRequeteInfo";
import { IRequeteInformation } from "@model/requete/IRequeteInformation";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { Fieldset } from "@widget/fieldset/Fieldset";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import LiensRECE from "../../../../../../router/LiensRECE";
import { INFO_PAGE_MES_REQUETES_INFORMATION } from "../../../../../../router/infoPages/InfoPagesEspaceInformation";
import { PieceJointe } from "../../../../../../utils/FileUtils";
import { IEnvoyerReponseReqInfoParams, useEnvoyerReponsesReqInfoHook } from "../hook/EnvoyerReponseReqInfoHook";
import { ISauvegarderReponseReqInfoParams, useSauvegarderReponsesReqInfoHook } from "../hook/SauvegarderReponseReqInfoHook";
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
  requete: IRequeteInformation;
  formulaireDisabled: boolean;
  boutonVisible: boolean;
  reponse?: IReponseRequeteInfo;
  retourVisible?: boolean;
  affichageBoutonPrendreEnCharge?: boolean;
  onclickPrendreEnCharge?: () => void;
}

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
  retourVisible,
  affichageBoutonPrendreEnCharge,
  onclickPrendreEnCharge
}) => {
  const navigate = useNavigate();
  const blocsForm: JSX.Element = getReponseForm(formulaireDisabled, boutonVisible, reponse, affichageBoutonPrendreEnCharge);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [reponseSaisie, setReponseSaisie] = useState<ISauvegarderReponseReqInfoParams | undefined>();
  const [reponseASauvegarder, setReponseASauvegarder] = useState<ISauvegarderReponseReqInfoParams | undefined>();
  const [reponseAEnvoyer, setReponseAEnvoyer] = useState<IEnvoyerReponseReqInfoParams | undefined>();
  const [ajoutPieceJointeTermine, setAjoutPieceJointeTermine] = useState<boolean>(false);
  const [piecesAEnvoyer, setPiecesAEnvoyer] = useState<PieceJointe[] | undefined>();

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
  const postPiecesJointesApiResultat = usePostPiecesJointesApi(TypePieceJointe.PIECE_COMPLEMENT_INFORMATION, requete.id, piecesAEnvoyer);

  useEffect(() => {
    if (postPiecesJointesApiResultat && !postPiecesJointesApiResultat.erreur) {
      setAjoutPieceJointeTermine(true);
    }
  }, [postPiecesJointesApiResultat]);

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
      navigate(LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_INFORMATION.url));
    }
  }, [idReponse, navigate]);

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
            onclickPrendreEnCharge={onclickPrendreEnCharge}
            formulaireDisabled={formulaireDisabled}
            retourVisible={retourVisible}
            affichageBoutonPrendreEnCharge={affichageBoutonPrendreEnCharge}
          />
        </Formulaire>
      </Fieldset>
    </div>
  );
};

function getReponseForm(
  formulaireDisabled: boolean,
  boutonVisible: boolean,
  reponse?: IReponseRequeteInfo,
  affichageBoutonPrendreEnCharge = false
): JSX.Element {
  const reponseReqInfoFromProps = {
    reponse,
    formulaireDisabled
  } as ReponseReqInfoSubFormProps;

  return (
    <>
      {!affichageBoutonPrendreEnCharge && (
        <PiecesJointesReqInfoForm
          key={PIECES_JOINTES}
          nom={PIECES_JOINTES}
          titre={getLibelle("Pièces justificatives")}
          visible={boutonVisible}
          disabled={formulaireDisabled}
        />
      )}
      <ReponseReqInfoSubForm
        key={REPONSE}
        {...reponseReqInfoFromProps}
      />
    </>
  );
}
