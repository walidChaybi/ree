import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { NOM_DOCUMENT_REFUS_FRANCAIS } from "@model/composition/IReponseSansDelivranceCSFrancaisComposition";
import { NOM_DOCUMENT_REFUS_MARIAGE } from "@model/composition/IReponseSansDelivranceCSMariageComposition";
import { NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT } from "@model/composition/IReponseSansDelivranceCSPACSNonInscritComposition";
import { IActionOption } from "@model/requete/IActionOption";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { filtrerListeActionsParSousTypes } from "@util/RequetesUtils";
import { reinitialiserOnClick } from "@views/common/composant/menuTransfert/MenuTransfertUtil";
import { useReponseSansDelivranceCS } from "@views/common/hook/reponseSansDelivrance/ChoixReponseSansDelivranceCSHook";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import LiensRECE from "../../../../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT } from "../../../../../../../router/infoPages/InfoPagesEspaceDelivrance";
import {
  createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete,
  createReponseSansDelivranceCSPourCompositionApiFrancais,
  CreateReponseSansDelivranceCSPourCompositionApiMariage,
  createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit,
  estSeulementActeMariage,
  ICreateReponseSansDelivranceCSPourCompositionApiMariageParams
} from "../../../../../../common/hook/reponseSansDelivrance/ReponseSansDelivranceCSFonctions";
import { IgnoreRequetePopin } from "../IgnoreRequetePopin";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import {
  filtrerListeActionsParDocumentDemande,
  INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE,
  menuSansDelivranceActions
} from "./MenuUtilsCS";

export const MenuReponseSansDelivranceCS: React.FC<IChoixActionDelivranceProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const refs = useRef([]);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [reponseSansDelivranceCS, setReponseSansDelivranceCS] = useState<IReponseSansDelivranceCS | undefined>();
  const [popinOuverte, setPopinOuverte] = useState<boolean>(false);

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    reponseSansDelivranceCS,
    props.requete.id
  );

  useEffect(() => {
    if (resultatReponseSansDelivranceCS) {
      navigate(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT.url, { idRequeteParam: props.requete.id }), {
        replace: true
      });
    }
    setOperationEnCours(false);
  }, [resultatReponseSansDelivranceCS, navigate, location]);

  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);

  const handleReponseSansDelivranceCSMenu = (indexMenu: number) => {
    switch (indexMenu) {
      case INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.REQUETE_INCOMPLETE_ILLISIBLE:
        setOperationEnCours(true);
        const contenuReponseSansDelivranceCSDemandeIncomplete = createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
          props.requete
        );
        setReponseSansDelivranceCS({
          contenu: contenuReponseSansDelivranceCSDemandeIncomplete,
          fichier: NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
        });
        break;
      case INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.PACS_NON_INSCRIT:
        setOperationEnCours(true);
        const contenuReponseSansDelivranceCSPACSNonInscrit = createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit(props.requete);
        setReponseSansDelivranceCS({
          contenu: contenuReponseSansDelivranceCSPACSNonInscrit,
          fichier: NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT
        });
        break;
      case INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.MARIAGE_EN_COURS_DE_VALIDITE:
        const actes = props.actes ?? [];
        const inscriptions = props.inscriptions?.filter(inscription => inscription !== null) ?? [];
        if (!estSeulementActeMariage(props.requete, actes, inscriptions)) {
          setHasMessageBloquant(true);
        } else {
          setOperationEnCours(true);
          setReponseSansDelivranceCSParams({ requete: props.requete, acte: actes?.[0] });
        }
        break;
      case INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.NATIONALITE_OU_NAISSANCE_FRANCAIS:
        setOperationEnCours(true);
        const newReponseSansDelivranceCSFrancais = createReponseSansDelivranceCSPourCompositionApiFrancais(props.requete);
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

  const [reponseSansDelivranceCSParams, setReponseSansDelivranceCSParams] =
    useState<ICreateReponseSansDelivranceCSPourCompositionApiMariageParams>({});
  const newReponseSansDelivranceCSMariage = CreateReponseSansDelivranceCSPourCompositionApiMariage(reponseSansDelivranceCSParams);

  useEffect(() => {
    if (newReponseSansDelivranceCSMariage)
      setReponseSansDelivranceCS({
        contenu: newReponseSansDelivranceCSMariage,
        fichier: NOM_DOCUMENT_REFUS_MARIAGE
      });
  }, [newReponseSansDelivranceCSMariage]);

  const listeActionsFiltreParSousTypes: IActionOption[] = filtrerListeActionsParSousTypes(props.requete, menuSansDelivranceActions);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={"Réponse sans délivrance"}
        listeActions={filtrerListeActionsParDocumentDemande(listeActionsFiltreParSousTypes, props.requete)}
        onSelect={handleReponseSansDelivranceCSMenu}
        refs={refs}
      />
      <IgnoreRequetePopin
        isOpen={popinOuverte}
        onClosePopin={() => {
          setPopinOuverte(false);
          reinitialiserOnClick(refs);
        }}
        requete={props.requete}
      />
      <ConfirmationPopin
        estOuvert={hasMessageBloquant}
        messages={["Votre sélection n'est pas cohérente avec le choix de l'action de réponse négative."]}
        boutons={[
          {
            label: "OK",
            action: () => {
              setHasMessageBloquant(false);
              reinitialiserOnClick(refs);
            }
          }
        ]}
      />
    </>
  );
};
