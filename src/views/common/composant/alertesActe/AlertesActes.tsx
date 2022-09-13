import {
  AddAlerteActeApiHookParameters,
  useAddAlerteActeApiHook
} from "@hook/alertes/AddAlerteActeHookApi";
import {
  DeleteAlerteActeApiHookParameters,
  useDeleteAlerteActeApiHook
} from "@hook/alertes/DeleteAlerteActeHookApi";
import {
  GetAlertesActeApiHookParameters,
  useGetAlertesActeApiHook
} from "@hook/alertes/GetAlertesActeApiHook";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { getLibelle } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { BoutonAjouterAlerte } from "@widget/alertes/ajouterAlerte/BoutonAjouterAlerte";
import { IAjouterAlerteFormValue } from "@widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { ListeAlertes } from "@widget/alertes/listeAlertes/ListeAlertes";
import React, { useCallback, useEffect, useState } from "react";
import "./scss/AlertesActes.scss";

export interface AlertesActesProps {
  detailRequete: IRequeteDelivrance;
  idActeInit?: string;
  addActe?: GetAlertesActeApiHookParameters;
  ajoutAlerte?: (alerte: Map<string, IAlerte[]>) => void;
  ajoutAlertePossible: boolean;
}

export const AlertesActes: React.FC<AlertesActesProps> = ({
  detailRequete,
  idActeInit,
  addActe,
  ajoutAlerte,
  ajoutAlertePossible
}) => {
  /* Etat alertes associées aux aajoutAlertePossiblectes sélectionnés */
  const [alertes, setAlertes] = useState<Map<string, IAlerte[]>>(new Map([]));

  /* Etat paramètres d'appel de l'API de récupération des alertes */
  const [alertesActeApiHookParameters, setAlertesActeApiHookParameters] =
    useState<GetAlertesActeApiHookParameters>();

  /* Etat paramètres d'appel de l'API d'ajout d'une alerte */
  const [
    ajouterAlerteActeApiHookParameters,
    setAjouterAlerteActeApiHookParameters
  ] = useState<AddAlerteActeApiHookParameters>();

  /*  Etat paramètres d'appel de l'API de suppression d'une alerte */
  const [
    deleteAlerteActeApiHookParameters,
    setDeleteAlerteActeApiHookParameters
  ] = useState<DeleteAlerteActeApiHookParameters>();

  /* Hook d'appel de l'API de récupération des alertes associées à un acte */
  const resultatGetAlertesActe = useGetAlertesActeApiHook(
    alertesActeApiHookParameters
  );

  useEffect(() => {
    if (idActeInit) {
      setAlertesActeApiHookParameters({ idActe: idActeInit, isChecked: true });
    }
  }, [idActeInit]);

  useEffect(() => {
    if (addActe) {
      setAlertesActeApiHookParameters(addActe);
    }
  }, [addActe]);

  /* Actualisation de la liste des alertes des actes sélectionnés */
  useEffect(() => {
    if (alertesActeApiHookParameters) {
      const newAlertes = new Map(alertes);
      if (alertesActeApiHookParameters.isChecked && resultatGetAlertesActe) {
        newAlertes.set(
          alertesActeApiHookParameters.idActe,
          resultatGetAlertesActe
        );
      } else {
        newAlertes.delete(alertesActeApiHookParameters.idActe);
      }
      majAlertes(newAlertes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertesActeApiHookParameters, resultatGetAlertesActe]);

  /* Ajout d'une alerte */
  const ajouterAlerteCallBack = useCallback(
    (idActe: string, value: IAjouterAlerteFormValue) => {
      setAjouterAlerteActeApiHookParameters({
        idActe,
        idTypeAlerte: value?.idTypeAlerte,
        complementDescription: value?.complementDescription,
        provenanceRequete: detailRequete?.provenanceRequete?.provenance?.libelle
      });
    },
    [detailRequete]
  );

  const majAlertes = useCallback(
    newAlertes => {
      setAlertes(newAlertes);
      if (ajoutAlerte) {
        ajoutAlerte(newAlertes);
      }
    },
    [ajoutAlerte]
  );

  const resultatAjoutAlerte = useAddAlerteActeApiHook(
    ajouterAlerteActeApiHookParameters
  );
  useEffect(() => {
    if (resultatAjoutAlerte) {
      /* màj des alertes*/
      const newAlertes = new Map(alertes);
      const idActe = resultatAjoutAlerte.idActe || "";
      newAlertes?.get(idActe)?.unshift(resultatAjoutAlerte);
      majAlertes(newAlertes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatAjoutAlerte]);

  /* Suppression d'une alerte */
  const supprimerAlerteCallBack = useCallback(
    (idAlerteActe: string, idActe: string) => {
      setDeleteAlerteActeApiHookParameters({
        idAlerteActe,
        idActe,
        provenanceRequete: detailRequete?.provenanceRequete?.provenance?.libelle
      });
    },
    [detailRequete]
  );

  const resultatSuppressionAlerte = useDeleteAlerteActeApiHook(
    deleteAlerteActeApiHookParameters
  );
  useEffect(() => {
    if (resultatSuppressionAlerte) {
      /* màj des alertes*/
      const newAlertes = new Map(alertes);

      const idAlerteActe =
        deleteAlerteActeApiHookParameters?.idAlerteActe || "";
      const idActe = deleteAlerteActeApiHookParameters?.idActe || "";

      const nouvellesAlertesDeLActe =
        newAlertes?.get(idActe)?.filter(a => a.id !== idAlerteActe) || [];

      newAlertes.set(idActe, nouvellesAlertesDeLActe);

      majAlertes(newAlertes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatSuppressionAlerte]);

  function estOuvert() {
    if (idActeInit) {
      return alertes.get(idActeInit)?.length !== 0;
    } else {
      return alertes.size > 0;
    }
  }

  return (
    <div className="AlertesActes">
      <AccordionRece
        titre={getLibelle("Alertes et informations")}
        disabled={false}
        expanded={estOuvert()}
      >
        <div className="Liste">
          {Array.from(alertes.entries()).map(
            (entry: [string, IAlerte[]], index: number) => (
              <div
                key={`alertes-${index}`}
                className={`Alertes ${index === 0 ? "" : "SeparateurAlertes"}`}
              >
                <BoutonAjouterAlerte
                  key={`bouton-ajouter-alerte-${index}`}
                  ajoutAlertePossible={ajoutAlertePossible}
                  ajouterAlerteCallBack={ajouterAlerteCallBack.bind(
                    null,
                    entry?.[0]
                  )}
                />
                <ListeAlertes
                  key={`liste-alertes-${index}`}
                  ajoutAlertePossible={ajoutAlertePossible}
                  alertes={entry?.[1]}
                  displayReference={true}
                  supprimerAlerteCallBack={supprimerAlerteCallBack}
                />
              </div>
            )
          )}
        </div>
      </AccordionRece>
    </div>
  );
};
