package com.billing_Application.Billing_webApplication.io;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserResponse {
    String userid;
    String name;
    String email;
    String password;
    List<String> roles;
}
