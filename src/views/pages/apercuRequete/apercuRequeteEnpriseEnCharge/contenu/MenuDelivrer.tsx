import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
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
import {
  PATH_APERCU_COURRIER_ACCOMPAGNEMENT,
  receUrl
} from "../../../../router/ReceUrls";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { IActionProps } from "./ChoixAction";
import { useDelivrerCertificatSituationHook } from "./hook/DelivrerCertificatSituationHook";

export const MenuDelivrer: React.FC<IActionProps> = props => {
  const history = useHistory();

  const refDelivrerOptions0 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [acteSelected, setActeSelected] = useState<IResultatRMCActe[]>();
  const [inscriptionSelected, setInscriptionSelected] =
    useState<IResultatRMCInscription[]>();
  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [boutonsPopin, setBoutonsPopin] = useState<IBoutonPopin[]>();

  const INDEX_ACTION_CERTIFICAT_SITUATION = 0;
  const INDEX_ACTION_COPIE_INTEGRALE = 1;
  const INDEX_ACTION_EXTRAIT_AVEC_FILIATION = 2;
  const INDEX_ACTION_EXTRAIT_SANS_FILIATION = 3;
  const INDEX_ACTION_EXTRAIT_PLURILINGUE = 4;
  const INDEX_ACTION_COPIE_ARCHIVE = 5;

  const boutonOK: IBoutonPopin[] = [
    {
      label: getLibelle("OK"),
      action: () => {
        setMessagesBloquant(undefined);
      }
    }
  ];

  const boutonsOuiNon: IBoutonPopin[] = [
    {
      label: getLibelle("Oui"),
      action: () => {
        const url = receUrl.getUrlApercuTraitementAPartirDe(
          history.location.pathname
        );
        receUrl.replaceUrl(history, url);
      }
    },
    {
      label: getLibelle("Non"),
      action: () => {
        setMessagesBloquant(undefined);
      }
    }
  ];

  const delivrerOptions: IActionOption[] = [
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
      ref: refDelivrerOptions0
    },
    {
      value: INDEX_ACTION_EXTRAIT_AVEC_FILIATION,
      label: getLibelle("Extrait avec filiation"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0
    },
    {
      value: INDEX_ACTION_EXTRAIT_SANS_FILIATION,
      label: getLibelle("Extrait sans filiation"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0
    },
    {
      value: INDEX_ACTION_EXTRAIT_PLURILINGUE,
      label: getLibelle("Extrait plurilingue"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0
    },
    {
      value: INDEX_ACTION_COPIE_ARCHIVE,
      label: getLibelle("Copie archive (118)"),
      sousTypes: [SousTypeDelivrance.RDC, SousTypeDelivrance.RDD],
      ref: refDelivrerOptions0
    }
  ];

  const resultDeliverCertificatSituation = useDelivrerCertificatSituationHook(
    mappingRequeteDelivranceToRequeteTableau(
      props.requete as IRequeteDelivrance
    ),
    inscriptionSelected,
    acteSelected
  );

  const controleCoherenceDocument = async (indexMenu: number) => {
    const requeteDelivrance = props.requete as IRequeteDelivrance;
    const sousType = requeteDelivrance?.sousType?.nom;
    const actes = supprimerNullEtUndefinedDuTableau(props.acteSelected);
    if (
      sousType === SousTypeDelivrance.RDC.nom ||
      sousType === SousTypeDelivrance.RDD.nom
    ) {
      if (actes?.length === 1) {
        if (
          (indexMenu === INDEX_ACTION_EXTRAIT_AVEC_FILIATION ||
            indexMenu === INDEX_ACTION_EXTRAIT_SANS_FILIATION) &&
          actes?.[0]?.nature === TypeNatureActe.DECES.libelle
        ) {
          setMessagesBloquant([
            getLibelle(
              "Pas de délivrance d'extrait avec ou sans filiation pour un acte de décès."
            )
          ]);
          setBoutonsPopin(boutonOK);
        } else if (
          props.acteSelected?.[0]?.nature !==
          requeteDelivrance?.evenement?.natureActe?.libelle
        ) {
          setMessagesBloquant([
            getLibelle(
              "La nature de l'acte sélectionné ne correspond pas à la nature de l'acte demandé. Voulez-vous continuer ?"
            )
          ]);
          setBoutonsPopin(boutonsOuiNon);
        }
      } else {
        setMessagesBloquant([
          getLibelle("Veuillez sélectionner un et un seul acte à délivrer.")
        ]);
        setBoutonsPopin(boutonOK);
      }
    }
  };

  const handleDelivrerMenu = async (indexMenu: number) => {
    if (indexMenu === 0) {
      setInscriptionSelected(
        props.inscriptionSelected
          ? supprimerNullEtUndefinedDuTableau(props.inscriptionSelected)
          : []
      );
      setActeSelected(
        props.acteSelected
          ? supprimerNullEtUndefinedDuTableau(props.acteSelected)
          : []
      );
      setOperationEnCours(true);
    } else {
      controleCoherenceDocument(indexMenu);
    }
    if (
      (props.requete as IRequeteDelivrance).sousType === SousTypeDelivrance.RDC
    ) {
      history.push(
        `${getUrlWithoutIdParam(
          history.location.pathname
        )}/${PATH_APERCU_COURRIER_ACCOMPAGNEMENT}/${props.requete.id}`
      );
    }
  };

  useEffect(() => {
    if (resultDeliverCertificatSituation) {
      const url = receUrl.getUrlApercuTraitementAPartirDe(
        history.location.pathname
      );
      receUrl.replaceUrl(history, url, props.dataHistory);
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
      {messagesBloquant && (
        <ConfirmationPopin
          isOpen={true}
          messages={messagesBloquant}
          boutons={boutonsPopin}
        />
      )}
    </>
  );
};
