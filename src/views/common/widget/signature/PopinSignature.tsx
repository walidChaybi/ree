import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import React, { useEffect, useState } from "react";
import { CodePinForm } from "./CodePinForm";
import { useSignatureHook } from "./hook/SignatureHook";
import { ErreurSignature, SignatureErreur } from "./messages/ErreurSignature";
import "./scss/PopinSignature.scss";
import { IDetailInfos, IInfosCarteSignature } from "./types";

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
  traitementSignatureTermine: boolean;
  timeoutTraitementSignature?: number;
  onTraitementSignatureTermine?: () => void;
}

export const PopinSignature: React.FC<PopinSignatureProps> = props => {
  const [codePin, setCodePin] = useState<string | undefined>();
  const [signatureEnCours, setSignatureEnCours] = useState(false);

  const resultatWebext = useSignatureHook(
    props.documentASigner,
    codePin,
    props.informations
  );

  // TODO: Refacto / Supprimer le state erreurSignature quand on aura refacto la signature délivrance.
  //       Normalment on devrait pouvoir directement passer `resultatWebext.erreur` au composant <ErreurSignature />
  const [erreurSignature, setErreurSignature] = useState<SignatureErreur>();

  useEffect(() => {
    if (resultatWebext) {
      if (resultatWebext.erreur) {
        setErreurSignature({ typeErreur: resultatWebext.erreur });
        resultatWebext.erreur?.code === "FONC_3" && setCodePin(undefined);
      } else {
        props.onSuccesSignature(
          resultatWebext.document,
          resultatWebext.infosSignature
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatWebext]);

  useEffect(() => {
    if (props.traitementSignatureTermine) {
      setSignatureEnCours(false);
      props.setEstOuvert(false);
      if (props.onTraitementSignatureTermine) {
        props.onTraitementSignatureTermine();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.traitementSignatureTermine]);

  const onTimeoutEnd = () => {
    setSignatureEnCours(false);
    logError({
      messageUtilisateur: getLibelle(
        "Une erreur est survenue. Veuillez rafraîchir la page du navigateur et réessayer."
      )
    });
  };

  return (
    <>
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
            onClose={() => props.setEstOuvert(false)}
            setCodePin={setCodePin}
            setSignatureEnCours={setSignatureEnCours}
          />
          <OperationEnCours
            visible={signatureEnCours}
            onTimeoutEnd={onTimeoutEnd}
            timeoutInMiliSec={props.timeoutTraitementSignature}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
