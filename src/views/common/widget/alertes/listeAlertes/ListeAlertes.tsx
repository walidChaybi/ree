import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  toAlertString,
  toReferenceString
} from "@hook/alertes/MappingAlertesActe";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { storeRece } from "@util/storeRece";
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
  displayReference: boolean;
  supprimerAlerteCallBack: (idAlerteActe: string, idActe: string) => void;
}

export const ListeAlertes: React.FC<ListeAlertesProps> = ({
  ajoutAlertePossible,
  alertes,
  displayReference,
  supprimerAlerteCallBack
}) => {
  const [
    popinSupprimerAlerteState,
    setPopinSupprimerAlerteState
  ] = useState<PopinSupprimerAlerteState>({
    idAlerteActe: "",
    idActe: "",
    isOpen: false
  });
  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);

  const onClick = (alerte: IAlerte): void => {
    if (
      ajoutAlertePossible &&
      storeRece?.utilisateurCourant?.trigramme === alerte?.trigrammeUtilisateur
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
        {alertes?.map(
          (alerte: IAlerte, idx: number): JSX.Element => {
            return (
              <div
                key={`alerte-${idx}`}
                className={alerte?.codeCouleur}
                title={alerte?.complementDescription}
              >
                {displayReference === true
                  ? toReferenceString(alerte)
                  : toAlertString(alerte)}
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="IconeBoutonSupprimerAlerte"
                  title={getLibelle("Supprimer l'alerte")}
                  onClick={() => onClick(alerte)}
                />
              </div>
            );
          }
        )}
      </div>
      <ConfirmationPopin
        disablePortal={true}
        isOpen={hasMessageBloquant}
        messages={[
          getLibelle(
            "Vous pouvez supprimer seulement les alertes que vous avez ajoutées vous-même."
          )
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
