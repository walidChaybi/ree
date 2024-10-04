import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getLibelle } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React from "react";
import {
  IDataBulletinIdentificationResultat,
  useModalBulletinIdentification
} from "./ModalBulletinIdentificationApiHook";
import "./scss/ModalBulletinIdentification.scss";

interface ModalBulletinIdentificationProps {
  open: boolean;
  idActe: string;
  onClose: () => void;
  dataFromRequete: IDataBulletinIdentificationResultat;
}

const ModalBulletinIdentification: React.FC<
  ModalBulletinIdentificationProps
> = props => {
  const { dataBulletinIdentification } = useModalBulletinIdentification(
    props.idActe
  );

  const { nom, prenoms, sexe, dateNaissance, lieuNaissance } =
    dataBulletinIdentification;

  return (
    <Dialog
      maxWidth={"xl"}
      className="modalContainer"
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle className="modalTitle">
        {getLibelle("Bulletin d'identification")}
      </DialogTitle>
      <DialogContent>
        <div className="ligneInformation">
          <p>{getLibelle("Nom :")}</p>
          <p>{nom ? nom : props.dataFromRequete.nom}</p>
        </div>
        <div className="ligneInformation">
          <p>{getLibelle("Prénoms :")}</p>
          <p>{prenoms ? prenoms : props.dataFromRequete.prenoms}</p>
        </div>
        <div className="ligneInformation">
          <p>{getLibelle("Sexe :")}</p>
          <p>{sexe ? sexe : props.dataFromRequete.sexe}</p>
        </div>
        <div className="ligneInformation">
          <p>{getLibelle("Date de naissance :")}</p>
          <p>
            {dateNaissance
              ? dateNaissance
              : props.dataFromRequete.dateNaissance}
          </p>
        </div>
        <div className="ligneInformation">
          <p>{getLibelle("Lieu de naissance :")}</p>
          <p>
            {lieuNaissance
              ? lieuNaissance
              : props.dataFromRequete.lieuNaissance}
          </p>
        </div>
      </DialogContent>
      <DialogActions>
        <BoutonDoubleSubmit onClick={props.onClose}>{getLibelle("Fermer")}</BoutonDoubleSubmit>
      </DialogActions>
    </Dialog>
  );
};

export default ModalBulletinIdentification;
