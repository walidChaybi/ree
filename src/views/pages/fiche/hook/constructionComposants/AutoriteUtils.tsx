import React from "react";
import { IFicheRc, IAutorite } from "../FicheRcInterfaces";
import { AccordionPartProps } from "../../../../common/widget/accordion/AccordionPart";
import {
  AutoriteUtil,
  TypeAutorite
} from "../../../../../model/ficheRcRca/TypeAutorite";
import { AccordionContentProps } from "../../../../common/widget/accordion/AccordionContent";
import { LieuxUtils } from "../../../../../model/Lieux";

export function getAutorite(retourBack: IFicheRc): AccordionPartProps[] {
  const autorite: AccordionPartProps[] = [
    {
      contents: getContentAutorite(retourBack.decision.autorite),
      title: "Autorité"
    }
  ];

  if (
    retourBack.decision.sourceConfirmation != null &&
    AutoriteUtil.isJuridiction(
      retourBack.decision.sourceConfirmation.autorite.type
    )
  ) {
    autorite.push({
      contents: getContentAutorite(
        retourBack.decision.sourceConfirmation.autorite
      ),
      title: ""
    });
  }

  return autorite;
}

function getContentAutorite(autorite: IAutorite): AccordionContentProps[] {
  if (
    AutoriteUtil.isJuridiction(autorite.type) &&
    LieuxUtils.isPaysFrance(autorite.pays)
  ) {
    return getContentJuridictionEtFrance(autorite);
  } else if (
    AutoriteUtil.isNotaire(autorite.type) &&
    LieuxUtils.isPaysFrance(autorite.pays)
  ) {
    return getContentNotaireEtFrance(autorite);
  } else if (
    AutoriteUtil.isJuridiction(autorite.type) &&
    !LieuxUtils.isPaysFrance(autorite.pays)
  ) {
    return getContentJuridictionEtEtranger(autorite);
  } else if (
    AutoriteUtil.isNotaire(autorite.type) &&
    !LieuxUtils.isPaysFrance(autorite.pays)
  ) {
    return getContentNotaireEtEtranger(autorite);
  } else {
    return [];
  }
}

function getContentNotaireEtEtranger(
  autorite: IAutorite
): AccordionContentProps[] {
  return [
    getTypeAutoriteContent(autorite.type),
    getPrenomNom(autorite),
    getVilleAutoriteContent(autorite.ville),
    getRegionAutoriteContent(autorite.region),
    getPaysAutoriteContent(autorite.pays)
  ];
}

function getContentJuridictionEtEtranger(
  autorite: IAutorite
): AccordionContentProps[] {
  return [
    getTypeAutoriteContent(autorite.type),
    getVilleAutoriteContent(autorite.ville),
    getRegionAutoriteContent(autorite.region),
    getPaysAutoriteContent(autorite.pays)
  ];
}

function getContentJuridictionEtFrance(
  autorite: IAutorite
): AccordionContentProps[] {
  const contents: AccordionContentProps[] = [
    getTypeAutoriteContent(autorite.type),
    getVilleAutoriteContent(autorite.ville)
  ];

  addArrondissementAutoriteContentIfPossible(autorite, contents);

  addDepartementAutoriteContentIfPossible(autorite, contents);

  return contents;
}

function getContentNotaireEtFrance(
  autorite: IAutorite
): AccordionContentProps[] {
  const contents: AccordionContentProps[] = [
    getTypeAutoriteContent(autorite.type),
    getPrenomNom(autorite),
    getVilleAutoriteContent(autorite.ville)
  ];

  addArrondissementAutoriteContentIfPossible(autorite, contents);

  addDepartementAutoriteContentIfPossible(autorite, contents);

  contents.push(getNumeroCrpcen(autorite));

  return contents;
}

function getPrenomNom(autorite: IAutorite): AccordionContentProps {
  return {
    libelle: "Prénom NOM",
    value: (
      <span>
        {`Maitre ${autorite.prenomNotaire}`}
        <span className="uppercase">{autorite.nomNotaire}</span>
      </span>
    )
  };
}

function getNumeroCrpcen(autorite: IAutorite): AccordionContentProps {
  return {
    libelle: "N° CRPCEN",
    value: autorite.numeroCrpcen
  };
}

function getTypeAutoriteContent(type?: TypeAutorite): AccordionContentProps {
  return { libelle: "Type", value: AutoriteUtil.getLibelle(type) };
}

function getVilleAutoriteContent(ville: string): AccordionContentProps {
  return {
    libelle: "Ville",
    value: ville || ""
  };
}

function getRegionAutoriteContent(region: string): AccordionContentProps {
  return {
    libelle: "Région",
    value: region || ""
  };
}

function getPaysAutoriteContent(pays: string): AccordionContentProps {
  return {
    libelle: "Pays",
    value: pays || ""
  };
}

function addArrondissementAutoriteContentIfPossible(
  autorite: IAutorite,
  contents: AccordionContentProps[]
): void {
  if (autorite.ville && LieuxUtils.isVilleAvecArrondissement(autorite.ville)) {
    contents.push({
      libelle: "Arrondissement",
      value: `${autorite.arrondissement || ""}`
    });
  }
}

function addDepartementAutoriteContentIfPossible(
  autorite: IAutorite,
  contents: AccordionContentProps[]
): void {
  if (
    !LieuxUtils.isVilleParis(autorite.ville) &&
    LieuxUtils.isPaysFrance(autorite.pays)
  ) {
    contents.push({
      libelle: "Département",
      value: `${autorite.libelleDepartement || ""} (${
        autorite.numeroDepartement || ""
      })`
    });
  }
}
