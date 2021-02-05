interface ITimer {
  id: number;
  etatCurseurAvant: string;
}

class GestionnaireTimer {
  private readonly timers: Map<string, ITimer> = new Map();

  annuleTimer(nomTimer: string) {
    const timer = this.timers.get(nomTimer);
    if (timer) {
      this.setEtatCurseur(timer.etatCurseurAvant);
      window.clearTimeout(timer.id);
    }
  }

  declancheTimer(
    nomTimer: string,
    timeout: number,
    curseurDAttente: boolean,
    fonctionAAppeler: (p: any) => any,
    paramFonction?: any
  ) {
    this.annuleTimer(nomTimer);
    const etatCurseurAvant = this.getEtatCurseur();
    if (curseurDAttente) {
      this.setCurseurDAttente();
    }
    this.timers.set(nomTimer, {
      id: window.setTimeout(() => {
        this.setEtatCurseur(this.timers.get(nomTimer)?.etatCurseurAvant);
        fonctionAAppeler(paramFonction);
      }, timeout),
      etatCurseurAvant
    });
  }

  getEtatCurseur() {
    return document.body.style.cursor;
  }

  setCurseurDAttente() {
    this.setEtatCurseur("wait");
  }

  setEtatCurseur(etat?: string) {
    if (etat != null) {
      document.body.style.cursor = etat;
    }
  }
}

const gestionnaireTimer = new GestionnaireTimer();

export default gestionnaireTimer;
