import React from "react";
import {
  IPersonne,
  Personne,
  IFamille,
  IFicheLienActes,
  IFicheLien
} from "../../contenu/personne/Personne";
import { AccordionPanelProps } from "../../../../common/widget/accordion/AccordionPanel";
import { AccordionPartProps } from "../../../../common/widget/accordion/AccordionPart";
import { AccordionContentProps } from "../../../../common/widget/accordion/AccordionContent";
import { EnumTypeSexe } from "../../../../common/util/enum/EnumSexe";
import { LienFiche } from "../../LienFiche";
import {
  formatDe,
  enMajuscule,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../../../common/util/Utils";
import { TypeFiche } from "../../../../../model/etatcivil/TypeFiche";
import { AccordionContentPartProps } from "../../../../common/widget/accordion/AccordionPartContent";

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
          className: "accordionColumn3"
        }
      ],
      title: `Fiche Personne ${index + 1}`
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
    title: "Liste d'inscriptions"
  };
}

function getInformationsListeActes(
  personne: IPersonne
): AccordionContentPartProps {
  return {
    contents: [getActesPersonne(Personne.getActes(personne))],
    title: "Liste d'actes"
  };
}

function getInformationsParents(
  personne: IPersonne
): AccordionContentPartProps {
  return {
    contents: [...getParentsPersonne(Personne.getParents(personne))],
    title: "Parents"
  };
}

function getInformationsEnfants(
  personne: IPersonne
): AccordionContentPartProps {
  return {
    contents: [getEnfantsPersonne(Personne.getEnfants(personne))],
    title: "Enfants"
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
      title: "Personne"
    }
  };
}

function getNomPersonne(nom: string): AccordionContentProps {
  return {
    libelle: "Nom",
    value: nom
  };
}

function getAutresNomsPersonne(autresNom: string): AccordionContentProps {
  return {
    libelle: "Autres noms",
    value: autresNom
  };
}

function getPrenomsPersonne(prenoms: string): AccordionContentProps {
  return {
    libelle: "Prénoms",
    value: prenoms
  };
}

function getAutresPrenomsPersonne(
  autresPrenoms: string
): AccordionContentProps {
  return {
    libelle: "Autres prénoms",
    value: autresPrenoms
  };
}

function getLieuNaissance(lieuNaissance: string): AccordionContentProps {
  return {
    libelle: "Lieu de naissance",
    value: lieuNaissance
  };
}

function getLieuDeces(lieuDeces: string): AccordionContentProps {
  return {
    libelle: "Lieu décès (si connu)",
    value: lieuDeces
  };
}

function getDateNaissance(dateNaissance: string): AccordionContentProps {
  return {
    libelle: "Né(e) le",
    value: dateNaissance
  };
}

function getDateDeces(dateDeces: string): AccordionContentProps {
  return {
    libelle: "Date décès (si connu)",
    value: dateDeces
  };
}

function getNationalitePersonne(nationalite: string): AccordionContentProps {
  return {
    libelle: "Nationalité",
    value: nationalite
  };
}

function getSexePersonne(sexe: EnumTypeSexe): AccordionContentProps {
  return {
    libelle: "Sexe",
    value: sexe.libelle
  };
}

function getParentsPersonne(parents: IFamille[]): AccordionContentProps[] {
  let result: AccordionContentProps[] = [];
  parents.forEach((parent, index) => {
    result = result.concat([
      {
        libelle: `Nom parent ${index + 1}`,
        value: enMajuscule(parent.nom)
      },
      {
        libelle: `Prénom parent ${index + 1}`,
        value: premiereLettreEnMajusculeLeResteEnMinuscule(parent.prenoms[0])
      }
    ]);
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
    libelle: `Liste enfants`,
    value: enfantsHtml,
    className: "contentDownside"
  };
}

function getActesPersonne(actes: IFicheLienActes[]): AccordionContentProps {
  const liensActes = actes.map(acte => (
    <LienFiche
      key={`acte-${acte.numero}`}
      categorie={TypeFiche.ACTE}
      numero={`Acte ${formatDe(
        acte.nature.libelle
      )}${acte.nature.libelle.toLocaleLowerCase()} N°${acte.numero}`}
      identifiant={acte.id}
    />
  ));
  return {
    libelle: "",
    value: liensActes
  };
}

function getRcsPersonne(rcs: IFicheLien[]): AccordionContentProps {
  const liensActes = rcs.map(rc => (
    <LienFiche
      key={`rc-${rc.numero}`}
      categorie={TypeFiche.RC}
      numero={`Inscription RC N°${rc.numero}`}
      identifiant={rc.id}
    />
  ));
  return {
    libelle: "",
    value: liensActes
  };
}

function getRcasPersonne(rcas: IFicheLien[]): AccordionContentProps {
  const liensActes = rcas.map(rca => (
    <LienFiche
      key={`rca-${rca.numero}`}
      categorie={TypeFiche.RCA}
      numero={`Inscription RCA N°${rca.numero}`}
      identifiant={rca.id}
    />
  ));
  return {
    libelle: "",
    value: liensActes
  };
}

function getPacssPersonne(pacss: IFicheLien[]): AccordionContentProps {
  const liensActes = pacss.map(pacs => (
    <LienFiche
      key={`pacs-${pacs.numero}`}
      categorie={TypeFiche.PACS}
      numero={`Inscription PACS N°${pacs.numero}`}
      identifiant={pacs.id}
    />
  ));
  return {
    libelle: "",
    value: liensActes
  };
}
