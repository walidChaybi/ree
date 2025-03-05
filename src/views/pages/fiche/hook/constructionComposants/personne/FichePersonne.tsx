import { IFamille } from "@model/etatcivil/commun/IFamille";
import { IFicheLien } from "@model/etatcivil/commun/IFicheLien";
import { IFicheLienActes } from "@model/etatcivil/commun/IFicheLienActes";
import { IPersonne, Personne, PersonneUtils } from "@model/etatcivil/commun/Personne";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { remplaceSNP, remplaceSPC } from "@util/Utils";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPanelAreaProps } from "@widget/section/SectionPanelArea";
import { SectionPartProps } from "@widget/section/SectionPart";
import { SectionPartContentProps } from "@widget/section/SectionPartContent";
import { LienFiche } from "../../../LienFiche";
import { IParamsAffichage } from "../acte/FicheActeUtils";

export function getFichesPersonneActe(personnes: IPersonne[], paramsAffichage: IParamsAffichage) {
  if (paramsAffichage.personnes === "visible") {
    return getFichesPersonne(personnes);
  } else if (paramsAffichage.personnes === "disabled") {
    return [
      {
        panelAreas: [],
        title: `Fiche Personne`
      }
    ];
  } else {
    // paramsAffichage.personnes === "none"
    return [];
  }
}

// TOREFACTO: les types IPersonne et Personne cohabitent. IPersonne est vouée à disparaitre lorsque le mapping de acte sera typé
export function getFichesPersonne(personnes: IPersonne[] | Personne[]): SectionPanelProps[] {
  return personnes.map((personne, index) => {
    return {
      panelAreas: getPanelAreasFichesPersonnes(personne),
      title: `Fiche Personne ${index + 1}`
    };
  });
}

function getPanelAreasFichesPersonnes(personne: IPersonne | Personne): SectionPanelAreaProps[] {
  return [
    {
      parts: [
        getInformationsPersonne(personne),
        {
          subParts: [getInformationsParents(personne), getInformationsEnfants(personne)]
        },
        {
          subParts: [getInformationsListeActes(personne), getInformationsListeInscriptions(personne)]
        }
      ],
      nbColonne: 3
    }
  ];
}

function getInformationsListeInscriptions(personne: IPersonne | Personne): SectionPartContentProps {
  if (personne instanceof Personne) {
    return {
      contents: [getRcsPersonne(personne.rcs), getRcasPersonne(personne.rcas), getPacssPersonne(personne.pacss)],
      title: "Liste d'inscriptions"
    };
  } else {
    return {
      contents: [
        getRcsPersonne(PersonneUtils.getRcs(personne)),
        getRcasPersonne(PersonneUtils.getRcas(personne)),
        getPacssPersonne(PersonneUtils.getPacss(personne))
      ],
      title: "Liste d'inscriptions"
    };
  }
}

function getInformationsListeActes(personne: IPersonne | Personne): SectionPartContentProps {
  if (personne instanceof Personne) {
    return {
      contents: [getActesPersonne(personne.actes)],
      title: "Liste d'actes"
    };
  } else {
    return {
      contents: [getActesPersonne(PersonneUtils.getActes(personne))],
      title: "Liste d'actes"
    };
  }
}

function getInformationsParents(personne: IPersonne | Personne): SectionPartContentProps {
  if (personne instanceof Personne) {
    return {
      contents: [...getParentsPersonne(personne.parents)],
      title: "Parents"
    };
  } else {
    return {
      contents: [...getParentsPersonne(PersonneUtils.getParents(personne))],
      title: "Parents"
    };
  }
}

function getInformationsEnfants(personne: IPersonne | Personne): SectionPartContentProps {
  if (personne instanceof Personne) {
    return {
      contents: [getEnfantsPersonne(personne.enfants)],
      title: "Enfants"
    };
  } else {
    return {
      contents: [getEnfantsPersonne(PersonneUtils.getEnfants(personne))],
      title: "Enfants"
    };
  }
}

function getInformationsPersonne(personne: IPersonne | Personne): SectionPartProps {
  if (personne instanceof Personne) {
    return {
      partContent: {
        contents: [
          getNomPersonne(personne.nom),
          getAutresNomsPersonne(personne.autresNoms),
          getPrenomsPersonne(personne.prenoms),
          getAutresPrenomsPersonne(personne.autresPrenoms),
          getLieuNaissance(personne.lieuNaissance),
          getDateNaissance(personne.dateNaissance),
          getNationalitePersonne(personne.nationalite.libelle),
          getSexePersonne(personne.sexe.libelle),
          getLieuDeces(personne.lieuDeces),
          getDateDeces(personne.dateDeces)
        ],
        title: "Personne"
      }
    };
  } else {
    return {
      partContent: {
        contents: [
          getNomPersonne(PersonneUtils.getNom(personne)),
          getAutresNomsPersonne(PersonneUtils.getAutresNoms(personne)),
          getPrenomsPersonne(PersonneUtils.getPrenoms(personne)),
          getAutresPrenomsPersonne(PersonneUtils.getAutresPrenom(personne)),
          getLieuNaissance(PersonneUtils.getLieuNaissance(personne)),
          getDateNaissance(PersonneUtils.getDateNaissance(personne)),
          getNationalitePersonne(PersonneUtils.getNationalite(personne)),
          getSexePersonne(PersonneUtils.getSexe(personne)),
          getLieuDeces(PersonneUtils.getLieuDeces(personne)),
          getDateDeces(PersonneUtils.getDateDeces(personne))
        ],
        title: "Personne"
      }
    };
  }
}

function getNomPersonne(nom: string): SectionContentProps {
  return {
    libelle: "Nom",
    value: nom
  };
}

function getAutresNomsPersonne(autresNom: string): SectionContentProps {
  return {
    libelle: "Autres noms",
    value: autresNom
  };
}

function getPrenomsPersonne(prenoms: string): SectionContentProps {
  return {
    libelle: "Prénoms",
    value: prenoms
  };
}

function getAutresPrenomsPersonne(autresPrenoms: string): SectionContentProps {
  return {
    libelle: "Autres prénoms",
    value: autresPrenoms
  };
}

function getLieuNaissance(lieuNaissance: string): SectionContentProps {
  return {
    libelle: "Lieu de naissance",
    value: lieuNaissance
  };
}

function getLieuDeces(lieuDeces: string): SectionContentProps {
  return {
    libelle: "Lieu décès",
    value: lieuDeces
  };
}

function getDateNaissance(dateNaissance: string): SectionContentProps {
  return {
    libelle: "Né(e) le",
    value: dateNaissance
  };
}

function getDateDeces(dateDeces: string): SectionContentProps {
  return {
    libelle: "Date décès",
    value: dateDeces
  };
}

function getNationalitePersonne(nationalite: string): SectionContentProps {
  return {
    libelle: "Nationalité",
    value: nationalite
  };
}

function getSexePersonne(sexe: string): SectionContentProps {
  return {
    libelle: "Sexe",
    value: sexe
  };
}

function getParentsPersonne(parents: IFamille[]): SectionContentProps[] {
  let result: SectionContentProps[] = [];
  const indexPremierParentAdoptif = 2;
  const indexDeuxiemeParentAdoptif = 3;

  parents?.forEach((parent, index) => {
    if (index === 0 || index === 1) {
      result = result.concat([
        {
          libelle: `Nom parent ${index + 1}`,
          value: parent.nom
        },
        {
          libelle: `Prénom parent ${index + 1}`,
          value: remplaceSPC(parent.prenoms[0])
        }
      ]);
    } else if (index === indexPremierParentAdoptif || index === indexDeuxiemeParentAdoptif) {
      result = result.concat([
        {
          libelle: `Prénom et nom (parent adoptif ${index - 1})`,
          value: `${remplaceSPC(parent.prenoms[0])} ${remplaceSNP(parent.nom)}`
        }
      ]);
    }
  });
  return result;
}

function getEnfantsPersonne(enfants: IFamille[]): SectionContentProps {
  const enfantsHtml = enfants?.map(enfant => {
    return <p key={`enfant-${enfant.nom}-${enfant.prenoms}`}>{`${remplaceSNP(enfant.nom)} ${remplaceSPC(enfant.prenoms[0])}`}</p>;
  });

  return {
    value: enfantsHtml,
    className: "contentDownside"
  };
}

function getActesPersonne(actes: IFicheLienActes[]): SectionContentProps {
  const liensActes = actes?.map(acte => (
    <div key={`acte-${acte.numero}`}>
      <LienFiche
        categorie={TypeFiche.ACTE}
        numero={acte.referenceComplete}
        identifiant={acte.id}
      />
    </div>
  ));
  return {
    libelle: "",
    value: liensActes
  };
}

function getRcsPersonne(rcs: IFicheLien[]): SectionContentProps {
  const liensRcs = rcs?.map(rc => {
    return (
      <div key={`rc-${rc.numero}`}>
        <LienFiche
          categorie={TypeFiche.RC}
          numero={rc.referenceComplete}
          identifiant={rc.id}
        />
      </div>
    );
  });
  return {
    libelle: "",
    value: liensRcs
  };
}

function getRcasPersonne(rcas: IFicheLien[]): SectionContentProps {
  const liensRcas = rcas?.map(rca => {
    return (
      <div key={`rca-${rca.numero}`}>
        <LienFiche
          categorie={TypeFiche.RCA}
          numero={rca.referenceComplete}
          identifiant={rca.id}
        />
      </div>
    );
  });
  return {
    libelle: "",
    value: liensRcas
  };
}

function getPacssPersonne(pacss: IFicheLien[]): SectionContentProps {
  const liensPacss = pacss?.map(pacs => {
    return (
      <div key={`pacs-${pacs.numero}`}>
        <LienFiche
          categorie={TypeFiche.PACS}
          numero={pacs.referenceComplete}
          identifiant={pacs.id}
        />
      </div>
    );
  });
  return {
    libelle: "",
    value: liensPacss
  };
}
