import { mappingTypeMention } from "@hook/acte/mentions/MentionsApiHook";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { MandataireRc } from "@model/etatcivil/enum/MandataireRc";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { NatureRca } from "@model/etatcivil/enum/NatureRca";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { logError } from "@util/LogManager";
import { premiereLettreEnMajusculeLeResteEnMinuscule } from "@util/Utils";
import {
  getNomenclatureEtatCivil,
  getTypesMention
} from "../appels/etatcivilApi";

const NATURE_RC = "NATURE_RC";
const NATURE_RCA = "NATURE_RCA";
const MANDATAIRE = "MANDATAIRE";
const TYPE_ALERTE = "TYPE_ALERTE";
const NATURE_MENTION = "NATURE_MENTION";
const POPIN_SIGNATURE = "POPIN_SIGNATURE";

export async function peupleNatureRc() {
  if (!NatureRc.contientEnums()) {
    try {
      const natureRcs = await getNomenclatureEtatCivil(NATURE_RC);
      NatureRc.clean();
      for (const data of natureRcs.body.data) {
        NatureRc.addEnum(
          data.id,
          new NatureRc(data.article, data.type, data.libelle)
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur: "Impossible de charger les natures RC",
        error
      });
    }
  }
}

export async function peupleNatureRca() {
  if (!NatureRca.contientEnums()) {
    try {
      const natureRcas = await getNomenclatureEtatCivil(NATURE_RCA);
      NatureRca.clean();
      for (const data of natureRcas.body.data) {
        NatureRca.addEnum(
          data.id,
          new NatureRca(data.article, data.type, data.libelle)
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur: "Impossible de charger les natures RCA",
        error
      });
    }
  }
}

export async function peupleMandataireRc() {
  if (!MandataireRc.contientEnums()) {
    try {
      const mandataireRcs = await getNomenclatureEtatCivil(MANDATAIRE);
      MandataireRc.clean();
      for (const data of mandataireRcs.body.data) {
        MandataireRc.addEnum(
          data.id,
          new MandataireRc(
            premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle)
          )
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur: "Impossible de charger les mandataires RC",
        error
      });
    }
  }
}

export async function peupleNatureMention() {
  if (!NatureMention.contientEnums()) {
    try {
      const natureMention = await getNomenclatureEtatCivil(NATURE_MENTION);
      NatureMention.clean();
      for (const data of natureMention.body.data) {
        NatureMention.addEnum(
          data.id,
          new NatureMention(
            data.code,
            data.libelle,
            "",
            data.estActif,
            data.opposableAuTiers
          )
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur: "Impossible de charger les natures des mentions",
        error
      });
    }
  }
}

export async function peupleTypeAlerte() {
  if (!TypeAlerte.contientEnums()) {
    try {
      const typeAlerte = await getNomenclatureEtatCivil(TYPE_ALERTE);
      TypeAlerte.clean();
      for (const data of typeAlerte.body.data) {
        TypeAlerte.addEnum(
          data?.id,
          new TypeAlerte(
            data?.code,
            data?.type,
            data?.sousType,
            data?.description,
            premiereLettreEnMajusculeLeResteEnMinuscule(data?.libelle)
          )
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur: "Impossible de charger les types alerte",
        error
      });
    }
  }
}

export async function peupleTypeMention() {
  if (!TypeMention.contientEnums()) {
    try {
      const typesMention = await getTypesMention();
      TypeMention.clean();
      for (const data of typesMention.body.data) {
        TypeMention.ajouteTypeMention(mappingTypeMention(data));
      }
    } catch (error) {
      logError({
        messageUtilisateur: "Impossible de charger les types mention",
        error
      });
    }
  }
}

export async function peuplePopinSignature() {
  if (!TypePopinSignature.contientEnums()) {
    try {
      const popinsSignature = await getNomenclatureEtatCivil(POPIN_SIGNATURE);
      TypePopinSignature.clean();
      for (const data of popinsSignature.body.data) {
        TypePopinSignature.ajouteTypePopinSignature(data);
      }
    } catch (error) {
      logError({
        messageUtilisateur: "Impossible de charger les popins signatures",
        error
      });
    }
  }
};
