import { RECEContextData } from "@core/contexts/RECEContext";
import { appartientAUtilisateurConnecte } from "@model/agent/IOfficier";
import { IRequete } from "@model/requete/IRequete";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import Edit from "@mui/icons-material/Edit";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID } from "@router/ReceUrls";
import { useContext, useMemo, useState } from "react";
import { SaisieProjetActeTranscritContext } from "../../../../contexts/SaisieProjetActeTranscritContextProvider";
import Bouton from "../../../commun/bouton/Bouton";
import OngletsBouton from "../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../../requetesDelivrance/editionRequete/ConteneurVoletEdition";
import ResumeDetailsRequete from "../commun/ResumeDetailsRequete";
import ApercuProjetActe from "./apercuProjet/ApercuProjetActe";

enum ECleOngletPartieGauche {
  DESCRIPTION = "description",
  APERCU_PROJET = "apercu_projet"
}

interface IPartieGaucheSaisieProjetProps {
  estModeConsultation: boolean;
}

const PartieGaucheSaisieProjet: React.FC<IPartieGaucheSaisieProjetProps> = ({ estModeConsultation }) => {
  const { requete } = useContext(SaisieProjetActeTranscritContext);

  const { utilisateurConnecte } = useContext(RECEContextData);
  const [ongletActif, setOngletActif] = useState<ECleOngletPartieGauche>(ECleOngletPartieGauche.DESCRIPTION);

  const afficherBoutonModifierRequete = useMemo(
    () => SousTypeCreation.estRCTC(requete?.sousType) && appartientAUtilisateurConnecte(utilisateurConnecte, requete?.idUtilisateur),
    [requete, utilisateurConnecte]
  );

  return (
    <div className="flex w-1/2 flex-col">
      <OngletsBouton<ECleOngletPartieGauche>
        onglets={[
          {
            cle: ECleOngletPartieGauche.DESCRIPTION,
            libelle: "Description de la requête"
          },
          {
            cle: ECleOngletPartieGauche.APERCU_PROJET,
            libelle: "Aperçu du projet"
          }
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={setOngletActif}
      />

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletPartieGauche.DESCRIPTION}
        estScrollable
      >
        <ResumeDetailsRequete requete={requete} />

        <div className="mb-4 mr-4 mt-4">
          {!estModeConsultation && (
            <div className="mt-2">
              <RMCRequetesAssocieesResultats requete={requete as IRequete} />
            </div>
          )}
        </div>
      </ConteneurVoletEdition>

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletPartieGauche.APERCU_PROJET}
        sansMargeHaute
      >
        <ApercuProjetActe />
      </ConteneurVoletEdition>

      {afficherBoutonModifierRequete && (
        <Bouton
          title="Modifier la requête"
          className="mt-5 flex w-fit"
          lienVers={`${URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID.replace(":idRequete", requete.id)}`}
        >
          <Edit className="mr-2" /> {"MODIFIER LA REQUÊTE"}
        </Bouton>
      )}
    </div>
  );
};

export default PartieGaucheSaisieProjet;
