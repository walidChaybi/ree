/* v8 ignore start A TESTER 03/25 */
import { CONFIG_GET_TOUS_SERVICES_FILS } from "@api/configurations/agent/services/GetServicesFilsConfigApi";
import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import TRAITEMENT_ENREGISTRER_RCTC from "@api/traitements/requetesConsulaire/TraitementEnregistrerRCTC";
import { RECEContextData } from "@core/contexts/RECEContext";
import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { ISaisieRequeteRCTCForm, SaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { IRequeteConsulaire } from "@model/requete/IRequeteConsulaire";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_CONSULAIRE, URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
import { Option } from "@util/Type";
import { PiecesJointes } from "@widget/formulaire/piecesJointes/PiecesJointes";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bouton from "../../composants/commun/bouton/Bouton";
import { ConteneurBoutonBasDePage } from "../../composants/commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import ConteneurAccordeon from "../../composants/commun/conteneurs/accordeon/ConteneurAccordeon";
import ConteneurAvecBordure from "../../composants/commun/conteneurs/formulaire/ConteneurAvecBordure";
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
  const [requeteModifiee, setRequeteModifiee] = useState<IRequeteConsulaire | false | null>(false);
  const [optionsServices, setOptionsServices] = useState<Option[] | null>(null);
  const { appelApi: appelGetDetailRequete } = useFetchApi(CONFIG_GET_DETAIL_REQUETE);
  const { appelApi: appelGetServicesFils } = useFetchApi(CONFIG_GET_TOUS_SERVICES_FILS);
  const { lancerTraitement: enregistrerRCTC, traitementEnCours: enregistrementEnCours } = useTraitementApi(TRAITEMENT_ENREGISTRER_RCTC);

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
        <div className="mx-auto mt-4 max-w-[120rem]">
          <Formik<ISaisieRequeteRCTCForm>
            initialValues={SaisieRequeteRCTCForm.valeursDefauts(requeteModifiee)}
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
            {({ values, setFieldValue, dirty }) => (
              <Form>
                <ScrollVersErreur />

                <ConteneurAccordeon
                  titre="Création suite transcription courrier"
                  nonControllable
                  ouvertParDefaut
                >
                  <div className="grid h-[calc(100vh-14.5rem)] grid-cols-5">
                    <div className="col-span-2 py-6 pl-4 text-start">
                      <ConteneurAvecBordure
                        titreEnTete="PIÈCES JUSTIFICATIVES"
                        sansMargeHorizontale
                      >
                        <PiecesJointes
                          menuItem={TypePieceJustificative.versOptions(TypeRequete.CREATION, TypeRedactionActe.TRANSCRIT)}
                          piecesJointes={values.pieceJointe}
                          setPiecesJointes={piecesJointes => setFieldValue("pieceJointe", piecesJointes)}
                          maxPiecesJointes={34}
                        />
                      </ConteneurAvecBordure>
                    </div>
                    <div className="col-span-3 h-full overflow-y-scroll">
                      <div className="grid gap-10 py-6">
                        <BlocRequete />

                        <BlocTitulaire />

                        <BlocParents />

                        <BlocRequerant />
                      </div>
                    </div>
                  </div>
                </ConteneurAccordeon>

                <ConteneurBoutonBasDePage
                  position="gauche"
                  afficherDegrade
                >
                  <Bouton
                    type="button"
                    title={idRequete ? "Annuler" : "Abandonner"}
                    onClick={() => (idRequete ? navigate(-1) : navigate(URL_MES_REQUETES_CONSULAIRE))}
                  >
                    {idRequete ? "Annuler" : "Abandonner"}
                  </Bouton>
                </ConteneurBoutonBasDePage>

                <ConteneurBoutonBasDePage position="droite">
                  <Bouton
                    type="submit"
                    title={idRequete ? "Valider" : "Prendre en charge"}
                    disabled={Boolean(idRequete) && !dirty}
                  >
                    {idRequete ? "Valider" : "Prendre en charge"}
                  </Bouton>

                  {!idRequete && optionsServices && <TransmissionService optionsServices={optionsServices} />}
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
