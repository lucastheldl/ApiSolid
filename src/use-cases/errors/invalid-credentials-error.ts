export class InvalidCredentialsError extends Error {
  constructor() {
    super("Credenciais inválidas"); // pega o metodo constructor da classe error
  }
}
