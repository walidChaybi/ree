import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";

import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { FicheActe } from "@model/etatcivil/acte/IFicheActe";

import AnalyseMarginaleForm from "@model/form/AnalyseMarginale/AnalyseMarginaleForm";
import messageManager from "@util/messageManager";
import { EditionMiseAJourContext } from "../../../../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../../../../hooks/api/FetchApiHook";
import ComposantChargeur from "../../../../../commun/chargeurs/ComposantChargeur";
import { IAnalyseMarginaleMiseAJour } from "../../../PartieFormulaire";
import ChampsAnalyseMarginaleFormulaire from "./ChampsAnalyseMarginaleFormulaire";

interface IAnalyseMarginaleFormProps {
  setDonneesAnalyseMarginale: (data: IAnalyseMarginaleMiseAJour) => void;
  setAnalyseMarginaleModifiee: (estModifiee: boolean) => void;
  motif: string | null;
}

const AnalyseMarginaleFormulaire: React.FC<IAnalyseMarginaleFormProps> = ({
  setDonneesAnalyseMarginale,
  setAnalyseMarginaleModifiee,
  motif
}) => {
  const { appelApi: appelResumeActe } = useFetchApi(CONFIG_GET_RESUME_ACTE, true);
  const { idActe } = useContext(EditionMiseAJourContext.Valeurs);

  const [valeursInitiales, setValeursInitiales] = useState<IAnalyseMarginaleMiseAJour | null>(null);

  useEffect(() => {
    appelResumeActe({
      parametres: { path: { idActe: idActe }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
      apresSucces: acteDto => {
        const acte = mapActe(acteDto);
        const analyseMarginale = (FicheActe.getAnalyseMarginaleLaPlusRecente(acte) ?? acte)?.titulaires[0];

        setValeursInitiales(AnalyseMarginaleForm.genererValeursDefautFormulaire(analyseMarginale, motif));
      },
      apresErreur: () => messageManager.showError("Une erreur est survenue lors de la récupération des informations de l'acte")
    });
  }, []);

  return (
    <>
      {valeursInitiales === null ? (
        <ComposantChargeur />
      ) : (
        <Formik<IAnalyseMarginaleMiseAJour>
          initialValues={valeursInitiales}
          validationSchema={AnalyseMarginaleForm.schemaValidation()}
          enableReinitialize
          onSubmit={(values, helpers) => {
            setDonneesAnalyseMarginale(values);
            helpers.resetForm({ values });
          }}
        >
          <Form>
            <ChampsAnalyseMarginaleFormulaire
              setAnalyseMarginaleModifiee={setAnalyseMarginaleModifiee}
              motif={motif}
            />
          </Form>
        </Formik>
      )}
    </>
  );
};

export default AnalyseMarginaleFormulaire;
