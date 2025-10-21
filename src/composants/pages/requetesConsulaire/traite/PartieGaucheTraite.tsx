import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { useState } from "react";
import OngletsBouton from "../../../commun/onglets/OngletsBouton";
import HistoriqueActionsRequete from "../../../commun/suivi/HistoriqueActionsRequete";
import ConteneurVoletEdition from "../../requetesDelivrance/editionRequete/ConteneurVoletEdition";
import ResumeDetailsRequete from "../commun/ResumeDetailsRequete";

enum ECleOngletPartieGauche {
  DESCRIPTION = "description"
}

interface IPartieGaucheTraiteProps {
  requete: IRequeteCreationTranscription;
}

const PartieGaucheTraite: React.FC<IPartieGaucheTraiteProps> = ({ requete }) => {
  const [ongletActif, setOngletActif] = useState<ECleOngletPartieGauche>(ECleOngletPartieGauche.DESCRIPTION);

  return (
    <div className="flex w-1/2 flex-col">
      <OngletsBouton<ECleOngletPartieGauche>
        onglets={[
          {
            cle: ECleOngletPartieGauche.DESCRIPTION,
            libelle: "Description"
          }
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={valeur => setOngletActif(valeur)}
      />

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletPartieGauche.DESCRIPTION}
        estScrollable
      >
        <ResumeDetailsRequete requete={requete} />
        <HistoriqueActionsRequete actions={requete.actions} />
      </ConteneurVoletEdition>
    </div>
  );
};

export default PartieGaucheTraite;
