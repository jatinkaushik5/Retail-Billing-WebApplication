package com.billing_Application.Billing_webApplication;

import com.billing_Application.Billing_webApplication.Entity.UserEntity;
import com.billing_Application.Billing_webApplication.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.UUID;

@SpringBootTest
class BillingWebApplicationTests {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;

	@Test
	void contextLoads() {
	}

    @Test
    void saveUser(){
        UserEntity user=new UserEntity();
        user.setUserid(UUID.randomUUID().toString());
        user.setName("Jatin Kaushik");
        user.setPassword(passwordEncoder.encode("0000"));
        user.setRoles(List.of("ROLE_USER","ROLE_ADMIN"));
        user.setEmail("admin@gmail.com");

        userRepository.save(user);
    }

}
