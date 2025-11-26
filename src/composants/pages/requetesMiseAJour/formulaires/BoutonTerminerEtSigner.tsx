import { Droit } from "@model/agent/enum/Droit";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { useContext, useState } from "react";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import AfficherMessage from "../../../../utils/AfficherMessage";
import Bouton from "../../../commun/bouton/Bouton";
import ConteneurModale from "../../../commun/conteneurs/modale/ConteneurModale";
import SignatureDocument from "../../../commun/signature/SignatureDocument";
import { estActeEligibleDoubleNumerique } from "../droitsMiseAJourUtils";

interface IBoutonTerminerEtSignerProps {
  saisieMentionEnCours: boolean;
  acte: FicheActe | null;
}

const BoutonTerminerEtSigner: React.FC<IBoutonTerminerEtSignerProps> = ({ saisieMentionEnCours, acte }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const { idActe, idRequete, miseAJourEffectuee } = useContext(EditionMiseAJourContext.Valeurs);
  const { setEstActeSigne, desactiverBlocker, changerOnglet } = useContext(EditionMiseAJourContext.Actions);
  const [modaleOuverte, setModaleOuverte] = useState(false);

  const typeSignature = acte && estActeEligibleDoubleNumerique(acte) ? "DOUBLE_NUMERIQUE" : "MISE_A_JOUR";

  const aDroitSigner = utilisateurConnecte.estHabilitePour({ tousLesDroits: [Droit.SIGNER_MENTION, Droit.METTRE_A_JOUR_ACTE] });

  if (!aDroitSigner) return <></>;

  return (
    <>
      <Bouton
        type="button"
        title="Terminer et signer"
        disabled={saisieMentionEnCours || !miseAJourEffectuee}
        onClick={() => setModaleOuverte(true)}
      >
        {"Terminer et signer"}
      </Bouton>
      {modaleOuverte && (
        <ConteneurModale fermerModale={() => setModaleOuverte(false)}>
          <div className="border-3 w-[34rem] max-w-full rounded-xl border-solid border-bleu-sombre bg-blanc p-5">
            <h2 className="m-0 mb-4 text-center font-medium text-bleu-sombre">Signature des mentions</h2>
            <SignatureDocument
              typeSignature={typeSignature}
              idActe={idActe}
              idRequete={idRequete}
              apresSignature={succes => {
                setModaleOuverte(false);
                if (succes) {
                  changerOnglet(ECleOngletsMiseAJour.ACTE, null);
                  setEstActeSigne(true);
                  AfficherMessage.succes("L'acte a été mis à jour avec succès.", { fermetureAuto: true });
                  desactiverBlocker();
                }
              }}
            />
          </div>
        </ConteneurModale>
      )}
    </>
  );
};

export default BoutonTerminerEtSigner;
