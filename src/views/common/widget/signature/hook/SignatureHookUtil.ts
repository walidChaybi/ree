import { ModeSignature, ModeSignatureUtil } from "@model/requete/ModeSignature";
import { gestionnaireSignatureFlag } from "@util/signatureFlag/gestionnaireSignatureFlag";
import gestionnaireTimer from "@util/timer/GestionnaireTimer";
import parametres from "../../../../../ressources/parametres.json";
import {
  DetailSignature,
  DetailSignatureToCallApp,
  IDetailInfos
} from "../types";

export const DIRECTION_TO_CALL_APP = "to-call-app";
export const CODE_ERREUR_NON_DISPO = "WEB_EXT1";
export const LIBELLE_ERREUR_NON_DISPO =
  "La signature électronique est actuellement indisponible ou n'est pas installée.";
export const TIMER_SIGNATURE = "TimerContactWebExt";
export const SIGNATURE_TIMEOUT = parametres.signature.time_out_ms;
export const MAX_LEN_DOCUMENT_TO_SIGN_IN_BYTES =
  parametres.signature.max_len_doc_in_bytes;

export const EVENT_NON_DISPO = {
  detail: {
    direction: DIRECTION_TO_CALL_APP,
    erreur: {
      code: CODE_ERREUR_NON_DISPO,
      libelle: LIBELLE_ERREUR_NON_DISPO,
      detail: ""
    }
  }
};

// Document vide pour simuler une signature fictive et remonter les informations de la carte.
export const DOCUMENT_VIDE_A_SIGNER =
  "JVBERi0xLjYKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nCXKuwrCQBBG4X6e4q+FjDOTbH"+
  "YWli0CpkgXGEghdl46wTS+voqc6oMjrHjTCwJhMUcqiS0n+KDso2K/0XbA83982x80BaWRHTn3XLwgrjjOCjXE/VxFm1WxplX61tnPl1joFLTSig8XpBemCmVu"+
  "ZHN0cmVhbQplbmRvYmoKCjMgMCBvYmoKMTA5CmVuZG9iagoKNSAwIG9iago8PC9MZW5ndGggNiAwIFIvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aDEgNzc5Mj4"+
  "+CnN0cmVhbQp4nOU3e2wb532/746UqCcpRZJl0xY/5iLZepGSaLuWY0W0JFKSJVvUgw4pP8QTeRKZiI+QlBw7DaJuS2LQ8eI6WzInBtJia5AWGXyKsk4pMltdl2"+
  "5F16ZdUBRp4tXAWuyP2bCXJtnQLtZ+33cnWXadBBv230767n7v9/fxLpueVaAY5kEEdzgupyqIQQCAfwQg5eG5LO0Yqrwf4SsAwj9NpabjL/714Y8ADG8A5L8xP"+
  "XN86uvfT38boDiK/MGoIkfebbnYAFCKfNgZRcK+m8fzEb+K+H3RePbRJbK5FMBsQdwykwzLFyFBEKeIF8blR1N2Qzv6NzchThNyXPnP89+LID4IUJRJJTPZCJxc"+
  "Adi0zPiptJIafHHybcQxPvEM0gj+sasYwTyGCyL8v76Mp6ES+owdYIYUv992ia/BRjgHsML6s+5+c3Dlt/+XUZi0x5/BK/AGnIb34IjO8IIPYjCLlPXXd+GnSGW"+
  "XD8bhW5D7DLOvwRLyNbkQPMsyuevlgxdgEf7+Ni8+iMNjGMtfwXukFX6Ao5KED4kJvgJvo9UPkbb/bqYEnF6Y4uDUOur78JJwCvYJv0LkHOMITsECfwfnyVG0nM"+
  "U8T69lvOf3jD4Nj+N9FKIwhzC/jB3/9QsoWPkNZvU47IM/gL0ws07jLfKyWIj9G4OXsabf5TTnKjO/T3xI+LYgfPocIl+FaVwywdyF0+Lez6jQ//gS/VBC6sVaK"+
  "LgbV9gO5pu/FdpWPhLvg0Lwr9xYpa0MrPxGlG8mDBOGzcYOww8/z0feVw1x1IaVX9987GbEeMD4CnbrVQB376HxYMA/Njoy7Bs6sH9wYF9/X6/X09Pdtdfd+UDH"+
  "nvt3t+/60s4drS1OR3PTtq11tfdJ99pt1RVlFnNpSVFhgSk/z2gQBQJNVCUhjyrW0jKvLHkkua+5iXqqoz3NTR7JG1KpTFV8GOqkvj5OkmSVhqhahw95HTmkulF"+
  "y6g5JtybpXpMkFroH9jAXElV/1CPRJTI+HED4dI8UpOo1Du/nsKGOIyWI2O2owaNi0VKP6p2L5jwhjJEsFBV2S91KYXMTLBQWIViEkLpNSi2QbQ8QDgjbPLsXBD"+
  "CVMLeYqUeOqL7hgKfHarcHm5v61VKph7Ogm5tU87rVfG6SxljocIouNC3nnlmywGSosTgiReTDAVWUUTcnenK5p9WyRrVe6lHrT/yqGjNX1Capx6M2MqsDI2t+B"+
  "m65JKqx1iLR3MeA6UjXrt5OkXVKXq3lY2CgKnSrZCRgZ5fVi7XO5bwS9eZCOXlpZX5SohYpt1BcnEt5sNzgC6CJpZXvnLKq3meCqiUUJbuDeurekQH1nuFDAVWo"+
  "9dKojBT875Tsu6z2sjUZ32exAcuCxcEK2+2sDKeW3DCJiDo/HNBwCpPW18HtbAyqQohxllc5lX7GmV/lrKmHJOztwGggpxpq+yOSByt+SlbnJ3G6HmKNkSxq6Sd"+
  "Wu5QrL6PtziCXpRhVfyRGVWMdFgm11ivg3DCVnIUjpZ9oj2tWdFBXVk7bJTTD7HgkT0j/n4tWowGKhe5r1AZhLKC6exBwy3rHPAstTtSQQ9iwWA9vpuqUUmqF1L"+
  "XWXRaWJzYa4Cq6mlrRrUIorGupTg/fV9STC/VoITBb0nDgTXCtXFnYTq2LLtgOwR4mXNWNU1bnyQUiU6otZI3gvpuiAatddQexw0EpoATZ2GGF6q9Y+XAE+ayMB"+
  "QZGpYHh8cAuPRCNwcwZaj13mJECVs0MDqBqqjXRgGAVgyhoQQL1IiB17cG7ml9rwmXBgnMqG9yuPTRArLAqjWGo9dSj9OhyDL/NqJGNU3ffqrU8hqKd7j6rPWjX"+
  "ruYmAdlUd4waJlbUvlUWHlPIMOF8dvdxEqtlNRt6GpAUKShFqer2BVhurDy8ynoxeM31Xo3dhq0rFpYJ7MheRVgxVW+jdX1x1V6Or6F9d7D7V9k0Z5IGRnPMuKQ"+
  "bBIy8XwU2wu5dZVZ+FrANLeHZSy24pfmGzi243WwzR3czI1J/JCeNBvZwaTxPHreeYL7KYYAMjHU1N+HR1rUgkZPDC25ycnQ88KYF3wtPjgVeF4jQHeoKLtyHvM"+
  "CbFH80OFVgVEZkCGUIszSCiInLW990A8xzroETOB5eIsBpplUagfCSoNEsmqM67sgNAnIMGse9Km1AmkmjzXMavxaAlcxdaHSb3AXuYqFEsC4QRnodKd/B99gCA"+
  "ovFpIRYF1BrhJOXyPxCgduqScyjhFuL8KT/lmv/eGCxGH+drfyOjrrYheNSHcVm48+Kh0bYoHw5GM2FgmyzQRW2Bv+JSqQHsE3SAxhIXrFaKCldapHUxeidjN6p"+
  "0fMYPR9HlFQRVJ/H3vtUwibgUMCOW5Ju+oE1Z7nGOhXEQyVn+XUzVqxi5arQbPgKVEGve2thaWn+PaK4odpQXFTsCxbkF5krAMqGg1D1cjVRq0lnNXFWkyNHjqS"+
  "hs7EMXNWdLhd7lpWT9vL2trYyV2uL8d66HWXSjk7iqnRVSmUVVa62L1WWEnIgNPHY40rnz39+f8vuUemPKtLTwnPNW3/2s7FPn9jbZdlbbWOvKOBbuSp6xbfx/X"+
  "gznHaPbyTEvMlUaa7cUrMRfEHzRttGoVjcuLG4vLzKFyy3FBuHg8VVyzVErSFfqyFnash8DUnVkFAN8dUQqCEP4MNdQ1pqCK0hlhpyg8uh0COPPJJm19EjqxemB"+
  "NWYVjm0Vzsnjh5pZFm1l7lcZS6WF6msqCGutp0sGeneurLtO120rJLcm1dp315HDB1PTO/8k5aWbxx8/4c/vkRiN1+IJsnZw+S98tw5X3nRLpvjKjF+8uHNqRFy"+
  "/tW/WDzHvorGsPbvYq7bIOjebs+v2FQCFVDfUGIXN2yo8QWtGyxikS+YL1bNN5BUAwk1EF8DoQ3kQgOZaCBDDawRj7ALOl0sdBePvf1W2CzqijwMdusO1wbsw47"+
  "tTuIQdmDkbRsqpa11EgZfUbWhRhTeXfhL7zdbmlsHHv3bc0HlcNs3z0y/5GzYkR727z/w3HinREzPnNlS/q9/2PPKie1b7D1h75eftf0o7vT1tB/Y1OboPgjAv/"+
  "GEjec6/9xnnTDv+Rhs2vfFP/T85Me33h5Zd3Ha2MeHoJNQL99+0wMPrgmRO145DXntaLodKsTT4BO3wBin9sFFUqdLG6BetyeABd+5DyPwPfH7+P3MuDUksWbz4"+
  "Jp9gpIHdViAfPw+0GARrPgVosEGlDmpw0YowW8lDc7Db7Zv6HA+nMDvJw02QQVx6HABlJIuHS4kCeLT4SLYLFxc+yJ2CL/Q4RLYIZp0uBQ2iR0segN7k39NfFCH"+
  "CVCDqMMClBokHRZhp6FVhw0oM63DRthkeFqH86DG8HUdzoePDJd02ATbjIs6XACbje/rcKHwgfE/dLgIdpne1eFiOFxQpMMl8FDBqq9S2F7w057YdCwbO6FEaET"+
  "OyjScTB1Px6ajWbotXE/bWlpbaG8yOT2j0O5kOpVMy9lYMuEo7L5TrI2OoIk+OdtE+xNhx2BsUtFk6aiSjk2NKNOzM3J6byasJCJKmjbTOyXuxA8q6QxD2hytju"+
  "23mHfKxjL4dZFNyxElLqcfpsmp2+OgaWU6lskqaSTGEtTvGHVQn5xVElkqJyJ0bE1xaGoqFlY4MaykszIKJ7NRjPSh2XQsE4mFmbeMYy2BddUYzSpzCt0vZ7NKJ"+
  "pnokjPoCyMbiyWSmSZ6LBoLR+kxOUMjSiY2nUDm5HF6uw5Froy5JBLJOTQ5pzRh3FNpJRONJaZphqWsa9NsVM6ypONKNh0LyzMzx7Fl8RRqTWKPjsWyUXQcVzL0"+
  "gHKMjiTjcuJbDi0UrM0U1pTG4ql0co7H2JwJpxUlgc7kiDwZm4ll0VpUTsthrBiWLRbO8IpgIWhKTjR7ZtPJlIKRPtg7eEsQA9SqmUnOzKFnJp1QlAjziGHPKTO"+
  "ohI5nksmHWT5TyTQGGslGm9dFPpVMZFE1SeVIBBPHaiXDs3HWJyxzdjU4OZxOIi81I2fRSjzjiGazqd1O57Fjxxyy3powdsaBlp2fx8seTyl6P9LMSnxmENufYK"+
  "2b5f1lSYz2D9KhFNbHi8FRXaCJrk5mq6NVd4FljKWyGUcmNuNIpqedQ95B6IEYTOPK4joBCkSA4pIRlxEKQxJScBzSXCqKVIo/KmE8FCm0QQu04qLQi1JJ5M+gP"+
  "oVuhNOoxe4yt5uEBDjw0777C621ITSiR9HHtZsQ6kf9MFoYRL1J5K63S2GUU2J4zDLNaZjFOGSk7IUMaikoE+ESFJpxfZGNL+If5FBmjdOGcbXi2n5XzS+yG0NL"+
  "lFc6yzks0jiP/mGkJVHv8+pBUU7h3csgR+FYhFtltv0oMcqlfFyTVSLLvSW41NhdPA6hxynUD/NOrkqGuW02EZrlJMJRvaYPYb3TPIII11vNLYOef78Dd5+NUR7"+
  "dHPe5n9MZnuG8LsQzel5azcZ4FEmkslocw0iY3yiHZV7PCNdmM5bQNSdx6ujn+qG6rqz3JcF9zOlRMp0mvd5T/J7hfhPog/L4tC7f7pvyOsm86lqn48jNctkw0m"+
  "fw77i+y+JYFc3XpL6PjvFdGdUzjnO7FA7g8xifiiTvW8J+L+/xrapoczOlzynluimEkzyL1To2896wTBQeKYNkvvMnUWOG+9Zii/LpkHlvFb3XWZ7Bar0ieqYs6"+
  "hSnNIOHzwXb74pe0wfxnBi8q0Wtgutnk/VkhsebWWc7waONrOWoVZtJzeietIxn+Hn08Fp/pvi8aRWNcGvNn1HzKV6brO41ySOK4J/WcW22kqg7y/uh7SdtmrO/"+
  "VzmZ1zep66X4qZTVY4nz/RHlE5iC3fhi6cTo2J+Dz+H6XRPW94xDj9n5v9ZjcaV4Bdfvj/RaLHGMcVDf/Ym1XTe7bv+udmIUz6BBfl6k9Pnx6pWjd1hgu+bOM7O"+
  "Vn5m3Z6FNYwzxLI8nw2vp4DlMI38IPQyyd2jtbf9JDOku10KBb+8kUYCQKJmGe8BGQnCATICf7IUO4sYnfszjy7OfdCPOng7SAfMo14H0BxDfg/T78ey04b0T1x"+
  "CuZ3EZcGkSLSjhxKdTx5sRb0KNd/BO+GLUTqSy5z7E+/DZqz+9SPfg06Pj/YjjE0IkH1/CO/n9EjG4F8mVT8k7nxL6KXnid8T3OzL/4ZkPhX+/UW+7cOPSDWHo+"+
  "sT1C9fFluvEfJ2Y4Jrlmu9a6Frq2teu5RWar5Ji+DdS9i9Xdtl+2XHZ/88dH/jhMmZ2ueWy7/L8ZfWy8TIR/R+IVTbLMl1uWU4tzy//ZPnK8o1l0/zFMxeFv3nL"+
  "aTO/ZXtLsC0OLT6xKIZeJeZXba8KvpdCLwlnzhPzedt553nxxXMO27neGtsLz2+1XXn+xvPC0sry4vMlZd63yBAZhA6s4YFFccV2YW8l2Y9pmfFuw+XENYQriet"+
  "ZXPjNg+I2XE4y6N4lTvwpKTprPdt49rGzp84aU0/NP3XmKXH+yTNPChfmLs0JGV+9LZlotCV6G2wbXdX+fJfoz0M36N3dP1m7zRuacNsmUOjQeIttvLfedo+r3G"+
  "/EhA0oaBZtYqc4JCbFZ8VLYr5pxFdjG8Z1xXfDJ7h9BcVe85BtyDkkLq1ccSsDdrS2L7Vvfp/Y76239fXuspl7bb3O3nd6f9l7vTdvope8jP/eC95LXtHtrXd63"+
  "d4au3dzn9Vf5ar0lxGz3+Iy+wWCjXaB32leMQtm84T5CbNohk4Q5quIkSyRMwtjo42NA0v5KyMDqsl3SCUn1dpRdncPj6t5J1Xwjx8KLBDyx8EnT5+Gri0Datto"+
  "QA1tCQ6oEQTcDJhHwLJloQq6gplMtpFfpLER4Vm8Q+NsIxKPZjQqrPGhMUMyeERluBJpZAIaTvDeyHhIYHoEtY9mgN0Ys1FTYtoZ3RxX1m4cqD763/uXxtQKZW5"+
  "kc3RyZWFtCmVuZG9iagoKNiAwIG9iago0NDE2CmVuZG9iagoKNyAwIG9iago8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnROYW1lL0JBQUFBQStMaWJlcmF0aW"+
  "9uU2VyaWYKL0ZsYWdzIDYKL0ZvbnRCQm94Wy01NDMgLTMwMyAxMjc4IDk4Ml0vSXRhbGljQW5nbGUgMAovQXNjZW50IDg5MQovRGVzY2VudCAtMjE2Ci9DYXBIZ"+
  "WlnaHQgOTgxCi9TdGVtViA4MAovRm9udEZpbGUyIDUgMCBSCj4+CmVuZG9iagoKOCAwIG9iago8PC9MZW5ndGggMjM1L0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0"+
  "cmVhbQp4nF1Qu27EIBDs+YotL8UJbOfRWEini05ykYfi5AMwrB2kGBDGhf8+C74kUgrQDDOzGpafu8fO2cRfo9c9JhitMxEXv0aNMOBkHatqMFanKyu3nlVgnLL"+
  "9tiScOzf6tmX8jbQlxQ0OJ+MHvGH8JRqM1k1w+Dj3xPs1hC+c0SUQTEowONKcJxWe1Yy8pI6dIdmm7UiRP8P7FhDqwqu9ivYGl6A0RuUmZK0QEtrLRTJ05p/W7I"+
  "lh1J8qkrMipxAPt5JwXfD9XcbN/t6UGVd3npa/+9MS9BojNSw7KdVyKevwd23Bh5wq5xve7nIWCmVuZHN0cmVhbQplbmRvYmoKCjkgMCBvYmoKPDwvVHlwZS9Gb"+
  "250L1N1YnR5cGUvVHJ1ZVR5cGUvQmFzZUZvbnQvQkFBQUFBK0xpYmVyYXRpb25TZXJpZgovRmlyc3RDaGFyIDAKL0xhc3RDaGFyIDMKL1dpZHRoc1s3NzcgMjc3"+
  "IDQ0MyAzODkgXQovRm9udERlc2NyaXB0b3IgNyAwIFIKL1RvVW5pY29kZSA4IDAgUgo+PgplbmRvYmoKCjEwIDAgb2JqCjw8L0YxIDkgMCBSCj4+CmVuZG9iago"+
  "KMTEgMCBvYmoKPDwvRm9udCAxMCAwIFIKL1Byb2NTZXRbL1BERi9UZXh0XQo+PgplbmRvYmoKCjEgMCBvYmoKPDwvVHlwZS9QYWdlL1BhcmVudCA0IDAgUi9SZX"+
  "NvdXJjZXMgMTEgMCBSL01lZGlhQm94WzAgMCA1OTUuMzAzOTM3MDA3ODc0IDg0MS44ODk3NjM3Nzk1MjhdL0dyb3VwPDwvUy9UcmFuc3BhcmVuY3kvQ1MvRGV2a"+
  "WNlUkdCL0kgdHJ1ZT4+L0NvbnRlbnRzIDIgMCBSPj4KZW5kb2JqCgo0IDAgb2JqCjw8L1R5cGUvUGFnZXMKL1Jlc291cmNlcyAxMSAwIFIKL01lZGlhQm94WyAw"+
  "IDAgNTk1LjMwMzkzNzAwNzg3NCA4NDEuODg5NzYzNzc5NTI4IF0KL0tpZHNbIDEgMCBSIF0KL0NvdW50IDE+PgplbmRvYmoKCjEyIDAgb2JqCjw8L1R5cGUvQ2F"+
  "0YWxvZy9QYWdlcyA0IDAgUgovT3BlbkFjdGlvblsxIDAgUiAvWFlaIG51bGwgbnVsbCAwXQovTGFuZyhmci1GUikKPj4KZW5kb2JqCgoxMyAwIG9iago8PC9Dcm"+
  "VhdG9yPEZFRkYwMDU3MDA3MjAwNjkwMDc0MDA2NTAwNzI+Ci9Qcm9kdWNlcjxGRUZGMDA0QzAwNjkwMDYyMDA3MjAwNjUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwN"+
  "jUwMDIwMDAzNzAwMkUwMDMzPgovQ3JlYXRpb25EYXRlKEQ6MjAyMzEyMDcxMDAwMzErMDEnMDAnKT4+CmVuZG9iagoKeHJlZgowIDE0CjAwMDAwMDAwMDAgNjU1"+
  "MzUgZiAKMDAwMDAwNTQ5NyAwMDAwMCBuIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDAxOTkgMDAwMDAgbiAKMDAwMDAwNTY2NiAwMDAwMCBuIAowMDAwMDA"+
  "wMjE5IDAwMDAwIG4gCjAwMDAwMDQ3MTkgMDAwMDAgbiAKMDAwMDAwNDc0MCAwMDAwMCBuIAowMDAwMDA0OTM1IDAwMDAwIG4gCjAwMDAwMDUyMzkgMDAwMDAgbi"+
  "AKMDAwMDAwNTQxMCAwMDAwMCBuIAowMDAwMDA1NDQyIDAwMDAwIG4gCjAwMDAwMDU3OTEgMDAwMDAgbiAKMDAwMDAwNTg4OCAwMDAwMCBuIAp0cmFpbGVyCjw8L"+
  "1NpemUgMTQvUm9vdCAxMiAwIFIKL0luZm8gMTMgMCBSCi9JRCBbIDw0NDM1QzY0OUQ0OURDQjkwRkFDMTM5MUNCNTk1M0ZFMD4KPDQ0MzVDNjQ5RDQ5RENCOTBG"+
  "QUMxMzkxQ0I1OTUzRkUwPiBdCi9Eb2NDaGVja3N1bSAvQjM1QzUyOTJFRTI3ODhCNzZCODEyODNFRjBDNDIwMDIKPj4Kc3RhcnR4cmVmCjYwNjMKJSVFT0YK";

export function signerDocument(
  document: string,
  handleBackFromWebExtensionCallback: (event: CustomEvent) => void,
  infos: IDetailInfos[] = [],
  codePin?: string
) {
  if (codePin !== undefined) {
    const modeSignature: ModeSignature = ModeSignatureUtil.estValide(
      gestionnaireSignatureFlag.getModeSignature()
    )
      ? gestionnaireSignatureFlag.getModeSignature()
      : ModeSignature.CERTIGNA_SIGNED;

    const detail: DetailSignature = {
      function: "SIGN",
      direction: "to-webextension",
      document,
      pin: codePin,
      mode: modeSignature,
      infos,
      erreurSimulee: null
    };

    gestionnaireTimer.declancheTimer(
      TIMER_SIGNATURE,
      SIGNATURE_TIMEOUT,
      true,
      handleBackFromWebExtensionCallback,
      EVENT_NON_DISPO
    );
    if (window.top) {
      window.top.dispatchEvent(new CustomEvent("signWebextCall", { detail }));
    }
  }
}

export function handleBackFromWebExtension(
  detail: DetailSignature,
  setResultatWebext: React.Dispatch<
    React.SetStateAction<DetailSignatureToCallApp | undefined>
  >
): void {
  gestionnaireTimer.annuleTimer(TIMER_SIGNATURE);
  if (detail.direction === DIRECTION_TO_CALL_APP) {
    setResultatWebext(detail);
  }
}
