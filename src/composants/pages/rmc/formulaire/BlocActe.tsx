import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { EFamilleRegistre } from "@model/etatcivil/enum/TypeFamille";
import { ETypeReference } from "@model/rmc/acteInscription/rechercheForm/ETypeReference";
import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";
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
import ChampTexte from "../../../commun/champs/ChampTexte";
import ChampsRadio from "../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const FAMILLES_REGISTRE = enumVersOptions(EFamilleRegistre, { avecOptionVide: true, cleDansLibelle: true });
const NATURES_ACTE = enumVersOptions(ENatureActe, { avecOptionVide: true, cleDansLibelle: false });
const TYPES_REFERENCE = enumVersOptions(ETypeReference);

const BlocActe: React.FC = () => {
  const { values, setFieldValue, initialValues } = useFormikContext<ICriteresRMC>();
  const { blocsRenseignes } = useContext(RMCContext);

  const familleRegistreSelectionnee: keyof typeof EFamilleRegistre = useMemo(
    () => getIn(values.acte, "familleRegistre"),
    [values.acte?.familleRegistre]
  );

  const champsDesactives = useRMCBlocActe(familleRegistreSelectionnee);
  const blocRCRCAPACSAlimente = useMemo(() => blocsRenseignes?.includes(EBlocsRMC.INSCRIPTION), [blocsRenseignes]);

  const reinitialiserValeurs = useCallback(() => {
    setFieldValue("registre", structuredClone({ ...initialValues.acte, typeReference: values.acte?.typeReference }));
  }, [values.acte?.typeReference]);

  const reinitialiserValeursSaufNatureEtTypeReference = useCallback(() => {
    setFieldValue(
      "registre",
      structuredClone({
        ...initialValues.acte,
        natureActe: values.acte?.natureActe
      })
    );
  }, [values.acte?.referenceRECE, values.acte?.natureActe]);

  return (
    <ConteneurAvecBordure
      titreEnTete="Filtre acte"
      className="mt-8"
      reinitialiserDonneesBloc={reinitialiserValeurs}
    >
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampListeDeroulante
          name="acte.natureActe"
          libelle="Nature de l'acte"
          options={NATURES_ACTE}
          disabled={champsDesactives.includes("natureActe") || blocRCRCAPACSAlimente}
        />
        <ChampsRadio
          name="acte.typeReference"
          libelle="Référence"
          options={TYPES_REFERENCE}
          disabled={blocRCRCAPACSAlimente}
          apresChangement={reinitialiserValeursSaufNatureEtTypeReference}
        />
      </div>
      {values.acte?.typeReference === "RECE" ? (
        <div className="grid grid-cols-2 gap-4 pt-4">
          <ChampReferenceRECE
            name="acte.referenceRECE"
            libelle="Référence RECE"
            disabled={blocRCRCAPACSAlimente}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <ChampListeDeroulante
              name="acte.familleRegistre"
              libelle="Famille de registre"
              options={FAMILLES_REGISTRE}
              disabled={blocRCRCAPACSAlimente}
              apresChangement={() => setFieldValue("acte.pocopa", "")}
            />
            <ChampRecherchePocopas
              name={"acte.pocopa"}
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
                name={"acte.anneeRegistre"}
                libelle={"Année"}
                disabled={champsDesactives.includes("anneeRegistre") || blocRCRCAPACSAlimente}
                maxLength={4}
                numerique
              />
            </div>
            <div className="col-span-2">
              <ChampDoubleTexte
                proprietesPremierChamp={{
                  name: "acte.registreSupport.support1",
                  disabled: champsDesactives.includes("support1") || blocRCRCAPACSAlimente
                }}
                proprietesSecondChamp={{
                  name: "acte.registreSupport.support2",
                  disabled: champsDesactives.includes("support2") || blocRCRCAPACSAlimente
                }}
                libelle={"Registre (support)"}
              />
            </div>
            <div className="col-span-2">
              <ChampDoubleTexte
                proprietesPremierChamp={{
                  name: "acte.numeroActe.numeroActe",
                  disabled: champsDesactives.includes("numeroActe") || blocRCRCAPACSAlimente
                }}
                proprietesSecondChamp={{
                  name: "acte.numeroActe.numeroBisTer",
                  placeholder: "N° Bis",
                  disabled: champsDesactives.includes("numeroBisTer") || blocRCRCAPACSAlimente
                }}
                libelle={"N° d'acte"}
              />
            </div>
          </div>
          <ChampCaseACocher
            name="acte.etActesSuivants"
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
