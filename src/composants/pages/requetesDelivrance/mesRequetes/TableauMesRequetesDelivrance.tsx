import {
  TypeAppelRequete,
  getTableauRequetesDelivrance
} from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import {
  IRequeteTableauDelivrance,
  mappingRequetesTableauDelivrance
} from "@model/requete/IRequeteTableauDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import Label from "@mui/icons-material/Label";
import { CENT, QUATRE, UN, ZERO } from "@util/Utils";
import { useContext, useEffect, useState } from "react";
import PageChargeur from "../../../commun/chargeurs/PageChargeur";
import Tableau, {
  IEnTeteTableau,
  TSensTri
} from "../../../commun/tableau/Tableau";
import "./TableauMesRequetesDelivrance.scss";

interface IParamtresTableau {
  statuts: string[];
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
  numero: string | undefined;
  numeroTeledossier: string | undefined;
  sousType: string;
  provenance: string | undefined;
  natureActe: string | undefined;
  documentLibelle: string | undefined;
  titulaires: JSX.Element;
  dateCreation: string | undefined;
  dateDerniereMaj: string | undefined;
  statut: string | undefined;
  priorite: JSX.Element | undefined;
  actions: string;
};

const LIGNE_PAR_PAGE = 25;

const EN_TETE_MES_REQUETES_DELIVRANCE: IEnTeteTableau[] = [
  {
    cle: "numero",
    libelle: "N°",
    triable: true
  },
  {
    cle: "numeroTeledossier",
    libelle: "N° télédossier"
  },
  {
    cle: "sousType",
    libelle: "Sous-type"
  },
  {
    cle: "provenance",
    libelle: "Provenance"
  },
  {
    cle: "natureActe",
    libelle: "Nature acte"
  },
  {
    cle: "documentLibelle",
    libelle: "Document"
  },
  {
    cle: "titulaires",
    libelle: "Titulaire(s)"
  },
  {
    cle: "dateCreation",
    libelle: "Date requête",
    triable: true
  },
  {
    cle: "dateDerniereMaj",
    libelle: "Date dernière action",
    triable: true
  },
  {
    cle: "statut",
    libelle: "Statut",
    triable: true
  },
  {
    cle: "priorite",
    libelle: "Priorité",
    triable: true
  },
  {
    cle: "actions",
    libelle: "Actions"
  }
];

const mapResultatCommeLignesTableau = (
  resultat: IRequeteTableauDelivrance[]
): TLigneTableau[] =>
  resultat.map(requete => ({
    cle: requete.idRequete,
    numero: requete.numero,
    numeroTeledossier: requete.numeroTeledossier,
    sousType: requete.sousType,
    provenance: requete.provenance,
    natureActe: requete.nature,
    documentLibelle: requete.documentLibelle,
    titulaires: (
      <>
        {(requete.titulaires || []).map((titulaire: any) => (
          <span key={`${titulaire.nom} ${titulaire.prenoms[0] ?? ""}`.trim()}>
            {`${titulaire.nom.toUpperCase()} ${
              titulaire.prenoms[0] || ""
            }`.trim()}
            <br />
          </span>
        ))}
      </>
    ),
    dateCreation: requete.dateCreation,
    dateDerniereMaj: requete.dateDerniereMaj,
    statut: requete.statut,
    priorite: (
      <Label
        className={`priorite-${requete.priorite?.toLowerCase()}`}
        fontSize="small"
      />
    ),
    actions: ""
  }));

const getPortionTableau = (tableau: TLigneTableau[], pageActuelle: number) => {
  const indexPageActuelle = Math.floor(pageActuelle / QUATRE);

  return tableau.slice(
    indexPageActuelle * LIGNE_PAR_PAGE,
    indexPageActuelle * LIGNE_PAR_PAGE + LIGNE_PAR_PAGE
  );
};

const TableauMesRequetesDelivrance: React.FC = () => {
  const { utilisateurs, services } = useContext(RECEContextData);
  const [parametresTableau, setParametresTableau] = useState<IParamtresTableau>(
    {
      statuts: [
        StatutRequete.BROUILLON.nom,
        StatutRequete.PRISE_EN_CHARGE.nom,
        StatutRequete.TRANSFEREE.nom,
        StatutRequete.A_SIGNER.nom,
        StatutRequete.A_VALIDER.nom,
        StatutRequete.TRAITE_REPONDU.nom,
        StatutRequete.A_REVOIR.nom,
        StatutRequete.TRANSMISE_A_VALIDEUR.nom
      ],
      tri: "dateStatut",
      sens: "ASC",
      range: `0-${CENT}`
    }
  );
  const [lignesTableau, setLignesTableau] = useState<TLigneTableau[]>();
  const [parametresPagination, setParametresPagination] =
    useState<IParametresPagination>({
      pageActuelle: ZERO,
      totalLignes: ZERO
    });

  useEffect(() => {
    const plageActuelle = parseInt(
      parametresTableau.range.split("-")[ZERO] ?? `${ZERO}`
    );
    const nouvellePlage = Math.floor(
      parametresPagination.pageActuelle / QUATRE
    );
    if (plageActuelle === nouvellePlage) {
      return;
    }

    setParametresTableau({
      ...parametresTableau,
      range: `${nouvellePlage}-${CENT}`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parametresPagination]);

  // Remplacer avec useFetch
  const [enRecuperation, setEnRecuperation] = useState<boolean>(true);
  useEffect(() => {
    setEnRecuperation(true);
    getTableauRequetesDelivrance(
      TypeAppelRequete.MES_REQUETES_DELIVRANCE,
      parametresTableau.statuts.join(","),
      parametresTableau
    )
      .then(res => {
        const requetes: IRequeteTableauDelivrance[] =
          mappingRequetesTableauDelivrance(
            res.body.data,
            false,
            utilisateurs,
            services
          );
        setLignesTableau(mapResultatCommeLignesTableau(requetes));

        const totalLignes = parseInt(
          (res.headers["content-range"] ?? "").split("/")[UN] ?? ""
        );
        setParametresPagination({
          ...parametresPagination,
          totalLignes: totalLignes
        });
      })
      .finally(() => setEnRecuperation(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parametresTableau]);
  // FIN remplacer avec useFetch

  return (
    <div className="tableau-mes-requetes-delivrance">
      {enRecuperation && <PageChargeur />}
      <Tableau
        enTetes={EN_TETE_MES_REQUETES_DELIVRANCE}
        lignes={
          lignesTableau
            ? getPortionTableau(
                lignesTableau,
                parametresPagination.pageActuelle
              )
            : undefined
        }
        messageAucuneLigne="Aucune requête n'a été trouvée."
        parametresTri={{
          cle: parametresTableau.tri,
          sens: parametresTableau.sens,
          onChangeTri: (cle: string, sens: TSensTri) =>
            setParametresTableau({
              ...parametresTableau,
              tri: cle,
              sens: sens,
              range: `0-${CENT}`
            })
        }}
        parametresPagination={{
          ...parametresPagination,
          lignesParPage: LIGNE_PAR_PAGE,
          onChangePage: (pageSuivante: boolean) =>
            setParametresPagination({
              ...parametresPagination,
              pageActuelle:
                parametresPagination.pageActuelle + (pageSuivante ? UN : -UN)
            })
        }}
      />
    </div>
  );
};

export default TableauMesRequetesDelivrance;
