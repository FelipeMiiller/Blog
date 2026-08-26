/* eslint-disable no-console */

import { type NextResponse } from "next/server"

import { Exception } from "./exception"
import { HTTP_STATUS } from "./http-status"

export function handleException(error: unknown): NextResponse {
  if (error instanceof Exception) {
    return Response.json({ error: error.message, code: error.code }, { status: error.status }) as NextResponse
  }

  console.error("Unhandled server error", error)

  return Response.json(
    { error: "Internal server error" },
    { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
  ) as NextResponse
}
