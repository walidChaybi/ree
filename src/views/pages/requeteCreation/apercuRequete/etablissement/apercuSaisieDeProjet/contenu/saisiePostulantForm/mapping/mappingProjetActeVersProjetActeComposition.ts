import { IProjetActeComposition } from "@model/composition/acte/IProjetActeComposition";
import { IMentionComposition } from "@model/composition/IMentionComposition";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";

export function mappingProjetActeVersProjetActeComposition(acteEnregistre: IProjetActe): IProjetActeComposition {
  const projetActeComposition = {} as IProjetActeComposition;
  const { nature, titulaires, mentions, corpsTexte, analyseMarginales } = acteEnregistre;
  const titulaire = titulaires[0];
  const analyseMarginal = analyseMarginales?.[0].titulaires[0];
  let mentionsComposition = [] as IMentionComposition[];
  mentions?.forEach(mention => {
    mentionsComposition = [
      ...mentionsComposition,
      {
        mention: mention?.textes.texteMention,
        numero: mention?.numeroOrdre
      }
    ];
  });
  projetActeComposition.nature_acte = nature;
  projetActeComposition.titulaires_AM = [
    {
      ordre: titulaire.ordre,
      nom: analyseMarginal?.nom,
      prenoms: analyseMarginal?.prenoms?.join(", ")
    }
  ];
  projetActeComposition.mentions = mentionsComposition;
  projetActeComposition.texte_corps_acte = corpsTexte?.texte;
  return projetActeComposition;
}
