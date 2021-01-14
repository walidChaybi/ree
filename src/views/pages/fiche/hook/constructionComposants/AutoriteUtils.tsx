import React from "react";
import {
  IAutorite,
  IFicheRcRca
} from "../../../../../model/etatcivil/FicheInterfaces";
import { AccordionPartProps } from "../../../../common/widget/accordion/AccordionPart";
import {
  AutoriteUtil,
  TypeAutorite
} from "../../../../../model/etatcivil/TypeAutorite";
import { AccordionContentProps } from "../../../../common/widget/accordion/AccordionContent";
import { LieuxUtils } from "../../../../../model/Lieux";
import { FicheUtil, TypeFiche } from "../../../../../model/etatcivil/TypeFiche";

export function getAutorite(retourBack: IFicheRcRca): AccordionPartProps[] {
  const autorite: AccordionPartProps[] = [
    {
      contents: getContentAutorite(
        retourBack.decision.autorite,
        retourBack.categorie
      ),
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
        retourBack.decision.sourceConfirmation.autorite,
        retourBack.categorie
      ),
      title: ""
    });
  }

  return autorite;
}

function getContentAutorite(
  autorite: IAutorite,
  typeFiche: TypeFiche
): AccordionContentProps[] {
  if (LieuxUtils.isPaysFrance(autorite.pays)) {
    return getContentAutoriteFrance(autorite, typeFiche);
  } else if (AutoriteUtil.isJuridiction(autorite.type)) {
    return getContentJuridictionEtEtranger(autorite);
  } else if (
    AutoriteUtil.isNotaire(autorite.type) ||
    AutoriteUtil.isOnac(autorite.type)
  ) {
    return getContentNotaireOnacEtEtranger(autorite);
  } else {
    return [];
  }
}

function getContentAutoriteFrance(
  autorite: IAutorite,
  typeFiche: TypeFiche
): AccordionContentProps[] {
  if (AutoriteUtil.isJuridiction(autorite.type)) {
    return getContentJuridictionEtFrance(autorite);
  } else if (AutoriteUtil.isNotaire(autorite.type)) {
    return getContentNotaireEtFrance(autorite);
  } else if (
    AutoriteUtil.isOnac(autorite.type) &&
    FicheUtil.isFicheRca(typeFiche)
  ) {
    return getContentOnacEtFrance(autorite);
  } else {
    return [];
  }
}

function getContentOnacEtFrance(autorite: IAutorite): AccordionContentProps[] {
  const content = [
    getTypeAutoriteContent(autorite.type),
    getTitreOnac(autorite),
    getVilleAutoriteContent(autorite.ville)
  ];

  if (LieuxUtils.isVilleAvecArrondissement(autorite.ville)) {
    content.push(getArrondissementAutoriteContent(autorite.arrondissement));
  }

  content.push(getDepartementAutoriteContent(autorite));

  return content;
}

function getContentNotaireOnacEtEtranger(
  autorite: IAutorite
): AccordionContentProps[] {
  return [
    getTypeAutoriteContent(autorite.type),
    AutoriteUtil.isNotaire(autorite.type)
      ? getPrenomNomNotaire(autorite)
      : getTitreOnac(autorite),
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
    getPrenomNomNotaire(autorite),
    getVilleAutoriteContent(autorite.ville)
  ];

  addArrondissementAutoriteContentIfPossible(autorite, contents);

  addDepartementAutoriteContentIfPossible(autorite, contents);

  contents.push(getNumeroCrpcen(autorite));

  return contents;
}

function getPrenomNomNotaire(autorite: IAutorite): AccordionContentProps {
  return {
    libelle: "Prénom NOM",
    value: (
      <span>{`Maitre ${autorite.prenomNotaire.charAt(
        0
      )}${autorite.prenomNotaire.slice(
        1
      )} ${autorite.nomNotaire.toUpperCase()}`}</span>
    )
  };
}

function getTitreOnac(autorite: IAutorite): AccordionContentProps {
  return {
    libelle: "Titre",
    value: (
      <span>
        {autorite.titreOnac
          ? `${autorite.titreOnac.charAt(0)}${autorite.titreOnac.slice(1)}`
          : ""}
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
    value: <span className="ville">{ville || ""}</span>
  };
}

function getRegionAutoriteContent(region: string): AccordionContentProps {
  return {
    libelle: "Région",
    value: <span className="region">{region || ""}</span>
  };
}

function getArrondissementAutoriteContent(
  arrondissement: string
): AccordionContentProps {
  return {
    libelle: "Arrondissement",
    value: <span>{arrondissement || ""}</span>
  };
}

function getDepartementAutoriteContent(
  autorite: IAutorite
): AccordionContentProps {
  return {
    libelle: "Département",
    value: (
      <span>{`${autorite.libelleDepartement} (${autorite.numeroDepartement})`}</span>
    )
  };
}

function getPaysAutoriteContent(pays: string): AccordionContentProps {
  return {
    libelle: "Pays",
    value: <span className="pays">{pays || ""}</span>
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
