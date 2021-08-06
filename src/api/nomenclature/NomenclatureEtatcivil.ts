import { MandataireRc } from "../../model/etatcivil/enum/MandataireRc";
import { NatureRc } from "../../model/etatcivil/enum/NatureRc";
import { NatureRca } from "../../model/etatcivil/enum/NatureRca";
import { TypeAlerte } from "../../model/etatcivil/enum/TypeAlerte";
import { logError } from "../../views/common/util/LogManager";
import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../views/common/util/Utils";
import { getNomenclatureEtatCivil } from "../appels/etatcivilApi";

const NATURE_RC = "NATURE_RC";
const NATURE_RCA = "NATURE_RCA";
const MANDATAIRE = "MANDATAIRE";
const TYPE_ALERTE = "TYPE_ALERTE";

export async function peupleNatureRc() {
  if (!NatureRc.contientEnums()) {
    try {
      const natureRcs = await getNomenclatureEtatCivil(NATURE_RC);
      NatureRc.clean();
      for (const data of natureRcs.body.data) {
        NatureRc.addEnum(
          data.id,
          new NatureRc(
            premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle)
          )
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
          new NatureRca(
            premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle)
          )
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
