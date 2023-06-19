import { IFamille } from "@model/etatcivil/commun/IFamille";
import { IFicheLien } from "@model/etatcivil/commun/IFicheLien";
import { IFicheLienActes } from "@model/etatcivil/commun/IFicheLienActes";
import { IPersonne, Personne } from "@model/etatcivil/commun/IPersonne";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { formatDe, getLibelle, remplaceSNP, remplaceSPC } from "@util/Utils";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPanelAreaProps } from "@widget/section/SectionPanelArea";
import { SectionPartProps } from "@widget/section/SectionPart";
import { SectionPartContentProps } from "@widget/section/SectionPartContent";
import { LienFiche } from "../../../LienFiche";
import { IParamsAffichage } from "../acte/FicheActeUtils";

export function getFichesPersonneActe(
  personnes: IPersonne[],
  paramsAffichage: IParamsAffichage
) {
  if (paramsAffichage.personnes === "visible") {
    return getFichesPersonne(personnes);
  } else if (paramsAffichage.personnes === "disabled") {
    return [
      {
        panelAreas: [],
        title: getLibelle(`Fiche Personne`)
      }
    ];
  } else {
    // paramsAffichage.personnes === "none"
    return [];
  }
}

export function getFichesPersonne(personnes: IPersonne[]): SectionPanelProps[] {
  return personnes.map((personne, index) => {
    return {
      panelAreas: getPanelAreasFichesPersonnes(personne),
      title: getLibelle(`Fiche Personne ${index + 1}`)
    };
  });
}

function getPanelAreasFichesPersonnes(
  personne: IPersonne
): SectionPanelAreaProps[] {
  return [
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
  ];
}

function getInformationsListeInscriptions(
  personne: IPersonne
): SectionPartContentProps {
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
): SectionPartContentProps {
  return {
    contents: [getActesPersonne(Personne.getActes(personne))],
    title: getLibelle("Liste d'actes")
  };
}

function getInformationsParents(personne: IPersonne): SectionPartContentProps {
  return {
    contents: [...getParentsPersonne(Personne.getParents(personne))],
    title: getLibelle("Parents")
  };
}

function getInformationsEnfants(personne: IPersonne): SectionPartContentProps {
  return {
    contents: [getEnfantsPersonne(Personne.getEnfants(personne))],
    title: getLibelle("Enfants")
  };
}

function getInformationsPersonne(personne: IPersonne): SectionPartProps {
  return {
    partContent: {
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

function getNomPersonne(nom: string): SectionContentProps {
  return {
    libelle: getLibelle("Nom"),
    value: nom
  };
}

function getAutresNomsPersonne(autresNom: string): SectionContentProps {
  return {
    libelle: getLibelle("Autres noms"),
    value: autresNom
  };
}

function getPrenomsPersonne(prenoms: string): SectionContentProps {
  return {
    libelle: getLibelle("Prénoms"),
    value: prenoms
  };
}

function getAutresPrenomsPersonne(autresPrenoms: string): SectionContentProps {
  return {
    libelle: getLibelle("Autres prénoms"),
    value: autresPrenoms
  };
}

function getLieuNaissance(lieuNaissance: string): SectionContentProps {
  return {
    libelle: getLibelle("Lieu de naissance"),
    value: lieuNaissance
  };
}

function getLieuDeces(lieuDeces: string): SectionContentProps {
  return {
    libelle: getLibelle("Lieu décès"),
    value: lieuDeces
  };
}

function getDateNaissance(dateNaissance: string): SectionContentProps {
  return {
    libelle: getLibelle("Né(e) le"),
    value: dateNaissance
  };
}

function getDateDeces(dateDeces: string): SectionContentProps {
  return {
    libelle: getLibelle("Date décès"),
    value: dateDeces
  };
}

function getNationalitePersonne(nationalite: string): SectionContentProps {
  return {
    libelle: getLibelle("Nationalité"),
    value: nationalite
  };
}

function getSexePersonne(sexe: string): SectionContentProps {
  return {
    libelle: getLibelle("Sexe"),
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
          libelle: getLibelle(`Nom parent ${index + 1}`),
          value: parent.nom
        },
        {
          libelle: getLibelle(`Prénom parent ${index + 1}`),
          value: remplaceSPC(parent.prenoms[0])
        }
      ]);
    } else if (
      index === indexPremierParentAdoptif ||
      index === indexDeuxiemeParentAdoptif
    ) {
      result = result.concat([
        {
          libelle: getLibelle(`Prénom et nom (parent adoptif ${index - 1})`),
          value: `${remplaceSPC(parent.prenoms[0])} ${remplaceSNP(parent.nom)}`
        }
      ]);
    }
  });
  return result;
}

function getEnfantsPersonne(enfants: IFamille[]): SectionContentProps {
  const enfantsHtml = enfants?.map(enfant => {
    return (
      <p key={`enfant-${enfant.nom}-${enfant.prenoms}`}>{`${remplaceSNP(
        enfant.nom
      )} ${remplaceSPC(enfant.prenoms[0])}`}</p>
    );
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

function getRcsPersonne(rcs: IFicheLien[]): SectionContentProps {
  const liensRcs = rcs?.map(rc => {
    const statut = ` (${rc.statut?.toLowerCase()})`;
    return (
      <div key={`rc-${rc.numero}`}>
        <LienFiche
          categorie={TypeFiche.RC}
          numero={`Inscription RC N°${rc.numero}${rc.statut ? statut : ""}`}
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
    const statut = ` (${rca.statut?.toLowerCase()})`;
    return (
      <div key={`rca-${rca.numero}`}>
        <LienFiche
          categorie={TypeFiche.RCA}
          numero={`Inscription RCA N°${rca.numero}${rca.statut ? statut : ""}`}
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
    const statut = ` (${pacs.statut?.toLowerCase()})`;
    return (
      <div key={`pacs-${pacs.numero}`}>
        <LienFiche
          categorie={TypeFiche.PACS}
          numero={`Inscription PACS N°${pacs.numero}${
            pacs.statut ? statut : ""
          }`}
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
