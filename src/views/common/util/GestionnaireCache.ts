const NB_MILISECONDES_DANS_UNE_SECONDE = 1000;
/**
 * Gère une Map de caches, chaque cache à un délais d'expiration (non obligatoire) commun à tous les objets de ce cache
 * Si pas de délais spécifié alors le cache n'expire jamais
 */
export class GestionnaireCache {
  static readonly receCaches: Map<string, ReceCache> = new Map();
  public static addCache(nom: string, delaisExpirationSecondes?: number) {
    const newCache = new ReceCache(delaisExpirationSecondes);
    this.receCaches.set(nom, newCache);
    return newCache;
  }
  static supprimeObjetsAvecDatesExpirationDepassees(nomCache?: string) {
    if (nomCache) {
      this.supprimeObjetsAvecDatesExpirationDepasseesDanLeCache(this.receCaches.get(nomCache));
    } else {
      this.receCaches.forEach(value => {
        this.supprimeObjetsAvecDatesExpirationDepasseesDanLeCache(value);
      });
    }
  }

  private static supprimeObjetsAvecDatesExpirationDepasseesDanLeCache(receCache?: ReceCache) {
    if (receCache) {
      receCache.supprimeObjetsAvecDatesExpirationDepassees();
    }
  }
}

/**
 * Gère un cache sous form de Map clé/valeur
 * Le délais d'expiration (non obligatoire) spécifié dans le constructeur est commun à tous les objets du cache
 */
export class ReceCache {
  private readonly receCache: Map<any, CacheObject> = new Map();
  constructor(private readonly delaisExpirationSecondes?: number) {}

  set(key: any, newValue: any) {
    const cacheObject = this.receCache.get(key);
    if (!cacheObject) {
      this.receCache.set(key, new CacheObject(newValue, this.delaisExpirationSecondes));
    } else {
      cacheObject.value = newValue;
      cacheObject.dateExpiration = this.delaisExpirationSecondes;
    }
  }

  get(key: any) {
    let res = undefined;
    GestionnaireCache.supprimeObjetsAvecDatesExpirationDepassees();
    const cacheObject = this.receCache.get(key);
    if (cacheObject) {
      res = cacheObject.value;
    }
    return res;
  }

  supprimeObjetsAvecDatesExpirationDepassees() {
    this.receCache.forEach((cacheObject, key) => {
      if (!cacheObject.aDateExpirationValide()) {
        this.receCache.delete(key);
      }
    });
  }
}

/**
 * Objet positionné dans un cache
 * Il possède une valeur et une date d'expiration (non obligatoire) calculé à partir du délais d'expiratoin fournit dans le constructeur
 */
class CacheObject {
  private _dateExpiration?: number;
  constructor(
    private _value: any,
    delaisExpirationSecondes?: number
  ) {
    if (delaisExpirationSecondes) {
      this._dateExpiration = Date.now() + delaisExpirationSecondes * NB_MILISECONDES_DANS_UNE_SECONDE;
    }
  }

  set value(v: any) {
    this._value = v;
  }

  get value() {
    return this._value;
  }

  set dateExpiration(d: number | undefined) {
    this._dateExpiration = d;
  }

  get dateExpiration(): number | undefined {
    return this._dateExpiration;
  }

  aDateExpirationValide() {
    let dateExpirationValide = true;
    if (this.dateExpiration) {
      dateExpirationValide = Date.now() <= this.dateExpiration;
    }
    return dateExpirationValide;
  }
}
