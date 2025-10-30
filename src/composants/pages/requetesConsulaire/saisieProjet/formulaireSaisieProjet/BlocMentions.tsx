import ChampZoneTexte from "../../../../commun/champs/ChampZoneTexte";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocMentions: React.FC = () => (
  <ConteneurAvecBordure className="py-6">
    <ChampZoneTexte
      name="mentions.mentions"
      libelle="Mention(s)"
      typeRedimensionnement="vertical"
    />
  </ConteneurAvecBordure>
);
export default BlocMentions;
