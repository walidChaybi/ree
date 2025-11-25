import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ITableauRMC } from "@model/rmc/ITableauRMC";
import { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { TitulaireRequeteAssociee } from "@model/rmc/requete/TitulaireRequeteAssociee";
import { PopinNouvelleRMCRequete } from "@views/pages/rechercheMultiCriteres/autoRequetes/contenu/PopinNouvelleRMCRequete";
import { ApercuRequeteEtablissementSimplePage } from "@views/pages/requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage";
import { ApercuReqCreationTranscriptionSimplePage } from "@views/pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage";
import { ApercuRequetePage } from "@views/pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuReqInfoPage } from "@views/pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import {
  NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES,
  NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRMCAutoRequetesAssociees } from "../../../hooks/rmc/requetesAssociees/RMCAutoRequetesAssocieesHook";
import { useRMCRequetesAssociees } from "../../../hooks/rmc/requetesAssociees/RMCRequetesAssocieesHook";
import { useTableauRMCRequetesAssociees } from "../../../hooks/rmc/requetesAssociees/TableauRMCRequetesAssocieesHook";
import BoutonIcon from "../../commun/bouton/BoutonIcon";
import ComposantChargeur from "../../commun/chargeurs/ComposantChargeur";
import ConteneurAccordeon from "../../commun/conteneurs/accordeon/ConteneurAccordeon";
import FenetreExterne from "../../commun/conteneurs/FenetreExterne";
import Tableau, { IEnTeteTableau } from "../../commun/tableau/Tableau";

const DIMENSIONS_FENETRE_EXTERNE_REQUETES_ASSOCIEES = {
  largeur: 1100,
  hauteur: 600
};

const EN_TETE_RMC_REQUETES_ASSOCIEES: IEnTeteTableau[] = [
  {
    cle: "titulaires",
    libelle: "Titulaire(s)"
  },
  { cle: "libelleSousTypeCourt", libelle: "Sous-Type" },
  {
    cle: "dateCreation",
    libelle: "Date création"
  },
  {
    cle: "statut",
    libelle: "Statut"
  }
];

interface ITableauRMCRequetesAssocieesProps {
  titulairesRequete?: ITitulaireRequete[];
}

const RenderApercuRequeteSelectionnee = (requeteAssociee: TRequeteAssociee) => {
  switch (requeteAssociee.type) {
    case "DELIVRANCE":
      return <ApercuRequetePage idRequeteAAfficher={requeteAssociee.id} />;
    case "CREATION":
      return RenderApercuRequeteEtablissementOuTranscription(requeteAssociee);
    case "INFORMATION":
      return <ApercuReqInfoPage idRequeteAAfficher={requeteAssociee.id} />;
    default:
      return <></>;
  }
};

const RenderApercuRequeteEtablissementOuTranscription = (requeteAssociee: TRequeteAssociee) => {
  switch (requeteAssociee.sousType) {
    case ESousTypeCreation.RCEXR:
      return <ApercuRequeteEtablissementSimplePage idRequeteAAfficher={requeteAssociee.id} />;
    case ESousTypeCreation.RCTD:
    case ESousTypeCreation.RCTC:
      return <ApercuReqCreationTranscriptionSimplePage idRequeteAAfficher={requeteAssociee.id} />;
    default:
      return <></>;
  }
};

const RenderCelluleTitulaires = (titulaires: TitulaireRequeteAssociee[]) => {
  return (
    <>
      {(titulaires || []).map((titulaire: TitulaireRequeteAssociee) => (
        <span key={`${titulaire.nom} ${titulaire.prenom ?? ""}`.trim()}>
          {`${titulaire.nom.toUpperCase()} ${titulaire.prenom ?? ""}`.trim()}
          <br />
        </span>
      ))}
    </>
  );
};

const TableauRMCRequetesAssociees = ({ titulairesRequete }: ITableauRMCRequetesAssocieesProps) => {
  const [tableauRMC, setTableauRMC] = useState<ITableauRMC | null>(null);
  const {
    requeteSelectionnee,
    parametresRecherche,
    setParametresRecherche,
    mapRequetesAssocieesCommeLignesTableau,
    onFermetureFenetreExterne
  } = useTableauRMCRequetesAssociees();
  const { enAttenteDeReponseApiRmcAutoRequete } = useRMCAutoRequetesAssociees({
    titulairesRequete,
    setTableauRMC
  });
  const {
    enAttenteDeReponseApiRmcRequete,
    estPopinOuverte,
    setValeursRMCRequete,
    setCriteresRechercheRequete,
    gererClicNouvelleRMC,
    onFermeturePopin
  } = useRMCRequetesAssociees(setTableauRMC);

  const estTableauRMCDisponible = !(enAttenteDeReponseApiRmcAutoRequete || enAttenteDeReponseApiRmcRequete) && tableauRMC;

  return (
    <ConteneurAccordeon
      titre={"Autres requêtes associées au titulaire"}
      ouvertParDefaut={true}
    >
      {estTableauRMCDisponible ? (
        <>
          <Tableau
            enTetes={EN_TETE_RMC_REQUETES_ASSOCIEES}
            parametresRecherche={parametresRecherche}
            setParametresRecherche={setParametresRecherche}
            lignes={mapRequetesAssocieesCommeLignesTableau(tableauRMC.requetesAssociees, RenderCelluleTitulaires)}
            nombreTotalLignes={tableauRMC.nombreTotalLignes}
            nombreLignesParPage={NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES}
            nombreElementsParPlage={NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}
            messageAucuneLigne={"Aucune requête n'a été trouvée."}
          />
          <BoutonIcon
            className="mt-[-3rem] h-8 px-8"
            onClick={gererClicNouvelleRMC}
            aria-label={"Nouvelle recherche multi critères"}
          >
            <FaSearch />
          </BoutonIcon>
          <PopinNouvelleRMCRequete
            open={estPopinOuverte}
            onClose={onFermeturePopin}
            setValuesRMCRequete={setValeursRMCRequete}
            setCriteresRechercheRequete={setCriteresRechercheRequete}
          />
          {requeteSelectionnee && (
            <FenetreExterne
              titre={`Détails requête : N°${requeteSelectionnee.numero}`}
              apresFermeture={onFermetureFenetreExterne}
              hauteur={DIMENSIONS_FENETRE_EXTERNE_REQUETES_ASSOCIEES.hauteur}
              largeur={DIMENSIONS_FENETRE_EXTERNE_REQUETES_ASSOCIEES.largeur}
            >
              {RenderApercuRequeteSelectionnee(requeteSelectionnee)}
            </FenetreExterne>
          )}
        </>
      ) : (
        <ComposantChargeur />
      )}
    </ConteneurAccordeon>
  );
};

export default TableauRMCRequetesAssociees;
