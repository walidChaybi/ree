import { IElementsJasperCourrier, OptionsJasper } from "@model/composition/ICourrierComposition";
import { AnalyseMarginale } from "@model/etatcivil/acte/AnalyseMarginale";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { OptionCourrier, OptionsCourrier } from "@model/requete/IOptionCourrier";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { triListeObjetsSurPropriete } from "@util/Utils";

const ajoutInfosTitulaire = (elementsJasper: IElementsJasperCourrier, requete: IRequeteDelivrance, acte?: FicheActe) => {
  let titulaires = [];
  let analyseMarginale: AnalyseMarginale | undefined;
  if (acte?.id && acte?.analysesMarginales) {
    analyseMarginale = acte.getAnalyseMarginaleLaPlusRecente();
  }

  if (analyseMarginale?.titulaires) {
    elementsJasper.referenceActe = acte?.referenceActe ?? "";

    titulaires = triListeObjetsSurPropriete([...analyseMarginale.titulaires], "ordre");

    elementsJasper.nomTitulaire1 = titulaires[0].nom ?? "";
    elementsJasper.prenomsTitulaire1 = getPrenomsTitulaireActe(titulaires[0].prenoms);

    if (titulaires.length > 1) {
      elementsJasper.nomTitulaire2 = titulaires[1].nom ?? "";
      elementsJasper.prenomsTitulaire2 = getPrenomsTitulaireActe(titulaires[1].prenoms);
    }
  } else if (requete.titulaires) {
    titulaires = triListeObjetsSurPropriete([...requete.titulaires], "position");
    elementsJasper.nomTitulaire1 = TitulaireRequete.getNom(titulaires[0]);
    elementsJasper.prenomsTitulaire1 = getPrenomsTitulaireRequete(titulaires[0].prenoms);

    if (titulaires.length > 1) {
      elementsJasper.nomTitulaire2 = TitulaireRequete.getNom(titulaires[1]);
      elementsJasper.prenomsTitulaire2 = getPrenomsTitulaireRequete(titulaires[1].prenoms);
    }
  }
};

const getPrenomsTitulaireActe = (prenomsTitulaire?: string[]): string => {
  let prenoms = "";

  if (prenomsTitulaire) {
    prenoms = prenomsTitulaire.join(", ");
  }
  return prenoms;
};

const getPrenomsTitulaireRequete = (prenomsTitulaire?: IPrenomOrdonnes[]): string => {
  let prenoms = "";

  if (prenomsTitulaire) {
    const prenomsOrdonnes = triListeObjetsSurPropriete([...prenomsTitulaire], "numeroOrdre");
    const tableau: string[] = [];
    prenomsOrdonnes.forEach((p: IPrenomOrdonnes) => tableau.push(p.prenom));
    prenoms = tableau.join(", ");
  }
  return prenoms;
};

const LIMITE_ORDRE_EDITION_OPTION = 900;

const ajoutOptions = (elementsJasper: IElementsJasperCourrier, optionsChoisies?: OptionsCourrier) => {
  if (optionsChoisies && optionsChoisies.length > 0) {
    elementsJasper.options = [];
    elementsJasper.optionsTexteLibre = [];

    optionsChoisies.forEach((option: OptionCourrier) => {
      if (option.ordreEdition < LIMITE_ORDRE_EDITION_OPTION) {
        optionOuOptionATiret(elementsJasper.options, option);
      } else {
        optionOuOptionATiret(elementsJasper.optionsTexteLibre, option);
      }
    });
  }
};

const optionOuOptionATiret = (tabOptions: OptionsJasper[], option: OptionCourrier) => {
  if (option.optionATiret) {
    tabOptions.push({
      option_puce: getTexteOption(option)
    });
  } else {
    tabOptions.push({
      option: getTexteOption(option)
    });
  }
};

const getTexteOption = (option: OptionCourrier) => {
  return option.texteOptionCourrierModifie ?? option.texteOptionCourrier;
};

const TEXTE_VARIABLE_RDD = `Le document d’état civil joint est délivré sur support électronique conformément à l’ordonnance n° 2019-724 du 10 juillet 2019 \
– chapitre III, article 10 ; il est signé par un officier de l’état civil au moyen d’un procédé de signature électronique sécurisée et \
<style isBold="true">n’a pas de durée de validité,</style> sauf disposition spécifique (ex : dossier de mariage ou de PACS). \
<style isBold="true">Il peut être utilisé pour plusieurs démarches différentes.</style> 

<style isBold="true">Vous pouvez imprimer ce document pour le remettre à un tiers qui a l’obligation de l’accepter. Le destinataire de l’acte aura la possibilité, \
pendant 6 mois, de vérifier la fiabilité des informations indiquées sur le document au moyen d’un télé-service de vérification.</style>

Ce télé-service est accessible sur le site ci-contre : $F{URL_televerification} et \
requiert la saisie d’un code de télé-vérification (CTV) inscrit au bas et à droite de l’acte qui vous a été délivré. \
<style isBold="true">Vous êtes tenu d’indiquer au destinataire de l’acte, l’adresse du télé-service et de vérifier que le CTV est lisible après impression.</style>

Si vous souhaitez que l’acte que vous avez demandé vous soit transmis par voie postale sur support papier, il vous appartient d’en faire la demande via l’adresse suivante : 
https://demarches.service-public.gouv.fr/mademarche/demarche_impr/demarche
`;
const TEXTE_VARIABLE_RDC = `Pour formuler une nouvelle demande, il vous est conseillé d’utiliser le formulaire disponible sur internet, à l’adresse suivante :

https://demarches.service-public.gouv.fr/mademarche/delivrance_demat/demarche`;

const ajoutTexteVariable = (elementsJasper: IElementsJasperCourrier, sousTypeRequete: SousTypeRequete) => {
  if (sousTypeRequete === SousTypeDelivrance.RDD) {
    elementsJasper.texte_variable_RDD = TEXTE_VARIABLE_RDD;
  } else if (sousTypeRequete === SousTypeDelivrance.RDC) {
    elementsJasper.texte_variable_RDC = TEXTE_VARIABLE_RDC;
  }
};

/////////////////////////////////////////////////////////////////////
class SpecificationCourrier {
  getElementsJasper(saisieCourrier: SaisieCourrier, requete: IRequeteDelivrance, optionsChoisies?: OptionsCourrier, acte?: FicheActe) {
    const elementsJasper = {} as IElementsJasperCourrier;

    if (requete && saisieCourrier) {
      elementsJasper.natureActe = (requete.evenement?.natureActe.libelle ?? "").toLowerCase();
      ajoutInfosTitulaire(elementsJasper, requete, acte);
      ajoutOptions(elementsJasper, optionsChoisies);
      elementsJasper.texteLibre = saisieCourrier.texteLibre.texte;
      ajoutTexteVariable(elementsJasper, requete.sousType);
    }
    return elementsJasper;
  }
}

export const specificationCourrier = new SpecificationCourrier();
