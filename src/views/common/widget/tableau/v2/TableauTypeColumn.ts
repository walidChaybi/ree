type alignType = "left" | "center" | "right" | "justify" | "inherit";

export interface ITableauTypeColumnParam {
  keys: string[];
  title: string;
  align?: alignType;
  style?: React.CSSProperties;
  width?: string | number;
  getElement?: (value: any, selectedValue?: string) => JSX.Element;
  className?: string;
  dataIsArray?: boolean;
}

export class TableauTypeColumn {
  public keys: string[];
  public title: string;
  public align?: alignType;
  public style?: React.CSSProperties;
  public getElement?: (value: any, selectedValue?: string) => JSX.Element;
  public className?: string;
  public dataIsArray?: boolean;

  constructor(params: ITableauTypeColumnParam) {
    this.keys = params.keys;
    this.title = params.title;
    this.align = params.align;
    this.style = params.style;
    this.getElement = params.getElement;
    this.className = params.className;
    this.dataIsArray = params.dataIsArray;
  }

  public getValueAtKey(object: any): any {
    let value = { ...object };
    for (const key of this.keys) {
      if (value !== undefined) {
        value = value[key];
      }
    }
    return value;
  }
}
