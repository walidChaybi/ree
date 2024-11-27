import { IDocumentSigne } from "../../../utils/Signature";

interface IListeErreursSignatureProps {
  documentsSignes: IDocumentSigne[];
}

const ListeErreursSignature: React.FC<IListeErreursSignatureProps> = ({ documentsSignes }) => (
  <div className="max-h-44 overflow-y-auto">
    <ul className="pl-5 text-start text-rouge">
      {[...documentsSignes]
        .reverse()
        .map(documentSigne => documentSigne.erreur && <li key={documentSigne.id}>{documentSigne.erreur.libelle}</li>)}
    </ul>
  </div>
);

export default ListeErreursSignature;
