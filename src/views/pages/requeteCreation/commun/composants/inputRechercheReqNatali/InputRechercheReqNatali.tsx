import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React from "react";
import "./inputRechercheReqNatali.scss";

export type RechercheNataliValuesForm = {
  numeroRequete: string;
};

type InputRechercheReqNataliProps = {
  onSubmit: (values: RechercheNataliValuesForm) => void;
  className?: string;
};

export const InputRechercheReqNatali: React.FC<
  InputRechercheReqNataliProps
> = props => {
  const rechercheDefaultValue = {
    numeroRequete: ""
  };

  return (
    <div className={props.className}>
      <Formulaire
        formDefaultValues={rechercheDefaultValue}
        formValidationSchema={undefined}
        onSubmit={props.onSubmit}
        className="inputRechercheReqNatali"
      >
        <InputField
          data-testid="inputRechercheReqNatali"
          className="inputField"
          name="numeroRequete"
          placeholder={getLibelle("Rechercher une requête Natali")}
        />
        <Button data-testid="loupeButton" type="submit">
          <FontAwesomeIcon className="loupeButton" icon={faSearch} />
        </Button>
      </Formulaire>
    </div>
  );
};
