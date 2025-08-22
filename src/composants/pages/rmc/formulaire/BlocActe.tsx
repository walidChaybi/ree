import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { EFamilleRegistre } from "@model/etatcivil/enum/TypeFamille";
import { ETypeReference, IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { enumVersOptions } from "@util/Utils";
import { getIn, useFormikContext } from "formik";
import { useCallback, useContext, useMemo } from "react";
import { EBlocsRMC, RMCContext } from "../../../../contexts/RMCContextProvider";
import useRMCBlocActe from "../../../../hooks/rmc/RMCBlocActeHook";
import ChampCaseACocher from "../../../commun/champs/ChampCaseACocher";
import ChampDoubleTexte from "../../../commun/champs/ChampDoubleTexte";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampRecherchePocopas from "../../../commun/champs/ChampRecherchePocopas";
import ChampReferenceRECE from "../../../commun/champs/ChampReferenceRECE";
import ChampsRadio from "../../../commun/champs/ChampsRadio";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const FAMILLES_REGISTRE = enumVersOptions(EFamilleRegistre, { avecOptionVide: true, cleDansLibelle: true });
const NATURES_ACTE = enumVersOptions(ENatureActe, { avecOptionVide: true, cleDansLibelle: false });
const TYPES_REFERENCE = enumVersOptions(ETypeReference);

const BlocActe: React.FC = () => {
  const { values, setFieldValue, initialValues } = useFormikContext<IRMCActeInscriptionForm>();
  const { blocsRenseignes } = useContext(RMCContext);

  const familleRegistreSelectionnee: keyof typeof EFamilleRegistre = useMemo(
    () => getIn(values.registreRepertoire.registre, "familleRegistre"),
    [values.registreRepertoire.registre.familleRegistre]
  );

  const champsDesactives = useRMCBlocActe(familleRegistreSelectionnee);

  const reinitialiserValeurs = useCallback(() => {
    setFieldValue(
      "registreRepertoire.registre",
      structuredClone({ ...initialValues.registreRepertoire.registre, typeReference: values.registreRepertoire.registre.typeReference })
    );
  }, [values.registreRepertoire.registre.typeReference]);

  const reinitialiserValeursSaufNatureEtTypeReference = useCallback(() => {
    setFieldValue(
      "registreRepertoire.registre",
      structuredClone({
        ...initialValues.registreRepertoire.registre,
        natureActe: values.registreRepertoire.registre.natureActe
      })
    );
  }, [values.registreRepertoire.registre.referenceRECE, values.registreRepertoire.registre.natureActe]);

  const blocRCRCAPACSAlimente = useMemo(() => blocsRenseignes?.includes(EBlocsRMC.RCRCAPACS), [blocsRenseignes]);

  return (
    <ConteneurAvecBordure
      titreEnTete="Filtre acte"
      className="mt-8"
      reinitialiserDonneesBloc={reinitialiserValeurs}
    >
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampListeDeroulante
          name="registreRepertoire.registre.natureActe"
          libelle="Nature de l'acte"
          options={NATURES_ACTE}
          disabled={champsDesactives.includes("natureActe") || blocRCRCAPACSAlimente}
        />
        <ChampsRadio
          name="registreRepertoire.registre.typeReference"
          libelle="Référence"
          options={TYPES_REFERENCE}
          disabled={blocRCRCAPACSAlimente}
          apresChangement={reinitialiserValeursSaufNatureEtTypeReference}
        />
      </div>
      {values.registreRepertoire.registre.typeReference === "RECE" ? (
        <div className="grid grid-cols-2 gap-4 pt-4">
          <ChampReferenceRECE
            name="registreRepertoire.registre.referenceRECE"
            libelle="Référence RECE"
            disabled={blocRCRCAPACSAlimente}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <ChampListeDeroulante
              name="registreRepertoire.registre.familleRegistre"
              libelle="Famille de registre"
              options={FAMILLES_REGISTRE}
              disabled={blocRCRCAPACSAlimente}
              apresChangement={() => setFieldValue("registreRepertoire.registre.pocopa", "")}
            />
            <ChampRecherchePocopas
              name={"registreRepertoire.registre.pocopa"}
              libelle={"Type / Poste / Commune / Pays"}
              optionsRecherchePocopa={{
                familleRegistre: familleRegistreSelectionnee,
                seulementPocopaOuvert: false
              }}
              disabled={champsDesactives.includes("pocopa") || blocRCRCAPACSAlimente}
            />
          </div>
          <div className="grid w-full grid-cols-5 gap-8 pt-4">
            <div className="col-span-1">
              <ChampTexte
                name={"registreRepertoire.registre.anneeRegistre"}
                libelle={"Année"}
                disabled={champsDesactives.includes("anneeRegistre") || blocRCRCAPACSAlimente}
                maxLength={4}
                numerique
              />
            </div>
            <div className="col-span-2">
              <ChampDoubleTexte
                proprietesPremierChamp={{
                  name: "registreRepertoire.registre.registreSupport.supportUn",
                  disabled: champsDesactives.includes("supportUn") || blocRCRCAPACSAlimente
                }}
                proprietesSecondChamp={{
                  name: "registreRepertoire.registre.registreSupport.supportDeux",
                  disabled: champsDesactives.includes("supportDeux") || blocRCRCAPACSAlimente
                }}
                libelle={"Registre (support)"}
              />
            </div>
            <div className="col-span-2">
              <ChampDoubleTexte
                proprietesPremierChamp={{
                  name: "registreRepertoire.registre.numeroActe.numeroActeOuOrdre",
                  disabled: champsDesactives.includes("numeroActeOuOrdre") || blocRCRCAPACSAlimente
                }}
                proprietesSecondChamp={{
                  name: "registreRepertoire.registre.numeroActe.numeroBisTer",
                  placeholder: "N° Bis",
                  disabled: champsDesactives.includes("numeroBisTer") || blocRCRCAPACSAlimente
                }}
                libelle={"N° d'acte"}
              />
            </div>
          </div>
          <ChampCaseACocher
            name="registreRepertoire.registre.numeroActe.etActesSuivants"
            libelle={"Et les actes suivants du registre"}
            className="pt-4"
            disabled={blocRCRCAPACSAlimente}
          />
        </>
      )}
    </ConteneurAvecBordure>
  );
};

export default BlocActe;
