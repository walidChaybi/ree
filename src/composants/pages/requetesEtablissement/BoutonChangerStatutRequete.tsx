import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import { Droit } from "@model/agent/enum/Droit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { Option } from "@util/Type";
import { Form, Formik } from "formik";
import React, { useContext, useMemo, useState } from "react";
import { RECEContextData } from "../../../contexts/RECEContextProvider";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../utils/AfficherMessage";
import SchemaValidation from "../../../utils/SchemaValidation";
import Bouton from "../../commun/bouton/Bouton";
import ChampListeDeroulante from "../../commun/champs/ChampListeDeroulante";
import ChampZoneTexte from "../../commun/champs/ChampZoneTexte";
import ConteneurModale from "../../commun/conteneurs/modale/ConteneurModale";

interface IBoutonChangerStatutRequeteProps {
  idRequete: string;
}

interface IChangementStatutForm {
  optionStatutCible: string;
  texteMotifChangement: string;
}

const OPTIONS_STATUT: Option[] = [
  { nom: "", libelle: "" },
  StatutRequete.A_TRAITER,
  StatutRequete.PRISE_EN_CHARGE,
  StatutRequete.RETOUR_SDANF,
  StatutRequete.PROJET_VALIDE,
  StatutRequete.BI_VALIDE,
  StatutRequete.A_SIGNER,
  StatutRequete.TRAITE_A_TRANSMETTRE,
  StatutRequete.TRAITE_TRANSMIS
].map(statut => ({ cle: statut.nom, libelle: statut.libelle }));

const SCHEMA_VALIDATION = SchemaValidation.objet({
  optionStatutCible: SchemaValidation.texte({ obligatoire: true }),
  texteMotifChangement: SchemaValidation.texte({ obligatoire: true }).max(100, "Le motif de changement ne doit pas dépasser 100 caractères")
});

/*
 * /!\ Fonctionnalité à caractère temporaire !
 * Elle a pour but d'aider à gérer le workflow du statut d'une requête d'établissement en parcours transitoire.
 * Lorsque la reprise de données sera passé et que le décomissionnement du parcours transitoire sera déclanché,
 * une re-évaluation du besoin sera à faire pour savoir si ce sera toujours d'actualité ou non.
 */
export const BoutonChangerStatutRequete: React.FC<IBoutonChangerStatutRequeteProps> = ({ idRequete }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [modaleChangementDeStatutOuverte, setModaleChangementDeStatutOuverte] = useState<boolean>(false);
  const { appelApi: appelMajStatut, enAttenteDeReponseApi: enAttenteMajStatut } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_CREATION, true);

  const peutChangerStatut = useMemo(
    () => utilisateurConnecte.estHabilitePour({ tousLesDroits: [Droit.FORCER_STATUT_REQUETE_ETABLISSEMENT, Droit.CREER_ACTE_ETABLI] }),
    [utilisateurConnecte]
  );

  return (
    <>
      {peutChangerStatut && (
        <Bouton
          title="Changer Statut"
          onClick={() => setModaleChangementDeStatutOuverte(true)}
        >
          Changer Statut
        </Bouton>
      )}

      {modaleChangementDeStatutOuverte && (
        <ConteneurModale fermerModale={() => setModaleChangementDeStatutOuverte(false)}>
          <div className="conteneur-modale-observation">
            <Formik<IChangementStatutForm>
              initialValues={{
                optionStatutCible: "",
                texteMotifChangement: ""
              }}
              validationSchema={SCHEMA_VALIDATION}
              onSubmit={values => {
                appelMajStatut({
                  parametres: {
                    path: {
                      idRequete: idRequete
                    },
                    query: {
                      statut: values.optionStatutCible,
                      raisonStatut: values.texteMotifChangement,
                      force: true
                    }
                  },
                  apresSucces: () => {
                    setModaleChangementDeStatutOuverte(false);
                    AfficherMessage.succes("Le statut a bien été mis à jour", { fermetureAuto: true });
                  },
                  apresErreur: erreurs =>
                    AfficherMessage.erreur("Une erreur s'est produite lors de la mise à jour du statut de la requête", {
                      erreurs,
                      fermetureAuto: true
                    })
                });
              }}
            >
              <Form className="grid gap-6">
                <div className="text-xl font-bold text-bleu-sombre">{"Changement du statut de la requête"}</div>
                <label>
                  <ChampListeDeroulante
                    name="optionStatutCible"
                    libelle="Statut à appliquer"
                    options={OPTIONS_STATUT}
                    optionVideMasquee
                  />
                </label>

                <label>
                  <ChampZoneTexte
                    name="texteMotifChangement"
                    libelle="Motif du changement"
                    rows={2}
                    maxLength={100}
                    typeRedimensionnement="fixe"
                    sansRetourChariot
                  />
                </label>

                <div className="flex justify-center gap-4">
                  <Bouton
                    title="Annuler"
                    onClick={() => setModaleChangementDeStatutOuverte(false)}
                    styleBouton="secondaire"
                  >
                    {"Annuler"}
                  </Bouton>
                  <Bouton
                    title="Valider"
                    type="submit"
                    disabled={enAttenteMajStatut}
                  >
                    {"Valider"}
                  </Bouton>
                </div>
              </Form>
            </Formik>
          </div>
        </ConteneurModale>
      )}
    </>
  );
};
