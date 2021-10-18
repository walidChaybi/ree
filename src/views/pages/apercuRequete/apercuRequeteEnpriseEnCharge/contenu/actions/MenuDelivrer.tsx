import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../../../model/requete/v2/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { TypeNatureActe } from "../../../../../../model/requete/v2/enum/TypeNatureActe";
import { IActionOption } from "../../../../../../model/requete/v2/IActionOption";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  IActionStatutRequete,
  useCreerActionMajStatutRequete
} from "../../../../../common/hook/v2/requete/CreerActionMajStatutRequete";
import { DoubleSubmitUtil } from "../../../../../common/util/DoubleSubmitUtil";
import { filtrerListeActions } from "../../../../../common/util/RequetesUtils";
import { getUrlWithoutIdParam } from "../../../../../common/util/route/routeUtil";
import { supprimerNullEtUndefinedDuTableau } from "../../../../../common/util/Utils";
import { OperationEnCours } from "../../../../../common/widget/attente/OperationEnCours";
import { GroupeBouton } from "../../../../../common/widget/menu/GroupeBouton";
import {
  ConfirmationPopin,
  IBoutonPopin
} from "../../../../../common/widget/popin/ConfirmationPopin";
import { getLibelle } from "../../../../../common/widget/Text";
import { PATH_APERCU_COURRIER, receUrl } from "../../../../../router/ReceUrls";
import { IActionProps } from "./ChoixAction";
import {
  UpdateChoixDelivranceProps,
  useUpdateChoixDelivrance
} from "./hook/UpdateChoixDelivranceHook";

const INDEX_ACTION_COPIE_INTEGRALE = 0;
const INDEX_ACTION_EXTRAIT_AVEC_FILIATION = 1;
const INDEX_ACTION_EXTRAIT_SANS_FILIATION = 2;
const INDEX_ACTION_EXTRAIT_PLURILINGUE = 3;
const INDEX_ACTION_COPIE_ARCHIVE = 4;

export const MenuDelivrer: React.FC<IActionProps> = props => {
  const history = useHistory();
  const refDelivrerOptions0 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [actes, setActes] = useState<IResultatRMCActe[] | undefined>();
  const [inscriptions, setInscriptions] = useState<
    IResultatRMCInscription[] | undefined
  >();
  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [boutonsPopin, setBoutonsPopin] = useState<IBoutonPopin[]>();
  const [choixDelivrance, setChoixDelivrance] = useState<ChoixDelivrance>();
  const [
    paramUpdateChoixDelivrance,
    setParamUpdateChoixDelivrance
  ] = useState<UpdateChoixDelivranceProps>();

  const [
    actionStatutRequete,
    setActionStatutRequete
  ] = useState<IActionStatutRequete>();

  useEffect(() => {
    setInscriptions(
      props.inscriptions
        ? supprimerNullEtUndefinedDuTableau(props.inscriptions)
        : undefined
    );
    setActes(
      props.actes ? supprimerNullEtUndefinedDuTableau(props.actes) : undefined
    );
  }, [props.actes, props.inscriptions]);

  // 1 - Mise à jour du choix delivrance
  const idRequete = useUpdateChoixDelivrance(paramUpdateChoixDelivrance);

  // 2 - Création des paramètres pour la création de l'action
  // et la mise à jour du statut de la requête si celle-ci est une RDD
  useEffect(() => {
    if (
      idRequete &&
      (props.requete as IRequeteDelivrance).sousType === SousTypeDelivrance.RDD
    ) {
      const statutRequete =
        choixDelivrance === ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE
          ? StatutRequete.A_VALIDER
          : StatutRequete.A_SIGNER;
      setActionStatutRequete({
        libelleAction: statutRequete.libelle,
        statutRequete,
        requeteId: idRequete
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRequete]);

  // 3 -  Mise à jour du status de la requête + création d'une action
  const { idAction } = useCreerActionMajStatutRequete(actionStatutRequete);

  const resetDoubleSubmit = () => {
    listeActions.forEach(el => {
      DoubleSubmitUtil.remetPossibiliteDoubleSubmit(el.ref?.current);
    });
  };

  const boutonOK: IBoutonPopin[] = getBoutonOK(
    setMessagesBloquant,
    resetDoubleSubmit
  );
  const boutonsOuiNon: IBoutonPopin[] = getBoutonsOuiNon(
    setMessagesBloquant,
    resetDoubleSubmit
  );

  const delivrerOptions: IActionOption[] = getOptionsMenuDelivrer(
    refDelivrerOptions0
  );

  const controleCoherenceEntreDocumentSelectionneEtActionDelivrer = (
    indexMenu: number,
    listeActes: IResultatRMCActe[] | undefined,
    listeInscriptions: IResultatRMCInscription[] | undefined
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

  const handleDelivrerMenu = (indexMenu: number) => {
    setChoixDelivrance(delivrerOptions[indexMenu].choixDelivrance);
    controleCoherenceEntreDocumentSelectionneEtActionDelivrer(
      indexMenu,
      actes,
      inscriptions
    );
    // La redirection (cf. useEffect) s'effectue uniquement s'il n'y a pas de
    // message bloquant (cf. state) de la part de 'controleCoherenceEntreDocumentSelectionneEtActionDelivrer'
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

  // La mise à jour du choix de délivrance et du statut ont été effectués (cf.)
  useEffect(() => {
    if (idRequete) {
      if (
        (props.requete as IRequeteDelivrance).sousType ===
        SousTypeDelivrance.RDC
      ) {
        history.push(
          `${getUrlWithoutIdParam(
            history.location.pathname
          )}/${PATH_APERCU_COURRIER}/${idRequete}`,
          actes?.[0]
        );
      } else if (idAction) {
        // Si la requete est une RDD et que l'action est enregistré
        const url = receUrl.getUrlApercuTraitementAPartirDe(
          history.location.pathname
        );
        receUrl.replaceUrl(history, url);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRequete, idAction, history, props.requete]);

  const listeActions = filtrerListeActions(
    props.requete as IRequeteDelivrance,
    delivrerOptions
  );

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={getLibelle("Délivrer")}
        listeActions={listeActions}
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

function getBoutonOK(
  setMessagesBloquant: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >,
  resetDoubleSubmit: Function
): IBoutonPopin[] {
  return [
    {
      label: getLibelle("OK"),
      action: () => {
        setMessagesBloquant(undefined);
        resetDoubleSubmit();
      }
    }
  ];
}

function getBoutonsOuiNon(
  setMessagesBloquant: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >,
  resetDoubleSubmit: Function
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
        resetDoubleSubmit();
      }
    }
  ];
}

function getOptionsMenuDelivrer(
  refDelivrerOptions0: React.MutableRefObject<null>
): IActionOption[] {
  return [
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
