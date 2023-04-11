import * as React from "react";

interface IVisionneuseImageProps {
  infoBulle: string;
  url: string;
}

const VisionneuseImage: React.FC<IVisionneuseImageProps> = props => {
  // Même code que pour la visionneuse pdf
  // On pourrait aussi utiliser la balise <img> mais l'avantage de l'iframe c'est qu'elle redimensionne l'image automatiquement
  //  (avec un petit icône loupe éventuellement)
  // La ballise <img> quand à elle affiche l'image dans ses dimensions originales (si on ne spécifie pas width et height)
  // Je préfère garder un composant VisionneuseImage même si le code est identique à VisionneusePdf pour les évolutions futures
  //  (ex: comparaison de document où il serait préférable d'utiliser une <img> plutôt qu'une <iframe>)

  return (
    <div style={{ overflow: "hidden" }}>
      <iframe
        title={props.infoBulle}
        src={props.url}
        style={{
          overflow: "hidden",
          height: "100vh",
          width: "100%",
          border: 0
        }}
      ></iframe>
    </div>
  );
};

export default VisionneuseImage;
