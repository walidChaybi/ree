import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Option } from "@util/Type";

export const statutsRequetesCreation =
  StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.CREATION).map(
    (st: Option) => st.cle
  );

export const styleColonne = {
  width: "7.6em"
};
