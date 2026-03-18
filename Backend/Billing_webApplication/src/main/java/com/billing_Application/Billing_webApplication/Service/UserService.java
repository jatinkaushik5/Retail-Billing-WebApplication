package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Configuration.JwtHelper;
import com.billing_Application.Billing_webApplication.Entity.UserEntity;
import com.billing_Application.Billing_webApplication.Repository.UserRepository;
import com.billing_Application.Billing_webApplication.io.Loginform;
import com.billing_Application.Billing_webApplication.io.UserRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    ModelMapper mapper;

    @Autowired
    JwtHelper jwtHelper;

    @Autowired
    UserRepository userRepository;



    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    public void saveUser(UserRequest request){
        UserEntity user=new UserEntity();
        user=mapper.map(request,UserEntity.class);
        user.setUserid(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
    }

    public Map<String,String> Login(Loginform loginform){
         Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginform.getEmail(),
                        loginform.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Generate JWT
        String token = jwtHelper.generateToken(userDetails);



        // Get roles from UserDetails
        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        UserEntity user=userRepository.getByEmail(userDetails.getUsername()).orElse(null);



        Map<String,String> data=new HashMap<>();
         data.put("roles",roles.toString());
         data.put("token",token);
         data.put("username",user.getName());
         return data;
    }

    public List<UserRequest> getallUser(){
        List<UserEntity> list=userRepository.findAll();
        List<UserRequest> requestList=new ArrayList<>();
        for(UserEntity u:list){
            requestList.add(mapper.map(u,UserRequest.class));
        }
        return requestList;
    }


    public void deleteUser(String id){
        UserEntity user=userRepository.getByUserid(id).orElse(null);
        userRepository.delete(user);
    }
}
