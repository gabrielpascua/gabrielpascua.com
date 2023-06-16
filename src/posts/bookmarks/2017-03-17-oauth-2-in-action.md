---
layout: book
title:  "OAuth 2 in Action"
excerpt: "OAuth 2 in Action 1st Edition"
date:  2017-03-17
read:  2018-12-20
categories: books
book_url: https://www.manning.com/books/oauth-2-in-action
book_image: 
tags:
  - security
---

## 1 What is Oauth 2.0 and why should you care?
OAuth is a third-party authorization and delegation framework meant to provide resource access to clients without the need to impersonate the resource owner or user.  **It is not an authentication protocol**.

#### What are the problems it tries to solve when systems interact?
* impersonation
* credential sharing
* special access keys or passwords

#### TOFU and the gray layer of security with OAuth
Traditional client authorizations often rely on whitelists or blacklists for granting resource access.  OAuth introduces a gray area whereby resources are restricted until the client user consents to the application's request for permission.  This consent follows the Trust On First Use (TOFU) security model where permission is persisted on subsequent requests if the user has already agreed the first time.

## 2 The OAuth Dance

**Access Code Grant Type**


![Access Code Grant Type](/img/book-oauth-2-access-code.svg)


### OAuth Actors
Entities at Play When a Protected Resource is Requested
* **Authorization Server** - Token Generator.
* **Protected Resource** - Token Validator. The endpoint containing the data the client requires
* **Client Application** - Token Carrier.  The system trying to access an external resource
* **Resource Owner** - The user who owns the data

### OAuth Components 
Information pieces the actors use to communicate with one another
* **Access Token** - artifact the authorization server generated
* **Scopes** - set of rights from the resource owner
* **Authorization Grants** - the method for getting a token
* **Refresh Token** - Access tokens can stop working at any point, typically if it was revoked or has expired. Refresh token is sent to the Authorization Server when this happens to generate a new Access Token

<p>&nbsp;</p>

![INSERT REFRESH TOKEN IMAGE](/img/book-oauth-in-action-refresh-code.svg)

### Front and Back Channels
Systems connected thru OAuth communicate directly (back channel) or indirectly via browser (front channel) redirects.  Back channels are typically systems where the client, resource owner and authorization server are part of the same application ecosystem.  Front channel communications involve smaller or specialized components that an application needs to process user requests.
 
## 3 Building a simple OAuth client

## 4 Building a simple OAuth protected resource 
The Authentication Server and Resource Server are commonly co-located in the same network because they share the same database

### Ways to pass OAuth Tokens to the resource server
Once you have your access token, you need to send it to the resource server together with your request.  There are 3 ways you can do that:
* `Authorization: Bearer [TOKEN]` header, where the words Authorization and Bearer are case insensitive. Recommended
* Request Body - This limits the submissions to POST requests
* Request Query Parameter - This has the tendency to leak out the token


## 5 Building a simple OAuth authorization server
* You can use the `randomstring` npm package for generating unique keys. 
* Client validation is done by comparing the `client_id` and `secret` fields against what is in the database

### Client Data Properties
* client_id - string, unique
* secret - secret key, string, unique
* redirect_uris  - string array

### Refresh Tokens Data Properties
* refresh_token
* client_id

### Accesss Tokens Data Properties
* access_token
* expiration
* client_id
* scope
* grant_type

### Error Handling ???
Errors are returned as 4XX with a JSON `error` body


## 6 OAuth 2.0 in the real world

### Different grant types
* **Authorization Code** - this uses an authorization token to authorize clients
* **Refresh Token** - used in conjunction with Authorization Code to mitigate token expiration
* **Implicit Grant Type** - for SPA or applications that live in the browser
	* https://auth0.com/docs/api-auth/tutorials/implicit-grant
	* https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow
* **Client Credentials Grant Type** - purely for back channel communications where there is no user agent required such as cron jobs or api-to-api communications
* **Resource Owner Credentials Grant Type** - Password flow, and should be used with caution

## 7 Common Client Vulnerabilities

## 8 Common Protected Resources Vulnerabilities

## 9 Common authorization server vulnerabilities

## 10 Common OAuth token vulnerabilities

## 11 OAuth Tokens

### Token Introspection for Resource and Authentication Servers from Different Networks
For systems where the token generation server does not share a database with the protected resource, using the [OAuth introspection extension endpoint](https://www.oauth.com/oauth2-servers/token-introspection-endpoint/) will allow the protected resource to verify the authenticity of a token.  The resource server should submit a [POST request to the authentication server's /introspect endpoint](https://tools.ietf.org/html/rfc7662) to get the metadata about a token.  This endpoint should not be available to the client because it contains privileged information.  It should either be in an internal network, password protected, or share the same secret key if validating JWT.

### Token Revocation
A POST /revoke endpoint provides a way to revoke access and refresh tokens.  The former is recommended and the latter required.  When revoking a refresh token, all access tokens that belong to it must also be revoked.  The type of token to revoke is identified through the `token_type_hint` request parameter.  Revocation can be triggered by these events:
* User logs out
* User changes identity
* User uninstalls the respective application

## 12 Dynamic client registration

## 13 User authentication with OAuth 2.0

## 14 Protocols and profiles using OAuth 2.0
### Extending OAuth for Healthcare and Government application needs
* [Health Relationship Trust - HEART](https://openid.net/specs/openid-heart-oauth2-1_0.html)
* [International Government Assurance - iGov](https://openid.net/specs/openid-igov-oauth2-1_0-02.html)

## 15 Beyond bearer tokens


## Security Best Practices
* Add `state` to the callback parameter when authenticating to mitigate csrf attacks
* You can optionally hash or provide some encryption on your tokens when saving it in the database
* Be exact when using `redirect_uri` because other providers have different pattern matching strategies and loosely setting your own can lead to phishing attacks
* Only pass the access token as part of the url as a last resort because it exposes the token to the attacker, making it easy to be intercepted.
* If your return value is of `Content-Type: text/html`, make sure you escape the string to prevent XSS attacks
* Tokens should be short lived to minimize replaying it
* When introspecting a token that is invalid, limit the response to `active: false` to prevent possible attackers knowing details of your authentication implementation
* When revoking a token, [always return a 200 Response](https://tools.ietf.org/html/rfc7009#section-2.2).  To a known client, this gives the intended result. For an attacker, it prevents denial of service attacks in case a token is compromised.
* https://tools.ietf.org/html/draft-ietf-oauth-security-topics-10

## Frameworks and Libraries
* Apache Cordova: https://cordova.apache.org/docs/en/latest/guide/overview/