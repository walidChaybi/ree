import { MandataireRc } from "../../model/etatcivil/enum/MandataireRc";
import { NatureRc } from "../../model/etatcivil/enum/NatureRc";
import { NatureRca } from "../../model/etatcivil/enum/NatureRca";
import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../views/common/util/Utils";
import { getNomenclatureEtatCivil } from "../appels/etatcivilApi";

const NATURE_RC = "NATURE_RC";
const NATURE_RCA = "NATURE_RCA";
const MANDATAIRE = "MANDATAIRE";

export async function peupleNatureRc() {
  const natureRcs = await getNomenclatureEtatCivil(NATURE_RC);

  // Pas besoin de recharger l'enum si les données viennent du cache car il a déjà été alimenté une première fois
  if (!natureRcs.inReceCache) {
    NatureRc.clean();
    for (const data of natureRcs.body.data) {
      NatureRc.addEnum(
        data.id,
        new NatureRc(premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle))
      );
    }
  }
}

export async function peupleNatureRca() {
  const natureRcas = await getNomenclatureEtatCivil(NATURE_RCA);

  // Pas besoin de recharger l'enum si les données viennent du cache car il a déjà été alimenté une première fois
  if (!natureRcas.inReceCache) {
    NatureRca.clean();
    for (const data of natureRcas.body.data) {
      NatureRca.addEnum(
        data.id,
        new NatureRca(premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle))
      );
    }
  }
}

export async function peupleMandataireRc() {
  const mandataireRcs = await getNomenclatureEtatCivil(MANDATAIRE);

  // Pas besoin de recharger l'enum si les données viennent du cache car il a déjà été alimenté une première fois
  if (!mandataireRcs.inReceCache) {
    MandataireRc.clean();
    for (const data of mandataireRcs.body.data) {
      MandataireRc.addEnum(
        data.id,
        new MandataireRc(
          premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle)
        )
      );
    }
  }
}
