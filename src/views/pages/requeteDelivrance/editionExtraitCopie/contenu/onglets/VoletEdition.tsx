import React, { useCallback, useContext, useEffect, useState } from "react";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { MentionsRetirees } from "../../../../../../model/requete/enum/MentionsRetirees";
import { Validation } from "../../../../../../model/requete/enum/Validation";
import { IDocumentReponse } from "../../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { IResultatSauvegarderMentions } from "../../../../../common/hook/acte/mentions/SauvegarderMentionsHook";
import { checkDirty } from "../../../../../common/util/Utils";
import { RECEContext } from "../../../../../core/body/Body";
import { getOngletsEdition } from "../../EditionExtraitCopieUtils";
import { OngletProps, VoletAvecOnglet } from "../VoletAvecOnglet";

interface VoletEditionProps {
  requete: IRequeteDelivrance;
  document: IDocumentReponse;
  acte?: IFicheActe;
  handleCourrierEnregistre: () => void;
  sauvegarderDocument: (document: IDocumentReponse) => void;
}

export const VoletEdition: React.FC<VoletEditionProps> = props => {
  const { isDirty, setIsDirty } = useContext(RECEContext);

  const afficherDocument = useCallback(
    (resultat: IResultatSauvegarderMentions) => {
      const futureDoc = { ...props.document };
      futureDoc.id = resultat.idDoc;
      futureDoc.mentionsRetirees = resultat.mentionsRetirees.map(el => {
        return { idMention: el } as MentionsRetirees;
      });
      futureDoc.validation = Validation.O;
      props.sauvegarderDocument(futureDoc);
      setIsDirty(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.document, setIsDirty]
  );

  const [{ liste, ongletSelectionne }, setOnglets] = useState<OngletProps>(
    getOngletsEdition(
      afficherDocument,
      props.handleCourrierEnregistre,
      props.requete,
      props.document,
      props.acte
    )
  );

  useEffect(() => {
    setOnglets(
      getOngletsEdition(
        afficherDocument,
        props.handleCourrierEnregistre,
        props.requete,
        props.document,
        props.acte
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [afficherDocument, props.document, props.acte]);

  const handleChange = useCallback(
    (event: any, newValue: string) => {
      if (isDirty !== undefined && setIsDirty) {
        if (checkDirty(isDirty, setIsDirty)) {
          setOnglets({
            liste,
            ongletSelectionne: parseInt(newValue)
          });
        }
      } else {
        setOnglets({
          liste,
          ongletSelectionne: parseInt(newValue)
        });
      }
    },
    [isDirty, liste, setIsDirty]
  );

  return (
    <div className="side Edition">
      <VoletAvecOnglet
        liste={liste}
        ongletSelectionne={ongletSelectionne}
        handleChange={handleChange}
      />
    </div>
  );
};
