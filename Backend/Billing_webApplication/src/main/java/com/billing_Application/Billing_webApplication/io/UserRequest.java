package com.billing_Application.Billing_webApplication.io;

import lombok.*;

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
}
