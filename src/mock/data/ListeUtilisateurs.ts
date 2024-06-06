import { IUtilisateur } from "@model/agent/IUtilisateur";
import { MockMappedHabilitation } from "./mockMappedHabilitations";

export const LISTE_UTILISATEURS = [
  {
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    prenom: "Ashley",
    nom: "Young",
    trigramme: "FOO",
    habilitations: MockMappedHabilitation.habilitations,
    service: { estDansSCEC: true }
  },
  {
    idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
    prenom: "John",
    nom: "Lennon",
    trigramme: "APP",
    habilitations: MockMappedHabilitation.habilitations,
    service: { estDansSCEC: true }
  },
  {
    idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
    prenom: "Bob",
    nom: "Dylan",
    trigramme: "BOB",
    habilitations: MockMappedHabilitation.habilitations,
    service: { estDansSCEC: true }
  },
  {
    idUtilisateur: "90c6aee1-21be-4ba6-9e55-fc8831252646",
    prenom: "Benoît",
    nom: "Tanguy",
    trigramme: "BTY",
    habilitations: MockMappedHabilitation.habilitations,
    service: { estDansSCEC: true }
  }
] as any as IUtilisateur[];
