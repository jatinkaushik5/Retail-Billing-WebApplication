package com.billing_Application.Billing_webApplication.Controller;

import com.billing_Application.Billing_webApplication.Entity.CartEntity;
import com.billing_Application.Billing_webApplication.Entity.CategoryEntity;
import com.billing_Application.Billing_webApplication.Entity.ItemEntity;
import com.billing_Application.Billing_webApplication.Repository.CartRepository;
import com.billing_Application.Billing_webApplication.Repository.ItemRepository;
import com.billing_Application.Billing_webApplication.Service.ItemService;
import com.billing_Application.Billing_webApplication.io.CartStorage;
import com.billing_Application.Billing_webApplication.io.ItemRequest;
import com.billing_Application.Billing_webApplication.io.Itemdata;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    ItemService itemService;

    @Autowired
    ItemRepository repository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ModelMapper mapper;


    @PostMapping("/save")
    public void  saveItem(@ModelAttribute ItemRequest request){
        itemService.saveItem(request);
    }

    @GetMapping("/getallItems/{number}")
    public Map<String,Object> getallitem(@PathVariable("number")int number){
        return itemService.getAllItems(number);
    }

    @DeleteMapping("/deleteItem/{id}")
    public void deleteItem(@PathVariable("id")String id) throws IOException {
        itemService.deleteItem(id);
    }

    @GetMapping("/getalltogether")
    public List<Itemdata> getallitems(){
        List<ItemEntity> itemEntities=repository.findAll();
        List<Itemdata> requestList=new ArrayList<>();
        for(ItemEntity e:itemEntities){
            Itemdata data=new Itemdata();
            data=mapper.map(e,Itemdata.class);
            CategoryEntity category=e.getCategory();
            data.setCategory(category.getName());
            requestList.add(data);
        }
        return requestList;
    }

    @GetMapping("/getbyname/{name}")
    public Itemdata getbyName(@PathVariable String name){
        return itemService.getitembyItemName(name);
    }
    @GetMapping("/get/{id}")
    public Itemdata getItem(@PathVariable String id){
       return itemService.getItembyid(id);
    }

    @PostMapping(value = "/saveCart")
    public String saveCart(@RequestBody CartStorage cartStorage){
        return itemService.saveCart(cartStorage);
    }

    @GetMapping("/getcart/{name}")
    public CartEntity getcart(@PathVariable String name){
        return itemService.getcart(name);
    }

    @DeleteMapping("/deletecart/{name}")
    public void deletecart(@PathVariable String name){
        itemService.deletecart(name);
    }

    @DeleteMapping("/deleteAllCart")
    public void delete(){
        cartRepository.deleteAll();
    }
}
