import { IDetailInfos } from "@model/signature/IDetailInfos";
import { IEtatTraitementSignature } from "@model/signature/IEtatTraitementSignature";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getLibelle } from "@util/Utils";
import messageManager from "@util/messageManager";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import React, { useEffect, useState } from "react";
import { CodePinForm, CodePinFormValues } from "./CodePinForm";
import { useSignatureHook } from "./hook/SignatureHook";
import { ErreurSignature, SignatureErreur } from "./messages/ErreurSignature";
import "./scss/PopinSignature.scss";

export interface PopinSignatureProps {
  titre: string;
  texte?: string;
  estOuvert: boolean;
  setEstOuvert: React.Dispatch<React.SetStateAction<boolean>>;
  documentASigner: string;
  onSuccesSignature: (
    documentAvecSignature: string,
    infosSignature: IInfosCarteSignature
  ) => void;
  informations?: IDetailInfos[];
  etatTraitementSignature: IEtatTraitementSignature;
  timeoutTraitementSignature?: number;
  onTraitementSignatureTermine?: () => void;
}

export const PopinSignature: React.FC<PopinSignatureProps> = props => {
  const [codePin, setCodePin] = useState<string | undefined>();
  const [signatureEnCours, setSignatureEnCours] = useState(false);

  const resultatSignature = useSignatureHook(
    props.documentASigner,
    codePin,
    props.informations
  );

  useEffect(() => {
    if (props.estOuvert) {
      setCodePin(undefined);
      setErreurSignature(undefined);
    }
  }, [props.estOuvert]);

  // TODO: Refacto / Supprimer le state erreurSignature quand on aura refacto la signature délivrance.
  //       Normalment on devrait pouvoir directement passer `resultatWebext.erreur` au composant <ErreurSignature />
  const [erreurSignature, setErreurSignature] = useState<SignatureErreur>();

  useEffect(() => {
    if (resultatSignature.data) {
      if (resultatSignature.data.erreur) {
        setErreurSignature({ typeErreur: resultatSignature.data.erreur });
        setSignatureEnCours(false);
        setCodePin(undefined);
      } else {
        props.onSuccesSignature(
          resultatSignature.data.document,
          resultatSignature.data.infosSignature
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatSignature.data]);

  useEffect(() => {
    if (props.etatTraitementSignature.termine) {
      setSignatureEnCours(false);
      props.setEstOuvert(false);
      if (props.onTraitementSignatureTermine) {
        props.onTraitementSignatureTermine();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.etatTraitementSignature.termine]);

  const onSubmitCodePinForm = (valeurs: CodePinFormValues) => {
    setSignatureEnCours(true);
    resultatSignature.reinitialiser();
    setCodePin(valeurs.codePin);
  };

  const onClosePopin = () => {
    props.setEstOuvert(false);
    setCodePin(undefined);
  };

  const onTimeoutEnd = () => {
    setSignatureEnCours(false);
    setCodePin(undefined);
    messageManager.showError(
      getLibelle(
        "Une erreur inconnue est survenue. Veuillez réessayer ultérieurement. Si le problème persiste, merci de contacter le BIMO."
      )
    );
  };

  return (
    <Dialog
      open={props.estOuvert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="popin-signature"
    >
      <DialogTitle id="alert-dialog-title">
        {getLibelle(props.titre)}
      </DialogTitle>
      <DialogContent>
        {erreurSignature && <ErreurSignature erreur={erreurSignature} />}
        <div className="texte-popin-signature">{getLibelle(props.texte)}</div>
        <CodePinForm
          onClose={onClosePopin}
          onSubmit={onSubmitCodePinForm}
          erreurSignature={erreurSignature?.typeErreur}
        />
        <OperationEnCours
          visible={signatureEnCours}
          onTimeoutEnd={onTimeoutEnd}
          timeoutInMiliSec={props.timeoutTraitementSignature}
        />
      </DialogContent>
    </Dialog>
  );
};
