import ChampZoneTexte from "../../../../commun/champs/ChampZoneTexte";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocMentions: React.FC = () => (
  <ConteneurAvecBordure>
    <ChampZoneTexte
      name="mentions.mentions"
      libelle="Mention(s)"
      typeRedimensionnement="vertical"
      maxLength={3000}
    />
  </ConteneurAvecBordure>
);
export default BlocMentions;
