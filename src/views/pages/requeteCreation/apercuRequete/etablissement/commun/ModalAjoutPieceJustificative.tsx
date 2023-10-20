import { useAjoutPieceJustificativeToRequete } from "@hook/requete/piecesJointes/AjoutPieceJustificativeToRequeteApiHook";
import { Dialog } from "@mui/material";
import { PieceJointe } from "@util/FileUtils";
import { Options } from "@util/Type";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React, { useState } from "react";
import * as Yup from "yup";
import ContenuModalAjoutPieceJustificative from "./ContenuModalAjoutPieceJustificative";
import "./scss/ModalAjoutPieceJustificative.scss";

interface ModalAjoutPieceJustificativeProps {
  estOuvert: boolean;
  onClose: () => void;
  listeCategoriePJ: Options;
}

interface ModalPieceJustificativeProps {
  categoriePJ: string;
  file?: PieceJointe;
}

interface ModalPieceJustificativeProps {
  categoriePJ: string;
  file?: PieceJointe;
}

const FormDefaultValues: ModalPieceJustificativeProps = {
  categoriePJ: "",
  file: undefined
};

const FormValidationSchema = Yup.object({
  categoriePJ: Yup.string().required(),
  file: Yup.object().required()
});

export const ModaleAjoutPieceJustificativeRequeteCreation: React.FC<
  ModalAjoutPieceJustificativeProps
> = props => {
  const [paramsApi, setParamsApi] = useState<ModalPieceJustificativeProps>();

  useAjoutPieceJustificativeToRequete(paramsApi);

  function onAjoutPieceJustificative(values: ModalPieceJustificativeProps) {
    setParamsApi({
      categoriePJ: values.categoriePJ,
      file: values.file
    });
  }

  function onClose() {
    props.onClose();
  }

  return (
    <Formulaire
      className="FormulaireAjouterPJ"
      formDefaultValues={FormDefaultValues}
      formValidationSchema={FormValidationSchema}
      onSubmit={onAjoutPieceJustificative}
    >
      <Dialog
        maxWidth={"xl"}
        className="modalContainer"
        open={props.estOuvert}
        onClose={onClose}
      >
        <ContenuModalAjoutPieceJustificative
          listeCategoriePJ={props.listeCategoriePJ}
          onClose={onClose}
        />
      </Dialog>
    </Formulaire>
  );
};
