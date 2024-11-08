import { compositionApi } from "@api/appels/compositionApi";
import { getDonneesPourCompositionActeTexte } from "@api/appels/etatcivilApi";
import { getDocumentReponseById } from "@api/appels/requeteApi";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../contexts/EditionDelivranceContextProvider";
import AlertesActe from "../../../commun/actes/AlertesActe";
import AffichagePDF from "../../../commun/affichageDocument/AffichagePDF";
import OngletsBouton from "../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "./ConteneurVoletEdition";
import VoletRequete from "./VoletRequete";

enum ECleOngletRequete {
  ACTE = "acte",
  REQUETE = "requete",
  COURRIER_EDITE = "courrier-edite",
}

const PartieActeRequete: React.FC = () => {
  const { requete, acte } = useContext(EditionDelivranceContext);
  const [ongletActif, setOngletActif] = useState<string>(
    acte ? ECleOngletRequete.ACTE : ECleOngletRequete.REQUETE,
  );
  const [contenuActe, setContenuActe] = useState<string | null>(null);
  const [contenuCourrier, setContenuCourrier] = useState<string | null>(null);
  const documentCourrier = useMemo(
    () =>
      requete.documentsReponses
        .filter((doc) =>
          DocumentDelivrance.estCourrierDelivranceEC(doc.typeDocument),
        )
        .shift(),
    [requete],
  );

  useEffect(() => {
    if (!documentCourrier) {
      return;
    }

    getDocumentReponseById(documentCourrier.id).then((data) =>
      setContenuCourrier(data.body.data.contenu ?? ""),
    );
  }, [documentCourrier]);

  useEffect(() => {
    if (contenuActe !== null || !acte) {
      return;
    }

    getDonneesPourCompositionActeTexte(acte.id).then((data) => {
      compositionApi
        .getCompositionActeTexte(data.body)
        .then((dataComposition) =>
          setContenuActe(dataComposition.body.data.contenu ?? ""),
        );
    });
  }, [contenuActe, acte]);

  return (
    <div className="w-5/12">
      <OngletsBouton
        onglets={[
          ...(acte
            ? [
                {
                  cle: ECleOngletRequete.ACTE,
                  libelle: "Acte registre",
                },
              ]
            : []),
          {
            cle: ECleOngletRequete.REQUETE,
            libelle: "Requête",
          },
          ...(documentCourrier
            ? [
                {
                  cle: ECleOngletRequete.COURRIER_EDITE,
                  libelle: "Courrier édité",
                },
              ]
            : []),
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) => setOngletActif(valeur)}
      />

      {acte && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletRequete.ACTE}
        >
          <AlertesActe />
          <AffichagePDF contenuBase64={contenuActe} />
        </ConteneurVoletEdition>
      )}

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletRequete.REQUETE}
      >
        <VoletRequete requete={requete} />
      </ConteneurVoletEdition>

      {documentCourrier && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletRequete.COURRIER_EDITE}
        >
          <AffichagePDF contenuBase64={contenuCourrier} />
        </ConteneurVoletEdition>
      )}
    </div>
  );
};

export default PartieActeRequete;
