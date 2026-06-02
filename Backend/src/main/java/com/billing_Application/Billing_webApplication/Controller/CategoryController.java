package com.billing_Application.Billing_webApplication.Controller;

import com.billing_Application.Billing_webApplication.Service.CategoryService;
import com.billing_Application.Billing_webApplication.io.CategoryRequest;
import com.billing_Application.Billing_webApplication.io.CategoryResponse;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

//    @PostMapping("/save")
//    @ResponseStatus(HttpStatus.CREATED)
//    public CategoryResponse add(@ModelAttribute CategoryRequest request){
//        return categoryService.add(request);
//    }

    @GetMapping("/getall/{pageNumber}")
    public Map<String,Object> getall(@PathVariable("pageNumber")int pageNumber){
        return categoryService.read(pageNumber);
    }

    @GetMapping("/get/{id}")
    public CategoryResponse getbyId(@PathVariable("id")String id){
        return categoryService.getbyid(id);

    }

}
