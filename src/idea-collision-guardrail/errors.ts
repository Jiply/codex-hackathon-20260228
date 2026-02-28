export class GuardrailError extends Error {
  code: string;
  retryable: boolean;
  override cause?: unknown;

  constructor(
    code: string,
    message: string,
    options: { retryable?: boolean; cause?: unknown } = {}
  ) {
    super(message);
    this.name = "GuardrailError";
    this.code = code;
    this.retryable = options.retryable ?? false;
    this.cause = options.cause;
  }
}

export function asGuardrailError(
  error: unknown,
  code: string,
  message: string,
  retryable: boolean
): GuardrailError {
  if (error instanceof GuardrailError) {
    return error;
  }

  return new GuardrailError(code, message, {
    retryable,
    cause: error
  });
}
