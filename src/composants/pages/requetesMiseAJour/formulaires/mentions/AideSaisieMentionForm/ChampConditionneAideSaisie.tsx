/* v8 ignore start */
import { ChampMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { useField, useFormikContext } from "formik";
import { lazy, useEffect, useMemo, useState } from "react";
import { TMentionForm } from "../../MentionForm";
import { ChampFormAideSaisie } from "./ChampFormAideSaisie";
const ChampListeDeroulante = lazy(() => import("../../../../../commun/champs/ChampListeDeroulante"));
const ChampsRadio = lazy(() => import("../../../../../commun/champs/ChampsRadio"));

export const ChampConditionneAideSaisie: React.FC<{
  name: string;
  champ: ChampMetaModele;
  estAffiche: boolean;
  disabled?: boolean;
}> = ({ name, champ, estAffiche, disabled }) => {
  const [field] = useField(name);
  const { values, setFieldValue } = useFormikContext<TMentionForm>();
  const [nombreOptions, setNombreOptions] = useState<number | null>(null);
  const options = useMemo(
    () =>
      (champ.valeursPossibles.find(valeursPossibles => valeursPossibles.sontUtilisables(values))?.valeurs ?? []).map(valeur => ({
        cle: valeur,
        libelle: valeur
      })),
    [values]
  );

  useEffect(() => {
    const valeursOption = options.map(option => option.libelle);

    if (!valeursOption.includes(field.value) || ![valeursOption.length, null].includes(nombreOptions)) {
      const nouvelleValeur = (() => {
        switch (true) {
          case valeursOption.includes(champ.valeurParDefaut ?? ""):
            return champ.valeurParDefaut ?? "";
          case Boolean(valeursOption[0]):
            return valeursOption[0];
          default:
            return "";
        }
      })();

      setFieldValue(name, nouvelleValeur);
    }

    setNombreOptions(valeursOption.length);
  }, [options]);

  switch (true) {
    case !estAffiche || !options.length:
      return <></>;
    case champ.type === "select":
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampListeDeroulante
            libelle={champ.libelle}
            name={name}
            options={options}
            disabled={disabled}
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "radioBouton":
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampsRadio
            libelle={champ.libelle}
            name={name}
            options={options}
            disabled={disabled}
          />
        </ChampFormAideSaisie>
      );
    default:
      return <></>;
  }
};
/* v8 ignore end */
