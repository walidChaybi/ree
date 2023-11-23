import {
  IElementsJasperCourrier,
  OptionsJasper
} from "@model/composition/ICourrierComposition";
import {
  AnalyseMarginale,
  IAnalyseMarginale
} from "@model/etatcivil/acte/IAnalyseMarginale";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { TitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import {
  OptionCourrier,
  OptionsCourrier
} from "@model/requete/IOptionCourrier";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "@model/requete/ITitulaireRequete";
import {
  getValeurOuVide,
  triListeObjetsSurPropriete,
  UN,
  ZERO
} from "@util/Utils";

function ajoutInfosTitulaire(
  elementsJasper: IElementsJasperCourrier,
  requete: IRequeteDelivrance,
  acte?: IFicheActe
) {
  let titulaires = [];
  let analyseMarginale: IAnalyseMarginale | undefined;
  if (acte?.id && acte?.analyseMarginales) {
    analyseMarginale = AnalyseMarginale.getAnalyseMarginaleLaPlusRecente(
      acte?.analyseMarginales
    );
  }

  if (analyseMarginale?.titulaires) {
    elementsJasper.referenceActe = FicheActe.getReference(acte);

    titulaires = triListeObjetsSurPropriete(
      [...analyseMarginale.titulaires],
      "ordre"
    );

    elementsJasper.nomTitulaire1 = TitulaireActe.getNom(titulaires[ZERO]);
    elementsJasper.prenomsTitulaire1 = getPrenomsTitulaireActe(
      titulaires[ZERO].prenoms
    );

    if (titulaires.length > UN) {
      elementsJasper.nomTitulaire2 = TitulaireActe.getNom(titulaires[UN]);
      elementsJasper.prenomsTitulaire2 = getPrenomsTitulaireActe(
        titulaires[UN].prenoms
      );
    }
  } else {
    if (requete.titulaires) {
      titulaires = triListeObjetsSurPropriete(
        [...requete.titulaires],
        "position"
      ) as ITitulaireRequete[];
      elementsJasper.nomTitulaire1 = TitulaireRequete.getNom(titulaires[ZERO]);
      elementsJasper.prenomsTitulaire1 = getPrenomsTitulaireRequete(
        titulaires[ZERO].prenoms
      );

      if (titulaires.length > UN) {
        elementsJasper.nomTitulaire2 = TitulaireRequete.getNom(titulaires[UN]);
        elementsJasper.prenomsTitulaire2 = getPrenomsTitulaireRequete(
          titulaires[UN].prenoms
        );
      }
    }
  }
}

function getPrenomsTitulaireActe(prenomsTitulaire?: string[]): string {
  let prenoms = "";

  if (prenomsTitulaire) {
    prenoms = prenomsTitulaire.join(", ");
  }
  return prenoms;
}

function getPrenomsTitulaireRequete(
  prenomsTitulaire?: IPrenomOrdonnes[]
): string {
  let prenoms = "";

  if (prenomsTitulaire) {
    const prenomsOrdonnes = triListeObjetsSurPropriete(
      [...prenomsTitulaire],
      "numeroOrdre"
    );
    const tableau: string[] = [];
    prenomsOrdonnes.forEach((p: IPrenomOrdonnes) => tableau.push(p.prenom));
    prenoms = tableau.join(", ");
  }
  return prenoms;
}

const LIMITE_ORDRE_EDITION_OPTION = 900;

function ajoutOptions(
  elementsJasper: IElementsJasperCourrier,
  optionsChoisies?: OptionsCourrier
) {
  if (optionsChoisies && optionsChoisies.length > 0) {
    elementsJasper.options = [];
    elementsJasper.optionsTexteLibre = [];

    optionsChoisies.forEach((option: OptionCourrier) => {
      if (option.ordreEdition < LIMITE_ORDRE_EDITION_OPTION) {
        optionOuOptionAPuce(elementsJasper.options, option);
      } else {
        optionOuOptionAPuce(elementsJasper.optionsTexteLibre, option);
      }
    });
  }
}

function optionOuOptionAPuce(
  tabOptions: OptionsJasper[],
  option: OptionCourrier
) {
  if (option.optionAPuce) {
    tabOptions.push({
      option_puce: getTexteOption(option)
    });
  } else {
    tabOptions.push({
      option: getTexteOption(option)
    });
  }
}

function getTexteOption(option: OptionCourrier) {
  return option.texteOptionCourrierModifier
    ? option.texteOptionCourrierModifier
    : option.texteOptionCourrier;
}

const TEXTE_VARIABLE_RDD = `Le document d’état civil joint est délivré sur support électronique conformément à l’ordonnance n° 2019-724 du 10 juillet 2019 \
– chapitre III, article 10 ; il est signé par un officier de l’état civil au moyen d’un procédé de signature électronique sécurisée et \
<style isBold="true">n’a pas de durée de validité,</style> sauf disposition spécifique (ex : dossier de mariage ou de PACS). \
<style isBold="true">Il peut être utilisé pour plusieurs démarches différentes.</style> 

<style isBold="true">Vous pouvez imprimer ce document pour le remettre à un tiers qui a l’obligation de l’accepter. Le destinataire de l’acte aura la possibilité, \
pendant 6 mois, de vérifier la fiabilité des informations indiquées sur le document au moyen d’un télé-service de vérification.</style>

Ce télé-service est accessible sur le site ci-contre : https://pastel.diplomatie.gouv.fr/rece-televerification-ui/accueil et \
requiert la saisie d’un code de télé-vérification (CTV) inscrit au bas et à droite de l’acte qui vous a été délivré. \
<style isBold="true">Vous êtes tenu d’indiquer au destinataire de l’acte, l’adresse du télé-service et de vérifier que le CTV est lisible après impression.</style>

Si vous souhaitez que l’acte que vous avez demandé vous soit transmis par voie postale sur support papier, il vous appartient d’en faire la demande via l’adresse suivante : 
https://psl.service-public.fr/mademarche/demarche_impr/demarche
`;
const TEXTE_VARIABLE_RDC = `Pour formuler une nouvelle demande, il vous est conseillé d’utiliser le formulaire disponible sur internet, à l’adresse suivante :

https://psl.service-public.fr/mademarche/delivrance_demat/demarche`;

function ajoutTexteVariable(
  elementsJasper: IElementsJasperCourrier,
  sousTypeRequete: SousTypeRequete
) {
  if (sousTypeRequete === SousTypeDelivrance.RDD) {
    elementsJasper.texte_variable_RDD = TEXTE_VARIABLE_RDD;
  } else if (sousTypeRequete === SousTypeDelivrance.RDC) {
    elementsJasper.texte_variable_RDC = TEXTE_VARIABLE_RDC;
  }
}

/////////////////////////////////////////////////////////////////////
class SpecificationCourrier {
  getElementsJasper(
    saisieCourrier: SaisieCourrier,
    requete: IRequeteDelivrance,
    optionsChoisies?: OptionsCourrier,
    acte?: IFicheActe
  ) {
    const elementsJasper = {} as IElementsJasperCourrier;

    if (requete && saisieCourrier) {
      elementsJasper.natureActe = getValeurOuVide(
        requete.evenement?.natureActe.libelle
      ).toLowerCase();
      ajoutInfosTitulaire(elementsJasper, requete, acte);
      ajoutOptions(elementsJasper, optionsChoisies);
      elementsJasper.texteLibre = saisieCourrier.texteLibre.texte;
      ajoutTexteVariable(elementsJasper, requete.sousType);
    }
    return elementsJasper;
  }
}

export const specificationCourrier = new SpecificationCourrier();
