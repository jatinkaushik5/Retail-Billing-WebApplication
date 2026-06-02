package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Entity.CartEntity;
import com.billing_Application.Billing_webApplication.Entity.CategoryEntity;
import com.billing_Application.Billing_webApplication.Entity.ItemEntity;
import com.billing_Application.Billing_webApplication.Entity.itemDetailsEntity;
import com.billing_Application.Billing_webApplication.Repository.CartRepository;
import com.billing_Application.Billing_webApplication.Repository.CategoryRepository;
import com.billing_Application.Billing_webApplication.Repository.ItemRepository;
import com.billing_Application.Billing_webApplication.io.CartStorage;
import com.billing_Application.Billing_webApplication.io.ItemRequest;
import com.billing_Application.Billing_webApplication.io.Itemdata;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

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

    @Autowired
    CartRepository cartRepository;


    public void saveItem(ItemRequest request){

        ItemEntity item=itemRepository.findByItemId(request.getItemId()).orElse(null);
      if(item==null){
          ItemEntity itemEntity=new ItemEntity();
          itemEntity.setName(request.getName());
          itemEntity.setPrice(request.getPrice());
          itemEntity.setDiscount(request.getDiscount());
          itemEntity.setTax(request.getTax());
          itemEntity.setDescription(request.getDescription());

          List<ItemEntity> foundedalready=  itemRepository.findAll().stream().filter(i->i.getName().equalsIgnoreCase(request.getName())).toList();
          if(!foundedalready.isEmpty()){
              throw new DataIntegrityViolationException("Item ALready Present");
          }
          else {


              CategoryEntity category = categoryRepository.findByName(request.getCategory()).orElse(null);

              itemEntity.setCategory(category);
              itemEntity.setItemId(UUID.randomUUID().toString());
              Map<String, String> uploadeddata = imageService.uploadImage(request.getImage());
              itemEntity.setImageId(uploadeddata.get("publicId"));
              itemEntity.setImageUrl(uploadeddata.get("url"));
              itemRepository.save(itemEntity);
              Itemdata itemdata = mapper.map(itemEntity, Itemdata.class);
          }
      }
      else{
          if(request.getImage()!=null){
              Map<String,String> uploadeddata=imageService.uploadImage(request.getImage());
              item.setImageId(uploadeddata.get("publicId"));
              item.setImageUrl(uploadeddata.get("url"));
          }
          item.setName(request.getName());
          item.setPrice(request.getPrice());
          item.setDiscount(request.getDiscount());
          item.setTax(request.getTax());
          item.setDescription(request.getDescription());
          if(request.getCategory()!=null){
              System.out.println(request.getCategory());
              CategoryEntity category=categoryRepository.findByName(request.getCategory()).orElse(null);
              System.out.println(category);
              item.setCategory(category);
          }
          else{
              item.setCategory(item.getCategory());
          }


          itemRepository.save(item);

      }
    }

    public void deleteItem(String id) throws IOException {
       ItemEntity itemfound=itemRepository.findByItemId(id).orElseThrow(()-> new UsernameNotFoundException("No such Item found"));
       imageService.deleteImage(itemfound.getImageId());
       itemRepository.delete(itemfound);
    }

    public Map<String,Object> getAllItems(int pageNumber){
        Pageable pageable= PageRequest.of(pageNumber,5);
        Page<ItemEntity> items=itemRepository.findAll(pageable);
        List<ItemEntity> itemEntities=items.getContent();
        List<Itemdata> requestList=new ArrayList<>();
        for(ItemEntity e:itemEntities){
            Itemdata data=new Itemdata();
            data=mapper.map(e,Itemdata.class);
            CategoryEntity category=e.getCategory();
            data.setCategory(category.getName());
            requestList.add(data);
        }

        Map<String,Object> data=new HashMap<>();
        data.put("items",requestList);
        data.put("totalitems",itemRepository.findAll().stream().count());

        return  data;
    }

    public Itemdata getItembyid(String id){
        ItemEntity item=itemRepository.findByItemId(id).orElse(null);
        Itemdata itemdata=mapper.map(item,Itemdata.class);
        CategoryEntity category=categoryRepository.findByCategoryId(itemdata.getCategory()).orElse(null);
        itemdata.setCategory(category.getName());
        return  itemdata;
    }
    public Itemdata getitembyItemName(String name){
        System.out.println("Name of item :"+name);
        ItemEntity item=itemRepository.findByName(name).orElse(null);
        Itemdata data=mapper.map(item,Itemdata.class);
        CategoryEntity category=item.getCategory();
        data.setCategory(category.getName());
        return data ;
    }

    public String saveCart(CartStorage request){

        System.out.println("Request "+request);
        // Step 1: Create Cart
        CartEntity cart = new CartEntity();

        cart.setCustomerName(request.getCustomerName());
        cart.setPhoneNumber(request.getPhoneNumber());
        cart.setSubtotal(request.getSubtotal());
        cart.setTotaltax(request.getTotaltax());
        cart.setTotaldiscount(request.getTotaldiscount());
        cart.setAmount(request.getAmount());

        // Step 2: Convert Items (DTO → Entity)
        List<itemDetailsEntity> items = request.getItems()
                .stream()
                .map(item -> {
                    itemDetailsEntity entity = new itemDetailsEntity();

                    // ⚠️ DO NOT SET ID (important)
                    entity.setId(null);
                    entity.setItemId(item.getItemId());
                    entity.setName(item.getName());
                    entity.setPrice(item.getPrice());
                    entity.setQuantity(item.getQuantity());
                    entity.setCategory(item.getCategory());
                    entity.setDescription(item.getDescription());
                    entity.setDiscount(item.getDiscount());
                    entity.setImageUrl(item.getImageUrl());
                    entity.setTax(item.getTax());
                    return entity;
                })
                .toList();

        // Step 3: Attach items
        cart.setItems(items);

        // Step 4: Save
        cartRepository.save(cart);
        System.out.println(cart.getStorageId());
        return cart.getStorageId();

    }

    public CartEntity getcart(String Id){
        System.out.println("Id: "+Id);
        System.out.println(cartRepository.findByStorageId(Id).orElse(null).toString());
       return cartRepository.findByStorageId(Id).orElse(null);
    }

    public void deletecart(String name){
        cartRepository.delete(cartRepository.findByCustomerName(name).orElse(null));
    }



}
