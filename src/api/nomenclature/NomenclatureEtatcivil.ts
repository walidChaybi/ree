import { getNomenclatureEtatCivil } from "../appels/etatcivilApi";
import { NatureRc } from "../../model/etatcivil/enum/NatureRc";
import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../views/common/util/Utils";
import { NatureRca } from "../../model/etatcivil/enum/NatureRca";

const NATURE_RC = "NATURE_RC";
const NATURE_RCA = "NATURE_RCA";

export async function peupleNatureRc() {
  const natureRcs = await getNomenclatureEtatCivil(NATURE_RC);

  for (const data of natureRcs.body.data) {
    NatureRc.addEnum(
      NatureRc,
      data.id,
      new NatureRc(premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle))
    );
  }
}

export async function peupleNatureRca() {
  const natureRcas = await getNomenclatureEtatCivil(NATURE_RCA);

  for (const data of natureRcas.body.data) {
    NatureRca.addEnum(
      NatureRca,
      data.id,
      new NatureRca(premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle))
    );
  }
}
