package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Entity.CategoryEntity;
import com.billing_Application.Billing_webApplication.Repository.CategoryRepository;
import com.billing_Application.Billing_webApplication.io.CategoryRequest;
import com.billing_Application.Billing_webApplication.io.CategoryResponse;
import com.cloudinary.Cloudinary;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ModelMapper mapper;

    @Autowired
    ImageService imageService;



    public void add(CategoryRequest request){
        CategoryEntity category=categoryRepository.findByCategoryId(request.getCategoryid()).orElse(null);
        if(category!=null){
            category.setName(request.getName());
            category.setDescription(request.getDescription());
            if(request.getImage()!=null){
                Map<String,String> uploadeddata=imageService.uploadImage(request.getImage());
                category.setImageId(uploadeddata.get("publicId"));
                category.setImageUrl(uploadeddata.get("url"));
            }
        }

        else{
            CategoryEntity categoryEntity=mapper.map(request,CategoryEntity.class);
            categoryEntity.setCategoryId(UUID.randomUUID().toString());
            if(request.getImage()!=null){
                Map<String,String> uploadeddata=imageService.uploadImage(request.getImage());
                categoryEntity.setImageId(uploadeddata.get("publicId"));
                categoryEntity.setImageUrl(uploadeddata.get("url"));
            }

            CategoryEntity savedCategory=categoryRepository.save(categoryEntity);
        }




    }

    public Map<String,Object> read(int pageNumber){
        Pageable pageable= PageRequest.of(pageNumber,5);
        Page<CategoryEntity> pages=categoryRepository.findAll(pageable);
        List<CategoryEntity>categories=pages.getContent();
        List<CategoryResponse> categoryResponses=new ArrayList<>();
        for(CategoryEntity categoryEntity:categories){
            CategoryResponse response=new CategoryResponse();
            response=mapper.map(categoryEntity,CategoryResponse.class);
            response.setItemsLength((int)categoryEntity.getItem().stream().count());
            categoryResponses.add(response);
        }

        Map<String,Object> data=new HashMap<>();
        data.put("data",categoryResponses);
        data.put("totalCategory",categoryRepository.findAll().stream().count());
        return data;
    }

    public CategoryResponse getbyid(String id){
        CategoryEntity found=categoryRepository.findByCategoryId(id).orElse(null);
        return mapper.map(found,CategoryResponse.class);
    }

    public String deleteCategory(String id) throws IOException {
        CategoryEntity found=categoryRepository.findByCategoryId(id).orElse(null);
        imageService.deleteImage(found.getImageId());
        categoryRepository.delete(found);
        return "Category "+found.getName()+" is Deleted Successfully";

    }


    public List<String> fetchall(){
        List<String> categories=new ArrayList<>();
        List<CategoryEntity> categoryEntities=categoryRepository.findAll();

        categoryEntities.stream().map(s->categories.add(s.getName())).toList();

        return categories;
    }
}
