---
layout: post
title:  "JSON Web Tokens"
excerpt: "About JSON Web Tokens"
date:   2018-04-16 09:13
categories: notes
tags:
    - javascript
---

**What is JSON Web Token (jot)**  
* JWT is a standard for transmitting information.  
* JWT can either be signed (JWS) or encrypted (JWE)
* JWT can be generated using a shared secret or a public and private key
* JWT is an alternative to the server creating a session and SAML
* JWT’s most common use is authentication
* Stateless - no sessions are created from the server
* Compact - Sent with every request transmission typically in Header Authorization
* Self-contained - all the information about the user is in the encoded payload

**How does JWT Work?**  
The server returns an authentication token after a user logs in from the client.  The client stores that token inside localStorage (or a cookie).  Every subsequent request made by the client includes the token.  The server then verifies the correctness of the token before sending a response.

**JWT Structure is dot-delimited - Header.payload.signature**   
Header - cryptographic information
Payload - user claims. Built it claims are 3 characters long 
Signature - the hashed value of its parts along with the secret key

**JWS vs JWT Comparison**  
<table class="table">
  <thead>
    <tr>
      <th></th>
      <th>JWS</th>
      <th>JWE</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Shared Secret Holder</td>
      <td>Can verify and generate tokens</td>
      <td>Can encrypt and decrypt tokens</td>
    </tr>
    <tr>
      <td>Public/Private Key</td>
      <td>
        <ul>
            <li>Private key holder can sign and verify tokens</li>
            <li>Public key holder can only verify tokens</li>
            <li>Data flows from private to public key holders</li>
        </ul>
      </td>
      <td>
        <ul>
            <li>Private key holder can only decrypt</li>
            <li>Public key holders can encrypt</li>
            <li>Data flows from public to private key holders</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


**When to sign (JWS) and when to encrypt (JWE) JWTs**  
* Sign your tokens (JSON Web Signature - JWS) using hashing algorithms if there are no security nor privacy concerns when it is read by other parties, otherwise it should be encrypted (JSON Web Encryption - JWE).
* Sign it if all you need is validation, encrypt it if you need protection

**Best Practices**  
* Never accept unsigned JWTs - Signature stripping is a form of attack where the signature is removed, and replaced as an unsigned token.
* Don’t store tokens in cookies because they’re subject to CSRF attacks. Use localStorage whenever possible.
* Perform origin checks
* Add expiration
