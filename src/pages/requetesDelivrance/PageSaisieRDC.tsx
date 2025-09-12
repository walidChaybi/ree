import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import TRAITEMENT_ENREGISTRER_RDC from "@api/traitements/requeteDelivrance/saisir/TraitementEnregistrerRDC";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { ISaisieRDCForm, SaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Bouton from "../../composants/commun/bouton/Bouton";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import ScrollVersErreur from "../../composants/commun/formulaire/ScrollVersErreur";
import FormulaireExtraitCopieDelivrance from "../../composants/pages/requetesDelivrance/saisirRequete/FormulaireExtraitCopieDelivrance";
import useFetchApi from "../../hooks/api/FetchApiHook";
import useTraitementApi from "../../hooks/api/TraitementApiHook";
import { INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE } from "../../router/infoPages/InfoPagesEspaceDelivrance";
import LiensRECE from "../../router/LiensRECE";

const PageSaisieRDC: React.FC = () => {
  const { idRequeteParam } = useParams();
  const navigate = useNavigate();
  const { appelApi: appelGetDetailRequete, enAttenteDeReponseApi: enChargement } = useFetchApi(CONFIG_GET_DETAIL_REQUETE);
  const [requeteModifiee, setRequeteModifiee] = useState<IRequeteDelivrance | null>(null);
  const { lancerTraitement: enregistrerRDC } = useTraitementApi(TRAITEMENT_ENREGISTRER_RDC);

  useEffect(() => {
    if (!idRequeteParam) {
      setRequeteModifiee(null);

      return;
    }

    appelGetDetailRequete({
      parametres: { path: { idRequete: idRequeteParam } },
      apresSucces: requete => {
        setRequeteModifiee(mappingRequeteDelivrance(requete));
      },
      apresErreur: () => {
        setRequeteModifiee(null);
      }
    });
  }, [idRequeteParam]);

  return (
    <>
      {enChargement ? (
        <PageChargeur />
      ) : (
        <div className="mx-auto mt-4 max-w-[100rem]">
          <Formik<ISaisieRDCForm>
            initialValues={SaisieRDCForm.valeursInitiales(requeteModifiee)}
            enableReinitialize
            onSubmit={values =>
              enregistrerRDC({
                parametres: {
                  valeurs: values,
                  requeteModifiee: requeteModifiee ? { id: requeteModifiee.id, idUtilisateur: requeteModifiee.idUtilisateur } : null
                },
                apresSucces: requeteEnregistree => {
                  idRequeteParam
                    ? navigate(-1)
                    : navigate(
                        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.url, {
                          idRequeteParam: requeteEnregistree.id
                        })
                      );
                }
              })
            }
            validationSchema={SaisieRDCForm.schemaValidation}
          >
            {({ dirty }) => (
              <Form>
                <ScrollVersErreur />
                <FormulaireExtraitCopieDelivrance />
                <div className="fixed bottom-0 left-0 right-0 bg-blanc py-4">
                  <div className="mx-auto flex max-w-[100rem] justify-between px-8">
                    <Bouton
                      type="button"
                      title={idRequeteParam ? "Annuler" : "Abandonner"}
                      onClick={() => navigate(-1)}
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

export default PageSaisieRDC;
