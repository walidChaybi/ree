import { FicheUtil } from "@model/etatcivil/enum/TypeFiche";
import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { IInteresse } from "@model/etatcivil/rcrca/IInteresse";
import DateUtils from "@util/DateUtils";
import { triListeObjetsSurPropriete } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPartProps } from "@widget/section/SectionPart";
import { Mariage } from "./Mariage";

export function getInteresse(rcrca: IFicheRcRca): SectionPartProps[] {
  const sortedInteresses = triListeObjetsSurPropriete(
    [...rcrca.interesses],
    "numeroOrdreSaisi"
  );

  const interessePart: SectionPartProps[] = sortedInteresses.map(interesse => {
    return {
      partContent: {
        contents: FicheUtil.isFicheRca(rcrca.categorie) ? getInteresseInfoRca(interesse) : getInteresseInfo(interesse),
        title: `Intéressé ${interesse.numeroOrdreSaisi}`
      }
    };
  });

  if (rcrca.mariageInteresses) {
    interessePart.push({
      partContent: {
        contents: [
          {
            libelle: "",
            value: <Mariage {...rcrca.mariageInteresses} />
          }
        ]
      },
      classNameContent: "mariageContainer"
    });
  }

  return interessePart;
}

function getInteresseInfoRca(interesse: IInteresse): SectionContentProps[] {
  let interesseIno = getInteresseInfo(interesse);
  if (interesse.dateDeces != null) {
    interesseIno = interesseIno.concat([
      {
        libelle: "Date de décès",
        value: interesse.dateDeces ? DateUtils.getDateStringFromDateCompose(interesse.dateDeces) : ""
      },
      {
        libelle: "Lieu de décès",
        value: LieuxUtils.getLieu(interesse.villeDeces, interesse.regionDeces, interesse.paysDeces, interesse.arrondissementDeces)
      }
    ]);
  }

  return interesseIno;
}

function getInteresseInfo(interesse: IInteresse): SectionContentProps[] {
  return [
    {
      libelle: "Nom",
      value: <span className="nom">{interesse.nomFamille || ""}</span>
    },
    {
      libelle: "Autre(s) nom(s)",
      value: <span className="nom">{interesse.autreNoms ? interesse.autreNoms.join(", ") : ""}</span>
    },
    {
      libelle: "Prénom(s)",
      value: (
        <span className="prenom">
          {interesse.prenoms
            ? triListeObjetsSurPropriete([...interesse.prenoms], "numeroOrdre")
                .map(prenom => prenom.valeur)
                .join(", ")
            : ""}
        </span>
      )
    },
    {
      libelle: "Autre(s) prénom(s)",
      value: <span className="prenom">{interesse.autrePrenoms ? interesse.autrePrenoms.join(", ") : ""}</span>
    },
    {
      libelle: "Date de naissance",
      value: interesse.dateNaissance ? DateUtils.getDateStringFromDateCompose(interesse.dateNaissance) : ""
    },
    {
      libelle: "Lieu de naissance",
      value: LieuxUtils.getLieu(
        interesse.villeNaissance,
        interesse.regionNaissance,
        interesse.paysNaissance,
        interesse.arrondissementNaissance
      )
    },
    {
      libelle: "Nationalité",
      value: interesse.nationalite || ""
    },
    {
      libelle: "Sexe",
      value: interesse.sexe || ""
    }
  ];
}
