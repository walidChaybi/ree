import { useRecherchePocopa } from "@hook/pocopa/RecherchePocopaApiHook";
import { Option, Options } from "@util/Type";
import {
  enMajuscule,
  getLibelle,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "@util/Utils";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { INomForm, SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useCallback, useState } from "react";

interface RecherchePocopasProps {
  label: string;
  nombreResultatsMax: number;
  familleRegistre: string;
  estOuvert?: boolean;
}

type RecherchePocopasSubForm = RecherchePocopasProps & SubFormProps;

const RecherchePocopas: React.FC<RecherchePocopasSubForm> = props => {
  const [valeurChampAutocomplete, setValeurChampAutocomplete] =
    useState<string>("");

  const [lastPocopaSelected, setLastPocopaSelected] = useState<
    string | undefined
  >(undefined);

  const pocopas = useRecherchePocopa(
    valeurChampAutocomplete,
    props.familleRegistre,
    props.nombreResultatsMax,
    props.estOuvert
  );

  /**
   * Ajoute le dernier pocopa sélectionné à la liste de pocopas ramenée par l'api
   * Permet de résoudre un warning lorsque l'utilisateur commence à taper une lettre après une première sélection.
   *   Pour reproduire le warning:
   *    -choisir un pocopa ("TUNIS" par exemple)
   *    -sélectionner le pocopa choisi (cliquer dans le champs de recherche)
   *    -taper une lettre ne se trouvant pas dans la liste à la place ("x" par exemple)
   *   Exemple de warning:
   *   Material-UI: The value provided to Autocomplete is invalid.
   *   None of the options match with `{"key":"TUNIS","value":"TUNIS"}`.
   *   You can use the `getOptionSelected` prop to customize the equality test.
   */
  const getPocopasAsOptions = useCallback(() => {
    let pocopasAsOptions = [] as Options;
    if (pocopas?.length) {
      pocopasAsOptions = pocopas.map(
        p =>
          ({
            value: enMajuscule(p),
            str: p
          } as Option)
      );
    }

    if (lastPocopaSelected && pocopas?.indexOf(lastPocopaSelected) === -1) {
      pocopasAsOptions.push({
        value: enMajuscule(lastPocopaSelected),
        str: premiereLettreEnMajusculeLeResteEnMinuscule(lastPocopaSelected)
      });
    }

    return pocopasAsOptions;
  }, [pocopas, lastPocopaSelected]);

  function onChampRechercheChange(option?: Option) {
    setLastPocopaSelected(option ? option.str : undefined);
  }

  function onChampRechercheInput(value: string | null) {
    setValeurChampAutocomplete(value ? value : "");
  }

  return (
    <ChampRechercheField
      componentName="SaisirRegistre"
      name={props.nom}
      label={getLibelle(props.label)}
      onChange={onChampRechercheChange}
      onInput={onChampRechercheInput}
      options={getPocopasAsOptions()}
      disabledPortal={true}
    />
  );
};

export default connect<RecherchePocopasProps & INomForm>(RecherchePocopas);
