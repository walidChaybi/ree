import { CONFIG_GET_POCOPAS } from "@api/configurations/etatCivil/pocopa/GetPocopasConfigApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ITypeRegistreDto } from "@model/etatcivil/acte/ITypeRegistre";
import { ISaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { ELibelleNatureActeTranscrit, ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { ETypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { Options } from "@util/Type";
import { enumVersOptions } from "@util/Utils";
import { useFormikContext } from "formik";
import { useContext, useEffect, useMemo, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import CacheDonneesPocopa from "../../../../utils/CacheDonneesPocopa";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampRecherchePocopas from "../../../commun/champs/ChampRecherchePocopas";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const OPTIONS_NATURE_ACTE: Options = [
  { cle: ENatureActeTranscrit.NAISSANCE_MINEUR, libelle: ELibelleNatureActeTranscrit.NAISSANCE_MINEUR.long }
];
const OPTIONS_LIEN_REQUERANT = enumVersOptions(ETypeLienRequerantCreation);

const BlocRequete: React.FC = () => {
  const { setFieldError, setFieldValue, values } = useFormikContext<ISaisieRequeteRCTCForm>();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [pocopas, setPocopas] = useState<ITypeRegistreDto[] | []>([]);
  const { appelApi: appelGetPocopas } = useFetchApi(CONFIG_GET_POCOPAS);

  const estHabiliteSaisieRequeteTousRegistre = useMemo(
    () =>
      utilisateurConnecte.estHabilitePour({
        leDroit: Droit.SAISIR_REQUETE,
        surLePerimetre: Perimetre.TOUS_REGISTRES
      }),
    [utilisateurConnecte]
  );

  useEffect(() => {
    if (estHabiliteSaisieRequeteTousRegistre) return;

    const pocopasCache = CacheDonneesPocopa.getPocopas();

    if (pocopasCache?.length) {
      setPocopas(pocopasCache);

      return;
    }

    appelGetPocopas({
      parametres: {},
      apresSucces: pocopaDtos => {
        if (!pocopaDtos.length) {
          setFieldError("requete.villeRegistre", "Aucun pocopa disponible, veuillez contacter votre administrateur.");
          return;
        }

        CacheDonneesPocopa.setPocopas(pocopaDtos);
        setPocopas(pocopaDtos);
      }
    });
  }, []);

  useEffect(() => {
    if (pocopas.length && !values.requete.villeRegistre) {
      setFieldValue("requete.villeRegistre", pocopas[0].pocopa);
    }
  }, [pocopas]);

  return (
    <ConteneurAvecBordure titreEnTete="REQUÊTE">
      <ChampListeDeroulante
        name="requete.natureActe"
        libelle="Acte à transcrire"
        options={OPTIONS_NATURE_ACTE}
        estObligatoire
      />

      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampListeDeroulante
          name="requete.lienRequerant"
          libelle="Requérant"
          options={OPTIONS_LIEN_REQUERANT}
          estObligatoire
        />

        {estHabiliteSaisieRequeteTousRegistre ? (
          <ChampRecherchePocopas
            name="requete.villeRegistre"
            libelle="Registre"
            optionsRecherchePocopa={{ familleRegistre: "CSL", seulementPocopaOuvert: true }}
            estObligatoire
          />
        ) : (
          <ChampListeDeroulante
            name="requete.villeRegistre"
            libelle="Registre"
            options={CacheDonneesPocopa.versOptions(pocopas)}
            disabled={!pocopas.length}
            estObligatoire
          />
        )}
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocRequete;
