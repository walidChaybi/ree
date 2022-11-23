import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Autocomplete, {
  createFilterOptions,
} from '@mui/material/Autocomplete';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

export interface SelectElements {
  key: string;
  value: string;
}

export interface FormValues {
  selectedItem?: SelectElements;
}

interface SelectDialogProps {
  listOfElements: SelectElements[];
  defaultElementId?: string;
  title: string;
  libelle: string;
  validate: (values: FormValues) => void;
}

export const SelectDialog: React.FC<SelectDialogProps> = (props) => {
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      selectedItem: props.listOfElements.find(
        (element) => element.key === props.defaultElementId
      ),
    },
    onSubmit: (values: FormValues) => {
      props.validate(values);
      setOpen(false);
    },
  });

  const handleClickOpen = (ev: React.MouseEvent<unknown>) => {
    ev.preventDefault();
    ev.stopPropagation();
    setOpen(true);
  };

  const handleClose = (ev: React.MouseEvent<unknown>) => {
    ev.preventDefault();
    ev.stopPropagation();
    setOpen(false);
  };

  return (
    <div
      onClick={(ev: React.MouseEvent<unknown>) => {
        ev.stopPropagation();
      }}
    >
      <Button
        data-testid={"icon-dialog"}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        <FontAwesomeIcon icon={faUserAlt} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <DialogContent>
              <Autocomplete
                isOptionEqualToValue={(option: SelectElements) => {
                  if (formik.initialValues.selectedItem === undefined) {
                    return false;
                  }
                  return option.key === formik.initialValues.selectedItem.key;
                }}
                id="combo-box-select-dialog"
                onChange={(ev, value) => {
                  formik.setFieldValue("selectedItem", value);
                }}
                options={props.listOfElements}
                value={formik.initialValues.selectedItem}
                getOptionLabel={(option: SelectElements) => option.value}
                style={{ width: 300 }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    label={props.libelle}
                    variant="outlined"
                  />
                )}
                filterOptions={createFilterOptions({
                  limit: 5,
                })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" name={"cancel"}>
                Annuler
              </Button>
              <Button color="primary" type="submit" name={"validate"}>
                Valider
              </Button>
            </DialogActions>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
