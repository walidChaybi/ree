/* v8 ignore start */
import { ChampMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { useFormikContext } from "formik";
import { lazy, useEffect, useMemo } from "react";
import { TMentionForm } from "../../MentionForm";
import { ChampConditionneAideSaisie } from "./ChampConditionneAideSaisie";
import { ChampFormAideSaisie } from "./ChampFormAideSaisie";

const ChampsCaseACocher = lazy(() => import("../../../../../commun/champs/ChampsCaseACocher"));
const ChampDate = lazy(() => import("../../../../../commun/champs/ChampDate"));
const ChampsTexte = lazy(() => import("../../../../../commun/champs/ChampsTexte"));
const ChampRecherchePocopas = lazy(() => import("../../../../../commun/champs/ChampRecherchePocopas"));

export const ConteneurChampFormulaireAideSaisie: React.FC<{
  champ: ChampMetaModele;
  idBloc: string;
  setEstVisible?: (estVisible: boolean) => void;
}> = ({ champ, idBloc, setEstVisible }) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<TMentionForm>();
  const estAffiche = useMemo(() => champ.estAffichable(values), [values]);
  const nomChamp = `${idBloc}.${champ.id}`;

  useEffect(() => {
    setEstVisible?.(estAffiche);
    if (estAffiche || !champ.type) {
      return;
    }

    setFieldTouched(nomChamp, false);
    switch (champ.type) {
      case "select":
      case "radioBouton":
        return;
      case "boolean":
        setFieldValue(nomChamp, false);
        return;
      case "dateComplete":
      case "dateIncomplete":
        setFieldValue(`${nomChamp}.jour`, "");
        setFieldValue(`${nomChamp}.mois`, "");
        setFieldValue(`${nomChamp}.annee`, "");

        return;
      default:
        setFieldValue(nomChamp, "");
    }
  }, [estAffiche]);

  switch (true) {
    case champ.type === "text" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampsTexte
            name={nomChamp}
            type="text"
            libelle={champ.libelle}
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "boolean" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampsCaseACocher
            name={nomChamp}
            libelle={champ.libelle}
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "pocopa" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampRecherchePocopas
            name={nomChamp}
            libelle={champ.libelle}
            optionsRecherchePocopa={{ nombreResultatsMax: 15, familleRegistre: "CSL" }}
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "dateComplete" && estAffiche:
    case champ.type === "dateIncomplete" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampDate
            name={nomChamp}
            libelle={champ.libelle}
            desactiverCorrectionAutomatique
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "annee" && estAffiche:
    case champ.type === "int" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampsTexte
            name={nomChamp}
            libelle={champ.libelle}
            numerique
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "sousTitre" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <h3 className="-mb-3 ml-8 bg-blanc px-2 text-bleu-sombre">{champ.libelle}</h3>
        </ChampFormAideSaisie>
      );

    case champ.type === "select":
    case champ.type === "radioBouton":
      return (
        <ChampConditionneAideSaisie
          estAffiche={estAffiche}
          champ={champ}
          name={nomChamp}
        />
      );
    default:
      return <></>;
  }
};
/* v8 ignore end */
