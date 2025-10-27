import { IFicheLien } from "@model/etatcivil/commun/IFicheLien";
import { Personne } from "@model/etatcivil/commun/Personne";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { ENationalite } from "@model/etatcivil/enum/Nationalite";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPanelAreaProps } from "@widget/section/SectionPanelArea";
import { SectionPartProps } from "@widget/section/SectionPart";
import { SectionPartContentProps } from "@widget/section/SectionPartContent";
import { LienFiche } from "../../../LienFiche";
import { IParamsAffichage } from "../acte/FicheActeUtils";

export function getFichesPersonneActe(personnes: Personne[], paramsAffichage: IParamsAffichage): SectionPanelProps[] {
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

export function getFichesPersonne(personnes: Personne[]): SectionPanelProps[] {
  return personnes.map((personne, index) => {
    return {
      panelAreas: getPanelAreasFichesPersonnes(personne),
      title: `Fiche Personne ${index + 1}`
    };
  });
}

function getPanelAreasFichesPersonnes(personne: Personne): SectionPanelAreaProps[] {
  return [
    {
      parts: [
        getInformationsPersonne(personne),
        {
          subParts: [getInformationsListeInscriptions(personne)]
        }
      ],
      nbColonne: 3
    }
  ];
}

function getInformationsListeInscriptions(personne: Personne): SectionPartContentProps {
  return {
    contents: [getRcsPersonne(personne.rcs), getRcasPersonne(personne.rcas), getPacssPersonne(personne.pacss)],
    title: "Liste d'inscriptions"
  };
}

function getInformationsPersonne(personne: Personne): SectionPartProps {
  return {
    partContent: {
      contents: [
        getNomPersonne(personne.nom),
        getAutresNomsPersonne(personne.autresNoms),
        getPrenomsPersonne(personne.prenoms),
        getAutresPrenomsPersonne(personne.autresPrenoms),
        getLieuNaissance(personne.lieuNaissance),
        getDateNaissance(personne.dateNaissance),
        getNationalitePersonne(ENationalite[personne.nationalite]),
        getSexePersonne(ESexe[personne.sexe]),
        getLieuDeces(personne.lieuDeces),
        getDateDeces(personne.dateDeces)
      ],
      title: "Personne"
    }
  };
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

function getRcsPersonne(rcs: IFicheLien[]): SectionContentProps {
  const liensRcs = rcs?.map(rc => {
    return (
      <div key={`rc-${rc.numero}`}>
        <LienFiche
          categorie={ETypeFiche.RC}
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
          categorie={ETypeFiche.RCA}
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
          categorie={ETypeFiche.PACS}
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
