import { useContext } from "react";
import { useNavigate } from "react-router";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../contexts/EditionMiseAJourContextProvider";
import LiensRECE from "../../../router/LiensRECE";
import { INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION } from "../../../router/infoPages/InfoPagesEspaceRecherche";
import Bouton from "../../commun/bouton/Bouton";
import { ConteneurBoutonBasDePage } from "../../commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import OngletActe from "./onglets/OngletActe";
import OngletActeMisAJour from "./onglets/OngletActeMisAJour";

const PartieActe: React.FC = () => {
  const navigate = useNavigate();
  const { ongletsActifs, miseAJourEffectuee, estActeSigne } = useContext(EditionMiseAJourContext.Valeurs);
  const { changerOnglet } = useContext(EditionMiseAJourContext.Actions);

  return (
    <div className={estActeSigne ? "mx-auto w-full max-w-[90rem]" : "w-1/2"}>
      <OngletsBouton
        onglets={[
          {
            cle: ECleOngletsMiseAJour.ACTE,
            libelle: "Acte registre"
          },
          ...(!estActeSigne
            ? [
                {
                  cle: ECleOngletsMiseAJour.ACTE_MIS_A_JOUR,
                  libelle: "Acte mis à jour",
                  inactif: !miseAJourEffectuee
                }
              ]
            : [])
        ]}
        cleOngletActif={ongletsActifs.actes}
        changerOnglet={(valeur: string) => changerOnglet(valeur as ECleOngletsMiseAJour, null)}
      />

      <OngletActe estActif={ongletsActifs.actes === ECleOngletsMiseAJour.ACTE} />

      {!estActeSigne && <OngletActeMisAJour estActif={ongletsActifs.actes === ECleOngletsMiseAJour.ACTE_MIS_A_JOUR} />}

      <ConteneurBoutonBasDePage
        position="gauche"
        afficherDegrade
      >
        <Bouton
          title={estActeSigne ? "Retour rechercher un acte" : "Abandonner"}
          type="button"
          onClick={() => navigate(LiensRECE.genererLien(INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION.url), { replace: true })}
        >
          {estActeSigne ? "Retour rechercher un acte" : "Abandonner"}
        </Bouton>
      </ConteneurBoutonBasDePage>
    </div>
  );
};

export default PartieActe;
