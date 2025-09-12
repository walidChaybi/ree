import { ISaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { ETypeLienRequerant } from "@model/requete/enum/ETypeLienRequerant";
import { enumVersOptions } from "@util/Utils";
import { useFormikContext } from "formik";
import { useCallback } from "react";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const OPTIONS_LIEN_TITULAIRE = enumVersOptions(ETypeLienRequerant);

const BlocLienTitulaire: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ISaisieRDCForm>();

  const gererChangementLien = useCallback((lien: string) => {
    setFieldValue("lienTitulaire", {
      lien,
      nature: ""
    });
  }, []);

  return (
    <ConteneurAvecBordure titreEnTete="LIEN AVEC LE TITULAIRE">
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampListeDeroulante
          name="lienTitulaire.lien"
          libelle="Lien avec le titulaire"
          options={OPTIONS_LIEN_TITULAIRE}
          optionVideMasquee
          disabled={["TITULAIRE1", "TITULAIRE2"].includes(values.requerant.typeRequerant)}
          apresChangement={gererChangementLien}
        />

        {values.lienTitulaire.lien === "AUTRE" && (
          <ChampTexte
            name="lienTitulaire.nature"
            libelle="Nature du lien"
            estObligatoire
            maxLength={100}
          />
        )}
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocLienTitulaire;
