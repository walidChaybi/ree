/* v8 ignore start A TESTER 03/25 */
import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import TRAITEMENT_ENREGISTRER_RCTC from "@api/traitements/requetesConsulaire/TraitementEnregistrerRCTC";
import { ISaisieRequeteCTCForm, SaisieRequeteCTCForm } from "@model/form/creation/transcription/ISaisirRequeteCTCPageForm";
import { IRequeteConsulaire } from "@model/requete/IRequeteConsulaire";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Bouton from "../../composants/commun/bouton/Bouton";
import { ConteneurBoutonBasDePage } from "../../composants/commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import ConteneurAccordeon from "../../composants/commun/conteneurs/accordeon/ConteneurAccordeon";
import ScrollVersErreur from "../../composants/commun/formulaire/ScrollVersErreur";
import BlocParents from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocParents";
import BlocRequerant from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocRequerant";
import BlocRequete from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocRequete";
import BlocTitulaires from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocTitulaire";
import useFetchApi from "../../hooks/api/FetchApiHook";
import useTraitementApi from "../../hooks/api/TraitementApiHook";
import LiensRECE from "../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE } from "../../router/infoPages/InfoPagesEspaceConsulaire";
import AfficherMessage from "../../utils/AfficherMessage";

const PageSaisieCourrierTranscription: React.FC = () => {
  const { idRequeteParam } = useParams();
  const navigate = useNavigate();
  const [requeteModifiee, setRequeteModifiee] = useState<IRequeteConsulaire | false | null>(false);
  const { appelApi: appelGetDetailRequete } = useFetchApi(CONFIG_GET_DETAIL_REQUETE);
  const { lancerTraitement: enregistrerRCTC, traitementEnCours: enregistrementEnCours } = useTraitementApi(TRAITEMENT_ENREGISTRER_RCTC);

  // TODO: à variabiliser lors de l'intégration des autres natures dactes au sprint prochain
  const nombreDeTitulaires = 1;

  useEffect(() => {
    if (!idRequeteParam) {
      setRequeteModifiee(null);

      return;
    }

    appelGetDetailRequete({
      parametres: { path: { idRequete: idRequeteParam } },
      apresSucces: requete => setRequeteModifiee(requete as IRequeteConsulaire),
      apresErreur: erreurs => {
        setRequeteModifiee(null);
        AfficherMessage.erreur("Une erreur est survenue lors de la récupération de la requête", { erreurs });
        navigate(LiensRECE.retourArriere());
      }
    });
  }, [idRequeteParam]);

  return (
    <>
      {(enregistrementEnCours || requeteModifiee === false) && <PageChargeur />}

      {requeteModifiee !== false && (
        <div className="mx-auto mt-4 max-w-[90rem]">
          <Formik<ISaisieRequeteCTCForm>
            initialValues={SaisieRequeteCTCForm.valeursInitiales(requeteModifiee)}
            enableReinitialize
            validationSchema={SaisieRequeteCTCForm.schemaValidation}
            onSubmit={values =>
              enregistrerRCTC({
                parametres: { valeurs: values },
                apresSucces: requeteEnregistree =>
                  navigate(
                    LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE.url, {
                      idRequeteParam: requeteEnregistree.id
                    }),
                    { replace: true }
                  )
              })
            }
          >
            {({ dirty }) => (
              <Form>
                <ScrollVersErreur />

                <ConteneurAccordeon
                  titre="Saisie d'une requête de transcription courrier"
                  estControlable={false}
                  ouvertParDefaut
                >
                  <div className="h-[calc(100vh-22rem)] overflow-y-auto py-10">
                    <div className="grid gap-10">
                      <BlocRequete />
                      <BlocTitulaires nombreDeTitulaires={nombreDeTitulaires} />
                      <BlocParents />
                      <BlocRequerant />
                    </div>
                  </div>
                </ConteneurAccordeon>
                <ConteneurBoutonBasDePage
                  position={"gauche"}
                  className="left-96"
                >
                  <Bouton
                    type="button"
                    title={idRequeteParam ? "Annuler" : "Abandonner"}
                    onClick={() => navigate(LiensRECE.retourArriere(), { replace: true })}
                    styleBouton="secondaire"
                  >
                    {idRequeteParam ? "Annuler" : "Abandonner"}
                  </Bouton>
                </ConteneurBoutonBasDePage>
                <ConteneurBoutonBasDePage
                  position={"droite"}
                  className="right-96"
                >
                  <Bouton
                    type="submit"
                    title={idRequeteParam ? "Valider" : "Enregistrer la requête"}
                    disabled={Boolean(idRequeteParam) && !dirty}
                  >
                    {idRequeteParam ? "Valider" : "Enregistrer la requête"}
                  </Bouton>
                </ConteneurBoutonBasDePage>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default PageSaisieCourrierTranscription;
/* v8 ignore end */
