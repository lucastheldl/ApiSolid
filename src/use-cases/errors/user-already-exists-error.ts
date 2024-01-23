export class UserAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exists"); // pega o metodo constructor da classe error
  }
}
