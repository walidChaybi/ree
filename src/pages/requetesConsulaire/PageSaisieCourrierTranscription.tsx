/* v8 ignore start A TESTER 03/25 */
import { CONFIG_GET_TOUS_SERVICES_FILS } from "@api/configurations/agent/services/GetServicesFilsConfigApi";
import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import TRAITEMENT_ENREGISTRER_RCTC from "@api/traitements/requetesConsulaire/TraitementEnregistrerRCTC";
import { ISaisieRequeteRCTCForm, SaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { IRequeteConsulaire } from "@model/requete/IRequeteConsulaire";
import { Option } from "@util/Type";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Bouton from "../../composants/commun/bouton/Bouton";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import ConteneurAccordeon from "../../composants/commun/conteneurs/accordeon/ConteneurAccordeon";
import ScrollVersErreur from "../../composants/commun/formulaire/ScrollVersErreur";
import BlocParents from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocParents";
import BlocRequerant from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocRequerant";
import BlocRequete from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocRequete";
import BlocTitulaire from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocTitulaire";
import TransmissionService from "../../composants/pages/requetesConsulaire/saisieCourrier/TransmissionService";
import { RECEContextData } from "../../contexts/RECEContextProvider";
import useFetchApi from "../../hooks/api/FetchApiHook";
import useTraitementApi from "../../hooks/api/TraitementApiHook";
import LiensRECE from "../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE } from "../../router/infoPages/InfoPagesEspaceConsulaire";

const PageSaisieCourrierTranscription: React.FC = () => {
  const { idRequeteParam } = useParams();
  const { services } = useContext(RECEContextData);
  const navigate = useNavigate();
  const [requeteModifiee, setRequeteModifiee] = useState<IRequeteConsulaire | false | null>(false);
  const [optionsServices, setOptionsServices] = useState<Option[] | null>(null);
  const { appelApi: appelGetDetailRequete } = useFetchApi(CONFIG_GET_DETAIL_REQUETE);
  const { appelApi: appelGetServicesFils } = useFetchApi(CONFIG_GET_TOUS_SERVICES_FILS);
  const { lancerTraitement: enregistrerRCTC, traitementEnCours: enregistrementEnCours } = useTraitementApi(TRAITEMENT_ENREGISTRER_RCTC);

  useEffect(() => {
    if (!idRequeteParam) {
      setRequeteModifiee(null);

      return;
    }

    appelGetDetailRequete({
      parametres: { path: { idRequete: idRequeteParam } },
      apresSucces: requete => setRequeteModifiee(requete as IRequeteConsulaire),
      apresErreur: () => {
        setRequeteModifiee(null);
      }
    });
  }, [idRequeteParam]);

  useEffect(() => {
    if (optionsServices !== null || !services.length) {
      return;
    }

    const departementTranscription = services.find(service => service.code === "TR");
    if (!departementTranscription) {
      setOptionsServices([]);

      return;
    }

    const options = [{ cle: departementTranscription.idService, libelle: departementTranscription.libelleService }];
    appelGetServicesFils({
      parametres: { query: { idService: departementTranscription.idService } },
      apresSucces: servicesDtos =>
        setOptionsServices([
          ...options,
          ...servicesDtos.map(serviceDto => ({ cle: serviceDto.idService ?? "", libelle: serviceDto.libelleService ?? "" }))
        ]),
      apresErreur: erreurs => {
        console.error(erreurs);
        setOptionsServices(options);
      }
    });
  }, [optionsServices, services]);

  return (
    <>
      {(enregistrementEnCours || requeteModifiee === false || optionsServices === null) && <PageChargeur />}

      {requeteModifiee !== false && (
        <div className="mx-auto mt-4 max-w-[90rem]">
          <Formik<ISaisieRequeteRCTCForm>
            initialValues={SaisieRequeteRCTCForm.valeursInitiales(requeteModifiee)}
            enableReinitialize
            validationSchema={SaisieRequeteRCTCForm.schemaValidation}
            initialTouched={{ requete: { villeRegistre: true } }}
            onSubmit={values =>
              enregistrerRCTC({
                parametres: { valeurs: values, requeteModifiee: requeteModifiee },
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
                  <div className="h-[calc(100vh-22rem)] overflow-y-auto py-14">
                    <div className="grid gap-10">
                      <BlocRequete />
                      <BlocTitulaire />
                      <BlocParents />
                      <BlocRequerant />
                    </div>
                  </div>
                </ConteneurAccordeon>

                <div className="fixed bottom-0 left-0 right-0 bg-blanc py-4">
                  <div className="mx-auto flex max-w-[90rem] justify-between px-8">
                    <Bouton
                      type="button"
                      title={idRequeteParam ? "Annuler" : "Abandonner"}
                      onClick={() => navigate(LiensRECE.retourArriere(), { replace: true })}
                      styleBouton="secondaire"
                    >
                      {idRequeteParam ? "Annuler" : "Abandonner"}
                    </Bouton>
                    <div className="flex gap-4">
                      <Bouton
                        type="submit"
                        title={idRequeteParam ? "Valider" : "Prendre en charge"}
                        disabled={Boolean(idRequeteParam) && !dirty}
                      >
                        {idRequeteParam ? "Valider" : "Prendre en charge"}
                      </Bouton>
                      {!idRequeteParam && optionsServices && <TransmissionService optionsServices={optionsServices} />}
                    </div>
                  </div>
                </div>
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
