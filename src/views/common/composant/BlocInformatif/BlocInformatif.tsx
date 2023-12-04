import { getLibelle } from "@util/Utils";
import "./scss/BlocInformatif.scss";

interface BlocInformatifProps {
  texte: string;
}

export const BlocInformatif: React.FC<BlocInformatifProps> = props => {
  return <div className="BlocInfo">{getLibelle(props.texte)}</div>;
};
