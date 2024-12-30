// utils/withErrorHandler.ts

import { NextRequest, NextResponse } from "next/server";

type HandlerFunction<T = unknown> = (req: NextRequest) => Promise<T>;

export function withErrorHandler<T>(fn: HandlerFunction<T>) {
  return async (req: NextRequest) => {
    try {
      return await fn(req);
    } catch (error) {
      console.error("An error occurred:", error);

      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  };
}
