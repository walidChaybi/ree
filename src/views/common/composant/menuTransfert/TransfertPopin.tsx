import { Button, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { FilterOptionsState } from "@mui/material/useAutocomplete";
import { OPTION_VIDE, Option } from "@util/Type";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import ChampRecherche from "../../../../composants/commun/champs/ChampRecherche";
import "./scss/TransfertPopin.scss";

interface ITransfertPopinProps {
  open: boolean;
  onClose: () => void;
  onValidate: (valeurs: ITransfertPopinForm) => void;
  options?: Option[];
  titre: string;
  libelleAvantTexte?: string;
  placeholder?: string;
}

export interface ITransfertPopinForm {
  optionChoisie: Option;
  texte?: string;
}

const validationSchemaTransfertPopin = Yup.object().shape({
  optionChoisie: Yup.object()
    .test("option-choisie-valide", "option-choisie-invalide", (optionChoisie): boolean => Boolean(optionChoisie?.cle))
    .required("Sélectionnez une option."),
  texte: Yup.string()
});

const filterOptions = (optionsAutocomplete: Option[], state: FilterOptionsState<Option>): Option[] =>
  optionsAutocomplete.filter(option => option.libelle.toLowerCase().startsWith(state.inputValue.toLowerCase()));

const estDesactive = (optionChoisie: Option, texte?: string, zoneTextePresente = false, selectPresent = false): boolean =>
  (zoneTextePresente && (!texte || (selectPresent && optionChoisie.cle === ""))) || (!zoneTextePresente && optionChoisie.cle === "");

export const TransfertPopin: React.FC<ITransfertPopinProps> = ({
  open,
  onClose,
  onValidate,
  options,
  titre,
  libelleAvantTexte,
  placeholder
}) => (
  <Dialog
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    className="PopinTransfert"
    onClick={(e: any) => {
      if (e) {
        e.stopPropagation();
      }
    }}
  >
    <DialogTitle>{titre ?? ""}</DialogTitle>
    <DialogContent>
      <Formik
        initialValues={{ optionChoisie: OPTION_VIDE, texte: "" } as ITransfertPopinForm}
        validationSchema={validationSchemaTransfertPopin}
        onSubmit={onValidate}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => {
          return (
            <>
              {options && (
                <ChampRecherche
                  name="optionChoisie"
                  options={options}
                  filterOptions={filterOptions}
                />
              )}
              {placeholder && (
                <>
                  {libelleAvantTexte && <h5>{libelleAvantTexte}</h5>}
                  <textarea
                    name="texte"
                    placeholder={placeholder}
                    value={values.texte}
                    onChange={handleChange}
                  ></textarea>
                </>
              )}
              <DialogActions>
                <Button
                  type="button"
                  onClick={onClose}
                >
                  Annuler
                </Button>
                <BoutonOperationEnCours
                  onClick={() => onValidate({ ...values } as ITransfertPopinForm)}
                  estDesactive={estDesactive(values.optionChoisie, values.texte, Boolean(placeholder), Boolean(options))}
                  type="submit"
                >
                  Valider
                </BoutonOperationEnCours>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </DialogContent>
  </Dialog>
);
