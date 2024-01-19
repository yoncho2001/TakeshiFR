type POTION_FIELDS = 'Melee' | 'Range' | 'Mage';

export default class Potion {
  private name: string;
  private affectingField: POTION_FIELDS;
  private affectingValue: number;

  constructor(name: string, affectingField: POTION_FIELDS, affectingValue: number) {
    this.name = name;
    this.affectingField = affectingField;
    this.affectingValue = affectingValue;
  }

  public getName(): string {
    return this.name;
  }

  public getAffectingField(): POTION_FIELDS {
    return this.affectingField;
  }

  public getAffectingValue(): number {
    return this.affectingValue;
  }
}