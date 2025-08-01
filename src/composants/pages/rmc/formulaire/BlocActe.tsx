import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { getIn, useFormikContext } from "formik";
import { useMemo } from "react";
import useRMCBlocActe from "../../../../hooks/rmc/RMCBlocActeHook";
import ChampCaseACocher from "../../../commun/champs/ChampCaseACocher";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampRecherchePocopas from "../../../commun/champs/ChampRecherchePocopas";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ChampTexteDouble from "../../../commun/champs/ChampTexteDouble";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocActe: React.FC = () => {
  const { values, setFieldValue, initialValues } = useFormikContext<IRMCActeInscriptionForm>();

  const typeRepertoireSelectionne = useMemo(
    () => getIn(values.registreRepertoire.registre, "familleRegistre"),
    [values.registreRepertoire.registre]
  );

  const champsDesactives = useRMCBlocActe(typeRepertoireSelectionne);

  const reinitialiserValeurs = () => {
    setFieldValue("registreRepertoire.registre", structuredClone(initialValues.registreRepertoire.registre));
  };

  return (
    <ConteneurAvecBordure
      titreEnTete="Filtre acte"
      className="mt-8"
      reinitialiserDonneesBloc={reinitialiserValeurs}
    >
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampListeDeroulante
          name="registreRepertoire.registre.familleRegistre"
          libelle="Famille de registre"
          options={[{ cle: "", libelle: "" }, ...TypeFamille.getAllEnumsAsOptions()]}
        />
        <ChampListeDeroulante
          name="registreRepertoire.registre.natureActe"
          libelle="Nature de l'acte"
          options={[{ cle: "", libelle: "" }, ...NatureActe.getAllEnumsAsOptions()]}
          disabled={champsDesactives.includes("natureActe")}
        />
      </div>
      <div className="pt-4">
        <ChampRecherchePocopas
          name={"registreRepertoire.registre.pocopa"}
          libelle={"Type / Poste / Commune / Pays"}
          optionsRecherchePocopa={{
            familleRegistre: typeRepertoireSelectionne,
            seulementPocopaOuvert: false
          }}
          disabled={champsDesactives.includes("pocopa")}
        />
      </div>
      <div className="grid w-full grid-cols-5 gap-8 pt-4">
        <div className="col-span-1">
          <ChampTexte
            name={"registreRepertoire.registre.anneeRegistre"}
            libelle={"Année"}
            disabled={champsDesactives.includes("anneeRegistre")}
            numerique
          />
        </div>
        <div className="col-span-2">
          <ChampTexteDouble
            proprietesPremierChamp={{
              name: "registreRepertoire.registre.registreSupport.supportUn",
              disabled: champsDesactives.includes("supportUn")
            }}
            proprietesSecondChamp={{
              name: "registreRepertoire.registre.registreSupport.supportDeux",
              disabled: champsDesactives.includes("supportDeux")
            }}
            libelle={"Registre (support)"}
          />
        </div>
        <div className="col-span-2">
          <ChampTexteDouble
            proprietesPremierChamp={{
              name: "registreRepertoire.registre.numeroActe.numeroActeOuOrdre",
              disabled: champsDesactives.includes("numeroActeOuOrdre")
            }}
            proprietesSecondChamp={{
              name: "registreRepertoire.registre.numeroActe.numeroBisTer",
              placeholder: "N° Bis",
              disabled: champsDesactives.includes("numeroBisTer")
            }}
            libelle={"N° d'acte"}
          />
        </div>
      </div>
      <ChampCaseACocher
        name="registreRepertoire.registre.numeroActe.etActesSuivants"
        libelle={"Et les actes suivants du registre"}
        className="pt-8"
      />
    </ConteneurAvecBordure>
  );
};

export default BlocActe;
