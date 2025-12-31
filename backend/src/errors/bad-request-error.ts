class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.name = 'Bad Request Error';
  }
}

export default BadRequestError;
