import { type HttpStatus } from "./http-status"

export class Exception extends Error {
  constructor(
    public readonly status: HttpStatus,
    message: string,
    public readonly cause?: unknown,
    public readonly code?: string
  ) {
    super(message)
    this.name = "Exception"
  }
}
