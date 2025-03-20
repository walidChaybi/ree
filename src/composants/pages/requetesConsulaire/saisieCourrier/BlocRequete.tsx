/* v8 ignore start A TESTER 03/25 */
import { NatureActeTranscrit } from "@model/requete/enum/NatureActeTranscrit";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { useMemo } from "react";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampRecherchePocopas from "../../../commun/champs/ChampRecherchePocopas";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocRequete: React.FC = () => {
  const optionsChamps = useMemo(
    () => ({
      natureActe: [{ cle: "", libelle: "" }, ...NatureActeTranscrit.getAllEnumsAsOptions()],
      lienRequerant: [{ cle: "", libelle: "" }, ...TypeLienRequerantCreation.getAllEnumsAsOptions()]
    }),
    []
  );

  return (
    <ConteneurAvecBordure titreEnTete="REQUÊTE">
      <ChampListeDeroulante
        name="requete.natureActe"
        libelle="Acte à transcrire"
        options={optionsChamps.natureActe}
        estObligatoire
        optionVideMasquee
      />
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampListeDeroulante
          name="requete.lienRequerant"
          libelle="Requérant"
          options={optionsChamps.lienRequerant}
          estObligatoire
          optionVideMasquee
        />
        <ChampRecherchePocopas
          name="requete.registre"
          libelle="Registre"
          optionsRecherchePocopa={{ nombreResultatsMax: 15, familleRegistre: "CSL" }}
          estObligatoire
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocRequete;
/* v8 ignore end */
