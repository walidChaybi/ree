import { ISaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { ETypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { ETypeMandataire } from "@model/requete/enum/TypeMandataireReq";
import { ETypeRequerantRDC } from "@model/requete/enum/TypeRequerantRDC";
import { enumVersOptions } from "@util/Utils";
import { useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../commun/conteneurs/formulaire/SeparateurSection";

const OPTIONS_TYPE_MANDATAIRE = enumVersOptions(ETypeMandataire, { avecOptionVide: true });
const OPTIONS_TYPE_INSTITUTIONNEL = enumVersOptions(ETypeInstitutionnel, { avecOptionVide: true });

const BlocRequerant = () => {
  const { values, setFieldValue } = useFormikContext<ISaisieRDCForm>();

  const optionsTypeRequerant = useMemo(() => {
    if (values.requete.natureActe === "MARIAGE") {
      return enumVersOptions(ETypeRequerantRDC);
    }

    const { TITULAIRE2, ...enumSansTitulaire2 } = ETypeRequerantRDC;

    return enumVersOptions({ ...enumSansTitulaire2, TITULAIRE1: "Titulaire" });
  }, [values.requete.natureActe]);

  const requerant = useMemo(
    () => ({
      type: values.requerant.typeRequerant,
      typeMandataire: values.requerant.type
    }),
    [values.requerant.type, values.requerant.typeRequerant]
  );

  const gererChangementTypeRequerant = useCallback((typeRequerant: string) => {
    setFieldValue("lienTitulaire.lien", "TITULAIRE");
    setFieldValue("requerant", {
      typeRequerant: typeRequerant,
      nom: "",
      nomUsage: "",
      prenom: "",
      type: "",
      nature: "",
      nomInstitution: "",
      raisonSociale: "",
      avecNature: false
    });
  }, []);

  return (
    <ConteneurAvecBordure titreEnTete={"REQUÉRANT"}>
      <div className="grid grid-cols-2">
        <ChampListeDeroulante
          name="requerant.typeRequerant"
          libelle="Type requérant"
          options={optionsTypeRequerant}
          optionVideMasquee
          apresChangement={gererChangementTypeRequerant}
        />
      </div>

      {!["TITULAIRE1", "TITULAIRE2"].includes(requerant.type) && (
        <>
          <SeparateurSection titre="Identité du requérant" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {requerant.type === "PARTICULIER" && (
              <>
                <ChampTexte
                  name={`requerant.nom`}
                  libelle="Nom de naissance"
                  optionFormatage="MAJUSCULES"
                  maxLength={100}
                />

                <ChampTexte
                  name={`requerant.prenom`}
                  libelle="Prénom"
                  optionFormatage="MAJUSCULES"
                />
              </>
            )}

            {requerant.type === "MANDATAIRE_HABILITE" && (
              <>
                <ChampListeDeroulante
                  name="requerant.type"
                  libelle="Type"
                  options={OPTIONS_TYPE_MANDATAIRE}
                  estObligatoire
                />

                {requerant.typeMandataire === "AUTRE" && (
                  <ChampTexte
                    name="requerant.nature"
                    libelle="Nature"
                    estObligatoire
                    maxLength={100}
                  />
                )}

                <ChampTexte
                  name={`requerant.raisonSociale`}
                  libelle="Raison sociale"
                  maxLength={100}
                />

                <ChampTexte
                  name={`requerant.nom`}
                  libelle="Nom"
                  optionFormatage="MAJUSCULES"
                  maxLength={100}
                />

                <ChampTexte
                  name={`requerant.prenom`}
                  libelle="Prénom"
                  maxLength={100}
                />
              </>
            )}

            {requerant.type === "INSTITUTIONNEL" && (
              <>
                <ChampListeDeroulante
                  name="requerant.type"
                  libelle="Type"
                  options={OPTIONS_TYPE_INSTITUTIONNEL}
                  estObligatoire
                />

                {requerant.typeMandataire === "AUTRE" && (
                  <ChampTexte
                    name="requerant.nature"
                    libelle="Nature"
                    estObligatoire
                    maxLength={100}
                  />
                )}

                <ChampTexte
                  name={`requerant.nomInstitution`}
                  libelle="Nom institution"
                  maxLength={100}
                />

                <ChampTexte
                  name={`requerant.nom`}
                  libelle="Nom représentant"
                  optionFormatage="MAJUSCULES"
                  maxLength={100}
                />

                <ChampTexte
                  name={`requerant.prenom`}
                  libelle="Prénom représentant"
                  maxLength={100}
                />
              </>
            )}

            {requerant.type === "AUTRE_PROFESSIONNEL" && (
              <>
                <ChampTexte
                  name={`requerant.nature`}
                  libelle="Nature"
                  estObligatoire
                  maxLength={100}
                />

                <ChampTexte
                  name={`requerant.raisonSociale`}
                  libelle="Raison sociale"
                  maxLength={100}
                />

                <ChampTexte
                  name={`requerant.nom`}
                  libelle="Nom professionnel"
                  optionFormatage="MAJUSCULES"
                  maxLength={100}
                />

                <ChampTexte
                  name={`requerant.prenom`}
                  libelle="Prénom professionnel"
                  maxLength={100}
                />
              </>
            )}
          </div>
        </>
      )}
    </ConteneurAvecBordure>
  );
};

export default BlocRequerant;
