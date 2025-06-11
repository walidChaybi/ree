import { CONFIG_GET_MODELE_TEXTE } from "@api/configurations/etatCivil/acte/transcription/GetModeleTexteConfigApi";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import messageManager from "@util/messageManager";
import { useContext, useEffect, useMemo, useState } from "react";
import { SaisieProjetActeTranscritContext } from "../../../../../contexts/SaisieProjetActeTranscritContextProvider";
import { EEventState, useEventState } from "../../../../../hooks/EventHook";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import DateRECE from "../../../../../utils/DateRECE";
import ModeleTexte, { EModeleTexteDocument } from "../../../../../utils/ModeleTexte";
import ComposantChargeur from "../../../../commun/chargeurs/ComposantChargeur";
import ConteneurDocument from "../../../../commun/conteneurs/ConteneurDocument";
import DocumentTexte from "../../../../commun/conteneurs/DocumentTexte";

const ApercuProjetActe: React.FC = () => {
  const { requete } = useContext(SaisieProjetActeTranscritContext);
  const { appelApi: appelGetModeleTexte, enAttenteDeReponseApi: enAttenteModeleTexte } = useFetchApi(CONFIG_GET_MODELE_TEXTE);

  const [valeurs] = useEventState<IProjetActeTranscritForm | null>(EEventState.APERCU_PROJET_ACTE, null);
  const [modeleTexte, setModeleTexte] = useState<ModeleTexte | null>(null);

  const titreActe = useMemo(() => {
    const { prefixeTitre, natureActe } = (() => {
      switch (requete.natureActeTranscrit) {
        case ENatureActeTranscrit.NAISSANCE_MINEUR:
        case ENatureActeTranscrit.NAISSANCE_MAJEUR:
          return { prefixeTitre: "Projet d'acte de", natureActe: "naissance" };
        case ENatureActeTranscrit.MARIAGE_AVEC_CCAM:
        case ENatureActeTranscrit.MARIAGE_SANS_CCAM:
          return { prefixeTitre: "Projet d'acte de", natureActe: "mariage" };
        case ENatureActeTranscrit.DECES:
          return { prefixeTitre: "Projet d'acte de", natureActe: "décès" };
        default:
          return { prefixeTitre: "Projet d'acte", natureActe: "<nature acte>" };
      }
    })();

    return `${prefixeTitre} ${natureActe}`;
  }, [requete.natureActeTranscrit]);

  const pagesTexteActe = useMemo(() => {
    if (!valeurs || !modeleTexte) return { pages: {}, total: 0 };

    const acteTexteParPage = modeleTexte.genererParPage(valeurs, { tailleLigne: 84, ligneParPage: 45 });

    return { pages: acteTexteParPage, total: Object.keys(acteTexteParPage).length };
  }, [valeurs, modeleTexte]);

  useEffect(() => {
    const typeModelTexteRequete = (() => {
      switch (requete.natureActeTranscrit) {
        case ENatureActeTranscrit.NAISSANCE_MINEUR:
        case ENatureActeTranscrit.NAISSANCE_MAJEUR:
          return EModeleTexteDocument.PROJET_NAISSANCE_MINEUR;
        case ENatureActeTranscrit.MARIAGE_AVEC_CCAM:
        case ENatureActeTranscrit.MARIAGE_SANS_CCAM:
          return EModeleTexteDocument.PROJET_MARIAGE;
        case ENatureActeTranscrit.DECES:
          return EModeleTexteDocument.PROJET_DECES;
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

      {Boolean(pagesTexteActe.total) && (
        <ConteneurDocument>
          <div className="grid gap-10">
            {Object.entries(pagesTexteActe.pages).map(([clePage, lignes], indexPage) => (
              <DocumentTexte key={clePage}>
                <div className="flex w-full flex-col justify-between gap-4 text-start">
                  <div>
                    {indexPage === 0 && <div className="text-center">{titreActe}</div>}

                    {lignes.map((ligne, indexLigne) => (
                      <div
                        key={`${clePage}-${indexLigne}-${ligne}`}
                        dangerouslySetInnerHTML={{ __html: ligne.length ? ligne : "<br/>" }}
                      ></div>
                    ))}
                  </div>

                  <div>{`${requete.numeroDossier ?? "<REFERENCE.ACTE.TRANSCRIT>"} - ${DateRECE.depuisTimestamp(Date.now()).format()} - ${indexPage + 1}/${pagesTexteActe.total}`}</div>
                </div>
              </DocumentTexte>
            ))}
          </div>
        </ConteneurDocument>
      )}
    </div>
  );
};

export default ApercuProjetActe;
