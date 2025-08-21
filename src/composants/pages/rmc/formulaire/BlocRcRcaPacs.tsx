import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { enumVersOptions } from "@util/Utils";
import { useFormikContext } from "formik";
import { useContext, useEffect, useMemo } from "react";
import { EBlocsRMC, RMCContext } from "../../../../contexts/RMCContextProvider";
import ChampCaseACocher from "../../../commun/champs/ChampCaseACocher";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampRcRcaPacs from "../../../commun/champs/ChampRcRcaPacs";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocRcRcaPacs: React.FC = () => {
  const { values, setValues, setFieldValue } = useFormikContext<IRMCActeInscriptionForm>();
  const { blocsRenseignes } = useContext(RMCContext);
  const {
    etInscriptionsSuivantes,
    typeRepertoire,
    numeroInscription: { annee, numero }
  } = values.registreRepertoire.repertoire;
  const estNumeroInscriptionIncomplet = !annee || !numero;

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

  const blocActeAlimente = blocsRenseignes?.includes(EBlocsRMC.ACTE);

  const reinitialiserValeurs = () => {
    setValues({
      ...values,
      registreRepertoire: {
        ...values.registreRepertoire,
        repertoire: {
          numeroInscription: { annee: "", numero: "" },
          typeRepertoire: "",
          natureInscription: "",
          etInscriptionsSuivantes: false
        }
      }
    });
  };

  useEffect(() => {
    if (estNumeroInscriptionIncomplet && etInscriptionsSuivantes) {
      setFieldValue("registreRepertoire.repertoire.etInscriptionsSuivantes", false);
    }
  }, [estNumeroInscriptionIncomplet]);

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
          disabled={blocActeAlimente}
        />
        <ChampRcRcaPacs
          name="registreRepertoire.repertoire.numeroInscription"
          libelle="N° de l'inscription / N° du PACS"
          disabled={blocActeAlimente}
        />
      </div>
      <div className="pt-4">
        <ChampListeDeroulante
          name="registreRepertoire.repertoire.natureInscription"
          libelle="Nature de l'inscription"
          options={[{ cle: "", libelle: "" }, ...listeNatureInscription]}
          disabled={!["RC", "RCA"].includes(typeRepertoire) || blocActeAlimente}
        />
      </div>

      <div className="pt-4">
        <ChampCaseACocher
          name="registreRepertoire.repertoire.etInscriptionsSuivantes"
          libelle="Et les inscriptions/PACS suivants du répertoire"
          disabled={estNumeroInscriptionIncomplet}
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocRcRcaPacs;
