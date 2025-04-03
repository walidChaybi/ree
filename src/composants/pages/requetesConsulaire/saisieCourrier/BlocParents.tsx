import { IParentFormRCTC, ISaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { AddCircle, Delete } from "@mui/icons-material";
import { Option } from "@util/Type";
import { genererArrondissements } from "@util/Utils";
import { useFormikContext } from "formik";
import { useMemo } from "react";
import BoutonIcon from "../../../commun/bouton/BoutonIcon";
import ChampDate from "../../../commun/champs/ChampDate";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampNationalite from "../../../commun/champs/ChampNationalite";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ChampsPrenoms from "../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../commun/conteneurs/formulaire/SeparateurSection";

const ARRONDISSEMENTS: { [ville: string]: Option[] } = {
  paris: [{ cle: "", libelle: "" }, ...genererArrondissements(20), { cle: "centre", libelle: "centre" }],
  marseille: [{ cle: "", libelle: "" }, ...genererArrondissements(16)],
  lyon: [{ cle: "", libelle: "" }, ...genererArrondissements(9)]
};

const BlocParent: React.FC<{ valeursParent: IParentFormRCTC; indexParent: number }> = ({ valeursParent, indexParent }) => {
  const { setFieldValue } = useFormikContext<ISaisieRequeteRCTCForm>();
  const prefixParent = useMemo(() => `parents.parent${indexParent}`, [indexParent]);

  return (
    <ConteneurAvecBordure
      titreEnTete={`Parent ${indexParent}`}
      sansMargeHorizontale
    >
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <ChampTexte
            name={`${prefixParent}.nom`}
            libelle="Nom"
          />
        </div>
        <ChampsPrenoms
          cheminPrenoms={`${prefixParent}.prenoms`}
          prefixePrenom="prenom"
        />

        <ChampsRadio
          name={`${prefixParent}.sexe`}
          libelle="Sexe"
          options={[
            { cle: "MASCULIN", libelle: "Masculin" },
            { cle: "FEMININ", libelle: "Féminin" }
          ]}
          estObligatoire={Boolean(valeursParent.nom || valeursParent.prenoms.prenom1)}
        />

        <SeparateurSection titre="Naissance" />
        <div className="grid grid-cols-2 gap-4">
          <ChampDate
            name={`${prefixParent}.dateNaissance`}
            libelle="Date de naissance"
          />
          <ChampsRadio
            name={`${prefixParent}.naissance.typeLieu`}
            libelle="Lieu de naissance"
            options={[
              { cle: "FRANCE", libelle: "France" },
              { cle: "ETRANGER", libelle: "Étranger" },
              { cle: "", libelle: "Inconnu" }
            ]}
            apresChangement={typeLieu =>
              setFieldValue(`${prefixParent}.naissance`, {
                ...valeursParent.naissance,
                arrondissement: "",
                departement: "",
                etatProvince: "",
                ville: "",
                pays: typeLieu === "FRANCE" ? "France" : ""
              })
            }
          />
          {valeursParent.naissance.typeLieu && (
            <>
              <ChampTexte
                name={`${prefixParent}.naissance.ville`}
                libelle="Ville de naissance"
              />
              {["paris", "marseille", "lyon"].includes(valeursParent?.naissance?.ville?.toLowerCase().trim()) &&
                valeursParent.naissance.typeLieu === "FRANCE" && (
                  <ChampListeDeroulante
                    name={`${prefixParent}.naissance.arrondissement`}
                    libelle="Arrondissement de naissance"
                    options={ARRONDISSEMENTS[valeursParent.naissance.ville.toLowerCase().trim()] ?? []}
                  />
                )}
              {valeursParent.naissance.typeLieu === "FRANCE" && valeursParent?.naissance?.ville?.toLowerCase().trim() !== "paris" && (
                <ChampTexte
                  name={`${prefixParent}.naissance.departement`}
                  libelle="Département de naissance"
                />
              )}
              {valeursParent.naissance.typeLieu === "ETRANGER" && (
                <>
                  <ChampTexte
                    name={`${prefixParent}.naissance.etatProvince`}
                    libelle="État, canton, province de naissance"
                  />
                  <ChampTexte
                    name={`${prefixParent}.naissance.pays`}
                    libelle="Pays de naissance"
                  />
                </>
              )}
            </>
          )}
        </div>

        <ChampNationalite
          nom={`${prefixParent}.nationalites`}
          libelle="Nationalité"
        />
      </div>
    </ConteneurAvecBordure>
  );
};

const BlocParents: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ISaisieRequeteRCTCForm>();

  return (
    <ConteneurAvecBordure titreEnTete="PARENTS">
      <div className="grid gap-8 pt-4">
        <BlocParent
          indexParent={1}
          valeursParent={values.parents.parent1}
        />

        {values.parents.avecParent2 && (
          <BlocParent
            indexParent={2}
            valeursParent={values.parents.parent2}
          />
        )}

        <BoutonIcon
          type="button"
          title={values.parents.avecParent2 ? "Retirer un parent" : "Ajouter un parent"}
          onClick={() => setFieldValue("parents.avecParent2", !values.parents.avecParent2)}
          styleBouton={values.parents.avecParent2 ? "suppression" : "principal"}
          danger={values.parents.avecParent2}
        >
          <div className="flex items-center gap-4 px-2">
            {values.parents.avecParent2 ? <Delete /> : <AddCircle />}
            <span className="font-noto-sans-ui text-sm font-bold">
              {values.parents.avecParent2 ? "Retirer un parent" : "Ajouter un parent"}
            </span>
          </div>
        </BoutonIcon>

        <div>
          <SeparateurSection
            className="pt-6"
            titre="Les parents sont mariés ?"
            libellePour="parents.parentsMaries"
          />
          <ChampsRadio
            name="parents.mariage.parentsMaries"
            options={[
              { cle: "oui", libelle: "Oui" },
              { cle: "", libelle: "Non" }
            ]}
            apresChangement={parentsMaries =>
              !parentsMaries &&
              setFieldValue("parents.mariage", {
                ...values.parents.mariage,
                parentsMaries: "",
                date: { jour: "", mois: "", annee: "" },
                lieu: "",
                ville: "",
                pays: ""
              })
            }
          />
          {values.parents.mariage.parentsMaries && (
            <div className="grid grid-cols-2 gap-4 pt-4">
              <ChampDate
                name="parents.mariage.date"
                libelle="Date du mariage"
              />

              <ChampsRadio
                name="parents.mariage.lieu"
                libelle="Lieu du mariage"
                options={[
                  { cle: "FRANCE", libelle: "France" },
                  { cle: "ETRANGER", libelle: "Étranger" },
                  { cle: "", libelle: "Inconnu" }
                ]}
                apresChangement={typeLieu => setFieldValue("parents.mariage.pays", typeLieu === "FRANCE" ? "France" : "")}
              />

              {values.parents.mariage.lieu && (
                <>
                  <ChampTexte
                    name="parents.mariage.ville"
                    libelle="Ville du mariage"
                  />
                  {values.parents.mariage.lieu === "ETRANGER" && (
                    <ChampTexte
                      name="parents.mariage.pays"
                      libelle="Pays du mariage"
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div>
          <SeparateurSection
            className="pt-6"
            titre="Le titulaire à été reconnu ?"
            libellePour="parents.reconnaissance.titulaireReconnu"
          />
          <ChampsRadio
            name="parents.reconnaissance.titulaireReconnu"
            options={[
              { cle: "oui", libelle: "Oui" },
              { cle: "", libelle: "Non" }
            ]}
          />
          {values.parents.reconnaissance.titulaireReconnu && (
            <div className="grid grid-cols-2 gap-4 pt-4">
              <ChampDate
                name="parents.reconnaissance.date"
                libelle="Date de reconnaissance"
              />

              <ChampsRadio
                name="parents.reconnaissance.lieu"
                libelle="Lieu de l'acte de reconnaissance"
                options={[
                  { cle: "FRANCE", libelle: "France" },
                  { cle: "ETRANGER", libelle: "Étranger" },
                  { cle: "", libelle: "Inconnu" }
                ]}
                apresChangement={typeLieu => setFieldValue("parents.reconnaissance.pays", typeLieu === "FRANCE" ? "France" : "")}
              />
              {values.parents.reconnaissance.lieu && (
                <>
                  <ChampTexte
                    name="parents.reconnaissance.ville"
                    libelle="Ville de la reconaissance"
                  />
                  {values.parents.reconnaissance.lieu === "FRANCE" && (
                    <ChampTexte
                      name="parents.reconnaissance.departement"
                      libelle="Département de la reconaissance"
                    />
                  )}
                  {values.parents.reconnaissance.lieu === "ETRANGER" && (
                    <>
                      <ChampTexte
                        name="parents.reconnaissance.region"
                        libelle="Région/état de la reconaissance"
                      />
                      <ChampTexte
                        name="parents.reconnaissance.pays"
                        libelle="Pays de la reconaissance"
                      />
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocParents;
