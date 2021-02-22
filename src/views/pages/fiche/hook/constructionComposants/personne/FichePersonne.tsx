import React from "react";
import {
  IPersonne,
  Personne
} from "../../../../../../model/etatcivil/commun/IPersonne";
import { IFamille } from "../../../../../../model/etatcivil/commun/IFamille";
import { IFicheLienActes } from "../../../../../../model/etatcivil/commun/IFicheLienActes";
import { IFicheLien } from "../../../../../../model/etatcivil/commun/IFicheLien";
import { AccordionPanelProps } from "../../../../../common/widget/accordion/AccordionPanel";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { AccordionContentProps } from "../../../../../common/widget/accordion/AccordionContent";
import { LienFiche } from "../../../LienFiche";
import {
  formatDe,
  enMajuscule,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../../../../common/util/Utils";
import { TypeFiche } from "../../../../../../model/etatcivil/enum/TypeFiche";
import { AccordionContentPartProps } from "../../../../../common/widget/accordion/AccordionPartContent";
import { getLibelle } from "../../../../../common/widget/Text";

export function getFichesPersonne(
  personnes: IPersonne[]
): AccordionPanelProps[] {
  return personnes.map((personne, index) => {
    return {
      panelAreas: [
        {
          parts: [
            getInformationsPersonne(personne),
            {
              subParts: [
                getInformationsParents(personne),
                getInformationsEnfants(personne)
              ]
            },
            {
              subParts: [
                getInformationsListeActes(personne),
                getInformationsListeInscriptions(personne)
              ]
            }
          ],
          nbColonne: 3
        }
      ],
      title: getLibelle(`Fiche Personne ${index + 1}`)
    };
  });
}

function getInformationsListeInscriptions(
  personne: IPersonne
): AccordionContentPartProps {
  return {
    contents: [
      getRcsPersonne(Personne.getRcs(personne)),
      getRcasPersonne(Personne.getRcas(personne)),
      getPacssPersonne(Personne.getPacss(personne))
    ],
    title: getLibelle("Liste d'inscriptions")
  };
}

function getInformationsListeActes(
  personne: IPersonne
): AccordionContentPartProps {
  return {
    contents: [getActesPersonne(Personne.getActes(personne))],
    title: getLibelle("Liste d'actes")
  };
}

function getInformationsParents(
  personne: IPersonne
): AccordionContentPartProps {
  return {
    contents: [...getParentsPersonne(Personne.getParents(personne))],
    title: getLibelle("Parents")
  };
}

function getInformationsEnfants(
  personne: IPersonne
): AccordionContentPartProps {
  return {
    contents: [getEnfantsPersonne(Personne.getEnfants(personne))],
    title: getLibelle("Enfants")
  };
}

function getInformationsPersonne(personne: IPersonne): AccordionPartProps {
  return {
    contentsPart: {
      contents: [
        getNomPersonne(Personne.getNom(personne)),
        getAutresNomsPersonne(Personne.getAutresNoms(personne)),
        getPrenomsPersonne(Personne.getPrenoms(personne)),
        getAutresPrenomsPersonne(Personne.getAutresPrenom(personne)),
        getLieuNaissance(Personne.getLieuNaissance(personne)),
        getDateNaissance(Personne.getDateNaissance(personne)),
        getNationalitePersonne(Personne.getNationalite(personne)),
        getSexePersonne(Personne.getSexe(personne)),
        getLieuDeces(Personne.getLieuDeces(personne)),
        getDateDeces(Personne.getDateDeces(personne))
      ],
      title: getLibelle("Personne")
    }
  };
}

function getNomPersonne(nom: string): AccordionContentProps {
  return {
    libelle: getLibelle("Nom"),
    value: nom
  };
}

function getAutresNomsPersonne(autresNom: string): AccordionContentProps {
  return {
    libelle: getLibelle("Autres noms"),
    value: autresNom
  };
}

function getPrenomsPersonne(prenoms: string): AccordionContentProps {
  return {
    libelle: getLibelle("Prénoms"),
    value: prenoms
  };
}

function getAutresPrenomsPersonne(
  autresPrenoms: string
): AccordionContentProps {
  return {
    libelle: getLibelle("Autres prénoms"),
    value: autresPrenoms
  };
}

function getLieuNaissance(lieuNaissance: string): AccordionContentProps {
  return {
    libelle: getLibelle("Lieu de naissance"),
    value: lieuNaissance
  };
}

function getLieuDeces(lieuDeces: string): AccordionContentProps {
  return {
    libelle: getLibelle("Lieu décès (si connu)"),
    value: lieuDeces
  };
}

function getDateNaissance(dateNaissance: string): AccordionContentProps {
  return {
    libelle: getLibelle("Né(e) le"),
    value: dateNaissance
  };
}

function getDateDeces(dateDeces: string): AccordionContentProps {
  return {
    libelle: getLibelle("Date décès (si connu)"),
    value: dateDeces
  };
}

function getNationalitePersonne(nationalite: string): AccordionContentProps {
  return {
    libelle: getLibelle("Nationalité"),
    value: nationalite
  };
}

function getSexePersonne(sexe: string): AccordionContentProps {
  return {
    libelle: getLibelle("Sexe"),
    value: sexe
  };
}

function getParentsPersonne(parents: IFamille[]): AccordionContentProps[] {
  let result: AccordionContentProps[] = [];
  const indexPremierParentAdoptif = 2;
  const indexDeuxiemeParentAdoptif = 3;

  parents.forEach((parent, index) => {
    if (index === 0 || index === 1) {
      result = result.concat([
        {
          libelle: getLibelle(`Nom parent ${index + 1}`),
          value: enMajuscule(parent.nom)
        },
        {
          libelle: getLibelle(`Prénom parent ${index + 1}`),
          value: premiereLettreEnMajusculeLeResteEnMinuscule(parent.prenoms[0])
        }
      ]);
    } else if (
      index === indexPremierParentAdoptif ||
      index === indexDeuxiemeParentAdoptif
    ) {
      result = result.concat([
        {
          libelle: getLibelle(`Prénom et nom (parent adoptif ${index - 1})`),
          value: `${premiereLettreEnMajusculeLeResteEnMinuscule(
            parent.prenoms[0]
          )} ${enMajuscule(parent.nom)}`
        }
      ]);
    }
  });
  return result;
}

function getEnfantsPersonne(enfants: IFamille[]): AccordionContentProps {
  const enfantsHtml = enfants.map(enfant => {
    return (
      <p key={`enfant-${enfant.nom}-${enfant.prenoms}`}>{`${enMajuscule(
        enfant.nom
      )} ${premiereLettreEnMajusculeLeResteEnMinuscule(enfant.prenoms[0])}`}</p>
    );
  });

  return {
    libelle: getLibelle("Liste enfants"),
    value: enfantsHtml,
    className: "contentDownside"
  };
}

function getActesPersonne(actes: IFicheLienActes[]): AccordionContentProps {
  const liensActes = actes.map(acte => (
    <div key={`acte-${acte.numero}`}>
      <LienFiche
        categorie={TypeFiche.ACTE}
        numero={`Acte ${formatDe(
          acte.nature.libelle
        )}${acte.nature.libelle.toLocaleLowerCase()} N°${acte.numero}`}
        identifiant={acte.id}
      />
    </div>
  ));
  return {
    libelle: "",
    value: liensActes
  };
}

function getRcsPersonne(rcs: IFicheLien[]): AccordionContentProps {
  const liensRcs = rcs.map(rc => (
    <div key={`rc-${rc.numero}`}>
      <LienFiche
        categorie={TypeFiche.RC}
        numero={`Inscription RC N°${rc.numero}`}
        identifiant={rc.id}
      />
    </div>
  ));
  return {
    libelle: "",
    value: liensRcs
  };
}

function getRcasPersonne(rcas: IFicheLien[]): AccordionContentProps {
  const liensRcas = rcas.map(rca => (
    <div key={`rca-${rca.numero}`}>
      <LienFiche
        categorie={TypeFiche.RCA}
        numero={`Inscription RCA N°${rca.numero}`}
        identifiant={rca.id}
      />
    </div>
  ));
  return {
    libelle: "",
    value: liensRcas
  };
}

function getPacssPersonne(pacss: IFicheLien[]): AccordionContentProps {
  const liensPacss = pacss.map(pacs => (
    <div key={`pacs-${pacs.numero}`}>
      <LienFiche
        categorie={TypeFiche.PACS}
        numero={`Inscription PACS N°${pacs.numero}`}
        identifiant={pacs.id}
      />
    </div>
  ));
  return {
    libelle: "",
    value: liensPacss
  };
}
