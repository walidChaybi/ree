import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { getLibelle, UN } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";

interface IBoutonsRappelTitulaireProps {
  onClickRappelCriteresTitulaire: (
    event: React.MouseEvent<HTMLButtonElement>,
    titulaire: ITitulaireRequete
  ) => void;
  titulaires?: ITitulaireRequete[];
}

export const BoutonsRappelTitulaire: React.FC<
  IBoutonsRappelTitulaireProps
> = props => {
  return (
    <div className="containerRappelTitulaire">
      {props.titulaires?.map((titulaire, index) => (
        <Bouton
          key={index}
          onClick={event =>
            props.onClickRappelCriteresTitulaire(event, titulaire)
          }
        >
          {`${getLibelle("Rappel titulaire")}${getPositionTitulaireAsTexte(
            titulaire.position,
            props.titulaires
          )}`}
        </Bouton>
      ))}
    </div>
  );
};

function getPositionTitulaireAsTexte(
  position: number,
  titulaires?: ITitulaireRequete[]
): string {
  let positionTexte = "";
  if (titulaires && titulaires.length > UN) {
    positionTexte = ` ${position}`;
  }
  return positionTexte;
}
