import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE } from "@model/agent/IOfficier";
import { Alerte, IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getLibelle } from "@util/Utils";
import React, { useCallback, useState } from "react";
import { ConfirmationPopin } from "../../popin/ConfirmationPopin";
import { PopinSupprimerAlerte } from "./contenu/PopinSupprimerAlerte";
import "./scss/ListeAlertes.scss";

interface PopinSupprimerAlerteState {
  idAlerteActe: string;
  idActe: string;
  isOpen: boolean;
}

export interface ListeAlertesProps {
  ajoutAlertePossible: boolean;
  alertes: IAlerte[];
  idTypeRegistre?: string;
  displayReference: boolean;
  supprimerAlerteCallBack: (idAlerteActe: string, idActe: string) => void;
}

export const ListeAlertes: React.FC<ListeAlertesProps> = ({
  ajoutAlertePossible,
  alertes,
  displayReference,
  idTypeRegistre,
  supprimerAlerteCallBack
}) => {
  const [popinSupprimerAlerteState, setPopinSupprimerAlerteState] =
    useState<PopinSupprimerAlerteState>({
      idAlerteActe: "",
      idActe: "",
      isOpen: false
    });
  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);

  const onClick = (alerte: IAlerte): void => {
    if (
      ajoutAlertePossible &&
      officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE(idTypeRegistre)
    ) {
      setPopinSupprimerAlerteState({
        idAlerteActe: alerte?.id || "",
        idActe: alerte?.idActe || "",
        isOpen: true
      });
    } else {
      setHasMessageBloquant(true);
    }
  };

  const onClosePopin = (): void => {
    setPopinSupprimerAlerteState({
      idAlerteActe: "",
      idActe: "",
      isOpen: false
    });
  };

  const onSubmit = useCallback((): void => {
    onClosePopin();
    supprimerAlerteCallBack(
      popinSupprimerAlerteState?.idAlerteActe,
      popinSupprimerAlerteState?.idActe
    );
  }, [popinSupprimerAlerteState, supprimerAlerteCallBack]);

  return (
    <>
      <div className="ListeAlertes">
        {alertes?.map((alerte: IAlerte, idx: number): JSX.Element => {
          return (
            <div
              key={`alerte-${idx}`}
              className={alerte?.codeCouleur}
              title={alerte?.complementDescription}
            >
              {displayReference === true
                ? Alerte.toReferenceString(alerte)
                : Alerte.toAlertString(alerte)}
              {gestionnaireFeatureFlag.estActif(
                FeatureFlag.FF_DELIV_EC_PAC
              ) && (
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="IconeBoutonSupprimerAlerte"
                  title={getLibelle("Supprimer l'alerte")}
                  onClick={() => onClick(alerte)}
                />
              )}
            </div>
          );
        })}
      </div>
      <ConfirmationPopin
        disablePortal={true}
        isOpen={hasMessageBloquant}
        messages={[
          getLibelle("Vous n'avez pas les droits pour supprimer une alerte.")
        ]}
        boutons={[
          {
            label: getLibelle("OK"),
            action: () => {
              setHasMessageBloquant(false);
            }
          }
        ]}
      />
      <PopinSupprimerAlerte
        open={popinSupprimerAlerteState?.isOpen}
        onClosePopin={onClosePopin}
        onSubmit={onSubmit}
      />
    </>
  );
};