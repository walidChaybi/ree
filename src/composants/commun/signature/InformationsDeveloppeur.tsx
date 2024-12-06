// DEV seulement
/* v8 ignore start */
const InformationsDeveloppeur: React.FC = () =>
  process.env.NODE_ENV === "development" ? (
    <div className="pb-2 text-start text-sm text-orange">
      <div>
        {"⚠ Vous êtes en mode développement."}
        <br />
        {"Les codes pin possibles sont :"}
      </div>
      <div className="mt-1">
        <span>{" - "}</span>
        <b>0000</b>
        <span>{" : valide."}</span>
      </div>
      <div>
        <span>{" - "}</span>
        <b>1111</b>
        <span>{" : invalide."}</span>
      </div>
      <div>
        <span>{" - "}</span>
        <b>2222</b>
        <span>{" : simule une erreur sur les documents."}</span>
      </div>
      <div className="mt-1">{"Tout autre code sera ignoré."}</div>
    </div>
  ) : (
    <></>
  );

export default InformationsDeveloppeur;
/* v8 ignore end */
