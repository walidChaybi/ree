import React from "react";
import { useState, useEffect } from "react";
import { AccordionPartProps } from "../../common/widget/accordion/AccordionPart";
import { Link } from "react-router-dom";
import { getText } from "../../common/widget/Text";
import { FormatDate } from "../../../ressources/FormatDate";
import moment from "moment";
import { AccordionReceProps } from "../../common/widget/accordion/AccordionRece";

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
      { libelleId: "pages.vueRc.nature", value: retourBack.nature },
      {
        libelleId: "pages.vueRc.mandataires",
        value: retourBack.mandataires.join(" / ")
      },
      //TODO modifier le link
      {
        libelleId: "pages.vueRc.typeInscription",
        value: (
          <span>
            {`${retourBack.typeInscription} (${getText(
              "pages.vueRc.rcNumero"
            )}`}
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
        libelleId: "pages.vueRc.inscriptionsLiees",
        value: retourBack.inscriptionsLiees.map((inscription, index) => (
          <span key={`inscription-liees-lien-${inscription.numeroRc}`}>
            {`${inscription.typeInscription} (${getText(
              "pages.vueRc.rcNumero"
            )}`}
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
        libelleId: "pages.vueRc.dateInscription",
        value: moment
          .unix(retourBack.dateInscription)
          .format(FormatDate.DDMMYYYY)
      },
      {
        libelleId: "pages.vueRc.dureeInscription",
        value: `${retourBack.dureeInscriptionRc.nombreDuree} ${retourBack.dureeInscriptionRc.uniteDuree}`
      },
      {
        libelleId: "pages.vueRc.dateFinMesure",
        value: moment
          .unix(retourBack.dureeInscriptionRc.dateFinDeMesure)
          .format(FormatDate.DDMMYYYY)
      }
    ],
    title: getText("pages.vueRc.inscriptionRepertoireCivil")
  };
}

function getInteresse(retourBack: RcRcaVue): AccordionPartProps[] {
  return retourBack.interesses.map((interesse, indexInteresse) => {
    return {
      contents: [
        {
          libelleId: "pages.vueRc.nom",
          value: interesse.nomFamille
        },
        {
          libelleId: "pages.vueRc.autresNoms",
          value: interesse.autresNoms.join(", ")
        },
        {
          libelleId: "pages.vueRc.prenoms",
          value: interesse.prenoms.map(prenom => prenom.prenom).join(", ")
        },
        {
          libelleId: "pages.vueRc.autresPrenoms",
          value: interesse.autresPrenoms.join(", ")
        },
        {
          libelleId: "pages.vueRc.dateNaissance",
          value: moment
            .unix(interesse.dateDeNaissance)
            .format(FormatDate.DDMMYYYY)
        },
        {
          libelleId: "pages.vueRc.lieuNaissance",
          value: interesse.lieuDeNaissance
        },
        {
          libelleId: "pages.vueRc.nationalite",
          value: interesse.nationalite
        },
        {
          libelleId: "pages.vueRc.sexe",
          value: interesse.sexe
        }
      ],
      title: getText("pages.vueRc.interesse", [indexInteresse + 1])
    };
  });
}

function getDecision(retourBack: RcRcaVue): AccordionPartProps[] {
  const decision = [
    {
      contents: [
        {
          libelleId: "pages.vueRc.type",
          value: retourBack.decisionRc.type
        },
        {
          libelleId: "pages.vueRc.date",
          value: moment
            .unix(retourBack.decisionRc.dateDecision)
            .format(FormatDate.DDMMYYYY)
        },
        {
          libelleId: "pages.vueRc.enrolementRg",
          value: retourBack.decisionRc.enrolementRg
        },
        {
          libelleId: "pages.vueRc.enrolementPortalis",
          value: retourBack.decisionRc.enrolementPortalis
        }
      ],
      title: getText("pages.vueRc.decision")
    }
  ];

  if (retourBack.decisionRc.confirmation != null) {
    decision.push({
      contents: [
        {
          libelleId: "pages.vueRc.type",
          value: retourBack.decisionRc.confirmation.type
        },
        {
          libelleId: "pages.vueRc.date",
          value: moment
            .unix(retourBack.decisionRc.confirmation.dateDecision)
            .format(FormatDate.DDMMYYYY)
        },
        {
          libelleId: "pages.vueRc.enrolementRg",
          value: retourBack.decisionRc.confirmation.enrolementRg
        },
        {
          libelleId: "pages.vueRc.enrolementPortalis",
          value: retourBack.decisionRc.confirmation.enrolementPortalis
        }
      ],
      title: getText("pages.vueRc.decisionConfirme")
    });
  }

  return decision;
}

function getAutorite(retourBack: RcRcaVue): AccordionPartProps[] {
  const autorite = [
    {
      contents: [
        {
          libelleId: "pages.vueRc.type",
          value: retourBack.decisionRc.autorite.type
        },
        {
          libelleId: "pages.vueRc.ville",
          value: retourBack.decisionRc.autorite.ville
        },
        {
          libelleId: "pages.vueRc.arrondissement",
          value: retourBack.decisionRc.autorite.arrondissement
        },
        {
          libelleId: "pages.vueRc.departement",
          value: retourBack.decisionRc.autorite.departement
        }
      ],
      title: getText("pages.vueRc.autorite")
    }
  ];

  if (retourBack.decisionRc.confirmation != null) {
    autorite.push({
      contents: [
        {
          libelleId: "pages.vueRc.type",
          value: retourBack.decisionRc.confirmation.autorite.type
        },
        {
          libelleId: "pages.vueRc.ville",
          value: retourBack.decisionRc.confirmation.autorite.ville
        },
        {
          libelleId: "pages.vueRc.arrondissement",
          value: retourBack.decisionRc.confirmation.autorite.arrondissement
        },
        {
          libelleId: "pages.vueRc.departement",
          value: retourBack.decisionRc.confirmation.autorite.departement
        }
      ],
      title: ""
    });
  }

  return autorite;
}
