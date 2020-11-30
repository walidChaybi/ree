import React, { useState, useEffect } from "react";
import { AccordionPartProps } from "../../common/widget/accordion/AccordionPart";
import { Link } from "react-router-dom";
import {
  FormatDate,
  DateCompose,
  getDateString,
  getDateFromDateCompose,
  getDateFromTimestamp
} from "../../../ressources/FormatDate";
import moment from "moment";
import { AccordionReceProps } from "../../common/widget/accordion/AccordionRece";
import { getText } from "../../common/widget/Text";

export interface RcRcaVue {
  idInscription: string;
  categorieInscription: string;
  numero: string;
  dateInscription: number;
  dateDerniereMaj: number;
  dateDerniereDelivrance: number;
  alertes: Alerte[];
  decision: DecisionRc;
  mariageInteresses: MariageInteresse[];
  interesses: Interesse[];
  statutsFiche: StatutFiche[];

  //en attente
  nature: string;
  typeInscription: string;
  mandataires: string[];
  dureeInscriptionRc: DureeInscription;

  //pas presents
  numeroRcImpactes: string[];
  inscriptionsLiees: InscriptionLie[];
}

export interface MariageInteresse {
  villeMariage: string;
  regionNaissance: string;
  paysNaissance: string;
  dateMariage: DateCompose;
  aletranger: boolean;
}

export interface Alerte {
  alerte: string;
  dateCreation: string;
}

export interface DureeInscription {
  nombreDuree: number;
  uniteDuree: string;
  dateFinDeMesure: number;
}

export interface DecisionRc {
  dateDecision: number;
  type: string;
  autorite: Autorite;
  sourceConfirmation: Autorite;
}

export interface InscriptionLie {
  typeInscription: string;
  numeroRc: string;
  idInscription: string;
}

export interface StatutFiche {
  statut: string;
  date: DateCompose;
  motif: string;
  villeEvenement: string;
  departementEvenement: string;
  paysEvenement: string;
  complementMotif: string;
}

export interface Interesse {
  numeroOrdreSaisi: number;
  nomFamille: string;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  arrondissementNaissance: string;
  nationalite: string;
  autreNoms: string[];
  autrePrenoms: string[];
  prenoms: string[];
  dateNaissance: DateCompose;
  sexe: string;
}

export interface Prenom {
  prenom: string;
  numeroOrdre: number;
}

export interface Autorite {
  type: string;
  numeroDepartement: number;
  libelleDepartement: string;
  ville: string;
  pays: string;
  arrondissement: number;
  nomNotaire: string;
  prenomNotaire: string;
  numeroCrpcen: string;
  nomOnac: string;
  prenomOnac: string;
  enrolementRg: string;
  enrolementPortails: string;
  dateDecisionEtrangere: number;
}

const mockRc: RcRcaVue = {
  idInscription: "",
  categorieInscription: "rc",
  numero: "2015-123456",
  dateInscription: 1518652800,
  dateDerniereMaj: 1518652800,
  dateDerniereDelivrance: 1518652800,
  alertes: [],
  decision: {
    dateDecision: 1577059200,
    type: "Jugement",
    autorite: {
      type: "Tribunal de grande instance",
      numeroDepartement: 69,
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "France",
      arrondissement: 8,
      nomNotaire: "",
      prenomNotaire: "",
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: "",
      enrolementRg: "",
      enrolementPortails: "",
      dateDecisionEtrangere: 1584403200
    },
    sourceConfirmation: {
      type: "Arrêt",
      dateDecisionEtrangere: 1584403200,
      enrolementRg: "",
      enrolementPortails: "",
      ville: "Marseille",
      arrondissement: 10,
      numeroDepartement: 13,
      libelleDepartement: "Bouches-du-Rhône",
      pays: "France",
      nomNotaire: "",
      prenomNotaire: "",
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: ""
    }
  },
  mariageInteresses: [],
  interesses: [
    {
      numeroOrdreSaisi: 0,
      nomFamille: "FAVARO",
      villeNaissance: "San remo",
      paysNaissance: "Italie",
      regionNaissance: "",
      arrondissementNaissance: "",
      nationalite: "Etrangère",
      autreNoms: ["FAVAROTTI"],
      autrePrenoms: [],
      prenoms: ["Enrico", "Pablo", "Flavio"],
      dateNaissance: {
        jour: 25,
        mois: 5,
        annee: 1980
      },

      sexe: "Masculin"
    },
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Nomfamille",
      villeNaissance: "Ville Naissance",
      paysNaissance: "France",
      regionNaissance: "Ile de france",
      arrondissementNaissance: "",
      nationalite: "Française",
      autreNoms: [],
      autrePrenoms: ["AutreP1", "AutreP2"],
      prenoms: ["P1"],
      dateNaissance: {
        jour: 7,
        mois: 12,
        annee: 1972
      },

      sexe: "Masculin"
    }
  ],
  statutsFiche: [
    {
      statut: "Actif",
      date: {
        jour: 25,
        mois: 7,
        annee: 2020
      },
      motif: "Décision du procureur",
      villeEvenement: "Marseille",
      departementEvenement: "Bouches-du-rhône",
      paysEvenement: "France",
      complementMotif: ""
    },
    {
      statut: "Inactif",
      date: {
        jour: 17,
        mois: 3,
        annee: 2020
      },
      motif: "Date de fin de mesure",
      villeEvenement: "Lyon",
      departementEvenement: "Rhône",
      paysEvenement: "France",
      complementMotif: ""
    },
    {
      statut: "Actif",
      date: {
        jour: 15,
        mois: 2,
        annee: 2018
      },
      motif: "",
      villeEvenement: "Lyon",
      departementEvenement: "Rhône",
      paysEvenement: "France",
      complementMotif: ""
    }
  ],

  //en attente
  nature: "Curatelle aménagée",
  typeInscription: "Renouvellement",
  mandataires: [
    "Mandataire judiciaire à la protection des majeurs association",
    "Préposé d'établissement"
  ],
  dureeInscriptionRc: {
    nombreDuree: 2,
    uniteDuree: "ans",
    dateFinDeMesure: 1581724800
  },

  // pas presents
  numeroRcImpactes: ["2015 - 36547"],
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
          value: interesse.autreNoms.join(", ")
        },
        {
          libelle: "Prénom(s)",
          value: interesse.prenoms.join(", ")
        },
        {
          libelle: "Autre(s) prénom(s)",
          value: interesse.autrePrenoms.join(", ")
        },
        {
          libelle: "Date de naissance",
          value: getDateString(getDateFromDateCompose(interesse.dateNaissance))
        },
        {
          libelle: "Lieu de naissance",
          value: `${interesse.villeNaissance} (${interesse.paysNaissance})`
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
          value: retourBack.decision.type
        },
        {
          libelle: "Date",
          value: getDateString(
            getDateFromTimestamp(retourBack.decision.dateDecision)
          )
        },
        {
          libelle: "Enrôlement RG",
          value: retourBack.decision.autorite.enrolementRg
        },
        {
          libelle: "Enrôlement Portalis",
          value: retourBack.decision.autorite.enrolementPortails
        }
      ],
      title: "Décision"
    }
  ];

  if (retourBack.decision.sourceConfirmation != null) {
    decision.push({
      contents: [
        {
          libelle: "Type",
          value: retourBack.decision.sourceConfirmation.type
        },
        {
          libelle: "Date",
          value: getDateString(
            getDateFromTimestamp(
              retourBack.decision.sourceConfirmation.dateDecisionEtrangere
            )
          )
        },
        {
          libelle: "Enrôlement RG",
          value: retourBack.decision.sourceConfirmation.enrolementRg
        },
        {
          libelle: "Enrôlement Portalis",
          value: retourBack.decision.sourceConfirmation.enrolementPortails
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
          value: retourBack.decision.autorite.type
        },
        {
          libelle: "Ville",
          value: retourBack.decision.autorite.ville
        },
        {
          libelle: "Arrondissement",
          value: `${retourBack.decision.autorite.arrondissement}`
        },
        {
          libelle: "Département",
          value: `${retourBack.decision.autorite.libelleDepartement} (${retourBack.decision.autorite.numeroDepartement})`
        }
      ],
      title: "Autorité"
    }
  ];

  if (retourBack.decision.sourceConfirmation != null) {
    autorite.push({
      contents: [
        {
          libelle: "Type",
          value: retourBack.decision.sourceConfirmation.type
        },
        {
          libelle: "Ville",
          value: retourBack.decision.sourceConfirmation.ville
        },
        {
          libelle: "Arrondissement",
          value: `${retourBack.decision.sourceConfirmation.arrondissement}`
        },
        {
          libelle: "Département",
          value: `${retourBack.decision.sourceConfirmation.libelleDepartement} (${retourBack.decision.sourceConfirmation.numeroDepartement})`
        }
      ],
      title: ""
    });
  }

  return autorite;
}
