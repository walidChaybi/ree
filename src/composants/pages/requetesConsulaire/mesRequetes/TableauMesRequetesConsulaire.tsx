import { CONFIG_GET_REQUETES_CONSULAIRES } from "@api/configurations/requete/consulaire/GetRequetesConsulaires";
import { IRequeteTableauConsulaire, mappingRequetesTableauConsulaire } from "@model/requete/IRequeteTableauConsulaire";
import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { useCallback, useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import useNavigationRequeteTableauConsulaire from "../../../../hooks/requeteConsulaire/NavigationRequeteTableauConsulaireHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import TableauUtils from "../../../../utils/TableauUtils";
import ComposantChargeur from "../../../commun/chargeurs/ComposantChargeur";
import Tableau, { IEnTeteTableau, IParametresRecherche, TLigneTableau } from "../../../commun/tableau/Tableau";

const LIGNES_PAR_PAGE = 25;
const ELEMENTS_PAR_PLAGE = 100;

const STATUTS_REQUETES_A_AFFICHER: (keyof typeof EStatutRequete)[] = ["A_TRAITER", "PRISE_EN_CHARGE", "EN_TRAITEMENT", "A_SIGNER"];
const SOUS_TYPES_REQUETES_A_AFFICHER: (keyof typeof ESousTypeCreation)[] = ["RCTC", "RCTD", "RCADC"];

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

const TableauMesRequetesConsulaire: React.FC = () => {
  const { utilisateurs, services } = useContext(RECEContextData);

  const [parametresRecherche, setParametresRecherche] = useState<IParametresRecherche>({
    tri: "statutEtDateCreation",
    sens: "ASC",
    range: `0-${ELEMENTS_PAR_PLAGE}`
  });
  const [lignesTableau, setLignesTableau] = useState<TLigneTableau[] | null>(null);
  const [nombreTotalLignes, setNombreTotalLignes] = useState<number>(0);

  const { naviguerVersRequeteConsulaire, enAttenteDeReponseApi: navigationEnCours } = useNavigationRequeteTableauConsulaire();

  const mapResultatCommeLignesTableau = useCallback(
    (resultat: IRequeteTableauConsulaire[]): TLigneTableau[] =>
      resultat.map(requete => ({
        cle: requete.idRequete ?? "",
        donnees: {
          numeroDossier: requete.numeroDossier ?? "",
          sousType: requete.sousType ?? "",
          natureActe: requete.natureActe ?? "",
          titulaires: (
            <>
              {(requete.titulaires || []).map((titulaire: any) => (
                <span key={`${titulaire.nom} ${titulaire.prenoms[0] ?? ""}`.trim()}>
                  {`${titulaire.nom.toUpperCase()} ${titulaire.prenoms[0] ?? ""}`.trim()}
                  <br />
                </span>
              ))}
            </>
          ),
          requerant: requete?.nomCompletRequerant ?? "",
          dateCreation: requete.dateCreation ?? "",
          dateDerniereAction: requete.dateDerniereAction ?? "",
          statut: requete.statut ?? ""
        },
        onClick: () => naviguerVersRequeteConsulaire(requete)
      })),
    [naviguerVersRequeteConsulaire]
  );

  const { appelApi: getRequetesConsulaires, enAttenteDeReponseApi: recuperationRequetesEnCours } =
    useFetchApi(CONFIG_GET_REQUETES_CONSULAIRES);

  useEffect(() => {
    if (!parametresRecherche.range) return;

    getRequetesConsulaires({
      parametres: {
        query: {
          range: parametresRecherche.range,
          sens: parametresRecherche.sens,
          tri: parametresRecherche.tri,
          sousTypes: SOUS_TYPES_REQUETES_A_AFFICHER.join(","),
          statuts: STATUTS_REQUETES_A_AFFICHER.join(",")
        }
      },
      apresSucces: (requetes, headers) => {
        const requetesTableau: IRequeteTableauConsulaire[] = mappingRequetesTableauConsulaire(requetes, false, utilisateurs, services);
        setLignesTableau(mapResultatCommeLignesTableau(requetesTableau));

        setNombreTotalLignes(TableauUtils.recupererNombreTotalLignesDepuisHeaders(headers));
      },
      apresErreur: erreurs => {
        AfficherMessage.erreur("Impossible de récupérer les requêtes consulaires", { erreurs });
      }
    });
  }, [parametresRecherche]);

  return (
    <div className="m-0 mt-4">
      <Tableau
        enTetes={EN_TETE_MES_REQUETES_CONSULAIRES}
        lignes={lignesTableau}
        messageAucuneLigne="Aucune requête n'a été trouvée."
        nombreLignesParPage={LIGNES_PAR_PAGE}
        nombreElementsParPlage={ELEMENTS_PAR_PLAGE}
        nombreTotalLignes={nombreTotalLignes}
        parametresRecherche={parametresRecherche}
        setParametresRecherche={setParametresRecherche}
      />
      {(recuperationRequetesEnCours || navigationEnCours) && <ComposantChargeur />}
    </div>
  );
};

export default TableauMesRequetesConsulaire;
