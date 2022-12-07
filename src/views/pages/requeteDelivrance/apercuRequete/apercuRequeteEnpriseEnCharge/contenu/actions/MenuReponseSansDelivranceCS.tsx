import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { NOM_DOCUMENT_REFUS_FRANCAIS } from "@model/composition/IReponseSansDelivranceCSFrancaisComposition";
import { NOM_DOCUMENT_REFUS_MARIAGE } from "@model/composition/IReponseSansDelivranceCSMariageComposition";
import { NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT } from "@model/composition/IReponseSansDelivranceCSPACSNonInscritComposition";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IActionOption } from "@model/requete/IActionOption";
import { receUrl } from "@router/ReceUrls";
import { DoubleSubmitUtil } from "@util/DoubleSubmitUtil";
import { filtrerListeActionsParSousTypes } from "@util/RequetesUtils";
import { getLibelle, supprimerNullEtUndefinedDuTableau } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IgnoreRequetePopin } from "../IgnoreRequetePopin";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import { useReponseSansDelivranceCS } from "./hook/ChoixReponseSansDelivranceCSHook";
import {
  filtrerListeActionsParDocumentDemande,
  INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE,
  menuSansDelivranceActions
} from "./MenuUtilsCS";
import {
  createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete,
  createReponseSansDelivranceCSPourCompositionApiFrancais,
  createReponseSansDelivranceCSPourCompositionApiMariage,
  createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit,
  estSeulementActeMariage
} from "./ReponseSansDelivranceCSFonctions";

export const MenuReponseSansDelivranceCS: React.FC<
  IChoixActionDelivranceProps
> = props => {
  const history = useHistory();

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [reponseSansDelivranceCS, setReponseSansDelivranceCS] = useState<
    IReponseSansDelivranceCS | undefined
  >();
  const [popinOuverte, setPopinOuverte] = useState<boolean>(false);

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    props.requete.id,
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    reponseSansDelivranceCS
  );

  useEffect(() => {
    if (resultatReponseSansDelivranceCS) {
      const url = receUrl.getUrlApercuTraitementAPartirDe({
        url: history.location.pathname
      });
      receUrl.replaceUrl(history, url);
    }
    setOperationEnCours(false);
  }, [resultatReponseSansDelivranceCS, history]);

  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);

  const handleReponseSansDelivranceCSMenu = async (indexMenu: number) => {
    switch (indexMenu) {
      case INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.REQUETE_INCOMPLETE_ILLISIBLE:
        setOperationEnCours(true);
        const contenuReponseSansDelivranceCSDemandeIncomplete =
          createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
            props.requete
          );
        setReponseSansDelivranceCS({
          contenu: contenuReponseSansDelivranceCSDemandeIncomplete,
          fichier: NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
        });
        break;
      case INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.PACS_NON_INSCRIT:
        setOperationEnCours(true);
        const contenuReponseSansDelivranceCSPACSNonInscrit =
          createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit(
            props.requete
          );
        setReponseSansDelivranceCS({
          contenu: contenuReponseSansDelivranceCSPACSNonInscrit,
          fichier: NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT
        });
        break;
      case INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.MARIAGE_EN_COURS_DE_VALIDITE:
        const actes = supprimerNullEtUndefinedDuTableau(props.actes);
        const inscriptions = supprimerNullEtUndefinedDuTableau(
          props.inscriptions
        );
        if (!estSeulementActeMariage(props.requete, actes, inscriptions)) {
          setHasMessageBloquant(true);
        } else {
          setOperationEnCours(true);
          const newReponseSansDelivranceCSMariage =
            await createReponseSansDelivranceCSPourCompositionApiMariage(
              props.requete,
              actes?.[0]
            );
          setReponseSansDelivranceCS({
            contenu: newReponseSansDelivranceCSMariage,
            fichier: NOM_DOCUMENT_REFUS_MARIAGE
          });
        }
        break;
      case INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.NATIONALITE_OU_NAISSANCE_FRANCAIS:
        setOperationEnCours(true);
        const newReponseSansDelivranceCSFrancais =
          createReponseSansDelivranceCSPourCompositionApiFrancais(
            props.requete
          );
        setReponseSansDelivranceCS({
          contenu: newReponseSansDelivranceCSFrancais,
          fichier: NOM_DOCUMENT_REFUS_FRANCAIS
        });
        break;
      case INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.IGNORER_REQUETE:
        setPopinOuverte(true);
        break;
    }
  };

  const resetDoubleSubmit = () => {
    listeActionsFiltreParSousTypes.forEach(el => {
      DoubleSubmitUtil.reactiveOnClick(el.ref?.current);
    });
  };

  const listeActionsFiltreParSousTypes: IActionOption[] =
    filtrerListeActionsParSousTypes(props.requete, menuSansDelivranceActions);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={"Réponse sans délivrance"}
        listeActions={filtrerListeActionsParDocumentDemande(
          listeActionsFiltreParSousTypes,
          props.requete
        )}
        onSelect={handleReponseSansDelivranceCSMenu}
      />
      <IgnoreRequetePopin
        isOpen={popinOuverte}
        onClosePopin={() => {
          setPopinOuverte(false);
          resetDoubleSubmit();
        }}
        requete={props.requete}
      />
      <ConfirmationPopin
        isOpen={hasMessageBloquant}
        messages={[
          getLibelle(
            "Votre sélection n'est pas cohérente avec le choix de l'action de réponse négative."
          )
        ]}
        boutons={[
          {
            label: getLibelle("OK"),
            action: () => {
              setHasMessageBloquant(false);
              resetDoubleSubmit();
            }
          }
        ]}
      />
    </>
  );
};
