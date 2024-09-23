export class Cart {
  constructor(readonly id: number, readonly userId: number, readonly session: string) {
    if (!id) {
      this.id = null;
    }
    if (!userId) {
      this.userId = null;
    }
    if (!session) {
      this.session = null;
    }
  }
}
