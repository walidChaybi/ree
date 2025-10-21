import { Droit } from "@model/agent/enum/Droit";
import { IRequete } from "@model/requete/IRequete";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { useContext, useState } from "react";
import { SaisieProjetActeTranscritContext } from "../../../../contexts/SaisieProjetActeTranscritContextProvider";
import AccessibleAvecDroits from "../../../commun/accessibleAvecDroits/AccessibleAvecDroits";
import OngletsBouton from "../../../commun/onglets/OngletsBouton";
import HistoriqueActionsRequete from "../../../commun/suivi/HistoriqueActionsRequete";
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

  const [ongletActif, setOngletActif] = useState<ECleOngletPartieGauche>(ECleOngletPartieGauche.APERCU_PROJET);

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

        <HistoriqueActionsRequete actions={requete.actions} />

        <AccessibleAvecDroits auMoinsUnDesDroits={[Droit.CONSULTER]}>
          <div className="mb-4 mr-4 mt-4">
            {!estModeConsultation && (
              <div className="mt-2">
                <RMCRequetesAssocieesResultats requete={requete as IRequete} />
              </div>
            )}
          </div>
        </AccessibleAvecDroits>
      </ConteneurVoletEdition>

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletPartieGauche.APERCU_PROJET}
        sansMargeHaute
      >
        <ApercuProjetActe />
      </ConteneurVoletEdition>
    </div>
  );
};

export default PartieGaucheSaisieProjet;
