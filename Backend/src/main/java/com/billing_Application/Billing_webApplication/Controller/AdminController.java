package com.billing_Application.Billing_webApplication.Controller;

import com.billing_Application.Billing_webApplication.Service.CategoryService;
import com.billing_Application.Billing_webApplication.Service.UserService;
import com.billing_Application.Billing_webApplication.io.CategoryRequest;
import com.billing_Application.Billing_webApplication.io.CategoryResponse;
import com.billing_Application.Billing_webApplication.io.UserRequest;
import com.billing_Application.Billing_webApplication.io.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    CategoryService categoryService;

    @Autowired
    UserService userService;



    @PostMapping("/saveCategory")
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@ModelAttribute CategoryRequest request){
         categoryService.add(request);
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

    @GetMapping("/getAllUser/{pageNumber}")
    public Map<String,Object> getallUser(@PathVariable("pageNumber")int pageNumber){
        return userService.getallUser(pageNumber);
    }

    @GetMapping("/getuser/{name}")
    public List<UserResponse> getuser(@PathVariable("name")String name){
        return userService.getuserbyName(name);
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable("id")String id){
        userService.deleteUser(id);
    }


    @GetMapping("/updateUser/{id}")
    public UserResponse update(@PathVariable String id){
        return userService.updateUser(id);
    }

    @GetMapping("getallCategory")
    public List<String> fetching(){
       return categoryService.fetchall();
    }
}
