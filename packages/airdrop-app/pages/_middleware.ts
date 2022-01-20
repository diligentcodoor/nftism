import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
import { AirdropType } from "../../lib/src/types";
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  if (pathname === "/") {
    return NextResponse.redirect(`/${AirdropType.NFTism}`);
  }
  return NextResponse.next();
}
