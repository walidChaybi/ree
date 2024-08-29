import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { DEUX, UN, ZERO } from "@util/Utils";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../contexts/EditionDelivranceContextProvider";
import OngletsBouton from "../../../commun/onglets/OngletsBouton";
import BoutonAjoutSuppressionDocument from "./BoutonAjoutSuppressionDocument";
import ConteneurVoletEdition from "./ConteneurVoletEdition";
import VoletCourrier from "./VoletCourrier";
import VoletDocumentDelivre from "./VoletDocumentDelivre";

enum ECleOngletDocuments {
  COURRIER = "courrier",
  PRINCIPAL = "principal",
  SECONDAIRE = "secondaire"
}

const documentsDelivranceTries = (
  documents: IDocumentReponse[],
  choixDelivrance: ChoixDelivrance
): IDocumentReponse[] => {
  const enumDocumentPrincipal = DocumentDelivrance.getEnumForCode(
    ChoixDelivrance.getCodeDocumentDelivranceFromChoixDelivrance(
      choixDelivrance
    )
  );

  return documents
    .filter(
      doc => !DocumentDelivrance.estCourrierDelivranceEC(doc.typeDocument)
    )
    .map(doc => ({
      ...doc,
      ordre:
        DocumentDelivrance.getEnumForUUID(doc.typeDocument) ===
        enumDocumentPrincipal
          ? UN
          : DEUX
    }))
    .sort((docA, docB) => (docA.ordre > docB.ordre ? UN : -UN));
};

const PartieDocuments: React.FC = () => {
  const { requete } = useContext(EditionDelivranceContext);

  const documentsDelivrance = useMemo(() => {
    const documents = documentsDelivranceTries(
      requete.documentsReponses,
      requete.choixDelivrance as ChoixDelivrance
    );

    return {
      principal: documents[ZERO] ?? null,
      secondaire: documents[UN] ?? null
    };
  }, [requete]);
  const onglets = useMemo(
    () => [
      {
        cle: ECleOngletDocuments.COURRIER,
        libelle: "Courrier"
      },
      ...(documentsDelivrance.principal
        ? [
            {
              cle: ECleOngletDocuments.PRINCIPAL,
              libelle: documentsDelivrance.principal.nom
            }
          ]
        : []),
      ...(documentsDelivrance.secondaire
        ? [
            {
              cle: ECleOngletDocuments.SECONDAIRE,
              libelle: documentsDelivrance.secondaire.nom
            }
          ]
        : [])
    ],
    [documentsDelivrance]
  );
  const [ongletActif, setOngletActif] = useState<ECleOngletDocuments>(
    ECleOngletDocuments.COURRIER
  );
  const [ajoutEffectue, setAjoutEffectue] = useState<boolean>(false);

  useEffect(() => {
    if (onglets.find(onglet => onglet.cle === ongletActif)) {
      return;
    }

    setOngletActif(
      onglets.find(onglet => onglet.cle === ECleOngletDocuments.PRINCIPAL)
        ?.cle ?? ECleOngletDocuments.COURRIER
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onglets]);

  useEffect(() => {
    if (
      !ajoutEffectue ||
      !documentsDelivrance.secondaire ||
      ongletActif === ECleOngletDocuments.SECONDAIRE
    ) {
      return;
    }

    setOngletActif(ECleOngletDocuments.SECONDAIRE);
    setAjoutEffectue(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentsDelivrance, ajoutEffectue]);

  return (
    <div className="volet-documents">
      <OngletsBouton
        onglets={onglets}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) =>
          setOngletActif(valeur as ECleOngletDocuments)
        }
        boutonAjout={
          <BoutonAjoutSuppressionDocument
            documentsDelivrance={documentsDelivrance}
            naviguerVersOngletAjoute={() => setAjoutEffectue(true)}
          />
        }
      />

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletDocuments.COURRIER}
      >
        <VoletCourrier />
      </ConteneurVoletEdition>

      {documentsDelivrance.principal && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletDocuments.PRINCIPAL}
        >
          <VoletDocumentDelivre
            documentDelivre={documentsDelivrance.principal}
          />
        </ConteneurVoletEdition>
      )}

      {documentsDelivrance.secondaire && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletDocuments.SECONDAIRE}
        >
          <VoletDocumentDelivre
            documentDelivre={documentsDelivrance.secondaire}
          />
        </ConteneurVoletEdition>
      )}
    </div>
  );
};

export default PartieDocuments;
