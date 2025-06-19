import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { GestionMentions } from "@pages/requeteCreation/commun/composants/GestionMentions";
import React, { useContext, useState } from "react";
import { SaisieProjetActeTranscritContext } from "../../../../contexts/SaisieProjetActeTranscritContextProvider";
import OngletsBouton from "../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../../requetesDelivrance/editionRequete/ConteneurVoletEdition";
import FormulaireSaisieProjet from "./formulaireSaisieProjet/FormulaireSaisieProjet";

enum ECleOngletPartieDroite {
  PROJET = "projet",
  MENTIONS = "mentions",
  ECHANGE = "echange"
}

const PartieDroiteSaisieProjet: React.FC = () => {
  const { requete } = useContext(SaisieProjetActeTranscritContext);
  const [ongletActifPartieDroite, setOngletActifPartieDroite] = useState<ECleOngletPartieDroite>(ECleOngletPartieDroite.PROJET);

  return (
    <div className="relative w-1/2">
      <p className="absolute -top-10 right-0 mb-0.5 mt-1.5 pr-2.5 text-end text-sm text-bleu-sombre">
        Les champs obligatoires sont précédés d'une étoile<span className="ml-1 text-rouge">*</span>
      </p>
      <OngletsBouton<ECleOngletPartieDroite>
        onglets={[
          {
            cle: ECleOngletPartieDroite.PROJET,
            libelle: "Saisir le projet"
          }
        ]}
        cleOngletActif={ongletActifPartieDroite}
        changerOnglet={valeur => setOngletActifPartieDroite(valeur)}
      />

      {requete && (
        <ConteneurVoletEdition
          estActif={ongletActifPartieDroite === ECleOngletPartieDroite.PROJET}
          estScrollable
        >
          <div className="mr-2">
            <FormulaireSaisieProjet />
          </div>
        </ConteneurVoletEdition>
      )}

      <ConteneurVoletEdition
        estActif={ongletActifPartieDroite === ECleOngletPartieDroite.MENTIONS}
        estScrollable
      >
        <GestionMentions />
      </ConteneurVoletEdition>

      {requete && (
        <ConteneurVoletEdition estActif={ongletActifPartieDroite === ECleOngletPartieDroite.ECHANGE}>
          <Echanges />
        </ConteneurVoletEdition>
      )}
    </div>
  );
};

export default PartieDroiteSaisieProjet;
/* v8 ignore end */
