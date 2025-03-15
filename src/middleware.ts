import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
    const token = req.nextauth?.token;

    // if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    return NextResponse.next();
});

export const config = {
    // matcher: ["/admin/:path*"], 
};
