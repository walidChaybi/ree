import ChampTexte from "@composants/commun/champs/ChampTexte";
import ConteneurAvecBordure from "@composants/commun/conteneurs/formulaire/ConteneurAvecBordure";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { Filiation } from "@model/etatcivil/acte/Filiation";
import DateRECE from "@util/DateRECE";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { useMemo } from "react";

interface IVerificationDonneesNaissanceProps {
  acte: FicheActe | null;
}

const VerificationDonneesNaissance: React.FC<IVerificationDonneesNaissanceProps> = ({ acte }) => {
  const titulaire = acte?.titulaires?.[0];

  // Récupérer les parents et les trier (père en premier)
  const parents = useMemo(() => {
    if (!titulaire) return [];
    
    const parentsFiltered = titulaire.filiations.filter(filiation => filiation.lienParente === "PARENT");
    
    // Trier: MASCULIN (père) d'abord, puis FEMININ (mère)
    return parentsFiltered.sort((a, b) => {
      if (a.sexe === "MASCULIN" && b.sexe !== "MASCULIN") return -1;
      if (a.sexe !== "MASCULIN" && b.sexe === "MASCULIN") return 1;
      return 0;
    });
  }, [titulaire]);

  const pere = parents.find(p => p.sexe === "MASCULIN");
  const mere = parents.find(p => p.sexe === "FEMININ");

  // Mentions nationalité
  const mentionsNationalite = useMemo(() => {
    if (!acte) return [];
    return acte.mentions.filter(mention => mention.typeMention.natureMention?.code === "NATIONALITE");
  }, [acte]);

  // Format prénoms
  const formatPrenoms = (prenoms: string[]) => prenoms.join(", ");

  // Format date de naissance ou âge
  const formatDateNaissanceOuAge = (filiation: Filiation) => {
    if (filiation.naissance) {
      return DateRECE.depuisObjetDate(filiation.naissance).format("JJ/MM/AAAA");
    }
    if (filiation.age !== null) {
      return `${filiation.age} ans`;
    }
    return "";
  };

  // Format date de signature
  const formatDateSignature = () => {
    if (!acte?.dateDerniereDelivrance) return "";
    return DateRECE.depuisTimestamp(acte.dateDerniereDelivrance).format("JJ/MM/AAAA");
  };

  return (
    <div className="space-y-4">
      {/* Section 1: Informations du titulaire */}
      <ConteneurAvecBordure titreEnTete="Titulaire de l'acte">
        <div className="grid grid-cols-2 gap-4">
          <ChampTexte
            name="titulaire.nom"
            libelle="Nom du titulaire"
            value={titulaire?.nom || ""}
            estVerrouillable={true}
            readOnly
          />
          <ChampTexte
            name="titulaire.prenoms"
            libelle="Prénoms du titulaire"
            value={titulaire ? formatPrenoms(titulaire.prenoms) : ""}
            estVerrouillable={true}
            readOnly
          />
        </div>
      </ConteneurAvecBordure>

      {/* Section 2: Événement de naissance */}
      <ConteneurAvecBordure titreEnTete="Événement de naissance">
        <div className="grid grid-cols-2 gap-4">
          <ChampTexte
            name="evenement.date"
            libelle="Date de la naissance"
            value={
              acte?.evenement
                ? DateRECE.depuisObjetDate(acte.evenement).format("JJ/MM/AAAA")
                : ""
            }
            estVerrouillable={true}
            readOnly
          />
          <div className="grid grid-cols-2 gap-4">
            <ChampTexte
              name="evenement.heure"
              libelle="Heure"
              value={acte?.evenement?.heure?.toString() || ""}
              estVerrouillable={true}
              readOnly
            />
            <ChampTexte
              name="evenement.minute"
              libelle="Minute"
              value={acte?.evenement?.minute?.toString() || ""}
              estVerrouillable={true}
              readOnly
            />
          </div>
          <div className="col-span-2">
            <ChampTexte
              name="evenement.lieu"
              libelle="Lieu de naissance"
              value={
                acte?.evenement
                  ? LieuxUtils.getLieu(
                      acte.evenement.ville,
                      acte.evenement.region,
                      acte.evenement.pays,
                      acte.evenement.arrondissement
                    )
                  : ""
              }
              estVerrouillable={true}
              readOnly
            />
          </div>
        </div>
      </ConteneurAvecBordure>

      {/* Section 3: Parents */}
      {pere && (
        <ConteneurAvecBordure titreEnTete="Père">
          <div className="grid grid-cols-2 gap-4">
            <ChampTexte
              name="pere.nom"
              libelle="Nom du père"
              value={pere.nom || ""}
              estVerrouillable={true}
              readOnly
            />
            <ChampTexte
              name="pere.prenoms"
              libelle="Prénoms du père"
              value={formatPrenoms(pere.prenoms)}
              estVerrouillable={true}
              readOnly
            />
            <ChampTexte
              name="pere.dateNaissanceAge"
              libelle="Date de naissance/Âge du père"
              value={formatDateNaissanceOuAge(pere)}
              estVerrouillable={true}
              readOnly
            />
            <ChampTexte
              name="pere.lieuNaissance"
              libelle="Lieu de naissance du père"
              value={pere.getLieuDeRepriseOuLieuNaissance()}
              estVerrouillable={true}
              readOnly
            />
          </div>
        </ConteneurAvecBordure>
      )}

      {mere && (
        <ConteneurAvecBordure titreEnTete="Mère">
          <div className="grid grid-cols-2 gap-4">
            <ChampTexte
              name="mere.nom"
              libelle="Nom de la mère"
              value={mere.nom || ""}
              estVerrouillable={true}
              readOnly
            />
            <ChampTexte
              name="mere.prenoms"
              libelle="Prénoms de la mère"
              value={formatPrenoms(mere.prenoms)}
              estVerrouillable={true}
              readOnly
            />
            <ChampTexte
              name="mere.dateNaissanceAge"
              libelle="Date de naissance/Âge de la mère"
              value={formatDateNaissanceOuAge(mere)}
              estVerrouillable={true}
              readOnly
            />
            <ChampTexte
              name="mere.lieuNaissance"
              libelle="Lieu de naissance de la mère"
              value={mere.getLieuDeRepriseOuLieuNaissance()}
              estVerrouillable={true}
              readOnly
            />
          </div>
        </ConteneurAvecBordure>
      )}

      {/* Section 4: Mentions et signature */}
      <ConteneurAvecBordure titreEnTete="Mentions et signature">
        <div className="space-y-4">
          {mentionsNationalite.length > 0 && (
            <div>
              <label className="m-0 mb-1 ml-1 block w-fit text-start text-bleu-sombre">
                Français
              </label>
              <div className="space-y-2">
                {mentionsNationalite.map((mention, index) => (
                  <div
                    key={mention.id}
                    className="rounded border border-gris bg-gris-clair px-2 py-1"
                  >
                    {mention.getTexteExtrait()}
                  </div>
                ))}
              </div>
            </div>
          )}

          {acte && acte.mentions.length > 0 && (
            <div>
              <label className="m-0 mb-1 ml-1 block w-fit text-start text-bleu-sombre">
                Mentions marginales
              </label>
              <div className="space-y-2">
                {acte.mentions.map((mention, index) => (
                  <div
                    key={mention.id}
                    className="rounded border border-gris bg-gris-clair px-2 py-1"
                  >
                    {mention.getTexteExtrait()}
                  </div>
                ))}
              </div>
            </div>
          )}

          <ChampTexte
            name="dateSignature"
            libelle="Date de signature de l'acte"
            value={formatDateSignature()}
            estVerrouillable={true}
            readOnly
          />
        </div>
      </ConteneurAvecBordure>
    </div>
  );
};

export default VerificationDonneesNaissance;
