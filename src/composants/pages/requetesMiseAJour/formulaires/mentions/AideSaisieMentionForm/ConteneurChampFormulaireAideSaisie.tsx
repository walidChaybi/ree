import { ChampMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { NumeroRcRcaPacsForm } from "@model/form/commun/NumeroRcRcaPacsForm";
import { TObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { useFormikContext } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import ChampCaseACocher from "../../../../../commun/champs/ChampCaseACocher";
import ChampDate from "../../../../../commun/champs/ChampDate";
import ChampRecherchePocopas from "../../../../../commun/champs/ChampRecherchePocopas";
import ChampTexte from "../../../../../commun/champs/ChampTexte";
import ChampZoneTexte from "../../../../../commun/champs/ChampZoneTexte";
import ChampsNomSecable from "../../../../../commun/champs/ChampsNomSecable";
import ChampNumeroRcRcaPacs from "../../../../../commun/champs/ChampsNumeroRcRcaPacs";
import SeparateurSection from "../../../../../commun/conteneurs/formulaire/SeparateurSection";
import { TMentionForm } from "../../MentionForm";
import { ChampConditionneAideSaisie } from "./ChampConditionneAideSaisie";
import { ChampFormAideSaisie } from "./ChampFormAideSaisie";

export const ConteneurChampFormulaireAideSaisie: React.FC<{
  champ: ChampMetaModele;
  idBloc: string;
  setEstVisible?: (estVisible: boolean) => void;
}> = ({ champ, idBloc, setEstVisible }) => {
  const { values, setFieldValue, setFieldTouched, initialValues } = useFormikContext<TMentionForm>();
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
        setFieldValue(nomChamp, { jour: "", mois: "", annee: "" });
        return;
      case "nomSecable":
        setFieldValue(nomChamp, { nom: "", secable: false, nomPartie1: "", nomPartie2: "" });
        return;
      case "numeroInscriptionRcRca":
        setFieldValue(nomChamp, NumeroRcRcaPacsForm.valeursInitiales());
        return;
      default:
        setFieldValue(nomChamp, "");
    }
  }, []);

  useEffect(() => {
    setFieldTouched(nomChamp, false);

    setEstVisible?.(estAffiche);
    if (!estAffiche) {
      viderChamp();

      return;
    }

    setFieldValue(nomChamp, valeurLectureSeule ?? (initialValues?.[idBloc] as TObjetFormulaire)?.[champ.id]);
  }, [estAffiche, valeurLectureSeule]);

  switch (true) {
    case champ.type === "text" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampTexte
            name={nomChamp}
            type="text"
            libelle={champ.libelle}
            disabled={estLectureSeule}
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "zoneDeTexte" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampZoneTexte
            name={nomChamp}
            libelle={champ.libelle}
            disabled={estLectureSeule}
            typeRedimensionnement="vertical"
            sansRetourChariot={champ.sansRetourChariot}
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "boolean" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampCaseACocher
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
            optionsRecherchePocopa={{ familleRegistre: "CSL", seulementPocopaOuvert: true }}
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

    case champ.type === "nomSecable" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampsNomSecable
            nom={{ name: `${nomChamp}.nom`, libelle: champ.libelle }}
            secable={{ name: `${nomChamp}.secable`, libelle: "Nom sécable" }}
            nomPartie1={{ name: `${nomChamp}.nomPartie1`, libelle: "Nom 1re partie" }}
            nomPartie2={{ name: `${nomChamp}.nomPartie2`, libelle: "Nom 2nde partie" }}
          />
        </ChampFormAideSaisie>
      );
    case champ.type === "annee" && estAffiche:
    case champ.type === "int" && estAffiche:
    case champ.type === "crpcen" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampTexte
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

    case champ.type === "numeroInscriptionRcRca" && estAffiche:
      return (
        <ChampFormAideSaisie typeChamp={champ.type}>
          <ChampNumeroRcRcaPacs
            libelle={champ.libelle}
            cheminNumeroRcRcaPacs={nomChamp}
            prefixeNumeroRcRcaPacs={"ligne"}
            tailleMax={champ.tailleMax || 1}
          />
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
