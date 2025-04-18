import { CONFIG_GET_MODELE_TEXTE } from "@api/configurations/etatCivil/acte/transcription/GetModeleTexteConfigApi";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import messageManager from "@util/messageManager";
import { useEffect, useMemo, useState } from "react";
import { EEventState, useEventState } from "../../../../../hooks/EventHook";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import DateRECE from "../../../../../utils/DateRECE";
import ModeleTexte, { EModeleTexteDocument } from "../../../../../utils/ModeleTexte";
import ComposantChargeur from "../../../../commun/chargeurs/ComposantChargeur";
import ConteneurDocument from "../../../../commun/conteneurs/ConteneurDocument";
import DocumentTexte from "../../../../commun/conteneurs/DocumentTexte";

interface IApercuProjetActeProps {
  requete: IRequeteCreationTranscription;
}

const ApercuProjetActe: React.FC<IApercuProjetActeProps> = ({ requete }) => {
  const titreActe = useMemo(() => {
    const natureActe = (() => {
      switch (requete.natureActeTranscrit) {
        case ENatureActeTranscrit.NAISSANCE_MINEUR:
        case ENatureActeTranscrit.NAISSANCE_MAJEUR:
          return "NAISSANCE";
        case ENatureActeTranscrit.MARIAGE_AVEC_CCAM:
        case ENatureActeTranscrit.MARIAGE_SANS_CCAM:
          return "MARIAGE";
        case ENatureActeTranscrit.DECES:
          return "DÉCÈS";
        default:
          return "<NATURE ACTE>";
      }
    })();

    return `PROJET D'ACTE DE ${natureActe}`;
  }, [requete.natureActeTranscrit]);
  const { appelApi: appelGetModeleTexte, enAttenteDeReponseApi: enAttenteModeleTexte } = useFetchApi(CONFIG_GET_MODELE_TEXTE);
  const [valeurs] = useEventState<IProjetActeTranscritForm | null>(EEventState.APERCU_PROJET_ACTE, null);
  const [modeleTexte, setModeleTexte] = useState<ModeleTexte | null>(null);
  const texteActe = useMemo(() => (valeurs && modeleTexte ? modeleTexte.generer(valeurs) : ""), [valeurs, modeleTexte]);

  useEffect(() => {
    const typeModelTexteRequete = (() => {
      switch (requete.natureActeTranscrit) {
        case ENatureActeTranscrit.NAISSANCE_MINEUR:
        case ENatureActeTranscrit.NAISSANCE_MAJEUR:
          return EModeleTexteDocument.PROJET_NAISSANCE_MINEUR;
        default:
          return null;
      }
    })();

    if (!typeModelTexteRequete) return;

    const modelTexteRequete = ModeleTexte.getModeleTexteDocument(typeModelTexteRequete);
    if (modelTexteRequete) {
      setModeleTexte(ModeleTexte.creer(modelTexteRequete));

      return;
    }

    appelGetModeleTexte({
      parametres: { path: { modeleTexte: typeModelTexteRequete } },
      apresSucces: donneesModeleTexte => {
        ModeleTexte.enregistrerModeleTexteDocument(donneesModeleTexte.natureProjet, donneesModeleTexte.modeleTexte);
        setModeleTexte(ModeleTexte.creer(donneesModeleTexte.modeleTexte));
      },
      apresErreur: () => {
        messageManager.showErrorAndClose("Erreur lors de la récupération du modèle texte du projet d'acte");
      }
    });
  }, [requete.natureActeTranscrit]);

  return (
    <div className="h-full">
      {enAttenteModeleTexte && <ComposantChargeur />}

      {texteActe && (
        <ConteneurDocument>
          <DocumentTexte>
            <div className="flex w-full flex-col justify-between gap-4 text-start">
              <div>
                <div className="text-center">{titreActe}</div>

                <div dangerouslySetInnerHTML={{ __html: texteActe }}></div>
              </div>

              <div>{`${requete.numeroDossier ?? "<REFERENCE.ACTE.TRANSCRIT>"} - ${DateRECE.depuisTimestamp(requete.dateCreation).format()}`}</div>
            </div>
          </DocumentTexte>
        </ConteneurDocument>
      )}
    </div>
  );
};

export default ApercuProjetActe;
