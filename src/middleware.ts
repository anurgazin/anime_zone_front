// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of protected paths that require a user token
const protectedPaths = ["/dashboard"];

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Check if the path is protected
    const requiresAuth = protectedPaths.some((protectedPath) => path.startsWith(protectedPath));

    if (requiresAuth) {
        const userToken = request.cookies.get("token")?.value;

        // Redirect to login if user_token cookie is missing
        if (!userToken) {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Continue to the requested page if user_token is present or path is not protected
    return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
    matcher: ["/dashboard/:path*"],
};
