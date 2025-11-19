import { CONFIG_GET_METAMODELE_TYPE_MENTION } from "@api/configurations/requete/miseAJour/GetMetamodeleTypeMentionConfigApi";
import { CONFIG_GET_TYPES_MENTION_PAR_NATURE } from "@api/configurations/requete/miseAJour/GetTypesMentionParNatureConfigApi";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { IMetaModeleTypeMentionDto, MetaModeleTypeMention } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { TObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { EEventState, useEventState } from "../../../../hooks/EventHook";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import SchemaValidation from "../../../../utils/SchemaValidation";
import { TEXTE_MENTION } from "../../../../views/common/composant/formulaire/ConstantesNomsForm";
import Bouton from "../../../commun/bouton/Bouton";
import ChampZoneTexte from "../../../commun/champs/ChampZoneTexte";
import ComposantChargeur from "../../../commun/chargeurs/ComposantChargeur";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import ScrollVersErreur from "../../../commun/formulaire/ScrollVersErreur";
import { IMentionEnCours } from "../PartieFormulaire";
import AideALaSaisieMention from "./mentions/AideALaSaisieMentionForm";
import ChampTypeMention from "./mentions/ChampTypeMention";

export interface ITitulaireMention {
  nom: string;
  nomPartie1: string;
  nomPartie2: string;
  nomSecable: boolean;
  prenoms: string[];
  sexe: keyof typeof ESexe | null;
}

export interface ITypeMentionDisponible {
  id: string;
  libelle: string;
  parents: { parent1: string | null; parent2: string | null };
  aideSaisie: boolean;
  affecteAnalyseMarginale: boolean;
  avecEnfants: boolean;
  libellesEnfants: string[];
  libellesParents: string[];
}

export type TMentionForm = {
  idTypeMention: string;
  mentionAffecteAnalyseMarginale: boolean;
  texteMention: string;
  textesEdites: { [cle: string]: { edite: string; original: string } };
} & TObjetFormulaire;

interface IMentionFormProps {
  titulaires: ITitulaireMention[];
  setEnCoursDeSaisie: React.Dispatch<React.SetStateAction<boolean>>;
  enCoursDeSaisie: boolean;
  setMentionEnCoursDeSaisie: React.Dispatch<React.SetStateAction<IMentionEnCours | null>>;
  natureActe?: keyof typeof ENatureActe;
}

const SCHEMA_VALIDATION_MENTIONS = {
  idTypeMention: Yup.string().required("Veuillez choisir un type de mention"),
  texteMention: Yup.string().required("Veuillez saisir le texte de la mention")
};

const formaterTexteMention = (texteMention: string): string =>
  `${texteMention.charAt(0).toUpperCase()}${texteMention.substring(1)}${texteMention.endsWith(".") ? "" : "."}`;

const DEFAUT_CREATION: TMentionForm = { idTypeMention: "", texteMention: "", textesEdites: {}, mentionAffecteAnalyseMarginale: false };

const MentionForm: React.FC<IMentionFormProps> = ({
  titulaires,
  setEnCoursDeSaisie,
  setMentionEnCoursDeSaisie,
  enCoursDeSaisie,
  natureActe
}) => {
  const [valeurDefaut, setValeurDefaut] = useState<TMentionForm>({ ...DEFAUT_CREATION });
  const [typeMentionChoisi, setTypeMentionChoisi] = useState<ITypeMentionDisponible | null>(null);
  const [metamodeleTypeMention, setMetamodeleTypeMention] = useState<MetaModeleTypeMention | null>(null);
  const { appelApi: getMetamodeleTypeMention, enAttenteDeReponseApi: enAttenteMetamodele } =
    useFetchApi(CONFIG_GET_METAMODELE_TYPE_MENTION);

  const { appelApi: getTypesMentionParNature } = useFetchApi(CONFIG_GET_TYPES_MENTION_PAR_NATURE);
  const [typesMentionDisponibles, setTypesMentionDisponibles] = useState<ITypeMentionDisponible[]>();

  const [mentionModifiee, setMentionModifiee] = useEventState<IMentionEnCours | null>(EEventState.MODIFIER_MENTION, null);
  const schemaValidation = useMemo(
    () =>
      SchemaValidation.objet({
        ...SCHEMA_VALIDATION_MENTIONS,
        ...(metamodeleTypeMention?.schemaValidation ?? {})
      }),
    [metamodeleTypeMention]
  );

  useEffect(() => {
    if (!natureActe) return;

    getTypesMentionParNature({
      parametres: {
        path: {
          natureActe: natureActe
        }
      },
      apresSucces: typeMentionDtos => {
        if (!typeMentionDtos.length) {
          AfficherMessage.erreur("La liste des types mention est vide.");
          setTypesMentionDisponibles([]);
          return;
        }

        const typesMentionDisponibles = TypeMention.genererListeTypesMentionDisponibles(
          typeMentionDtos.map(typeMentionDto => TypeMention.depuisDto(typeMentionDto))
        );
        setTypesMentionDisponibles(typesMentionDisponibles);
      },
      apresErreur: erreurs => AfficherMessage.erreur("Erreur lors de la récupération des types mention", { erreurs })
    });
  }, [natureActe]);

  useEffect(() => {
    if (!mentionModifiee) return;

    const idModifie = mentionModifiee.mention.idTypeMention;
    const typeMentionModifie = typesMentionDisponibles?.find(typeMention => typeMention.id === idModifie) ?? null;
    if (!typeMentionModifie) return;

    setTypeMentionChoisi(typeMentionModifie);
  }, [mentionModifiee]);

  useEffect(() => {
    setEnCoursDeSaisie(Boolean(typeMentionChoisi));

    if (!typeMentionChoisi) {
      setMetamodeleTypeMention(null);

      return;
    }

    if (typeMentionChoisi?.aideSaisie) {
      getMetamodeleTypeMention({
        parametres: { path: { idTypeMention: typeMentionChoisi.id } },
        apresSucces: (metamodele: IMetaModeleTypeMentionDto) => {
          const modele = MetaModeleTypeMention.depuisDto(metamodele);
          if (!modele) {
            throw new Error();
          }

          setMetamodeleTypeMention(modele);
          setValeurDefaut({
            ...modele.valeursInitiales(mentionModifiee?.mention.donneesAideSaisie?.champs),
            titulaires: titulaires.map(titulaire => {
              return {
                nom: titulaire.nom,
                nomPartie1: titulaire.nomPartie1,
                nomPartie2: titulaire.nomPartie2,
                nomSecable: titulaire.nomSecable,
                sexe: titulaire.sexe ? ESexe[titulaire.sexe] : "",
                prenoms: Object.fromEntries(titulaire.prenoms.map((prenom, i) => [`prenom${i + 1}`, prenom]))
              };
            }),
            idTypeMention: typeMentionChoisi.id,
            texteMention: mentionModifiee?.mention.texte ?? "",
            textesEdites: mentionModifiee?.mention.donneesAideSaisie?.textesEdites ?? {},
            mentionAffecteAnalyseMarginale: typeMentionChoisi.affecteAnalyseMarginale
          });
        },
        apresErreur: erreurs => {
          AfficherMessage.erreur("Impossible de récupérer les metamodeles", { erreurs });
          setValeurDefaut((prec: any) => ({ ...prec, texteMention: "" }));
        }
      });

      return;
    }

    setMetamodeleTypeMention(null);
    setValeurDefaut({
      idTypeMention: typeMentionChoisi.id,
      texteMention: mentionModifiee?.mention.texte ?? "",
      textesEdites: {},
      mentionAffecteAnalyseMarginale: typeMentionChoisi.affecteAnalyseMarginale
    });
  }, [typeMentionChoisi]);

  const mettreAJourMentionEnCoursDeSaisie = useCallback(
    (values: TMentionForm) => {
      setMentionEnCoursDeSaisie({
        mention: {
          idTypeMention: values.idTypeMention,
          donneesAideSaisie: {
            champs: (() => {
              const { idTypeMention, texteMention, textesEdites, ...champsAideSaisie } = values;

              return champsAideSaisie;
            })(),
            textesEdites: values.textesEdites
          },
          affecteAnalyseMarginale: values.mentionAffecteAnalyseMarginale,
          texte: formaterTexteMention(values.texteMention)
        },
        index: mentionModifiee?.index ?? null
      });
    },
    [setMentionEnCoursDeSaisie, mentionModifiee]
  );

  useEffect(() => {
    if (!enCoursDeSaisie) {
      setMentionModifiee(null);
      setValeurDefaut({ ...DEFAUT_CREATION });
      setTypeMentionChoisi(null);
    }
  }, [enCoursDeSaisie]);

  return (
    <div className="mt-4">
      <Formik<TMentionForm>
        initialValues={valeurDefaut}
        validationSchema={schemaValidation}
        enableReinitialize
        onSubmit={mettreAJourMentionEnCoursDeSaisie}
      >
        {({ values, initialValues }) => (
          <ConteneurAvecBordure titreEnTete={mentionModifiee ? "Modification d'une mention" : "Ajout d'une mention"}>
            {!typesMentionDisponibles ? (
              <ComposantChargeur />
            ) : (
              <Form className="grid gap-9 px-1 pt-3">
                <ScrollVersErreur />

                <ChampTypeMention
                  name="idTypeMention"
                  typesMentionDisponibles={typesMentionDisponibles}
                  setIdTypeMentionChoisi={id => setTypeMentionChoisi(typesMentionDisponibles.find(mention => mention.id === id) ?? null)}
                />

                {initialValues.idTypeMention && (
                  <>
                    {enAttenteMetamodele ? (
                      <ComposantChargeur />
                    ) : (
                      <>
                        {metamodeleTypeMention ? (
                          <AideALaSaisieMention metamodeleTypeMention={metamodeleTypeMention} />
                        ) : (
                          <ChampZoneTexte
                            libelle="Texte mention"
                            name={TEXTE_MENTION}
                            rows={8}
                            typeRedimensionnement="fixe"
                          />
                        )}
                      </>
                    )}

                    <div className="flex justify-end gap-6">
                      <Bouton
                        title="Valider"
                        disabled={!values.texteMention}
                        type="submit"
                      >
                        {mentionModifiee ? "Modifier mention" : "Ajouter mention"}
                      </Bouton>
                      <Bouton
                        title="Annuler"
                        styleBouton="secondaire"
                        onClick={() => {
                          if (mentionModifiee) {
                            setMentionModifiee(null);
                          }
                          setValeurDefaut({ ...DEFAUT_CREATION });
                          setTypeMentionChoisi(null);
                        }}
                      >
                        {"Annuler"}
                      </Bouton>
                    </div>
                  </>
                )}
              </Form>
            )}
          </ConteneurAvecBordure>
        )}
      </Formik>
    </div>
  );
};

export default MentionForm;
