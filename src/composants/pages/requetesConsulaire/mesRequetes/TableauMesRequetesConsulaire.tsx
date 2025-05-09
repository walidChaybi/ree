import { getTableauRequetesConsulaires } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { IRequeteTableauConsulaire, mappingRequetesTableauConsulaire } from "@model/requete/IRequeteTableauConsulaire";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { UN } from "@util/Utils";
import messageManager from "@util/messageManager";
import { useCallback, useContext, useEffect, useState } from "react";
import useNavigationRequeteTableauConsulaire from "../../../../hooks/requeteConsulaire/NavigationRequeteTableauConsulaireHook";
import PageChargeur from "../../../commun/chargeurs/PageChargeur";
import Tableau, { IEnTeteTableau, TSensTri } from "../../../commun/tableau/Tableau";

interface IParamtresTableau {
  statuts: string[];
  sousType: string[];
  tri: string;
  sens: TSensTri;
  range: string;
}

interface IParametresPagination {
  pageActuelle: number;
  totalLignes: number;
}

type TLigneTableau = {
  cle: string;
  numeroDossier: string;
  sousType: string;
  natureActe: string;
  titulaires: React.JSX.Element;
  requerant: string;
  dateCreation: string;
  dateDerniereAction: string;
  statut: string;
  onClick?: () => void;
};

const VALEUR_MINIMUM = 0;
const NOMBRE_MINIMUM_LIGNES = 0;
const DIVISEUR_POSITION_PAGE = 4;
const LIGNE_PAR_PAGE = 25;
const PAGINATION_PLAGE_MAX = 100;

const EN_TETE_MES_REQUETES_CONSULAIRES: IEnTeteTableau[] = [
  {
    cle: "numeroDossier",
    libelle: "N°",
    triable: true
  },
  {
    cle: "sousType",
    libelle: "Sous-type",
    triable: true
  },
  {
    cle: "natureActe",
    libelle: "Nature acte",
    triable: true
  },
  {
    cle: "titulaires",
    libelle: "Titulaire(s)"
  },
  { cle: "requerant", libelle: "Requérant" },
  {
    cle: "dateCreation",
    libelle: "Initialisation",
    triable: true
  },
  {
    cle: "dateDerniereAction",
    libelle: "Dernière action",
    triable: true
  },
  {
    cle: "statut",
    libelle: "Statut",
    triable: true
  }
];

const getPortionTableau = (tableau: TLigneTableau[], pageActuelle: number) => {
  return tableau.slice(pageActuelle * LIGNE_PAR_PAGE, pageActuelle * LIGNE_PAR_PAGE + LIGNE_PAR_PAGE);
};

const TableauMesRequetesConsulaire: React.FC = () => {
  const { utilisateurs, services } = useContext(RECEContextData);

  const [parametresTableau, setParametresTableau] = useState<IParamtresTableau>({
    statuts: [StatutRequete.A_TRAITER.nom, StatutRequete.PRISE_EN_CHARGE.nom, StatutRequete.EN_TRAITEMENT.nom, StatutRequete.A_SIGNER.nom],
    sousType: [SousTypeCreation.RCTC.nom, SousTypeCreation.RCTD.nom, SousTypeCreation.RCADC.nom],
    tri: "statutEtDateCreation",
    sens: "ASC",
    range: `0-${PAGINATION_PLAGE_MAX}`
  });
  const [lignesTableau, setLignesTableau] = useState<TLigneTableau[]>();
  const [parametresPagination, setParametresPagination] = useState<IParametresPagination>({
    pageActuelle: VALEUR_MINIMUM,
    totalLignes: NOMBRE_MINIMUM_LIGNES
  });
  const [enRecuperation, setEnRecuperation] = useState<boolean>(true);

  const { naviguerVersRequeteConsulaire, enAttenteDeReponseApi } = useNavigationRequeteTableauConsulaire();

  const mapResultatCommeLignesTableau = useCallback(
    (resultat: IRequeteTableauConsulaire[]): TLigneTableau[] =>
      resultat.map(requete => ({
        cle: requete.idRequete ?? "",
        numeroDossier: requete.numeroDossier ?? "",
        sousType: requete.sousType ?? "",
        natureActe: requete.natureActe ?? "",
        titulaires: (
          <>
            {(requete.titulaires || []).map((titulaire: any) => (
              <span key={`${titulaire.nom} ${titulaire.prenoms[0] ?? ""}`.trim()}>
                {`${titulaire.nom.toUpperCase()} ${titulaire.prenoms[0] || ""}`.trim()}
                <br />
              </span>
            ))}
          </>
        ),
        requerant: requete?.nomCompletRequerant ?? "",
        dateCreation: requete.dateCreation ?? "",
        dateDerniereAction: requete.dateDerniereAction ?? "",
        statut: requete.statut ?? "",
        onClick: () => naviguerVersRequeteConsulaire(requete)
      })),
    [naviguerVersRequeteConsulaire]
  );

  useEffect(() => {
    const plageActuelle = parseInt(parametresTableau.range.split("-")[VALEUR_MINIMUM] ?? `${VALEUR_MINIMUM}`);
    const nouvellePlage = Math.floor(parametresPagination.pageActuelle / DIVISEUR_POSITION_PAGE);
    if (plageActuelle === nouvellePlage) {
      return;
    }

    setParametresTableau({
      ...parametresTableau,
      range: `${nouvellePlage}-${PAGINATION_PLAGE_MAX}`
    });
  }, [parametresPagination]);

  useEffect(() => {
    setEnRecuperation(true);
    getTableauRequetesConsulaires(parametresTableau.statuts.join(","), parametresTableau.sousType.join(","), parametresTableau)
      .then(res => {
        const requetes: IRequeteTableauConsulaire[] = mappingRequetesTableauConsulaire(res.body.data, false, utilisateurs, services);
        setLignesTableau(mapResultatCommeLignesTableau(requetes));

        const totalLignes = parseInt((res.headers["content-range"] ?? "").split("/")[UN] ?? "");
        setParametresPagination({
          ...parametresPagination,
          totalLignes: totalLignes
        });
      })
      .catch(e => {
        console.error(`Une erreur est survenue lors de l'appel API GET requêtes consulaire ${JSON.stringify(e)}`);
        messageManager.showErrorAndClose("Impossible de récupérer les requêtes consulaires");
      })
      .finally(() => setEnRecuperation(false));
  }, [parametresTableau]);

  return (
    <div className="m-0 mt-4">
      {(enRecuperation || enAttenteDeReponseApi) && <PageChargeur />}
      <Tableau
        enTetes={EN_TETE_MES_REQUETES_CONSULAIRES}
        lignes={lignesTableau ? (getPortionTableau(lignesTableau, parametresPagination.pageActuelle) as any) : undefined}
        messageAucuneLigne="Aucune requête n'a été trouvée."
        parametresTri={{
          cle: parametresTableau.tri,
          sens: parametresTableau.sens,
          onChangeTri: (cle: string, sens: TSensTri) =>
            setParametresTableau({
              ...parametresTableau,
              tri: cle,
              sens: sens,
              range: `0-${PAGINATION_PLAGE_MAX}`
            })
        }}
        parametresPagination={{
          ...parametresPagination,
          lignesParPage: LIGNE_PAR_PAGE,
          onChangePage: (pageSuivante: boolean) =>
            setParametresPagination({
              ...parametresPagination,
              pageActuelle: parametresPagination.pageActuelle + (pageSuivante ? UN : -UN)
            })
        }}
      />
    </div>
  );
};

export default TableauMesRequetesConsulaire;
