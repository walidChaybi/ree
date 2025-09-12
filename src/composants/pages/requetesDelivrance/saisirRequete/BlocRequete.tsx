import { ISaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { CodesExtraitCopie, DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { EMotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { ENatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { enumVersOptions } from "@util/Utils";
import { useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const LISTE_DOCUMENTS_DEMANDES_DECES = [ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE, ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE];
const OPTIONS_NATURE_ACTE = enumVersOptions(ENatureActeRequete);
const OPTIONS_MOTIF_DELIVRANCE = enumVersOptions(EMotifDelivrance);

const BlocRequete: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ISaisieRDCForm>();

  const optionsDocumentDemande = useMemo(
    () => [
      ...DocumentDelivrance.versOptionsDepuisCodes(
        values.requete.natureActe === "DECES" ? LISTE_DOCUMENTS_DEMANDES_DECES : CodesExtraitCopie
      )
    ],
    [values.requete.natureActe]
  );

  const gererChangementNatureActe = useCallback(() => {
    setFieldValue("evenement", {
      date: { jour: "", mois: "", annee: "" },
      ville: "",
      pays: ""
    });
  }, []);

  const gererChangementMotifDelivrance = useCallback((motif: string) => {
    motif !== "AUTRE" && setFieldValue("requete.complementMotif", "");
  }, []);

  return (
    <ConteneurAvecBordure titreEnTete="REQUÊTE">
      <div className="grid grid-cols-2 gap-2 pt-2">
        <ChampListeDeroulante
          name="requete.natureActe"
          libelle="Nature de l'acte concerné"
          options={OPTIONS_NATURE_ACTE}
          optionVideMasquee
          apresChangement={gererChangementNatureActe}
        />

        <ChampListeDeroulante
          name="requete.documentDemande"
          libelle="Document demandé"
          options={optionsDocumentDemande}
          optionVideMasquee
        />

        <ChampTexte
          name="requete.nbExemplaire"
          libelle="Nombre d'exemplaires"
          type="number"
          max={5}
          min={1}
          numerique
        />

        <ChampListeDeroulante
          name="requete.motif"
          libelle="Motif"
          options={OPTIONS_MOTIF_DELIVRANCE}
          optionVideMasquee
          apresChangement={gererChangementMotifDelivrance}
        />

        {values.requete.motif === "AUTRE" && (
          <ChampTexte
            name="requete.complementMotif"
            libelle="Complément motif"
            estObligatoire
          />
        )}
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocRequete;
