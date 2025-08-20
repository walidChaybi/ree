import { deleteDocumentComplementaire } from "@api/appels/requeteApi";
import { IGenerationECParams, useGenerationEC } from "@hook/generation/generationECHook/generationECHook";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { getParamsCreationEC } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopieUtils";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MdAdd, MdClear } from "react-icons/md";
import { EditionDelivranceContext } from "../../../../../contexts/EditionDelivranceContextProvider";
import Bouton from "../../../../commun/bouton/Bouton";
import PageChargeur from "../../../../commun/chargeurs/PageChargeur";

interface IBoutonAjoutSuppressionDocumentProps {
  documentsDelivrance: {
    principal: IDocumentReponse | null;
    secondaire: IDocumentReponse | null;
  };
  naviguerVersOngletAjoute: () => void;
  styleBouton?: string;
}

const BoutonAjoutSuppressionDocument: React.FC<IBoutonAjoutSuppressionDocumentProps> = ({
  documentsDelivrance,
  naviguerVersOngletAjoute,
  styleBouton
}) => {
  const { requete, acte, rechargerRequete } = useContext(EditionDelivranceContext);
  const boutonDisponible = useMemo(
    () =>
      !ChoixDelivrance.estReponseSansDelivrance(requete.choixDelivrance) &&
      requete.choixDelivrance !== ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE &&
      !requete.provenanceRequete?.provenancePlanete &&
      StatutRequete.TRANSMISE_A_VALIDEUR !== requete.statutCourant.statut &&
      !SousTypeDelivrance.estRDDP(requete.sousType) &&
      Boolean(requete.documentsReponses.length),
    [requete]
  );
  const ajoutDocument = useMemo(() => !documentsDelivrance.secondaire, [documentsDelivrance]);
  const listeDocuments = useMemo(
    () =>
      [
        {
          cle: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE),
          libelle: "Copie intégrale"
        },
        ...(acte?.nature !== NatureActe.DECES
          ? [
              {
                cle: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION),
                libelle: "Extrait avec filiation"
              },
              {
                cle: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION),
                libelle: "Extrait sans filiation"
              }
            ]
          : []),
        {
          cle: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE),
          libelle: "Extrait plurilingue"
        }
      ].filter(item => item.cle !== documentsDelivrance.principal?.typeDocument),
    [documentsDelivrance, acte]
  );
  const [menuOuvert, setMenuOuvert] = useState<boolean>(false);

  //TOREFACTO: Utilier le useFetch
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [creationECParams, setCreationECParams] = useState<IGenerationECParams>();
  const resulatEC = useGenerationEC(creationECParams);

  useEffect(() => {
    if (!resulatEC) {
      return;
    }

    setCreationECParams(undefined);
    setOperationEnCours(false);
    rechargerRequete("requete", naviguerVersOngletAjoute);
  }, [resulatEC]);

  const ajouterDocument = useCallback(
    (typeDocument: string) => {
      setOperationEnCours(true);
      setCreationECParams(getParamsCreationEC(typeDocument, requete, { acte: acte ?? undefined }));
    },
    [requete, acte]
  );

  const supprimerDocument = useCallback(() => {
    if (operationEnCours || !documentsDelivrance.secondaire) {
      return;
    }

    setOperationEnCours(true);
    deleteDocumentComplementaire(documentsDelivrance.secondaire.id, requete.id)
      .then(() => rechargerRequete("requete"))
      .finally(() => setOperationEnCours(false));
  }, [operationEnCours, documentsDelivrance.secondaire, requete.id, rechargerRequete]);

  return boutonDisponible ? (
    <>
      {operationEnCours && <PageChargeur />}
      <div
        className="group relative"
        onMouseLeave={() => setMenuOuvert(false)}
      >
        <Bouton
          className={`${styleBouton} flex items-center justify-center border-dashed group-hover:text-blanc ${ajoutDocument ? "group-hover:bg-bleu" : "group-hover:bg-rouge"}`}
          styleBouton={ajoutDocument ? "secondaire" : "suppression"}
          title={ajoutDocument ? "Ajouter un document" : `Supprimer ${documentsDelivrance.secondaire?.nom}`}
          aria-label={ajoutDocument ? "Ajouter un document" : `Supprimer ${documentsDelivrance.secondaire?.nom}`}
          onClick={() => (ajoutDocument ? setMenuOuvert(!menuOuvert) : supprimerDocument())}
        >
          {ajoutDocument ? (
            <MdAdd
              className="text-2xl"
              aria-label="Ajouter"
            />
          ) : (
            <MdClear
              className="text-2xl"
              aria-label="Supprimer"
            />
          )}
        </Bouton>

        {ajoutDocument && menuOuvert && (
          <div className="absolute left-0 top-full z-10 animate-apparition overflow-hidden rounded-md rounded-tl-none bg-blanc shadow-lg">
            {listeDocuments.map(itemListe => (
              <button
                key={itemListe.cle}
                className="duration-250 m-0 block w-full whitespace-nowrap rounded-none bg-bleu px-8 py-2.5 text-left font-sans font-semibold normal-case text-blanc no-underline transition-opacity ease-in-out hover:opacity-75"
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
