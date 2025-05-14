import { TNumeroInscriptionRcRcaForm } from "@model/form/commun/NumeroInscriptionRcRcaForm";
import AddCircle from "@mui/icons-material/AddCircle";
import Delete from "@mui/icons-material/Delete";
import { useField } from "formik";
import { useMemo, useState } from "react";
import BoutonIcon from "../bouton/BoutonIcon";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

interface IChampsNumeroInscriptionRcRcaProps {
  libelle: string;
  cheminNumeroInscriptionRcRca: string;
  prefixeNumeroInscriptionRcRca: string;
  tailleMax: number;
}

interface IChampInscriptionProps {
  name: string;
  libelle: string;
  actionSuppression?: () => void;
  estObligatoire?: boolean;
}

const seulementNumerique = (texte: string) => texte.replace(/\D/, "");

const ChampInscription: React.FC<IChampInscriptionProps> = ({ name, libelle, actionSuppression, estObligatoire }) => {
  const champInscription = useMemo(
    () => ({
      annee: `${name}.anneeInscription`,
      numero: `${name}.numero`
    }),
    [name]
  );
  const [fieldAnnee, metaAnnee] = useField(champInscription.annee);
  const [fieldNumero, metaNumero] = useField(champInscription.numero);
  const [refAnnee, setRefAnnee] = useState<HTMLInputElement | null>(null);
  const [refNumero, setRefNumero] = useState<HTMLInputElement | null>(null);
  const enErreur = useMemo(
    () => (Boolean(metaAnnee.error) || Boolean(metaNumero.error)) && metaAnnee.touched && metaNumero.touched,
    [metaAnnee, metaNumero]
  );

  return (
    <div {...(enErreur ? { className: CHAMP_EN_ERREUR } : {})}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={champInscription.annee}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">{"*"}</span>}
      </label>
      <div className="flex items-center gap-1">
        <input
          ref={setRefAnnee}
          id={champInscription.annee}
          className={`border-1 flex w-10 rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${Boolean(metaAnnee.error) && metaAnnee.touched ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          maxLength={4}
          placeholder="AAAA"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const valeur = seulementNumerique(event.target.value).replace(/^0{1,4}/, "");
            valeur.length === 4 && refNumero?.focus();
            event.target.value = valeur;
            fieldAnnee.onChange(event);
          }}
          {...(() => {
            const { onChange, ...autreProps } = fieldAnnee;

            return autreProps;
          })()}
        />
        <span>{"-"}</span>
        <div className="relative flex flex-grow rounded-md shadow-sm">
          <input
            ref={setRefNumero}
            id={champInscription.numero}
            className={`border-1 flex w-full rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${Boolean(metaNumero.error) && metaNumero.touched ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
            maxLength={5}
            placeholder="XXXXX"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const valeur = seulementNumerique(event.target.value);
              !valeur.length && fieldNumero.value.length && refAnnee?.focus();
              event.target.value = valeur;
              fieldNumero.onChange(event);
            }}
            {...(() => {
              const { onChange, ...autreProps } = fieldNumero;

              return autreProps;
            })()}
          />
          {actionSuppression && (
            <BoutonIcon
              className="group absolute right-0 h-full rounded-l-none bg-transparent"
              type="button"
              title="Supprimer ce numéro"
              onClick={actionSuppression}
              styleBouton="suppression"
            >
              <Delete className="text-rouge group-hover:text-blanc group-focus-visible:text-blanc" />
            </BoutonIcon>
          )}
        </div>
      </div>

      {enErreur && <div className="text-start text-sm text-rouge">{metaAnnee.error ?? metaNumero.error}</div>}
    </div>
  );
};

const ChampsNumeroInscriptionRcRca: React.FC<IChampsNumeroInscriptionRcRcaProps> = ({
  libelle,
  cheminNumeroInscriptionRcRca,
  prefixeNumeroInscriptionRcRca,
  tailleMax
}) => {
  const prefixeNomChamp = useMemo(
    () => (cheminNumeroInscriptionRcRca ? `${cheminNumeroInscriptionRcRca}.` : "").concat(prefixeNumeroInscriptionRcRca),
    [cheminNumeroInscriptionRcRca, prefixeNumeroInscriptionRcRca]
  );
  const [champ, , helper] = useField<TNumeroInscriptionRcRcaForm>(cheminNumeroInscriptionRcRca);

  return (
    <div className="grid grid-cols-2 gap-4">
      <ChampInscription
        name={`${prefixeNomChamp}1`}
        libelle={`${libelle}${champ.value?.nombreNumerosAffiches > 1 ? " 1" : ""}`}
      />

      {tailleMax > 1 && (
        <div className="flex justify-center pt-[1.6rem]">
          <BoutonIcon
            className="h-9 w-1/2"
            type="button"
            title="Ajouter un numéro"
            onClick={() =>
              champ.value?.nombreNumerosAffiches < tailleMax &&
              helper.setValue({ ...champ.value, nombreNumerosAffiches: champ.value?.nombreNumerosAffiches + 1 })
            }
            hidden={champ.value?.nombreNumerosAffiches >= tailleMax}
            styleBouton="secondaire"
          >
            <div className="flex items-center gap-4 px-2">
              <AddCircle />
              <span className="font-noto-sans-ui text-sm font-bold">{"Ajouter un numéro"}</span>
            </div>
          </BoutonIcon>
        </div>
      )}

      {Array.from({ length: (champ.value?.nombreNumerosAffiches ?? 1) - 1 }, (_, index) => index + 2).map(indexChamp => (
        <div key={`${indexChamp}`}>
          <ChampInscription
            name={`${prefixeNomChamp}${indexChamp}`}
            libelle={`${libelle} ${indexChamp}`}
            actionSuppression={() =>
              helper.setValue({
                ...champ.value,
                nombreNumerosAffiches: champ.value?.nombreNumerosAffiches - 1,
                ...Array.from({ length: tailleMax + 1 - indexChamp }, (_, index) => index + indexChamp).reduce(
                  (numerosInscriptionRCRCA, indexNumero) => ({
                    ...numerosInscriptionRCRCA,
                    [`ligne${indexNumero}`]: champ.value?.[`ligne${indexNumero + 1}` as keyof TNumeroInscriptionRcRcaForm] ?? ""
                  }),
                  {}
                )
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ChampsNumeroInscriptionRcRca;
