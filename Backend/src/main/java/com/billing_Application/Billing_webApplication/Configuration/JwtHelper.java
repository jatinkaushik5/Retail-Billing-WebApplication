package com.billing_Application.Billing_webApplication.Configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtHelper {

    // =========================
    // 🔐 JWT CONFIG (HARDCODED)
    // =========================

    private static final String SECRET_KEY =
            "MySuperSecretKeyForJwtGeneration123456"; // min 32 chars

    private static final long JWT_EXPIRATION_TIME =
            24 * 60 * 60 * 1000; // 1 day (in milliseconds)

    // =========================
    // 🔹 GENERATE TOKEN
    // =========================

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        claims.put(
                "authorities",
                userDetails.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())
        );

        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // =========================
    // 🔹 VALIDATE TOKEN
    // =========================

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    // =========================
    // 🔹 EXTRACT DATA
    // =========================

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // =========================
    // 🔹 EXPIRY CHECK
    // =========================

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // =========================
    // 🔹 SIGNING KEY
    // =========================

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
}

