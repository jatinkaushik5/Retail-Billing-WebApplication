package com.billing_Application.Billing_webApplication.Configuration;

import com.billing_Application.Billing_webApplication.Service.CustomUserDetailService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.filters.CorsFilter;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    CustomUserDetailService customUserDetailService;

    @Autowired
    CustomJwtFilter customJwtFilter;





    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider=new DaoAuthenticationProvider(customUserDetailService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }




    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity){
        httpSecurity.csrf(csrf -> csrf.disable());   // ⭐ AD

        httpSecurity.authorizeHttpRequests(auth->auth
                        .requestMatchers("/admin/register").permitAll()
                        .requestMatchers("/payment/**").permitAll()
                        .requestMatchers("/user/login").permitAll()
                        .requestMatchers("/order/create-checkout-session").permitAll()
                        .requestMatchers(   HttpMethod.OPTIONS, "/**").permitAll()  // ⭐
                        .requestMatchers("/index.html","/css/**", "/js/**", "/img/**").permitAll()
                        .requestMatchers("/category/**").authenticated()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/item/**").authenticated()
                        .requestMatchers(("/order/**")).authenticated()

                );

        httpSecurity.sessionManagement((session)->session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        httpSecurity.cors(httpSecurityCorsConfigurer ->
                httpSecurityCorsConfigurer.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public @Nullable CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration corsConfiguration=new CorsConfiguration();


                        corsConfiguration.setAllowedOriginPatterns(List.of("*"));
                        corsConfiguration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
                        corsConfiguration.setAllowedHeaders(List.of("*"));
//                        corsConfiguration.setAllowCredentials(true);

                        return corsConfiguration;
                    }
                })
        );

        httpSecurity.authenticationProvider(authenticationProvider());

        httpSecurity.addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class);


        return  httpSecurity.build();
    }




}
