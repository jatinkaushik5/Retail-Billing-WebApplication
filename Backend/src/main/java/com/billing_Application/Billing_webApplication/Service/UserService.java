package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Configuration.JwtHelper;
import com.billing_Application.Billing_webApplication.Entity.UserEntity;
import com.billing_Application.Billing_webApplication.Repository.UserRepository;
import com.billing_Application.Billing_webApplication.io.Loginform;
import com.billing_Application.Billing_webApplication.io.UserRequest;
import com.billing_Application.Billing_webApplication.io.UserResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

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
       UserEntity user=userRepository.getByUserid(request.getUserid()).orElse(null);
       if(user!=null){
           user.setName(request.getName());
           user.setEmail(request.getEmail());
           user.setPassword(request.getPassword());
           if(request.getRole().contains("ROLE_ADMIN")){
               user.setRoles(List.of(request.getRole(),"ROLE_USER"));
           }
           else{
               user.setRoles(List.of(request.getRole()));
           }

           userRepository.save(user);
       }
       else{
           UserEntity user1=new UserEntity();
           user1=mapper.map(request,UserEntity.class);
           user1.setUserid(UUID.randomUUID().toString());
           user1.setPassword(passwordEncoder.encode(request.getPassword()));
           user1.setRoles(List.of(request.getRole()));
           userRepository.save(user1);
       }
    }

    public Map<String,String> Login(Loginform loginform) throws Exception {
        System.out.println(loginform);
         try{
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
             System.out.println(user);

             Map<String,String> data=new HashMap<>();
             data.put("roles",roles.toString());
             data.put("token",token);
             data.put("username",user.getName());
             return data;
         }
         catch(BadCredentialsException ex){
             throw  new BadCredentialsException("Bad Credential");

         }

    }

    public Map<String,Object> getallUser(int pageNumber){
        Pageable pageable= PageRequest.of(pageNumber,4);
        Page<UserEntity> pages=userRepository.findAll(pageable);
        List<UserEntity> list=pages.getContent();
        List<UserResponse> requestList=new ArrayList<>();
        for(UserEntity u:list){
            requestList.add(mapper.map(u,UserResponse.class));
        }

        Map<String ,Object> data=new HashMap<>();
        data.put("users",requestList);
        data.put("totaluser",userRepository.findAll().stream().count());
        data.put("totaladmin",userRepository.findAll().stream().filter(u->u.getRoles().contains("ROLE_ADMIN")).count());
        return data;
    }


    public void deleteUser(String id){
        UserEntity user=userRepository.getByUserid(id).orElse(null);
        userRepository.delete(user);
    }


    public UserResponse updateUser(String id){
        UserEntity user=userRepository.getByUserid(id).orElse(null);
        return mapper.map(user,UserResponse.class);
    }

    public List<UserResponse> getuserbyName(String name){
        List<UserEntity> list=userRepository.findByNameContaining(name);
        List<UserResponse> responses=list.stream().map(u->mapper.map(u,UserResponse.class)).toList();
        System.out.println(responses);
        return responses;

    }
}
