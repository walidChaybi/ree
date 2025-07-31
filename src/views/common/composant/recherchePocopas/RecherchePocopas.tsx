import { getPocopasOuvertsOuFermerParFamille, getPocopasParFamille } from "@api/appels/etatcivilApi";
import { Option } from "@util/Type";
import { estRenseigne, getValeurOuUndefined, premiereLettreEnMajusculeLeResteEnMinuscule } from "@util/Utils";
import messageManager from "@util/messageManager";
import { ChampRechercheField } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { INomForm, SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

interface RecherchePocopasProps {
  label: string;
  nombreResultatsMax: number;
  familleRegistre: string;
  estOuvert?: boolean;
  optionsValidesNonAffichees?: Option[];
  delai?: number;
}

type RecherchePocopasSubForm = RecherchePocopasProps & SubFormProps;

const useDelai = <T,>(defaut: T, delai: number = 300): [T, Dispatch<SetStateAction<T>>] => {
  const [valeur, setValeur] = useState<T>(defaut);
  const [valeurDelai, setValeurDelai] = useState<T>(defaut);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValeurDelai(valeur);
    }, delai);

    return () => {
      clearTimeout(timer);
    };
  }, [valeur, delai]);

  return [valeurDelai, setValeur];
};

// A SUPPRIMER UNE FOIS LA NOUVELLE RMC EN PLACE
function useRecherchePocopa(debutPocopa: string, familleRegistre: string, nombreResultatsMax: number, estOuvert: boolean | undefined) {
  const [pocopasState, setPocopasState] = useState<string[]>();

  useEffect(() => {
    const fetchPocopas = async () => {
      let pocopas: any;
      if (debutPocopa) {
        try {
          if (estRenseigne(estOuvert)) {
            pocopas = await getPocopasOuvertsOuFermerParFamille(
              debutPocopa,
              getValeurOuUndefined(familleRegistre),
              nombreResultatsMax,
              estOuvert
            );
          } else {
            pocopas = await getPocopasParFamille(debutPocopa, getValeurOuUndefined(familleRegistre), nombreResultatsMax);
          }
        } catch (error) {
          messageManager.showErrorAndClose("Une erreur est survenue lors de la récupération des pocopas");
        }
        setPocopasState(pocopas.body.data);
      } else {
        setPocopasState([]);
      }
    };

    fetchPocopas();
  }, [debutPocopa, familleRegistre, nombreResultatsMax, estOuvert]);

  return pocopasState;
}

const RecherchePocopas: React.FC<RecherchePocopasSubForm> = ({
  familleRegistre,
  nombreResultatsMax,
  estOuvert,
  nom,
  label,
  optionsValidesNonAffichees,
  disabled,
  delai
}) => {
  const [valeurChampAutocomplete, setValeurChampAutocomplete] = useDelai("", delai);
  const [lastPocopaSelected, setLastPocopaSelected] = useState<string | undefined>(undefined);

  const pocopas = useRecherchePocopa(valeurChampAutocomplete, familleRegistre, nombreResultatsMax, estOuvert);

  const optionsPocopa = useMemo(() => {
    const options = (pocopas ?? []).map(pocopa => ({
      cle: pocopa.toUpperCase(),
      libelle: pocopa
    }));

    if (lastPocopaSelected && !pocopas?.includes(lastPocopaSelected)) {
      options.push({
        cle: lastPocopaSelected.toUpperCase(),
        libelle: premiereLettreEnMajusculeLeResteEnMinuscule(lastPocopaSelected)
      });
    }
    return options;
  }, [pocopas, lastPocopaSelected]);

  return (
    <ChampRechercheField
      name={nom}
      componentName="SaisirRegistre"
      label={label ?? ""}
      onChange={option => setLastPocopaSelected(option ? option.libelle : undefined)}
      onInput={value => setValeurChampAutocomplete(value ?? "")}
      options={optionsPocopa}
      disabled={disabled}
      optionsValidesNonAffichees={optionsValidesNonAffichees}
    />
  );
};

export default connect<RecherchePocopasProps & INomForm>(RecherchePocopas);
