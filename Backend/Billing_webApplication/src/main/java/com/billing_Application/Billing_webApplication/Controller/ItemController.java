package com.billing_Application.Billing_webApplication.Controller;

import com.billing_Application.Billing_webApplication.Service.ItemService;
import com.billing_Application.Billing_webApplication.io.ItemRequest;
import com.billing_Application.Billing_webApplication.io.Itemdata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    ItemService itemService;


    @PostMapping("/save")
    public Itemdata     saveItem(@ModelAttribute ItemRequest request){
       return itemService.saveItem(request);
    }

    @GetMapping("/getallItems")
    public List<Itemdata> getallitem(){
        return itemService.getAllItems();
    }

    @DeleteMapping("/deleteItem/{id}")
    public void deleteItem(@PathVariable("id")String id) throws IOException {
        itemService.deleteItem(id);
    }
}
