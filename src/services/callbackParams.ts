export class CallbackParams<T = any> {
  // eslint-disable-next-line no-useless-constructor
  constructor(public idModal: string, public props?: T) {}
}
