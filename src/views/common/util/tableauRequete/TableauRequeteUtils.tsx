import { RECEContextData } from "@core/contexts/RECEContext";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { AlerteRequete } from "@model/requete/enum/AlerteRequete";
import { Priorite } from "@model/requete/enum/Priorite";
import { ELibelleSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { ITitulaireRmcAutoRequeteDto, TitulaireRmcAutoRequete } from "@model/rmc/requete/ITitulaireRmcAutoRequeteDto";
import { TRequeteRMCAuto } from "@model/rmc/requete/RequeteRMCAuto";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorIcon from "@mui/icons-material/Error";
import LabelIcon from "@mui/icons-material/Label";
import ReportIcon from "@mui/icons-material/Report";
import Box from "@mui/material/Box";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import { useContext } from "react";
import DateUtils from "../DateUtils";
import "./scss/RequeteUtils.scss";

function prioriteDeLaRequete(priorite: string): string {
  switch (Priorite.getEnumFor(priorite)) {
    case Priorite.BASSE:
      return "PrioriteBasse";
    case Priorite.MOYENNE:
      return "PrioriteMoyenne";
    case Priorite.HAUTE:
      return "PrioriteHaute";
    default:
      return "";
  }
}

export const RenderIconPrioriteRequete = (data: any): JSX.Element => {
  const priorite = data.priorite;
  if (priorite && priorite !== "") {
    return (
      <Box
        title={Priorite.getEnumFor(priorite).libelle}
        aria-label={Priorite.getEnumFor(priorite).libelle}
        aria-hidden={true}
      >
        <LabelIcon className={prioriteDeLaRequete(priorite)} />
      </Box>
    );
  } else {
    return (
      <Box
        title={"Erreur priorité"}
        aria-label={"Erreur priorité"}
        aria-hidden={true}
      >
        <ClearIcon className="ClearIcon" />
      </Box>
    );
  }
};

export const RenderObservationsNumeroRequete = (data: any): JSX.Element => {
  const observations = data.observations;
  let titleObservations = "";

  if (observations != null && observations.length >= 1) {
    observations.forEach((observation: string) => {
      titleObservations += `${observation}\n`;
    });
  }

  return (
    <>
      {titleObservations !== "" && (
        <Box
          title={titleObservations}
          aria-label={titleObservations}
          aria-hidden={true}
        >
          <ReportIcon className="ReportIcon" />
        </Box>
      )}
    </>
  );
};

export const RenderCellTitulaires = (data: any): JSX.Element => {
  const titulaires = data.titulaires as ITitulaireRequeteTableau[] | TitulaireRmcAutoRequete[];
  let titleTitulaires = "";
  const celluleTitulaires: string[] = [];

  if (titulaires != null && titulaires.length >= 1) {
    titulaires.forEach((titulaire: ITitulaireRequeteTableau | ITitulaireRmcAutoRequeteDto) => {
      if (
        ((t: ITitulaireRequeteTableau | ITitulaireRmcAutoRequeteDto): t is ITitulaireRmcAutoRequeteDto =>
          typeof titulaire.prenoms[0] !== typeof "")(titulaire)
      ) {
        const prenoms: string[] = PrenomsForm.versPrenomsStringDto(PrenomsForm.valeursInitiales(titulaire.prenoms));
        celluleTitulaires.push(`${titulaire.nom} ${prenoms[0] ?? ""}`);
        titleTitulaires += `${titulaire.nom}`;
        prenoms.forEach((p: string) => {
          titleTitulaires += p ? ` ${p}` : "";
        });
      } else {
        celluleTitulaires.push(`${titulaire.nom} ${titulaire.prenoms[0] ?? ""}`);
        titleTitulaires += `${titulaire.nom}`;
        titulaire.prenoms.forEach((p: string) => {
          titleTitulaires += p ? ` ${p}` : "";
        });
      }
      titleTitulaires += `\n`;
    });
  }

  return (
    <div title={titleTitulaires}>
      {celluleTitulaires.map((titulaire: string, index: number) => {
        return <div key={`${titulaire}${index}`.replace(/\s+/g, "")}>{titulaire}</div>;
      })}
    </div>
  );
};

export const RenderCellSousType = (requete: TRequeteTableau | TRequeteRMCAuto): JSX.Element => {
  return (
    <span>
      {"nomCompletRequerant" in requete
        ? requete.sousType
        : ELibelleSousTypeRequete[requete.sousType as keyof typeof ELibelleSousTypeRequete].court}
    </span>
  );
};

export const RenderCellDatesNaissancesTitulaires = (data: any): JSX.Element => {
  const titulaires = data.titulaires;
  let titleDatesNaissances = "";
  const celluleDatesNaissances: string[] = [];

  if (titulaires != null && titulaires.length >= 1) {
    titulaires.forEach((t: ITitulaireRequeteTableau) => {
      const date = DateUtils.getDateStringFromDateCompose({
        jour: t.jourNaissance.toString(),
        mois: t.moisNaissance.toString(),
        annee: t.anneeNaissance.toString()
      });

      celluleDatesNaissances.push(date);
      titleDatesNaissances += `${date}\n`;
    });
  }

  return (
    <div title={titleDatesNaissances}>
      {celluleDatesNaissances.map((date: string, index: number) => {
        return <div key={`${date}${index}`}>{date}</div>;
      })}
    </div>
  );
};

export const RenderCellRequerant = (data: any): JSX.Element => {
  const { services, utilisateurs } = useContext(RECEContextData);
  if (data.idUtilisateurRequerant) {
    const codeService = services?.find(
      el => el.idService === utilisateurs?.find(ut => ut.idUtilisateur === data.idUtilisateurRequerant)?.service?.idService
    )?.code;
    return <span>{`${data.nomCompletRequerant} (${codeService})`}</span>;
  } else {
    return <span>{data.nomCompletRequerant}</span>;
  }
};

export const RenderMessageZeroRequete = (): JSX.Element => {
  return getLigneTableauVide("Aucune requête n'a été trouvée.");
};

export const RenderMessageSaisirFiltreOuZeroRequete = (rechercheEffectuee: boolean): JSX.Element =>
  getLigneTableauVide(rechercheEffectuee ? "Aucune requête n'a été trouvée." : "Saisir au moins un critère pour afficher des résultats.");

export const RenderIconeAlerteRequete = (data: any): JSX.Element => {
  if (AlerteRequete.getEnumFor(data.alerte) === AlerteRequete.RECEPTION_MISE_A_JOUR_SDANF) {
    return (
      <Box
        title={AlerteRequete.RECEPTION_MISE_A_JOUR_SDANF.libelle}
        aria-label={AlerteRequete.RECEPTION_MISE_A_JOUR_SDANF.libelle}
        aria-hidden={true}
      >
        <ErrorIcon className="alerteSdanfIcone" />
      </Box>
    );
  } else return <></>;
};
