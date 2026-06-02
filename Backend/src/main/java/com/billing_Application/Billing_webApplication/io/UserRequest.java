package com.billing_Application.Billing_webApplication.io;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class UserRequest {
    String userid;
    String name;
    String email;
    String password;
    String role;
}
