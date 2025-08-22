import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { AlerteRequete } from "@model/requete/enum/AlerteRequete";
import { EPriorite } from "@model/requete/enum/EPriorite";
import { ELibelleSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { TRequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { TitulaireRequeteAssociee } from "@model/rmc/requete/TitulaireRequeteAssociee";
import { TitulaireRequeteTableauRMC } from "@model/rmc/requete/TitulaireRequeteTableauRMC";
import Box from "@mui/material/Box";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import { useContext } from "react";
import { MdClear, MdError, MdLabel, MdReport } from "react-icons/md";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import "./scss/RequeteUtils.scss";

const prioriteDeLaRequete = (priorite: keyof typeof EPriorite): string => {
  switch (priorite) {
    case "BASSE":
      return "PrioriteBasse";
    case "MOYENNE":
      return "PrioriteMoyenne";
    case "HAUTE":
      return "PrioriteHaute";
    default:
      return "";
  }
};

export const RenderIconePrioriteRequeteRMC = ({ priorite }: TRequeteTableauRMC): JSX.Element => {
  if (priorite) {
    return (
      <Box
        title={EPriorite[priorite]}
        aria-label={EPriorite[priorite]}
      >
        <MdLabel
          className={prioriteDeLaRequete(priorite)}
          aria-hidden
        />
      </Box>
    );
  } else {
    return (
      <Box
        title={"Erreur priorité"}
        aria-label={"Erreur priorité"}
      >
        <MdClear
          className="ClearIcon"
          aria-hidden
        />
      </Box>
    );
  }
};

export const RenderObservationsNumeroRequete = (data: TRequeteTableauRMC): JSX.Element => {
  const observations = data.observations;

  return (
    <>
      {Boolean(observations.length) && (
        <Box
          title={observations.join("\n")}
          aria-label={observations.join("\n")}
        >
          <MdReport
            className="ReportIcon text-2xl"
            aria-hidden
          />
        </Box>
      )}
    </>
  );
};

export const RenderCellTitulaires = (data: any): JSX.Element => {
  const titulaires = data.titulaires as ITitulaireRequeteTableau[] | TitulaireRequeteAssociee[] | TitulaireRequeteTableauRMC[];
  let titleTitulaires = "";
  const celluleTitulaires: string[] = [];

  if (titulaires != null && titulaires.length >= 1) {
    titulaires.forEach(titulaire => {
      if (
        ((
          t: ITitulaireRequeteTableau | TitulaireRequeteAssociee | TitulaireRequeteTableauRMC
        ): t is TitulaireRequeteAssociee | TitulaireRequeteTableauRMC => "prenom" in titulaire)(titulaire)
      ) {
        celluleTitulaires.push(`${titulaire.nom} ${titulaire.prenom}`);
        titleTitulaires += `${titulaire.nom} ${titulaire.prenom}\n`;
      } else {
        celluleTitulaires.push(`${titulaire.nom} ${titulaire.prenoms[0] ?? ""}`);
        titleTitulaires += `${titulaire.nom} ${titulaire.prenoms[0] ?? ""}\n`;
      }
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

export const RenderCellSousType = (requete: TRequeteTableauRMC | TRequeteAssociee): JSX.Element => {
  return <span>{ELibelleSousTypeRequete[requete.sousType].court}</span>;
};

export const RenderCellType = (requete: TRequeteTableauRMC): JSX.Element => {
  return <span>{ETypeRequete[requete.type]}</span>;
};

export const RenderCellStatut = (requete: TRequeteTableauRMC): JSX.Element => {
  return <span>{EStatutRequete[requete.statut]}</span>;
};

export const RenderCellDatesNaissancesTitulaires = ({ titulaires }: TRequeteTableauRMC): JSX.Element => {
  if (!titulaires.length) return <></>;

  const datesNaissance = titulaires.map(titulaire => titulaire.dateNaissance);

  return (
    <div title={datesNaissance.join("\n")}>
      {datesNaissance.map((date: string, index: number) => {
        return <div key={`${date}${index}`}>{date}</div>;
      })}
    </div>
  );
};

export const RenderCellRequerant = (data: any): JSX.Element => {
  const { services, utilisateurs } = useContext(RECEContextData);
  if (data.idUtilisateurRequerant) {
    const codeService = services?.find(
      el => el.idService === utilisateurs?.find(ut => ut.id === data.idUtilisateurRequerant)?.idService
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
      >
        <MdError
          className="alerteSdanfIcone text-4xl"
          aria-hidden
        />
      </Box>
    );
  } else return <></>;
};
