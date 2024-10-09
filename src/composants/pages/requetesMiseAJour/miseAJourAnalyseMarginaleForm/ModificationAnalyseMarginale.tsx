import {
  ANALYSE_MARGINALE,
  MOTIF,
  NOM,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  SECABLE
} from "@composant/formulaire/ConstantesNomsForm";
import { DEUX, QUINZE, TROIS, UN, getLibelle } from "@util/Utils";
import {
  FormikComponentProps,
  compteNombreDeChampsPrenoms,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import Bouton from "../../../commun/bouton/Bouton";
import ConteneurSousFormulaire from "../../../commun/conteneurs/sousFormulaire/ConteneurSousFormulaire";
import Checkbox from "../../../commun/formulaire/Checkbox";
import Input from "../../../commun/formulaire/Input";
import "./MiseAJourAnalyseMarginaleForm.scss";
import "./ModificationAnalyseMarginale.scss";

const MAX_PRENOMS = QUINZE;

const ModificationAnalyseMarginale: React.FC<FormikComponentProps> = ({
  formik
}) => {
  const nombrePrenoms = compteNombreDeChampsPrenoms(
    formik.values.analyseMarginale.prenoms
  );

  const nomComplet = formik
    .getFieldProps(withNamespace(ANALYSE_MARGINALE, NOM))
    .value?.trim();
  const checkboxEstDesactive = nomComplet.indexOf(" ") === -1;

  const onClickCheckboxNomSecable = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nouveauStatutCheckBox = !formik.getFieldProps(
      withNamespace(NOM_SECABLE, SECABLE)
    ).value;
    formik.setFieldValue(
      withNamespace(NOM_SECABLE, SECABLE),
      nouveauStatutCheckBox
    );
    if (nouveauStatutCheckBox && nomComplet.includes(" ")) {
      const [nomPartie1, ...resteDeNom] = nomComplet.split(/\s+/);
      const nomPartie2 = resteDeNom.join(" ");
      formik.setFieldValue(withNamespace(NOM_SECABLE, NOM_PARTIE1), nomPartie1);
      formik.setFieldValue(withNamespace(NOM_SECABLE, NOM_PARTIE2), nomPartie2);
    }
  };

  const ajouterPrenomFormulaire = (indexPrenom?: number) => {
    formik.setFieldValue(
      withNamespace(
        ANALYSE_MARGINALE,
        `prenoms.prenom${
          indexPrenom !== undefined ? indexPrenom + TROIS : DEUX
        }`
      ),
      ""
    );
  };

  const supprimerPrenomFormulaire = (index: number) => {
    formik.setFieldValue(
      withNamespace(ANALYSE_MARGINALE, `prenoms.prenom${DEUX + index}`),
      undefined
    );
  };

  return (
    <div className="formulaire-mise-a-jour-analyse-marginale">
      <ConteneurSousFormulaire
        champsSousFormulaire={[
          {
            libelle: "Nom",
            element: (
              <Input
                className="input-analyse-marginale"
                label={"Nom"}
                name={withNamespace(ANALYSE_MARGINALE, NOM)}
              />
            )
          },
          {
            libelle: `Prénom${nombrePrenoms > UN ? ` ${UN}` : ""}`,
            element: (
              <Input
                className="input-analyse-marginale"
                name={withNamespace(ANALYSE_MARGINALE, `prenoms.prenom${UN}`)}
              />
            ),
            ...(nombrePrenoms < DEUX
              ? {
                  boutons: (
                    <button
                      type="button"
                      className="bouton-prenom"
                      onClick={() => ajouterPrenomFormulaire()}
                    >
                      {"Ajouter prénom"}
                    </button>
                  )
                }
              : {})
          },
          ...Array.from({ length: nombrePrenoms - UN }).map(
            (_, index: number) => ({
              libelle: `Prénom ${index + DEUX}`,
              element: (
                <Input
                  className="input-analyse-marginale"
                  name={withNamespace(
                    ANALYSE_MARGINALE,
                    `prenoms.prenom${DEUX + index}`
                  )}
                />
              ),
              ...(index === nombrePrenoms - DEUX
                ? {
                    boutons: (
                      <>
                        {nombrePrenoms < MAX_PRENOMS && (
                          <button
                            type="button"
                            className="bouton-prenom"
                            onClick={() => ajouterPrenomFormulaire(index)}
                          >
                            {"Ajouter prénom"}
                          </button>
                        )}
                        <button
                          type="button"
                          className="bouton-prenom"
                          onClick={() => supprimerPrenomFormulaire(index)}
                        >
                          {"Annuler la saisie"}
                        </button>
                      </>
                    )
                  }
                : {})
            })
          ),
          {
            libelle: "Motif",
            element: (
              <Input
                className="input-analyse-marginale"
                label={"Motif"}
                name={withNamespace(ANALYSE_MARGINALE, MOTIF)}
              />
            )
          }
        ]}
      />
      <ConteneurSousFormulaire
        titreSousFormulaire="Gestion du nom sécable pour la délivrance des extraits"
        champsSousFormulaire={[
          {
            libelle: getLibelle("Nom sécable"),
            element: (
              <Checkbox
                size="medium"
                checked={
                  formik.getFieldProps(withNamespace(NOM_SECABLE, SECABLE))
                    .value && !checkboxEstDesactive
                }
                disabled={checkboxEstDesactive}
                inputProps={{ "aria-label": getLibelle("Nom sécable") }}
                name={withNamespace(NOM_SECABLE, SECABLE)}
                onChange={onClickCheckboxNomSecable}
              />
            )
          }
        ]}
      />

      {formik.getFieldProps(withNamespace(NOM_SECABLE, SECABLE)).value &&
        !checkboxEstDesactive && (
          <ConteneurSousFormulaire
            className="sans-padding-top"
            champsSousFormulaire={[
              {
                libelle: getLibelle("1re partie"),
                element: (
                  <Input
                    className="input-analyse-marginale"
                    label={getLibelle("1re partie")}
                    name={withNamespace(NOM_SECABLE, NOM_PARTIE1)}
                  />
                )
              },
              {
                libelle: getLibelle("2nde partie"),
                element: (
                  <Input
                    className="input-analyse-marginale"
                    label={getLibelle("2nde partie")}
                    name={withNamespace(NOM_SECABLE, NOM_PARTIE2)}
                  />
                )
              }
            ]}
          />
        )}

      <div className="contneur-bouton">
        <Bouton
          title="Annuler la saisie en cours"
          disabled={!formik.dirty}
          onClick={() => {
            formik.resetForm();
          }}
        >
          {"Annuler la saisie en cours"}
        </Bouton>
      </div>

      <div className="boutons-actions-form">
        <Bouton title="Actualiser et visualiser" disabled>
          {"Actualiser et visualiser"}
        </Bouton>
        <Bouton title="Valider et terminer" disabled>
          {"Valider et terminer"}
        </Bouton>
      </div>
    </div>
  );
};

export default connect(ModificationAnalyseMarginale);
