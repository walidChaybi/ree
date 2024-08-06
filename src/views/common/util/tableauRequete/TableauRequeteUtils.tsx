import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { AlerteRequete } from "@model/requete/enum/AlerteRequete";
import { Priorite } from "@model/requete/enum/Priorite";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorIcon from "@mui/icons-material/Error";
import LabelIcon from "@mui/icons-material/Label";
import ReportIcon from "@mui/icons-material/Report";
import { Box } from "@mui/material";
import { getLibelle, numberToString } from "@util/Utils";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import { getDateStringFromDateCompose } from "../DateUtils";
import { storeRece } from "../storeRece";
import "./scss/RequeteUtils.scss";

export function prioriteDeLaRequete(priorite: string): string {
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

export function getIconPrioriteRequete(data: any): JSX.Element {
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
        title={getLibelle("Erreur priorité")}
        aria-label={getLibelle("Erreur priorité")}
        aria-hidden={true}
      >
        <ClearIcon className="ClearIcon" />
      </Box>
    );
  }
}

export function getObservationsNumeroRequete(data: any): JSX.Element {
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
}

export function getCellTitulaires(data: any): JSX.Element {
  const titulaires = data.titulaires;
  let titleTitulaires = "";
  const celluleTitulaires: string[] = [];

  if (titulaires != null && titulaires.length >= 1) {
    titulaires.forEach((titulaire: ITitulaireRequeteTableau) => {
      celluleTitulaires.push(
        `${titulaire.nom} ${
          titulaire.prenoms[0] != null ? titulaire.prenoms[0] : ""
        }`
      );
      titleTitulaires += `${titulaire.nom}`;
      titulaire.prenoms.forEach((p: string) => {
        const prenom = p != null ? ` ${p}` : "";
        titleTitulaires += prenom;
      });
      titleTitulaires += `\n`;
    });
  }

  return (
    <div title={titleTitulaires}>
      {celluleTitulaires.map((titulaire: string, index: number) => {
        return (
          <div key={`${titulaire}${index}`.replace(/\s+/g, "")}>
            {titulaire}
          </div>
        );
      })}
    </div>
  );
}

export function getCellDatesNaissancesTitulaires(data: any): JSX.Element {
  const titulaires = data.titulaires;
  let titleDatesNaissances = "";
  const celluleDatesNaissances: string[] = [];

  if (titulaires != null && titulaires.length >= 1) {
    titulaires.forEach((t: ITitulaireRequeteTableau) => {
      const date = getDateStringFromDateCompose({
        jour: numberToString(t.jourNaissance),
        mois: numberToString(t.moisNaissance),
        annee: numberToString(t.anneeNaissance)
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
}

export function getCellRequerant(data: any): JSX.Element {
  if (data.idUtilisateurRequerant) {
    const codeService = storeRece.listeServices?.find(
      el =>
        el.idService ===
        storeRece.listeUtilisateurs?.find(
          ut => ut.idUtilisateur === data.idUtilisateurRequerant
        )?.service?.idService
    )?.code;
    return <span>{`${data.nomCompletRequerant} (${codeService})`}</span>;
  } else {
    return <span>{data.nomCompletRequerant}</span>;
  }
}

export function getMessageZeroRequete(): JSX.Element {
  return getLigneTableauVide("Aucune requête n'a été trouvée.");
}

export const getMessageSaisirFiltreOuZeroRequete = (
  rechercheEffectuee: boolean
): JSX.Element =>
  getLigneTableauVide(
    rechercheEffectuee
      ? "Aucune requête n'a été trouvée."
      : "Saisir au moins un critère pour afficher des résultats."
  );

export function getIconeAlerteRequete(data: any): JSX.Element {
  if (
    AlerteRequete.getEnumFor(data.alerte) ===
    AlerteRequete.RECEPTION_MISE_A_JOUR_SDANF
  ) {
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
}
