import { deleteDocumentComplementaire } from "@api/appels/requeteApi";
import {
  IGenerationECParams,
  useGenerationEC
} from "@hook/generation/generationECHook/generationECHook";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import {
  CODE_COPIE_INTEGRALE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
} from "@model/requete/enum/DocumentDelivranceConstante";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import Add from "@mui/icons-material/Add";
import Clear from "@mui/icons-material/Clear";
import { getParamsCreationEC } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopieUtils";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../contexts/EditionDelivranceContextProvider";
import PageChargeur from "../../../commun/chargeurs/PageChargeur";

interface IBoutonAjoutSuppressionDocumentProps {
  documentsDelivrance: {
    principal: IDocumentReponse | null;
    secondaire: IDocumentReponse | null;
  };
  naviguerVersOngletAjoute: () => void;
}

const BoutonAjoutSuppressionDocument: React.FC<
  IBoutonAjoutSuppressionDocumentProps
> = ({ documentsDelivrance, naviguerVersOngletAjoute }) => {
  const { requete, acte, rechargerRequete } = useContext(
    EditionDelivranceContext
  );
  const boutonDisponible = useMemo(
    () =>
      !ChoixDelivrance.estReponseSansDelivrance(requete.choixDelivrance) &&
      requete.choixDelivrance !== ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE &&
      !requete.provenanceRequete.provenancePlanete &&
      StatutRequete.TRANSMISE_A_VALIDEUR !== requete.statutCourant.statut &&
      !SousTypeDelivrance.estRDDP(requete.sousType) &&
      Boolean(requete.documentsReponses.length),
    [requete]
  );
  const ajoutDocument = useMemo(
    () => !documentsDelivrance.secondaire,
    [documentsDelivrance]
  );
  const listeDocuments = useMemo(
    () =>
      [
        {
          cle: DocumentDelivrance.getKeyForCode(CODE_COPIE_INTEGRALE),
          libelle: "Copie intégrale"
        },
        ...(acte?.nature !== NatureActe.DECES
          ? [
              {
                cle: DocumentDelivrance.getKeyForCode(
                  CODE_EXTRAIT_AVEC_FILIATION
                ),
                libelle: "Extrait avec filiation"
              },
              {
                cle: DocumentDelivrance.getKeyForCode(
                  CODE_EXTRAIT_SANS_FILIATION
                ),
                libelle: "Extrait sans filiation"
              }
            ]
          : []),
        {
          cle: DocumentDelivrance.getKeyForCode(CODE_EXTRAIT_PLURILINGUE),
          libelle: "Extrait plurilingue"
        }
      ].filter(
        item => item.cle !== documentsDelivrance.principal?.typeDocument
      ),
    [documentsDelivrance, acte]
  );
  const [menuOuvert, setMenuOuvert] = useState<boolean>(false);

  /** Remplacer par UseFetch */
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [creationECParams, setCreationECParams] =
    useState<IGenerationECParams>();
  const resulatEC = useGenerationEC(creationECParams);
  useEffect(() => {
    if (!resulatEC) {
      return;
    }

    setCreationECParams(undefined);
    setOperationEnCours(false);
    rechargerRequete();
    naviguerVersOngletAjoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resulatEC]);

  const ajouterDocument = (typeDocument: string) => {
    setOperationEnCours(true);
    setCreationECParams(
      getParamsCreationEC(typeDocument, requete, { acte: acte ?? undefined })
    );
  };

  const supprimerDocument = () => {
    if (operationEnCours || !documentsDelivrance.secondaire) {
      return;
    }

    setOperationEnCours(true);
    deleteDocumentComplementaire(documentsDelivrance.secondaire.id, requete.id)
      .then(() => rechargerRequete())
      .finally(() => setOperationEnCours(false));
  };
  /** FIN Remplacer par UseFetch */

  return boutonDisponible ? (
    <>
      {operationEnCours && <PageChargeur />}
      <div
        className="conteneur-bouton-ajout"
        onMouseLeave={() => setMenuOuvert(false)}
      >
        <button
          className="onglet-bouton bouton-ajout-document"
          type="button"
          title={
            ajoutDocument
              ? "Ajouter un document"
              : `Supprimer ${documentsDelivrance.secondaire?.nom}`
          }
          onClick={() =>
            ajoutDocument ? setMenuOuvert(!menuOuvert) : supprimerDocument()
          }
        >
          {ajoutDocument ? <Add /> : <Clear />}
        </button>

        {ajoutDocument && menuOuvert && (
          <div className="menu-ajout-document">
            {listeDocuments.map(itemListe => (
              <button
                key={itemListe.cle}
                className="bouton-menu-ajout"
                type="button"
                onClick={() => ajouterDocument(itemListe.cle)}
              >
                {itemListe.libelle}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

export default BoutonAjoutSuppressionDocument;
