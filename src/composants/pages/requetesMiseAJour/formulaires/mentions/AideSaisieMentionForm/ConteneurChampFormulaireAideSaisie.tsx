/* v8 ignore start */
import { ChampMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { useFormikContext } from "formik";
import { lazy, useCallback, useEffect, useMemo } from "react";
import SeparateurSection from "../../../../../commun/conteneurs/formulaire/SeparateurSection";
import { TMentionForm } from "../../MentionForm";
import { ChampConditionneAideSaisie } from "./ChampConditionneAideSaisie";
import { ChampFormAideSaisie } from "./ChampFormAideSaisie";

const ChampsCaseACocher = lazy(() => import("../../../../../commun/champs/ChampCaseACocher"));
const ChampDate = lazy(() => import("../../../../../commun/champs/ChampDate"));
const ChampsTexte = lazy(() => import("../../../../../commun/champs/ChampTexte"));
const ChampRecherchePocopas = lazy(() => import("../../../../../commun/champs/ChampRecherchePocopas"));

export const ConteneurChampFormulaireAideSaisie: React.FC<{
  champ: ChampMetaModele;
  idBloc: string;
  setEstVisible?: (estVisible: boolean) => void;
}> = ({ champ, idBloc, setEstVisible }) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<TMentionForm>();
  const estAffiche = useMemo(() => champ.estAffichable(values), [values]);
  const valeurLectureSeule = useMemo(() => champ.valeurLectureSeule(values), [values]);
  const estLectureSeule = useMemo(() => Boolean(valeurLectureSeule), [valeurLectureSeule]);

  const nomChamp = `${idBloc}.${champ.id}`;

  const viderChamp = useCallback(() => {
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
  }, []);

  useEffect(() => {
    setFieldTouched(nomChamp, false);

    setEstVisible?.(estAffiche);
    if (estAffiche || !champ.type) {
      if (estLectureSeule) {
        setFieldValue(nomChamp, estLectureSeule ? valeurLectureSeule : "");
      }
      return;
    }
    viderChamp();
  }, [estAffiche, valeurLectureSeule]);

  switch (true) {
    case champ.type === "text" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampsTexte
            name={nomChamp}
            type="text"
            libelle={champ.libelle}
            disabled={estLectureSeule}
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "boolean" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampsCaseACocher
            name={nomChamp}
            libelle={champ.libelle}
            disabled={estLectureSeule}
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
            disabled={estLectureSeule}
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
            disabled={estLectureSeule}
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "annee" && estAffiche:
    case champ.type === "int" && estAffiche:
    case champ.type === "crpcen" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampsTexte
            name={nomChamp}
            libelle={champ.libelle}
            maxLength={champ.type === "crpcen" ? 5 : undefined}
            disabled={estLectureSeule}
            numerique
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "sousTitre" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <SeparateurSection titre={champ.libelle} />
        </ChampFormAideSaisie>
      );

    case champ.type === "select":
    case champ.type === "radioBouton":
      return (
        <ChampConditionneAideSaisie
          estAffiche={estAffiche}
          champ={champ}
          name={nomChamp}
          disabled={estLectureSeule}
        />
      );
    default:
      return <></>;
  }
};
/* v8 ignore end */
