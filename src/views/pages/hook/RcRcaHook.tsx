import React from "react";
import { useState, useEffect } from "react";
import { AccordionPartProps } from "../../common/widget/accordion/AccordionPart";
import { Link } from "react-router-dom";
import { FormatDate } from "../../../ressources/FormatDate";
import moment from "moment";
import { AccordionReceProps } from "../../common/widget/accordion/AccordionRece";
import { getText } from "../../common/widget/Text";

export interface RcRcaVue {
  nature: string;
  typeInscription: string;
  numeroRcImpactes: string[];
  mandataires: string[];
  inscriptionsLiees: InscriptionLie[];
  dateInscription: number;
  dureeInscriptionRc: DureeInscription;
  interesses: Interesse[];
  decisionRc: DecisionRc;
  historique: Historique[];
}

export interface DureeInscription {
  nombreDuree: number;
  uniteDuree: string;
  dateFinDeMesure: number;
}

export interface DecisionRc {
  type: string;
  dateDecision: number;
  enrolementRg: string;
  enrolementPortalis: string;
  autorite: Autorite;
  confirmation?: DecisionRc;
}

export interface InscriptionLie {
  typeInscription: string;
  numeroRc: string;
  idInscription: string;
}

export interface Historique {
  statut: string;
  date: string;
  motif: string;
  lieu: string;
  complement: string;
}

export interface Interesse {
  nomFamille: string;
  autresNoms: string[];
  prenoms: Prenom[];
  autresPrenoms: string[];
  dateDeNaissance: number;
  lieuDeNaissance: string;
  nationalite: string;
  sexe: string;
}

export interface Prenom {
  prenom: string;
  numeroOrdre: number;
}

export interface Autorite {
  type: string;
  ville: string;
  arrondissement: string;
  departement: string;
}

const mockRc: RcRcaVue = {
  nature: "Curatelle aménagée",
  typeInscription: "Renouvellement",
  numeroRcImpactes: ["2015 - 36547"],
  dateInscription: 1518652800,
  dureeInscriptionRc: {
    nombreDuree: 2,
    uniteDuree: "ans",
    dateFinDeMesure: 1581724800
  },
  mandataires: [
    "Mandataire judiciaire à la protection des majeurs association",
    "Préposé d'établissement"
  ],
  inscriptionsLiees: [
    {
      typeInscription: "Modification",
      numeroRc: "2017 - 145235",
      idInscription: ""
    },
    {
      typeInscription: "Radiation",
      numeroRc: "2019 - 48596",
      idInscription: ""
    }
  ],
  interesses: [
    {
      nomFamille: "FAVARO",
      autresNoms: ["FAVAROTTI"],
      prenoms: [
        { prenom: "Enrico", numeroOrdre: 0 },
        { prenom: "Pablo", numeroOrdre: 1 },
        { prenom: "Flavio", numeroOrdre: 2 }
      ],
      autresPrenoms: [],
      dateDeNaissance: -777168000,
      lieuDeNaissance: "San remo (Italie)",
      nationalite: "Etrangère",
      sexe: "Masculin"
    },
    {
      nomFamille: "Boncler",
      autresNoms: [],
      prenoms: [{ prenom: "Franck", numeroOrdre: 0 }],
      autresPrenoms: ["Gérard", "Bernard"],
      dateDeNaissance: 673574400,
      lieuDeNaissance: "Saint Maurice",
      nationalite: "Française",
      sexe: "Masculin"
    }
  ],
  decisionRc: {
    type: "Jugement",
    dateDecision: 1577059200,
    enrolementRg: "",
    enrolementPortalis: "",
    autorite: {
      type: "Tribunal de grande instance",
      ville: "Lyon",
      arrondissement: "8",
      departement: "Rhône(69)"
    },
    confirmation: {
      type: "Arrêt",
      dateDecision: 1584403200,
      enrolementRg: "",
      enrolementPortalis: "",
      autorite: {
        type: "Cour d'appel",
        ville: "Marseille",
        arrondissement: "10",
        departement: "Bouches-du-Rhône(13)"
      }
    }
  },
  historique: [
    {
      statut: "Actif",
      date: "25/07/2020",
      motif: "Décision du procureur",
      lieu: "Marseille (Bouches-du-rhône)",
      complement: ""
    },
    {
      statut: "Inactif",
      date: "17/03/2020",
      motif: "Date de fin de mesure",
      lieu: "Lyon (Rhône)",
      complement: ""
    },
    {
      statut: "Actif",
      date: "15/02/2018",
      motif: "",
      lieu: "",
      complement: ""
    }
  ]
};

export function useRcRcaHook() {
  const [rc, setRc] = useState<AccordionReceProps>();
  const [errorState, setErrorState] = useState<any>();

  useEffect(() => {
    setRc(getRcRcaVue(mockRc));
  }, []);

  return {
    rc,
    errorState
  };
}

function getRcRcaVue(retourBack: RcRcaVue): AccordionReceProps {
  return {
    panels: [
      {
        panelAreas: [
          { parts: [getInscriptionRepertoireCivil(retourBack)] },
          { parts: getInteresse(retourBack) },
          { parts: getDecision(retourBack) },
          { parts: getAutorite(retourBack) }
        ],
        title: "Vue du RC"
      }
    ]
  };
}

function getInscriptionRepertoireCivil(
  retourBack: RcRcaVue
): AccordionPartProps {
  return {
    contents: [
      { libelle: "Nature", value: retourBack.nature },
      {
        libelle: "Mandataire(s)",
        value: retourBack.mandataires.join(" / ")
      },
      //TODO modifier le link
      {
        libelle: "Type inscription",
        value: (
          <span>
            {`${retourBack.typeInscription} (RC n°}`}
            {retourBack.numeroRcImpactes.map(numero => {
              return (
                <Link to={"/"} className="">
                  {numero}
                </Link>
              );
            })}

            {`)`}
          </span>
        )
      },
      {
        libelle: "Inscription(s) liée(s)",
        value: retourBack.inscriptionsLiees.map((inscription, index) => (
          <span key={`inscription-liees-lien-${inscription.numeroRc}`}>
            {`${inscription.typeInscription} (${"RC n°"}`}
            <Link to={`rcrca/${inscription.idInscription}`} className="">
              {inscription.numeroRc}
            </Link>
            {`)${
              index !== retourBack.inscriptionsLiees.length - 1 ? ", " : ""
            }`}
          </span>
        ))
      },
      {
        libelle: "Date d'inscription",
        value: moment
          .unix(retourBack.dateInscription)
          .format(FormatDate.DDMMYYYY)
      },
      {
        libelle: "Durée inscription",
        value: `${retourBack.dureeInscriptionRc.nombreDuree} ${retourBack.dureeInscriptionRc.uniteDuree}`
      },
      {
        libelle: "Date fin de mesure",
        value: moment
          .unix(retourBack.dureeInscriptionRc.dateFinDeMesure)
          .format(FormatDate.DDMMYYYY)
      }
    ],
    title: "Inscrition au répertoire civil"
  };
}

function getInteresse(retourBack: RcRcaVue): AccordionPartProps[] {
  return retourBack.interesses.map((interesse, indexInteresse) => {
    return {
      contents: [
        {
          libelle: "Nom",
          value: interesse.nomFamille
        },
        {
          libelle: "Autre(s) nom(s)",
          value: interesse.autresNoms.join(", ")
        },
        {
          libelle: "Prénom(s)",
          value: interesse.prenoms.map(prenom => prenom.prenom).join(", ")
        },
        {
          libelle: "Autre(s) prénom(s)",
          value: interesse.autresPrenoms.join(", ")
        },
        {
          libelle: "Date de naissance",
          value: moment
            .unix(interesse.dateDeNaissance)
            .format(FormatDate.DDMMYYYY)
        },
        {
          libelle: "Lieu de naissance",
          value: interesse.lieuDeNaissance
        },
        {
          libelle: "Nationalité",
          value: interesse.nationalite
        },
        {
          libelle: "Sexe",
          value: interesse.sexe
        }
      ],
      title: getText("vue-rc-interesse", [indexInteresse + 1])
    };
  });
}

function getDecision(retourBack: RcRcaVue): AccordionPartProps[] {
  const decision = [
    {
      contents: [
        {
          libelle: "Type",
          value: retourBack.decisionRc.type
        },
        {
          libelle: "Date",
          value: moment
            .unix(retourBack.decisionRc.dateDecision)
            .format(FormatDate.DDMMYYYY)
        },
        {
          libelle: "Enrôlement RG",
          value: retourBack.decisionRc.enrolementRg
        },
        {
          libelle: "Enrôlement Portalis",
          value: retourBack.decisionRc.enrolementPortalis
        }
      ],
      title: "Décision"
    }
  ];

  if (retourBack.decisionRc.confirmation != null) {
    decision.push({
      contents: [
        {
          libelle: "Type",
          value: retourBack.decisionRc.confirmation.type
        },
        {
          libelle: "Date",
          value: moment
            .unix(retourBack.decisionRc.confirmation.dateDecision)
            .format(FormatDate.DDMMYYYY)
        },
        {
          libelle: "Enrôlement RG",
          value: retourBack.decisionRc.confirmation.enrolementRg
        },
        {
          libelle: "Enrôlement Portalis",
          value: retourBack.decisionRc.confirmation.enrolementPortalis
        }
      ],
      title: "Confirmée par la décisio"
    });
  }

  return decision;
}

function getAutorite(retourBack: RcRcaVue): AccordionPartProps[] {
  const autorite = [
    {
      contents: [
        {
          libelle: "Type",
          value: retourBack.decisionRc.autorite.type
        },
        {
          libelle: "Ville",
          value: retourBack.decisionRc.autorite.ville
        },
        {
          libelle: "Arrondissement",
          value: retourBack.decisionRc.autorite.arrondissement
        },
        {
          libelle: "Département",
          value: retourBack.decisionRc.autorite.departement
        }
      ],
      title: "Autorité"
    }
  ];

  if (retourBack.decisionRc.confirmation != null) {
    autorite.push({
      contents: [
        {
          libelle: "Type",
          value: retourBack.decisionRc.confirmation.autorite.type
        },
        {
          libelle: "Ville",
          value: retourBack.decisionRc.confirmation.autorite.ville
        },
        {
          libelle: "Arrondissement",
          value: retourBack.decisionRc.confirmation.autorite.arrondissement
        },
        {
          libelle: "Département",
          value: retourBack.decisionRc.confirmation.autorite.departement
        }
      ],
      title: ""
    });
  }

  return autorite;
}
