import React from "react";
import {
  Autorite,
  IAutorite
} from "../../../../../../model/etatcivil/commun/IAutorite";
import {
  TypeAutorite,
  TypeAutoriteUtil
} from "../../../../../../model/etatcivil/enum/TypeAutorite";
import {
  FicheUtil,
  TypeFiche
} from "../../../../../../model/etatcivil/enum/TypeFiche";
import { IFicheRcRca } from "../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import {
  formatNom,
  formatPrenom,
  getValeurOuVide
} from "../../../../../common/util/Utils";
import { LieuxUtils } from "../../../../../common/utilMetier/LieuxUtils";
import { SectionContentProps } from "../../../../../common/widget/section/SectionContent";
import { SectionPartProps } from "../../../../../common/widget/section/SectionPart";

export function getAutorite(rcrca: IFicheRcRca): SectionPartProps[] {
  let autorite: SectionPartProps[] = [];
  if (rcrca.decision) {
    autorite = [
      {
        partContent: {
          contents: getContentAutorite(rcrca.decision.autorite, rcrca.categorie)
        }
      }
    ];

    if (
      rcrca.decision &&
      rcrca.decision.sourceConfirmation != null &&
      TypeAutoriteUtil.isJuridiction(
        rcrca.decision.sourceConfirmation.autorite.typeAutorite
      )
    ) {
      autorite.push({
        partContent: {
          contents: getContentAutorite(
            rcrca.decision.sourceConfirmation.autorite,
            rcrca.categorie
          )
        }
      });
    }
  }
  return autorite;
}

function getContentAutorite(
  autorite: IAutorite,
  typeFiche: TypeFiche
): SectionContentProps[] {
  if (LieuxUtils.isPaysFrance(autorite.pays)) {
    return getContentAutoriteFrance(autorite, typeFiche);
  } else if (TypeAutoriteUtil.isJuridiction(autorite.typeAutorite)) {
    return getContentJuridictionEtEtranger(autorite);
  } else if (
    TypeAutoriteUtil.isNotaire(autorite.typeAutorite) ||
    TypeAutoriteUtil.isOnac(autorite.typeAutorite)
  ) {
    return getContentNotaireOnacEtEtranger(autorite);
  } else {
    return [];
  }
}

function getContentAutoriteFrance(
  autorite: IAutorite,
  typeFiche: TypeFiche
): SectionContentProps[] {
  if (TypeAutoriteUtil.isJuridiction(autorite.typeAutorite)) {
    return getContentJuridictionEtFrance(autorite);
  } else if (TypeAutoriteUtil.isNotaire(autorite.typeAutorite)) {
    return getContentNotaireEtFrance(autorite);
  } else if (
    TypeAutoriteUtil.isOnac(autorite.typeAutorite) &&
    FicheUtil.isFicheRca(typeFiche)
  ) {
    return getContentOnacEtFrance(autorite);
  } else {
    return [];
  }
}

function getContentOnacEtFrance(autorite: IAutorite): SectionContentProps[] {
  const content = [
    getTypeAutoriteContent(autorite.typeAutorite),
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
): SectionContentProps[] {
  return [
    getTypeAutoriteContent(autorite.typeAutorite),
    TypeAutoriteUtil.isNotaire(autorite.typeAutorite)
      ? getPrenomNomNotaire(autorite)
      : getTitreOnac(autorite),
    getVilleAutoriteContent(autorite.ville),
    getRegionAutoriteContent(autorite.region),
    getPaysAutoriteContent(autorite.pays)
  ];
}

function getContentJuridictionEtEtranger(
  autorite: IAutorite
): SectionContentProps[] {
  return [
    getTypeJuridictionContent(autorite.typeJuridiction),
    getVilleAutoriteContent(autorite.ville),
    getRegionAutoriteContent(autorite.region),
    getPaysAutoriteContent(autorite.pays)
  ];
}

function getContentJuridictionEtFrance(
  autorite: IAutorite
): SectionContentProps[] {
  const contents: SectionContentProps[] = [
    getTypeJuridictionContent(autorite.typeJuridiction),
    getVilleAutoriteContent(autorite.ville)
  ];

  addArrondissementAutoriteContentIfPossible(autorite, contents);

  addDepartementAutoriteContentIfPossible(autorite, contents);

  return contents;
}

function getContentNotaireEtFrance(autorite: IAutorite): SectionContentProps[] {
  const contents: SectionContentProps[] = [
    getTypeAutoriteContent(autorite.typeAutorite),
    getPrenomNomNotaire(autorite),
    getVilleAutoriteContent(autorite.ville)
  ];

  addArrondissementAutoriteContentIfPossible(autorite, contents);

  addDepartementAutoriteContentIfPossible(autorite, contents);

  contents.push(getNumeroCrpcen(autorite));

  return contents;
}

function getPrenomNomNotaire(autorite: IAutorite): SectionContentProps {
  return {
    libelle: "Prénom NOM",
    value: (
      <span>{`Maître ${formatPrenom(autorite.prenomNotaire)} ${formatNom(
        autorite.nomNotaire
      )}`}</span>
    )
  };
}

function getTitreOnac(autorite: IAutorite): SectionContentProps {
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

function getNumeroCrpcen(autorite: IAutorite): SectionContentProps {
  return {
    libelle: "N° CRPCEN",
    value: Autorite.getNumeroCrpcen(autorite)
  };
}

function getTypeAutoriteContent(type?: TypeAutorite): SectionContentProps {
  return { libelle: "Type", value: TypeAutoriteUtil.getLibelle(type) };
}

function getTypeJuridictionContent(
  libelleTypeJuridiction?: string
): SectionContentProps {
  return {
    libelle: "Type",
    value: getValeurOuVide(libelleTypeJuridiction)
  };
}

function getVilleAutoriteContent(ville?: string): SectionContentProps {
  return {
    libelle: "Ville",
    value: <span className="ville">{ville || ""}</span>
  };
}

function getRegionAutoriteContent(region?: string): SectionContentProps {
  return {
    libelle: "Région",
    value: <span className="region">{region || ""}</span>
  };
}

function getArrondissementAutoriteContent(
  arrondissement?: string
): SectionContentProps {
  return {
    libelle: "Arrondissement",
    value: <span>{arrondissement || ""}</span>
  };
}

function getDepartementAutoriteContent(
  autorite: IAutorite
): SectionContentProps {
  return {
    libelle: "Département",
    value: (
      <span>{`${autorite.libelleDepartement} (${autorite.numeroDepartement})`}</span>
    )
  };
}

function getPaysAutoriteContent(pays?: string): SectionContentProps {
  return {
    libelle: "Pays",
    value: <span className="pays">{pays || ""}</span>
  };
}

function addArrondissementAutoriteContentIfPossible(
  autorite: IAutorite,
  contents: SectionContentProps[]
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
  contents: SectionContentProps[]
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
