import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { DEUX, UN, ZERO } from "@util/Utils";
import React, { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../../contexts/EditionDelivranceContextProvider";
import OngletsBouton from "../../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../ConteneurVoletEdition";
import BoutonAjoutSuppressionDocument from "../boutons/BoutonAjoutSuppressionDocument";
import VoletCourrier from "./voletCourrier/VoletCourrier";
import VoletDocumentDelivre from "./voletDocuments/VoletDocumentDelivre";

export enum ECleOngletDocuments {
  COURRIER = "courrier",
  PRINCIPAL = "principal",
  SECONDAIRE = "secondaire"
}

interface IPartieDocumentsProps {
  ongletActif: string;
  setOngletActif: Dispatch<SetStateAction<string>>;
}

const documentsDelivranceTries = (documents: IDocumentReponse[], choixDelivrance: ChoixDelivrance): IDocumentReponse[] => {
  const enumDocumentPrincipal = DocumentDelivrance.getEnumForCode(
    ChoixDelivrance.getCodeDocumentDelivranceFromChoixDelivrance(choixDelivrance)
  );

  return documents
    .filter(doc => !DocumentDelivrance.estCourrierDelivranceEC(doc.typeDocument))
    .map(doc => ({
      ...doc,
      ordre: DocumentDelivrance.getEnumForUUID(doc.typeDocument) === enumDocumentPrincipal ? UN : DEUX
    }))
    .sort((docA, docB) => (docA.ordre > docB.ordre ? UN : -UN));
};

const PartieDocuments: React.FC<IPartieDocumentsProps> = React.memo(({ ongletActif, setOngletActif }) => {
  const { requete } = useContext(EditionDelivranceContext);

  const documentsDelivrance = useMemo(() => {
    const documents = documentsDelivranceTries(requete.documentsReponses, requete.choixDelivrance as ChoixDelivrance);

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

  const [ajoutEffectue, setAjoutEffectue] = useState<boolean>(false);

  useEffect(() => {
    // Lorsque la liste d'onglets change, si il y à un onglet actif alors rien
    if (onglets.find(onglet => onglet.cle === ongletActif)) {
      return;
    }
    //sinon on cherche un onglet appela "principal" pour le rendre actif. Si il n'existe pas, on focus sur Courrier

    setOngletActif(onglets.find(onglet => onglet.cle === ECleOngletDocuments.PRINCIPAL)?.cle ?? ECleOngletDocuments.COURRIER);
  }, [onglets]);

  useEffect(() => {
    if (!ajoutEffectue || !documentsDelivrance.secondaire || ongletActif === ECleOngletDocuments.SECONDAIRE) {
      return;
    }

    setOngletActif(ECleOngletDocuments.SECONDAIRE);
    setAjoutEffectue(false);
  }, [documentsDelivrance, ajoutEffectue]);

  return (
    <div className="w-7/12">
      <OngletsBouton
        onglets={onglets}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) => setOngletActif(valeur)}
        renderBoutonAjout={(styleBouton?: string) => (
          <BoutonAjoutSuppressionDocument
            documentsDelivrance={documentsDelivrance}
            naviguerVersOngletAjoute={() => setAjoutEffectue(true)}
            styleBouton={styleBouton}
          />
        )}
      />

      <ConteneurVoletEdition estActif={ongletActif === ECleOngletDocuments.COURRIER}>
        <VoletCourrier />
      </ConteneurVoletEdition>

      {documentsDelivrance.principal && (
        <ConteneurVoletEdition estActif={ongletActif === ECleOngletDocuments.PRINCIPAL}>
          <VoletDocumentDelivre
            documentDelivre={documentsDelivrance.principal}
            resetOngletActif={ongletActif !== ECleOngletDocuments.PRINCIPAL}
          />
        </ConteneurVoletEdition>
      )}

      {documentsDelivrance.secondaire && (
        <ConteneurVoletEdition estActif={ongletActif === ECleOngletDocuments.SECONDAIRE}>
          <VoletDocumentDelivre
            documentDelivre={documentsDelivrance.secondaire}
            resetOngletActif={ongletActif !== ECleOngletDocuments.SECONDAIRE}
          />
        </ConteneurVoletEdition>
      )}
    </div>
  );
});

export default PartieDocuments;
