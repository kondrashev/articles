class ApiError extends Error {
  status: number;
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static badRequest(message) {
    return new ApiError(404, message);
  }
}

export default ApiError;
