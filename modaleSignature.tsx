import ConteneurModale from "../conteneurs/modale/ConteneurModale";
import SignatureDocument from "./SignatureDocument";

interface IModaleSignatureProps {
  typeSignature: "MISE_A_JOUR" | "DOUBLE_NUMERIQUE" | "ETABLI" | "TRANSCRIT";
  idActe: string;
  idRequete: string;
  idSuivi?: string;
  avantSignature?: () => Promise<boolean>;
  apresSignature: (succes: boolean) => void;
}

const ModaleSignature: React.FC<IModaleSignatureProps> = ({ typeSignature, idActe, idRequete, idSuivi, avantSignature, apresSignature }) => (
  <ConteneurModale>
    <div className="border-3 w-[34rem] max-w-full rounded-xl border-solid border-bleu-sombre bg-blanc p-5">
      <h2 className="m-0 mb-4 text-center font-medium text-bleu-sombre">Signature des mentions</h2>
      <SignatureDocument
        typeSignature={typeSignature}
        idActe={idActe}
        idRequete={idRequete}
        {...(idSuivi ? { idSuivi } : {})}
        {...(avantSignature ? { avantSignature } : {})}
        apresSignature={apresSignature}
      />
    </div>
  </ConteneurModale>
);

export default ModaleSignature;
