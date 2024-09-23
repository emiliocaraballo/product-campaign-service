export class Product {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly price: number,
    readonly stock: number,
    readonly sku: string,
    readonly urlImage: string,
    readonly description?: string,
  ) {
    this.description = this?.description || '';
  }
}
