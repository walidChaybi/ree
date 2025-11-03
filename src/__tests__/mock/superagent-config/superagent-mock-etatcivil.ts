import { ReponseEnregistrementProjetActe } from "@mock/data/ProjetActe";
import { ReponseAppelAddAlerteActe, ReponseAppelGetAlertesActe } from "../data/Alertes";
import { imagePngVideBase64 } from "../data/ImagePng";
import { actesInscriptionsSauvegardes } from "../data/actesInscriptionsSauvegardes";
import { mentions, mentionsPlurilingues } from "../data/mentions";
import {
  ReponseAppelNomenclatureMandataire,
  ReponseAppelNomenclatureNatureMention,
  ReponseAppelNomenclatureNatureRC,
  ReponseAppelNomenclatureNatureRCA,
  ReponseAppelNomenclaturePopinSignature,
  ReponseAppelNomenclatureTypeAlerte,
  ReponseAppelNomenclatureTypeMention
} from "../data/nomenclatures";

export const configEtatcivil = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-etatcivil-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match: any, params: any, headers: any, context: any) {
      if (match[1] === "/acte/6e89c1c1-16c4-4e40-9b72-7b567270b26f/saisieExtrait") {
        return { data: null };
      }

      /////////////////////////////////////////////////////////////////////
      // Mention
      if (match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/mentions?statut=SIGNEE" && context.method === "get") {
        return {
          data: mentions.map(mention => ({ ...mention, statut: "SIGNEE" }))
        };
      }
      if (match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/mentions" && context.method === "get") {
        return { data: mentions };
      }
      if (match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/mentions?statut=BROUILLON") {
        return { data: mentions };
      }
      if (match[1] === "/acte/b41079a5-9e8f-478a-b04c-c4c2ac671123/mentions?statut=SIGNEE" && context.method === "get") {
        return { data: mentions };
      }
      if (match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235e/mentions?statut=SIGNEE" && context.method === "get") {
        return { data: mentionsPlurilingues };
      }
      if (
        (match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/mentions" ||
          match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235b/mentions" ||
          match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134a/mentions" ||
          match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/corpstexte?type=EXTRAIT_AVEC_FILIATION") &&
        context.method === "post"
      ) {
        return { data: true };
      }

      /////////////////
      // Projet acte //
      /////////////////

      if (match[1] === "/projetacte/etabli") {
        return ReponseEnregistrementProjetActe;
      }

      if (match[1] === "/projetacte/d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca/composer-document-final") {
        return { data: "documentFinalSigneEncodeEnBase64", status: 200 };
      }

      if (match[1] === "/projetacte/d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca/integrer-acte-signe") {
        return { status: 200 };
      }
      /////////////////
      // Signature //
      /////////////////

      // Actes / inscriptions sauvegardes
      if (match[1] === "/projetacte/actesinscriptionssauvegardes") {
        return { data: actesInscriptionsSauvegardes };
      }

      if (
        match[1] === "/acte/a5187320-d722-4673-abd7-a73ed41ad8c1/composer-document-mentions-ulterieures" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/composer-document-mentions-ulterieures"
      ) {
        return {
          data: "documentMentionsUlterieuresSigneEncodeEnBase64",
          status: 200
        };
      }

      if (
        match[1] === "/acte/a5187320-d722-4673-abd7-a73ed41ad8c1/integrer-document-mention-signe" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/integrer-document-mention-signe"
      ) {
        return { status: 200 };
      }

      /////////////////
      // derniere analyse marginale pour mise a jours mentions //
      /////////////////

      if (match[1] === "/analyse-marginale/acte/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee") {
        return {
          data: true
        };
      }

      if (match[1] === "/analyse-marginale/validation/acte/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee") {
        return {
          data: true
        };
      }

      ////////////////////////////////////////////////////////////////////////

      if (match[1] === "/nomenclature/NATURE_RC,NATURE_RCA,NATURE_MENTION,MANDATAIRE,TYPE_ALERTE,POPIN_SIGNATURE") {
        return {
          data: (ReponseAppelNomenclatureNatureRC.data as any).concat(
            (ReponseAppelNomenclatureNatureRCA.data as any).concat(
              (ReponseAppelNomenclatureMandataire.data as any).concat(
                (ReponseAppelNomenclatureTypeAlerte.data as any).concat(
                  (ReponseAppelNomenclatureNatureMention.data as any).concat(ReponseAppelNomenclaturePopinSignature.data)
                )
              )
            )
          )
        };
      }

      if (match[1] === "/nomenclature/typemention") {
        return { data: ReponseAppelNomenclatureTypeMention.data };
      }

      if (match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/dernieredelivrance") {
        return { data: true };
      }

      if (match[1] === "/repertoirecivil/datedernieredelivrance") {
        return { data: null };
      }

      if (
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/alertes" ||
        match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/alertes" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134a/alertes" ||
        match[1] === "/acte/b41079a5-9e8f-478a-b04c-c4c2ac671123/alertes" ||
        match[1] === "/acte/b45079a5-9e8f-488a-b07c-c4c2az613121/alertes" ||
        match[1] === "/acte/b45079a5-9e8f-478a-b07c-c4c2az671123/alertes" ||
        match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235e/alertes" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134b/alertes" ||
        match[1] === "/acte/885bdb13-d995-4dbd-93cb-a7a3b2eee5c8/alertes" ||
        match[1] === "/acte/a5187320-d722-4673-abd7-a73ed41ad8c1/alertes" ||
        match[1] === "/acte/b51079a5-9e8d-478c-b04c-c4c4ey86537g/alertes"
      ) {
        return { data: ReponseAppelGetAlertesActe.data };
      }

      if (match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/alertes") {
        return { data: [] };
      }

      if (match[1] === "/acte/alerte") {
        return { data: ReponseAppelAddAlerteActe.data };
      }

      if (
        match[1] === "/acte/alerte/a0adc2b2-03b6-4b80-a90d-7f96e780df15?provenanceRequete=Service%20Public" ||
        match[1] === "/acte/alerte/a0adc2b2-03b6-4b80-a90d-7f96e780df15"
      ) {
        return { data: null };
      }

      if (match[1] === `/requetes/piecesjustificatives/3ed9ad41-ca61-416a-91df-448690804363`) {
        return { data: [imagePngVideBase64] };
      }

      // Validation de la saisie d'un extrait
      if (
        match[1] === "/acte/923a10fb-0b15-452d-83c0-d24c76d1de8d/saisieExtrait" ||
        match[1] === "/acte/0bce8edd-0183-495b-939d-0b3cf6918792/saisieExtrait" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134c/saisieExtrait"
      ) {
        return { data: {} };
      }

      // Maj de la date de derhière délivrance
      if (
        match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235b/dernieredelivrance" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/dernieredelivrance"
      ) {
        return { data: {} };
      }

      if (match[1] === "/acte/mespocopas") {
        return { data: ["ALGER", "RABAT", "TRIPOLI", "TUNIS"] };
      }

      const error = {
        msg: "url api etat civil non mockée",
        url: match[1],
        method: context.method
      };
      const message = `Erreur mock api etatcivil: ${JSON.stringify(error)}`;
      console.error(message);
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    },

    /**
     * returns the result of the PATCH request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    patch: function (match: any, data: any) {
      // TODO: Séparer clairement body, status et header (pour le moment, on doit passer les deux derniers dans data).
      return {
        body: data,
        header: data.headers,
        status: data.status
      };
    },
    delete: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    },
    /**
     * returns the result of the PUT request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    put: function (match: any, data: any) {
      return {
        body: data
      };
    }
  }
];
