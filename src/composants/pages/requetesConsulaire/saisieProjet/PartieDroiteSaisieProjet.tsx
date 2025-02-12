import { ParentsRequeteConsulaire } from "@model/requete/IParentsRequeteConsulaire";
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

      <p className="mb-0.5 mt-1.5 pr-2.5 text-end text-sm text-bleu-sombre">
        Les champs obligatoires sont précédés d'une étoile<span className="ml-1 text-rouge">*</span>
      </p>

      {requete && (
        <ConteneurVoletEdition
          estActif={ongletActifPartieDroite === ECleOngletPartieDroite.PROJET}
          estScrollable
        >
          <div className="mr-2">
            <FormulaireSaisirProjet
              titulaire={TitulaireRequeteConsulaire.getTitulaireTranscription(requete.titulaires)}
              parents={ParentsRequeteConsulaire.getParentsDepuisTitulaires(requete.titulaires)}
            />
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
