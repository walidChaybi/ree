import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../contexts/EditionMiseAJourContextProvider";
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
    <div className={estActeSigne ? "w-full" : "w-1/2"}>
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
          onClick={() => navigate(URL_RECHERCHE_ACTE_INSCRIPTION, { replace: true })}
        >
          {estActeSigne ? "Retour rechercher un acte" : "Abandonner"}
        </Bouton>
      </ConteneurBoutonBasDePage>
    </div>
  );
};

export default PartieActe;
