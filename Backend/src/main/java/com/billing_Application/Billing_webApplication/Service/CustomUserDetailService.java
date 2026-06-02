package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Entity.UserEntity;
import com.billing_Application.Billing_webApplication.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user=userRepository.getByEmail(username).orElseThrow(()->new UsernameNotFoundException("No such User Exist"));
        return user;
    }
}
