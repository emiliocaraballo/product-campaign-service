export class UserDetail {
  constructor(
    readonly id: number,
    readonly userId: number,
    readonly identification: string,
    readonly gmail: string,
    readonly phone: string,
    readonly name: string,
    readonly lastName: string,
    readonly address: string,
  ) {}
}
