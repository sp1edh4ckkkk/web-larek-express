class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string = 'Конфликт уникального поля') {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

export default ConflictError;
