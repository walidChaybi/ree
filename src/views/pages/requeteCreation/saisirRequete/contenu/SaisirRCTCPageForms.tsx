import {
  PARENTS,
  PIECES_JOINTES,
  REQUERANT,
  REQUETE,
  TITULAIRE
} from "@composant/formulaire/ConstantesNomsForm";
import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { getLibelle } from "@util/Utils";
import PiecesJointesForm from "@widget/formulaire/piecesJointes/PiecesJointesForm";
import IdentiteTitulaireForm from "../sousForm/identite/IdentiteTitulaireForm";
import ParentsForm from "../sousForm/parent/ParentsForm";
import RequerantForm from "../sousForm/requerant/RequerantForm";
import RequeteForm from "../sousForm/requete/RequeteForm";

const MAX_PIECES_JOINTES = 34;

export function getRequeteForm(): JSX.Element {
  return (
    <RequeteForm
      key={REQUETE}
      nom={REQUETE}
      titre={getLibelle("Acte à transcrire")}
    />
  );
}

export function getTitulaireForm(
  titulaire?: ITitulaireRequeteCreation
): JSX.Element {
  return (
    <IdentiteTitulaireForm
      nom={TITULAIRE}
      key={TITULAIRE}
      titre={getLibelle("Titulaire 1")}
      titulaire={titulaire}
    />
  );
}

export function getParentsForm(
  parents?: ITitulaireRequeteCreation[]
): JSX.Element {
  return <ParentsForm key={PARENTS} nom={PARENTS} parents={parents} />;
}

export function getRequerantForm(): JSX.Element {
  return (
    <RequerantForm
      nom={REQUERANT}
      key={REQUERANT}
      titre={getLibelle("Requérant")}
    />
  );
}

export function getPiecesJointesForm(): JSX.Element {
  return (
    <PiecesJointesForm
      key={PIECES_JOINTES}
      nom={PIECES_JOINTES}
      typeRequete={TypeRequete.CREATION}
      typeRedactionActe={TypeRedactionActe.TRANSCRIT}
      titre={getLibelle("Pièces justificatives")}
      maxPiecesJointes={MAX_PIECES_JOINTES}
    />
  );
}
