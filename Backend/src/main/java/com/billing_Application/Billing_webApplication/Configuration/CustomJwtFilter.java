package com.billing_Application.Billing_webApplication.Configuration;

import com.billing_Application.Billing_webApplication.Service.CustomUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CustomJwtFilter extends OncePerRequestFilter {

    @Autowired
    CustomUserDetailService customUserDetailService;

    @Autowired
    JwtHelper jwtHelper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String auth_Header=request.getHeader("Authorization");
        String token=null;
        String username=null;

        if(auth_Header!=null && auth_Header.startsWith("Bearer ")){
            token=auth_Header.substring(7);
            if(token != null && !token.isEmpty()) {
                username = jwtHelper.extractUsername(token);
            }
        }

        if(username!=null && SecurityContextHolder.getContext().getAuthentication() ==null){
            UserDetails user= customUserDetailService.loadUserByUsername(username);
            System.out.println(user.getAuthorities());

            if(jwtHelper.validateToken(token,user)){
                UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext()
                        .setAuthentication(authToken);
            }
        }



        filterChain.doFilter(request, response);
    }
}
