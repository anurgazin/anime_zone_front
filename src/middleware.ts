// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TokenInfo } from "@/lib/types";
import { jwtDecode } from "jwt-decode";

// List of protected paths
const protectedPaths = ["/dashboard"];
const protectedAdminPaths = ["/dashboard/post/"];

// Middleware function
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Fetch the user token from cookies
    const userToken = request.cookies.get("token")?.value;

    // If the path requires authentication
    if (protectedPaths.some((protectedPath) => path.startsWith(protectedPath))) {
        // Redirect to login if token is missing
        if (!userToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // If the path requires admin authentication
    if (protectedAdminPaths.some((adminPath) => path.startsWith(adminPath))) {
        // If no token is found, redirect to login
        if (!userToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            // Decode the token and check if the user has admin privileges
            const decoded = jwtDecode<TokenInfo>(userToken);
            if (decoded.role !== "admin") {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        } catch (error) {
            console.error("Token decoding failed:", error);
            // Redirect to login if token decoding fails
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Continue to the requested page if no redirects were triggered
    return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
    matcher: ["/dashboard/:path*"],
};
