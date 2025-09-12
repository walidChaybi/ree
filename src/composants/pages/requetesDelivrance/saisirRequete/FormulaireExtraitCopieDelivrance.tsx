import { ISaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { useFormikContext } from "formik";
import ConteneurAccordeon from "../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import BlocEvenement from "./BlocEvenement";
import BlocLienTitulaire from "./BlocLienTitulaire";
import BlocMandant from "./BlocMandant";
import BlocPiecesJustificatives from "./BlocPiecesJustificatives";
import BlocRequerant from "./BlocRequerant";
import BlocRequete from "./BlocRequete";
import BlocTitulaires from "./BlocTitulaires";

const FormulaireExtraitCopieDelivrance: React.FC = () => {
  const {
    values: {
      requerant: { typeRequerant }
    }
  } = useFormikContext<ISaisieRDCForm>();

  return (
    <ConteneurAccordeon
      titre="Saisie courrier extrait/copie"
      estControlable
      ouvertParDefaut
    >
      <div className="h-[calc(100vh-22rem)] overflow-y-auto py-8">
        <div className="grid gap-10">
          <BlocRequete />
          <BlocEvenement />
          <BlocTitulaires />
          <BlocRequerant />
          {typeRequerant === "MANDATAIRE_HABILITE" && <BlocMandant />}
          {typeRequerant !== "INSTITUTIONNEL" && typeRequerant !== "AUTRE_PROFESSIONNEL" && <BlocLienTitulaire />}
          <BlocPiecesJustificatives />
        </div>
      </div>
    </ConteneurAccordeon>
  );
};

export default FormulaireExtraitCopieDelivrance;
