import ChampsZoneTexte from "../../../../commun/champs/ChampsZoneTexte";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocMentions: React.FC = () => (
  <ConteneurAvecBordure>
    <div className="-pr-4 grid w-full">
      <ChampsZoneTexte
        name="mentions.mentions"
        libelle="Mention(s)"
        typeRedimensionnement="vertical"
        maxLength={3000}
      />
    </div>
  </ConteneurAvecBordure>
);
export default BlocMentions;
