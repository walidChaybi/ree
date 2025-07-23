import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { enumVersOptions } from "@util/Utils";
import { getIn, useFormikContext } from "formik";
import { useMemo } from "react";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampRcRcaPacs from "../../../commun/champs/ChampNumeroRcRcaPacs";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocRepertoire: React.FC = () => {
  const { values, setValues } = useFormikContext<IRMCActeInscriptionForm>();

  const typeRepertoire = useMemo(() => getIn(values, "registreRepertoire.repertoire.typeRepertoire"), [values]);

  const listeNatureInscription = useMemo(() => {
    switch (typeRepertoire) {
      case "RC":
        return NatureRc.versOptions();
      case "RCA":
        return NatureRca.versOptions();
      default:
        return [];
    }
  }, [typeRepertoire]);

  const reinitialiserValeurs = () => {
    setValues({
      ...values,
      registreRepertoire: {
        ...values.registreRepertoire,
        repertoire: {
          numeroInscription: { anneeInscription: "", numero: "" },
          typeRepertoire: "",
          natureInscription: ""
        }
      }
    });
  };

  return (
    <ConteneurAvecBordure
      titreEnTete="Filtre RC/RCA/PACS"
      className="mt-8"
      reinitialiserDonneesBloc={reinitialiserValeurs}
    >
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampListeDeroulante
          name="registreRepertoire.repertoire.typeRepertoire"
          libelle="Type de répertoire"
          options={[{ cle: "", libelle: "" }, ...enumVersOptions(ETypePacsRcRca)]}
        />
        <ChampRcRcaPacs
          name="registreRepertoire.repertoire.numeroInscription"
          libelle="N° de l'inscription / N° du PACS"
        />
      </div>
      <div className="pt-4">
        <ChampListeDeroulante
          name="registreRepertoire.repertoire.natureInscription"
          libelle="Nature de l'inscription"
          options={[{ cle: "", libelle: "" }, ...listeNatureInscription]}
          disabled={!["RC", "RCA"].includes(typeRepertoire)}
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocRepertoire;
