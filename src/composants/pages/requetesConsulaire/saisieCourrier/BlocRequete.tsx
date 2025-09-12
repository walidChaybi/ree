import { CONFIG_GET_POSTES } from "@api/configurations/etatCivil/pocopa/GetPostesConfigApi";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ITypeRegistreDto, TypeRegistre } from "@model/etatcivil/acte/TypeRegistre";
import { ISaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { ELibelleNatureActeTranscrit, ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import ETypeLienRequerantCreation from "@model/requete/enum/ETypeLienRequerantCreation";
import { Options } from "@util/Type";
import { enumVersOptions } from "@util/Utils";
import { useFormikContext } from "formik";
import { useContext, useEffect, useMemo, useState } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import CacheOptionsPoste from "../../../../utils/CacheOptionsPoste";
import ChampListeDeroulante from "../../../commun/champs/ChampListeDeroulante";
import ChampRecherchePostes from "../../../commun/champs/ChampRecherchePocopas";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const OPTIONS_NATURE_ACTE: Options = [
  { cle: ENatureActeTranscrit.NAISSANCE_MINEUR, libelle: ELibelleNatureActeTranscrit.NAISSANCE_MINEUR.long }
];
const OPTIONS_LIEN_REQUERANT = enumVersOptions(ETypeLienRequerantCreation);

const BlocRequete: React.FC = () => {
  const { setFieldError, setFieldValue, values } = useFormikContext<ISaisieRequeteRCTCForm>();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [postes, setPostes] = useState<ITypeRegistreDto[] | []>([]);
  const { appelApi: appelGetPostes } = useFetchApi(CONFIG_GET_POSTES);

  const estHabiliteSaisieRequeteTousRegistre = useMemo(
    () =>
      utilisateurConnecte.estHabilitePour({
        leDroit: Droit.TRANSCRIPTION_SAISIR_REQUETE,
        surLePerimetre: Perimetre.TOUS_REGISTRES
      }),
    [utilisateurConnecte]
  );

  useEffect(() => {
    if (estHabiliteSaisieRequeteTousRegistre) return;

    const postesEnCache = CacheOptionsPoste.getPostesFamilleRegistre("CSL");
    if (postesEnCache?.length) {
      setPostes(postesEnCache);
      return;
    }

    appelGetPostes({
      parametres: {},
      apresSucces: posteDtos => {
        if (!posteDtos.length) {
          setFieldError("requete.typeRegistre.poste", "Aucun poste disponible, veuillez contacter votre administrateur.");
          return;
        }

        CacheOptionsPoste.setPostesFamilleRegistre("CSL", posteDtos);
        setPostes(TypeRegistre.depuisDtos(posteDtos));
      }
    });
  }, []);

  useEffect(() => {
    if (postes.length === 1 && !values.requete.typeRegistre.poste) {
      setFieldValue("requete.typeRegistre", {
        id: postes[0].id,
        poste: postes[0].poste
      });
    }
  }, [postes]);

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
          <ChampRecherchePostes
            name="requete.typeRegistre.poste"
            libelle="Poste"
            optionsRecherchePocopa={{ familleRegistre: "CSL", seulementPocopaOuvert: true }}
            estObligatoire
          />
        ) : (
          <ChampListeDeroulante
            name="requete.typeRegistre.poste"
            libelle="Poste"
            options={(postes.length === 1 ? [] : [{ cle: "", libelle: "" }]).concat(TypeRegistre.versOptions(postes))}
            disabled={!postes.length}
            estObligatoire
            apresChangement={valeur => {
              const posteSelectionne = postes.find(p => p.poste === valeur);
              setFieldValue("requete.typeRegistre.id", posteSelectionne?.id ?? "");
            }}
          />
        )}
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocRequete;
