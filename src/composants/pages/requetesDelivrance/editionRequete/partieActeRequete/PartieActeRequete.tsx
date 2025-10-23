import { CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE } from "@api/configurations/requete/documentsReponses/GetDocumentsReponseDelivranceConfigApi";
import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import VisionneuseActe from "@composant/visionneuseActe/VisionneuseActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import React, { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../../contexts/EditionDelivranceContextProvider";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import { EMimeType } from "../../../../../ressources/EMimeType";
import AffichageDocument from "../../../../commun/affichageDocument/AffichageDocument";
import OngletsBouton from "../../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../ConteneurVoletEdition";
import VoletRequete from "./VoletRequete";

export enum ECleOngletRequete {
  ACTE = "acte",
  REQUETE = "requete",
  COURRIER_EDITE = "courrier-edite"
}

interface IPartieActeRequeteProps {
  ongletActif: string;
  setOngletActif: Dispatch<SetStateAction<string>>;
}

const PartieActeRequete: React.FC<IPartieActeRequeteProps> = React.memo(({ ongletActif, setOngletActif }) => {
  const { requete, acte } = useContext(EditionDelivranceContext);

  const [contenuCourrier, setContenuCourrier] = useState<string | null>(null);

  const idDocumentCourrier = useMemo(
    () => requete.documentsReponses.filter(doc => DocumentDelivrance.estCourrierDelivranceEC(doc.typeDocument)).shift()?.id,
    [requete]
  );

  const { appelApi: getDocumentReponse } = useFetchApi(CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE);

  useEffect(() => {
    if (!idDocumentCourrier) return;

    getDocumentReponse({
      parametres: { path: { idDocumentReponse: idDocumentCourrier } },
      apresSucces: document => setContenuCourrier(document.contenu)
    });
  }, [idDocumentCourrier]);

  return (
    <div className="w-1/2">
      <OngletsBouton
        onglets={[
          ...(acte
            ? [
                {
                  cle: ECleOngletRequete.ACTE,
                  libelle: "Acte registre"
                }
              ]
            : []),
          {
            cle: ECleOngletRequete.REQUETE,
            libelle: "Requête"
          },
          ...(idDocumentCourrier
            ? [
                {
                  cle: ECleOngletRequete.COURRIER_EDITE,
                  libelle: "Courrier édité"
                }
              ]
            : [])
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) => setOngletActif(valeur)}
      />

      {acte && (
        <ConteneurVoletEdition estActif={ongletActif === ECleOngletRequete.ACTE}>
          <div className="flex flex-col gap-2">
            <AlertesActes idActeInit={acte?.id} />

            <VisionneuseActe
              idActe={acte.id}
              estReecrit={acte.estReecrit ?? false}
              typeActe={acte.type}
            />
          </div>
        </ConteneurVoletEdition>
      )}

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletRequete.REQUETE}
        estScrollable
      >
        <VoletRequete requete={requete} />
      </ConteneurVoletEdition>

      {idDocumentCourrier && (
        <ConteneurVoletEdition estActif={ongletActif === ECleOngletRequete.COURRIER_EDITE}>
          <AffichageDocument
            contenuBase64={contenuCourrier}
            typeZoom={90}
            typeMime={EMimeType.APPLI_PDF}
          />
        </ConteneurVoletEdition>
      )}
    </div>
  );
});

export default PartieActeRequete;
