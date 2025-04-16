/* v8 ignore start A TESTER 03/25 */
import { CONFIG_GET_TOUS_SERVICES_FILS } from "@api/configurations/agent/services/GetServicesFilsConfigApi";
import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import TRAITEMENT_ENREGISTRER_RCTC from "@api/traitements/requetesConsulaire/TraitementEnregistrerRCTC";
import { RECEContextData } from "@core/contexts/RECEContext";
import { ISaisieRequeteRCTCForm, SaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { IRequeteConsulaire } from "@model/requete/IRequeteConsulaire";
import {
  URL_MES_REQUETES_CONSULAIRE,
  URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
  URL_REQUETES_CONSULAIRE_SERVICE
} from "@router/ReceUrls";
import { Option } from "@util/Type";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Bouton from "../../composants/commun/bouton/Bouton";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import ConteneurAccordeon from "../../composants/commun/conteneurs/accordeon/ConteneurAccordeon";
import ScrollVersErreur from "../../composants/commun/formulaire/ScrollVersErreur";
import BlocParents from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocParents";
import BlocRequerant from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocRequerant";
import BlocRequete from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocRequete";
import BlocTitulaire from "../../composants/pages/requetesConsulaire/saisieCourrier/BlocTitulaire";
import TransmissionService from "../../composants/pages/requetesConsulaire/saisieCourrier/TransmissionService";
import useFetchApi from "../../hooks/api/FetchApiHook";
import useTraitementApi from "../../hooks/api/TraitementApiHook";

const PageSaisieCourrierTranscription: React.FC = () => {
  const { idRequete } = useParams();
  const { services } = useContext(RECEContextData);
  const navigate = useNavigate();
  const location = useLocation();
  const [requeteModifiee, setRequeteModifiee] = useState<IRequeteConsulaire | false | null>(false);
  const [optionsServices, setOptionsServices] = useState<Option[] | null>(null);
  const { appelApi: appelGetDetailRequete } = useFetchApi(CONFIG_GET_DETAIL_REQUETE);
  const { appelApi: appelGetServicesFils } = useFetchApi(CONFIG_GET_TOUS_SERVICES_FILS);
  const { lancerTraitement: enregistrerRCTC, traitementEnCours: enregistrementEnCours } = useTraitementApi(TRAITEMENT_ENREGISTRER_RCTC);

  const [depuisServiceTab, setDepuisServiceTab] = useState(false);

  useEffect(() => {
    const estDepuisOngletService = sessionStorage.getItem("depuis_onglet_requete_mon_service");
    if (estDepuisOngletService !== null) {
      setDepuisServiceTab(JSON.parse(estDepuisOngletService));
    } else {
      setDepuisServiceTab(false);
    }
  }, [location]);

  useEffect(() => {
    if (!idRequete) {
      setRequeteModifiee(null);

      return;
    }

    appelGetDetailRequete({
      parametres: { path: { idRequete: idRequete } },
      apresSucces: requete => setRequeteModifiee(requete as IRequeteConsulaire),
      apresErreur: () => {
        setRequeteModifiee(null);
      }
    });
  }, [idRequete]);

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
            onSubmit={values =>
              enregistrerRCTC({
                parametres: { valeurs: values, requeteModifiee: requeteModifiee },
                apresSucces: requeteEnregistree =>
                  idRequete
                    ? navigate(-1)
                    : navigate(
                        URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID.replace(
                          ":idRequeteParam",
                          requeteEnregistree.id
                        )
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
                      title={idRequete ? "Annuler" : "Abandonner"}
                      onClick={() => navigate(depuisServiceTab ? URL_REQUETES_CONSULAIRE_SERVICE : URL_MES_REQUETES_CONSULAIRE)}
                      styleBouton="secondaire"
                    >
                      {idRequete ? "Annuler" : "Abandonner"}
                    </Bouton>
                    <div className="flex gap-4">
                      <Bouton
                        type="submit"
                        title={idRequete ? "Valider" : "Prendre en charge"}
                        disabled={Boolean(idRequete) && !dirty}
                      >
                        {idRequete ? "Valider" : "Prendre en charge"}
                      </Bouton>
                      {!idRequete && optionsServices && <TransmissionService optionsServices={optionsServices} />}
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
