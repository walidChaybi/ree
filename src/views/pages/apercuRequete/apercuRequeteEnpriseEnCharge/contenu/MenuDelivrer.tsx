import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../../model/requete/v2/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeNatureActe } from "../../../../../model/requete/v2/enum/TypeNatureActe";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { filtrerListeActions } from "../../../../common/util/RequetesUtils";
import { getUrlWithoutIdParam } from "../../../../common/util/route/routeUtil";
import { supprimerNullEtUndefinedDuTableau } from "../../../../common/util/Utils";
import { OperationEnCours } from "../../../../common/widget/attente/OperationEnCours";
import {
  IActionOption,
  MenuAction
} from "../../../../common/widget/menu/MenuAction";
import {
  ConfirmationPopin,
  IBoutonPopin
} from "../../../../common/widget/popin/ConfirmationPopin";
import { getLibelle } from "../../../../common/widget/Text";
import { PATH_APERCU_COURRIER, receUrl } from "../../../../router/ReceUrls";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { IActionProps } from "./ChoixAction";
import { useDelivrerCertificatSituationHook } from "./hook/DelivrerCertificatSituationHook";
import {
  UpdateChoixDelivranceProps,
  useUpdateChoixDelivrance
} from "./hook/UpdateChoixDelivranceHook";

const INDEX_ACTION_CERTIFICAT_SITUATION = 0;
const INDEX_ACTION_COPIE_INTEGRALE = 1;
const INDEX_ACTION_EXTRAIT_AVEC_FILIATION = 2;
const INDEX_ACTION_EXTRAIT_SANS_FILIATION = 3;
const INDEX_ACTION_EXTRAIT_PLURILINGUE = 4;
const INDEX_ACTION_COPIE_ARCHIVE = 5;

export const MenuDelivrer: React.FC<IActionProps> = props => {
  const history = useHistory();
  const refDelivrerOptions0 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [actes, setActes] = useState<IResultatRMCActe[]>();
  const [inscriptions, setInscriptions] = useState<IResultatRMCInscription[]>();
  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [boutonsPopin, setBoutonsPopin] = useState<IBoutonPopin[]>();
  const [choixDelivrance, setChoixDelivrance] = useState<ChoixDelivrance>();
  const [paramUpdateChoixDelivrance, setParamUpdateChoixDelivrance] = useState<
    UpdateChoixDelivranceProps
  >();

  const idRequete = useUpdateChoixDelivrance(paramUpdateChoixDelivrance);

  const resultDeliverCertificatSituation = useDelivrerCertificatSituationHook(
    mappingRequeteDelivranceToRequeteTableau(
      props.requete as IRequeteDelivrance
    ),
    inscriptions,
    actes
  );

  const boutonOK: IBoutonPopin[] = getBoutonOK(setMessagesBloquant);
  const boutonsOuiNon: IBoutonPopin[] = getBoutonsOuiNon(setMessagesBloquant);

  const delivrerOptions: ActionOptionAvecChoixDelivrance[] = getOptionsMenuDelivrer(
    refDelivrerOptions0
  );

  const controleCoherenceEntreDocumentSelectionneEtActionDelivrer = (
    indexMenu: number,
    listeActes: any[] | undefined,
    listeInscriptions: any[] | undefined
  ) => {
    const requeteDelivrance = props.requete as IRequeteDelivrance;
    const sousType = requeteDelivrance?.sousType?.nom;
    let message: string[] = [];
    if (
      sousType === SousTypeDelivrance.RDC.nom ||
      sousType === SousTypeDelivrance.RDD.nom
    ) {
      if (unActeEtUnSeulSelectionne(listeActes, listeInscriptions)) {
        if (
          estChoixExtraitAvecOuSansFiliation(indexMenu) &&
          listeActes?.[0]?.nature === TypeNatureActe.DECES.libelle
        ) {
          message = [
            getLibelle(
              "Pas de délivrance d'extrait avec ou sans filiation pour un acte de décès."
            )
          ];
          setBoutonsPopin(boutonOK);
        } else if (
          listeActes?.[0]?.nature !==
          requeteDelivrance?.evenement?.natureActe?.libelle
        ) {
          message = [
            getLibelle(
              "La nature de l'acte sélectionné ne correspond pas à la nature de l'acte demandé. Voulez-vous continuer ?"
            )
          ];
          setBoutonsPopin(boutonsOuiNon);
        }
      } else {
        message = [
          getLibelle("Veuillez sélectionner un et un seul acte à délivrer.")
        ];
        setBoutonsPopin(boutonOK);
      }
    }
    setMessagesBloquant(message);
  };

  const handleDelivrerMenu = async (indexMenu: number) => {
    switch (indexMenu) {
      case INDEX_ACTION_CERTIFICAT_SITUATION:
        setOperationEnCours(true);
        setInscriptions(
          props.inscriptions
            ? supprimerNullEtUndefinedDuTableau(props.inscriptions)
            : []
        );
        setActes(
          props.actes ? supprimerNullEtUndefinedDuTableau(props.actes) : []
        );
        break;
      case INDEX_ACTION_COPIE_INTEGRALE:
      case INDEX_ACTION_EXTRAIT_AVEC_FILIATION:
      case INDEX_ACTION_EXTRAIT_SANS_FILIATION:
      case INDEX_ACTION_EXTRAIT_PLURILINGUE:
      case INDEX_ACTION_COPIE_ARCHIVE:
        const listeActes = supprimerNullEtUndefinedDuTableau(props.actes);
        const listeInscriptions = supprimerNullEtUndefinedDuTableau(
          props.inscriptions
        );
        setChoixDelivrance(delivrerOptions[indexMenu].choixDelivrance);
        controleCoherenceEntreDocumentSelectionneEtActionDelivrer(
          indexMenu,
          listeActes,
          listeInscriptions
        );
        // La redirection (cf. useEffect) s'effectue uniquement s'il n'y a pas de
        // message bloquant (cf. state) de la part de 'controleCoherenceEntreDocumentSelectionneEtActionDelivrer'
        break;
    }
  };

  /////////////////////////////////////
  // DELIVRANCE CI,EC, Extraits (avec/sans fil., plurilingue), (Copie archive)
  /////////////////////////////////////

  // Le contrôle de cohérence a eu lieu
  useEffect(() => {
    if (messagesBloquant && messagesBloquant.length === 0) {
      // Le contrôle de cohérence a eu lieu et pas de message bloquant
      setOperationEnCours(true);
      // Déclanche le hook de mise à jour du choix de délivrance
      setParamUpdateChoixDelivrance({
        requete: props.requete as IRequeteDelivrance,
        choixDelivrance
      });
    }
  }, [messagesBloquant, choixDelivrance, props.requete]);

  // La mise à jour du choix de délivrance a été effectuée (cf.)
  useEffect(() => {
    if (idRequete) {
      if (
        (props.requete as IRequeteDelivrance).sousType ===
        SousTypeDelivrance.RDC
      ) {
        history.push(
          `${getUrlWithoutIdParam(
            history.location.pathname
          )}/${PATH_APERCU_COURRIER}/${idRequete}`
        );
      } else {
        const url = receUrl.getUrlApercuTraitementAPartirDe(
          history.location.pathname
        );
        receUrl.replaceUrl(history, url);
      }
    }
  }, [idRequete, history, props.requete]);

  /////////////////////////////////////
  // Certificat de situation
  /////////////////////////////////////
  useEffect(() => {
    if (resultDeliverCertificatSituation) {
      setOperationEnCours(false);
      const url = receUrl.getUrlApercuTraitementAPartirDe(
        history.location.pathname
      );
      receUrl.replaceUrl(history, url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDeliverCertificatSituation, history]);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
      />
      <MenuAction
        titre={getLibelle("Délivrer")}
        listeActions={filtrerListeActions(
          props.requete as IRequeteDelivrance,
          delivrerOptions
        )}
        onSelect={handleDelivrerMenu}
      />
      {nonVide(messagesBloquant) && (
        <ConfirmationPopin
          isOpen={true}
          // @ts-ignore messagesBloquant est forcément !== undefined
          messages={messagesBloquant}
          boutons={boutonsPopin}
        />
      )}
    </>
  );
};

interface IChoixDelivrance {
  choixDelivrance?: ChoixDelivrance;
}

type ActionOptionAvecChoixDelivrance = IActionOption & IChoixDelivrance;

function getBoutonOK(
  setMessagesBloquant: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >
): IBoutonPopin[] {
  return [
    {
      label: getLibelle("OK"),
      action: () => {
        setMessagesBloquant(undefined);
      }
    }
  ];
}

function getBoutonsOuiNon(
  setMessagesBloquant: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >
): IBoutonPopin[] {
  return [
    {
      label: getLibelle("Oui"),
      action: () => {
        setMessagesBloquant([]);
      }
    },
    {
      label: getLibelle("Non"),
      action: () => {
        setMessagesBloquant(undefined);
      }
    }
  ];
}

function getOptionsMenuDelivrer(
  refDelivrerOptions0: React.MutableRefObject<null>
): ActionOptionAvecChoixDelivrance[] {
  return [
    {
      value: INDEX_ACTION_CERTIFICAT_SITUATION,
      label: getLibelle("Certificat de situation"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refDelivrerOptions0
    },
    {
      value: INDEX_ACTION_COPIE_INTEGRALE,
      label: getLibelle("Copie intégrale"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE
    },
    {
      value: INDEX_ACTION_EXTRAIT_AVEC_FILIATION,
      label: getLibelle("Extrait avec filiation"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0,
      // attribut supplémentaire pour trouver facilement le choix de délivrance en fonction de l'index du menu sélectionné
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    },
    {
      value: INDEX_ACTION_EXTRAIT_SANS_FILIATION,
      label: getLibelle("Extrait sans filiation"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION
    },
    {
      value: INDEX_ACTION_EXTRAIT_PLURILINGUE,
      label: getLibelle("Extrait plurilingue"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE
    },
    {
      value: INDEX_ACTION_COPIE_ARCHIVE,
      label: getLibelle("Copie archive (118)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0,
      choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE
    }
  ];
}

export function unActeEtUnSeulSelectionne(
  listeActes?: any[],
  listeInscriptions?: any[]
) {
  return listeActes?.length === 1 && listeInscriptions?.length === 0;
}

export function estChoixExtraitAvecOuSansFiliation(indexMenu: number) {
  return (
    indexMenu === INDEX_ACTION_EXTRAIT_AVEC_FILIATION ||
    indexMenu === INDEX_ACTION_EXTRAIT_SANS_FILIATION
  );
}

export function nonVide(messages?: string[]) {
  return messages !== undefined && messages.length > 0;
}
