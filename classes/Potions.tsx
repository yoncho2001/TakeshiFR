export default class Potion {
  private name: string;
  private affectingField: 'HealthPoints' | 'Strength' | 'Mana';
  private affectingValue: number;

  constructor(name: string, affectingField: 'HealthPoints' | 'Strength' | 'Mana', affectingValue: number) {
    this.name = name;
    this.affectingField = affectingField;
    this.affectingValue = affectingValue;
  }

  public getName(): string {
    return this.name;
  }

  public getAffectingField(): 'HealthPoints' | 'Strength' | 'Mana' {
    return this.affectingField;
  }

  public getAffectingValue(): number {
    return this.affectingValue;
  }
}