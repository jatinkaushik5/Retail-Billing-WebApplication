package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Entity.CategoryEntity;
import com.billing_Application.Billing_webApplication.Entity.ItemEntity;
import com.billing_Application.Billing_webApplication.Repository.CategoryRepository;
import com.billing_Application.Billing_webApplication.Repository.ItemRepository;
import com.billing_Application.Billing_webApplication.io.ItemRequest;
import com.billing_Application.Billing_webApplication.io.Itemdata;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ItemService {
    @Autowired
    ModelMapper mapper;

    @Autowired
    ImageService imageService;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    CategoryRepository categoryRepository;



    public Itemdata saveItem(ItemRequest request){
        ItemEntity itemEntity=new ItemEntity();
        itemEntity=mapper.map(request,ItemEntity.class);
        CategoryEntity category =categoryRepository.findByName(request.getCategory()).orElse(null);

        System.out.println("Category name "+request.getCategory());
        itemEntity.setCategory(category);
        itemEntity.setItemId(UUID.randomUUID().toString());
        Map<String,String> uploadeddata=imageService.uploadImage(request.getImage());
        itemEntity.setImageId(uploadeddata.get("publicId"));
        itemEntity.setImageUrl(uploadeddata.get("url"));
        itemRepository.save(itemEntity);
        Itemdata itemdata= mapper.map(itemEntity,Itemdata.class);
        System.out.println(itemEntity.getCategory().getName());
        return itemdata;
    }

    public void deleteItem(String id) throws IOException {
       ItemEntity itemfound=itemRepository.findByItemId(id).orElseThrow(()-> new UsernameNotFoundException("No such Item found"));
       imageService.deleteImage(itemfound.getImageId());
       itemRepository.delete(itemfound);
    }

    public List<Itemdata> getAllItems(){
        List<ItemEntity> itemEntities=itemRepository.findAll();
        List<Itemdata> requestList=new ArrayList<>();
        for(ItemEntity e:itemEntities){
            requestList.add(mapper.map(e,Itemdata.class));
        }
        return  requestList;
    }


}
