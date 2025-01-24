import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { TitulaireRequeteConsulaire } from "@model/requete/ITitulaireRequeteConsulaire";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { GestionMentions } from "@pages/requeteCreation/commun/composants/GestionMentions";
import React, { useState } from "react";
import OngletsBouton from "../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../../requetesDelivrance/editionRequete/ConteneurVoletEdition";
import FormulaireSaisirProjet from "./formulaireSaisirProjet/FormulaireSaisirProjet";

export enum ECleOngletPartieDroite {
  PROJET = "projet",
  MENTIONS = "mentions",
  ECHANGE = "echange"
}
interface IPartieDroiteSaisieProjetProps {
  requete: IRequeteCreationTranscription;
}

const PartieDroiteSaisieProjet: React.FC<IPartieDroiteSaisieProjetProps> = ({ requete }) => {
  const [ongletActifPartieDroite, setOngletActifPartieDroite] = useState<ECleOngletPartieDroite>(ECleOngletPartieDroite.PROJET);

  return (
    <div className="w-1/2">
      <OngletsBouton<ECleOngletPartieDroite>
        onglets={[
          {
            cle: ECleOngletPartieDroite.PROJET,
            libelle: "Saisir le projet"
          },
          {
            cle: ECleOngletPartieDroite.MENTIONS,
            libelle: "Gérer les mentions"
          },

          {
            cle: ECleOngletPartieDroite.ECHANGE,
            libelle: "Echanges"
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
          <div className="m-4">
            <FormulaireSaisirProjet titulaire={TitulaireRequeteConsulaire.getTitulaireTranscription(requete.titulaires)} />
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
