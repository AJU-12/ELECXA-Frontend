package com.elecxa.webapp.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable) // ⛔ disables CSRF
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("*")
                .permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(Customizer.withDefaults()); // or your login config

        return http.build();
    }
}
