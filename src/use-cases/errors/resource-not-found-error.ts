export class ResourceNotFoundError extends Error {
  constructor() {
    super("Recurso não encontrado"); // pega o metodo constructor da classe error
  }
}
