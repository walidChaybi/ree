import { Droit } from "@model/agent/enum/Droit";
import { useContext, useMemo, useState } from "react";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import AfficherMessage from "../../../../utils/AfficherMessage";
import Bouton from "../../../commun/bouton/Bouton";
import ConteneurModale from "../../../commun/conteneurs/modale/ConteneurModale";
import SignatureDocument from "../../../commun/signature/SignatureDocument";

interface IBoutonTerminerEtSignerProps {
  saisieMentionEnCours: boolean;
}

const BoutonTerminerEtSigner: React.FC<IBoutonTerminerEtSignerProps> = ({ saisieMentionEnCours }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const { idActe, idRequete, miseAJourEffectuee } = useContext(EditionMiseAJourContext.Valeurs);
  const { setEstActeSigne, desactiverBlocker, changerOnglet } = useContext(EditionMiseAJourContext.Actions);
  const aDroitSigner = useMemo<boolean>(
    () => utilisateurConnecte.estHabilitePour({ tousLesDroits: [Droit.SIGNER_MENTION, Droit.METTRE_A_JOUR_ACTE] }),
    [utilisateurConnecte]
  );
  const [modaleOuverte, setModaleOuverte] = useState<boolean>(false);

  if (!aDroitSigner) return <></>;

  return (
    <>
      <Bouton
        type="button"
        title="Terminer et signer"
        onClick={() => setModaleOuverte(true)}
        disabled={saisieMentionEnCours || !miseAJourEffectuee}
      >
        {"Terminer et signer"}
      </Bouton>

      {modaleOuverte && (
        <ConteneurModale>
          <div className="border-3 w-[34rem] max-w-full rounded-xl border-solid border-bleu-sombre bg-blanc p-5">
            <h2 className="m-0 mb-4 text-center font-medium text-bleu-sombre">{"Signature des mentions"}</h2>
            <SignatureDocument
              typeSignature="MISE_A_JOUR"
              idActe={idActe}
              idRequete={idRequete}
              apresSignature={(succes: boolean) => {
                setModaleOuverte(false);
                if (!succes) return;

                changerOnglet(ECleOngletsMiseAJour.ACTE, null);
                setEstActeSigne(true);
                AfficherMessage.succes("L'acte a été mis à jour avec succès.", { fermetureAuto: true });
                desactiverBlocker();
              }}
            />
          </div>
        </ConteneurModale>
      )}
    </>
  );
};

export default BoutonTerminerEtSigner;
