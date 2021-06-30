import React, { useCallback, useEffect, useState } from "react";
import { Droit } from "../../../../../model/Droit";
import { StatutFiche } from "../../../../../model/etatcivil/enum/StatutFiche";
import {
  FicheUtil,
  TypeFiche
} from "../../../../../model/etatcivil/enum/TypeFiche";
import { officierALeDroitSurLePerimetre } from "../../../../../model/IOfficierSSOApi";
import { DocumentDelivrance } from "../../../../../model/requete/v2/enum/DocumentDelivrance";
import { TypeRequete } from "../../../../../model/requete/v2/enum/TypeRequete";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { getValeurOuVide } from "../../../../common/util/Utils";
import { TableauRece } from "../../../../common/widget/tableau/v2/TableauRece";
import { getLibelle } from "../../../../common/widget/Text";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { getMessageZeroInscription } from "../hook/RMCActeInscriptionUtils";
import { goToLinkRMC, TypeRMC } from "./RMCTableauCommun";
import {
  determinerColonnes,
  NB_INSCRIPTION_PAR_PAGE
} from "./RMCTableauInscriptionsParams";

export interface RMCResultatInscriptionProps {
  typeRMC: TypeRMC;
  dataRequete?: TRequete;
  dataRMCInscription: IResultatRMCInscription[];
  dataTableauRMCInscription: IParamsTableau;
  setRangeInscription?: (range: string) => void;
  resetTableauInscription?: boolean;
  onClickCheckboxCallBack?: (
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void;
}

export const RMCTableauInscriptions: React.FC<RMCResultatInscriptionProps> = ({
  typeRMC,
  dataRequete,
  dataRMCInscription,
  dataTableauRMCInscription,
  setRangeInscription,
  resetTableauInscription,
  onClickCheckboxCallBack
}) => {
  // Gestion du tableau
  const [zeroInscription, setZeroInscription] = useState<JSX.Element>();

  useEffect(() => {
    if (dataRMCInscription && dataRMCInscription.length === 0) {
      setZeroInscription(getMessageZeroInscription());
    }
  }, [dataRMCInscription]);

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMC(link);
      if (range && setRangeInscription) {
        setRangeInscription(range);
      }
    },
    [setRangeInscription]
  );

  // Gestion de la Fenêtre
  const [etatFenetres, setEtatFenetres] = useState<string[]>([]);

  const closeFenetre = (idInscription: string, idx: number) => {
    const tableau = [...etatFenetres];
    if (tableau[idx] === idInscription) {
      tableau[idx] = "";
      setEtatFenetres(tableau);
    }
  };

  const onClickOnLine = (idInscription: string, data: any, idx: number) => {
    if (officierALeDroitSurLePerimetre(Droit.CONSULTER, "MEAE")) {
      const tableau = [...etatFenetres];
      if (tableau[idx] !== idInscription) {
        tableau[idx] = idInscription;
        setEtatFenetres(tableau);
      }
    }
  };

  const datasFiches = dataRMCInscription.map(data => ({
    identifiant: getValeurOuVide(data.idInscription),
    categorie: getCategorieFiche(data.idInscription, dataRMCInscription)
  }));

  // Gestion du clic sur une colonne de type checkbox.
  const [selected, setSelected] = useState<Map<number, string>>(new Map([]));

  const isCheckboxDisabled = (data: IResultatRMCInscription): boolean => {
    if (dataRequete?.type === TypeRequete.DELIVRANCE) {
      if (data?.statutInscription === StatutFiche.INACTIF.libelle) {
        return true;
      }
      const documentDemande: DocumentDelivrance = (dataRequete as IRequeteDelivrance)
        ?.documentDemande;
      return !DocumentDelivrance.estDocumentDelivranceValide(
        data?.categorie,
        documentDemande
      );
    }
    return false;
  };

  const onClickCheckbox = (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ): void => {
    const newSelected = new Map(selected);
    if (isChecked) {
      newSelected.set(index, data?.idInscription);
    } else {
      newSelected.delete(index);
    }
    onClickCheckboxCallBack && onClickCheckboxCallBack(isChecked, data);
    setSelected(newSelected);
  };

  return (
    <>
      <TableauRece
        idKey={"idInscription"}
        onClickOnLine={onClickOnLine}
        columnHeaders={determinerColonnes(
          typeRMC,
          isCheckboxDisabled,
          onClickCheckbox
        )}
        dataState={dataRMCInscription}
        paramsTableau={dataTableauRMCInscription}
        goToLink={goToLink}
        nbLignesParPage={NB_INSCRIPTION_PAR_PAGE}
        resetTableau={resetTableauInscription}
        noRows={zeroInscription}
      />

      {typeRMC === "Auto" && (
        <div className="ElementsCoches">
          {getLibelle(`${selected.size} élément(s) coché(s)`)}
        </div>
      )}

      {etatFenetres && etatFenetres.length > 0 && (
        <>
          {etatFenetres.map((idInscription: string, index: number) => {
            return (
              idInscription &&
              idInscription !== "" && (
                <FenetreFiche
                  key={`fiche${idInscription}${index}`}
                  identifiant={idInscription}
                  categorie={getCategorieFiche(
                    idInscription,
                    dataRMCInscription
                  )}
                  datasFiches={datasFiches}
                  index={index}
                  onClose={closeFenetre}
                />
              )
            );
          })}
        </>
      )}
    </>
  );
};

function getCategorieFiche(
  id: string,
  data: IResultatRMCInscription[]
): TypeFiche {
  let categorie = "";
  data.forEach(repertoire => {
    if (repertoire.categorie && repertoire.idInscription === id) {
      categorie = repertoire.categorie;
    }
  });
  return FicheUtil.getTypeFicheFromString(categorie);
}
