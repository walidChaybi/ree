import {
  IEnregistrerAnalyseMarginaleEtMentionDto,
  IEvenementMention,
  IPersonneLieeDto
} from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { nettoyerAttributsDto } from "@model/commun/dtoUtils";
import { IAnalyseMarginaleMiseAJour, IMentionMiseAJour } from "../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import AnalyseMarginaleForm from "../AnalyseMarginale/AnalyseMarginaleForm";
import { TObjetFormulaire, TValeurFormulaire } from "../commun/ObjetFormulaire";

const getEvenementMention = (champs?: TObjetFormulaire): IEvenementMention | undefined => {
  const champEvenement = Object.entries(champs ?? {}).find(([cle]) => cle.includes("evenement"))?.[1] as TObjetFormulaire;

  if (!Object.keys(champEvenement ?? {}).length) return undefined;

  const estDate = (valeur: TValeurFormulaire): valeur is { jour: string; mois: string; annee: string } =>
    Object.keys(valeur ?? {}).includes("annee");

  const evenement = Object.entries(champEvenement).reduce<IEvenementMention>(
    (evenement: IEvenementMention, [cleEvenement, valeurEvenement]) => {
      if (!valeurEvenement) return evenement;

      if (valeurEvenement === "France") {
        return { ...evenement, pays: "France" };
      }

      if (!evenement.pays && cleEvenement.includes("pays")) {
        return { ...evenement, pays: valeurEvenement as string };
      }

      if (!evenement.ville && cleEvenement.includes("ville")) {
        return { ...evenement, ville: valeurEvenement as string };
      }

      if (cleEvenement.includes("arrondissement")) {
        return { ...evenement, arrondissement: valeurEvenement as string };
      }

      if (cleEvenement.includes("departement")) {
        return { ...evenement, departement: valeurEvenement as string };
      }

      if (estDate(valeurEvenement)) {
        return {
          ...evenement,
          jour: valeurEvenement.jour || null,
          mois: valeurEvenement.mois || null,
          annee: valeurEvenement.annee || null
        };
      }

      return evenement;
    },
    {
      jour: null,
      mois: null,
      annee: null,
      ville: null,
      arrondissement: null,
      departement: null,
      pays: null
    }
  );

  return evenement.annee ? evenement : undefined;
};

const getPersonneLiee = (champs?: TObjetFormulaire): IPersonneLieeDto | undefined => {
  const champPersonneLiee = Object.entries(champs ?? {}).find(([cle]) =>
    ["personnesConcernees", "conjoint", "exConjoint", "partenaire"].includes(cle)
  )?.[1] as TObjetFormulaire;

  if (!Object.keys(champPersonneLiee ?? {}).length) return undefined;

  const personneLiee = Object.entries(champPersonneLiee).reduce<IPersonneLieeDto>(
    (personneLiee: IPersonneLieeDto, [clePersonneLiee, valeurPersonneLiee]) => {
      if (!valeurPersonneLiee) return personneLiee;

      if (clePersonneLiee === "nom") {
        return { ...personneLiee, nom: valeurPersonneLiee as string };
      }

      if (clePersonneLiee === "prenoms") {
        return { ...personneLiee, prenoms: valeurPersonneLiee as string };
      }

      return personneLiee;
    },
    {
      nom: null,
      prenoms: null
    }
  );

  return personneLiee.nom ? personneLiee : undefined;
};

const MiseAJourForm = {
  versDto: (
    idActe: string,
    mentions: IMentionMiseAJour[],
    analyseMarginale: IAnalyseMarginaleMiseAJour | null,
    analyseMarginaleModifiee: boolean
  ): IEnregistrerAnalyseMarginaleEtMentionDto =>
    nettoyerAttributsDto<IEnregistrerAnalyseMarginaleEtMentionDto>({
      idActe: idActe,
      mentionCreationList: mentions?.map((mention, index) => ({
        idTypeMention: mention.idTypeMention,
        numeroOrdre: index + 1,
        texteMention: mention.texte,
        evenement: getEvenementMention(mention.donneesAideSaisie?.champs),
        personneLiee: getPersonneLiee(mention.donneesAideSaisie?.champs),
        estSaisieAssistee: Boolean(Object.keys(mention.donneesAideSaisie?.champs ?? {}).length)
      })),
      analyseMarginale: analyseMarginaleModifiee ? AnalyseMarginaleForm.versDto(analyseMarginale) : null
    })
};

export default MiseAJourForm;
