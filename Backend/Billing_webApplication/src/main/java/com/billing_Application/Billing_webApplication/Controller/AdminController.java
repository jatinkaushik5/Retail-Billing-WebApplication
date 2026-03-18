package com.billing_Application.Billing_webApplication.Controller;

import com.billing_Application.Billing_webApplication.Service.CategoryService;
import com.billing_Application.Billing_webApplication.Service.UserService;
import com.billing_Application.Billing_webApplication.io.CategoryRequest;
import com.billing_Application.Billing_webApplication.io.CategoryResponse;
import com.billing_Application.Billing_webApplication.io.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    CategoryService categoryService;

    @Autowired
    UserService userService;



    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse add(@ModelAttribute CategoryRequest request){
        return categoryService.add(request);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id")String id) throws IOException {
        categoryService.deleteCategory(id);
    }

    @PostMapping("/register")
    public String saveUser(@ModelAttribute UserRequest request){
        userService.saveUser(request);
        return "User Saved Successfully";
    }

    @GetMapping("/getAllUser")
    public List<UserRequest> getallUser(){
        return userService.getallUser();
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable("id")String id){
        System.out.println(id);
        userService.deleteUser(id);
    }

}
