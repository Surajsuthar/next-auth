/**
 * An Array of route accesiable for public route 
 * these route doesnt required authentication
 * @type {string[]}
 */

export const publicRoute = [
    "/",
    "auth/new-verification"
]

/**
 * An Array of route that used for authenticate
 * these route redirect user to /setting
 * @type {string[]}
 */

export const authRoute = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

/**
 * These is prefix of api authentication route
 * Route start with route is used for authenticate route
 * @type {string}
 */

export const apiRoutePrefix = "/api/auth"

/**
 * Default route after the authentication

 * @type {string}
 */


export const DEFAULT_LOGIN_ROUTE = "/setting"