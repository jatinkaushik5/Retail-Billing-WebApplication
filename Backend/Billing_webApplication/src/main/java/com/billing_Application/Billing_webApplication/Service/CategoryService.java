package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Entity.CategoryEntity;
import com.billing_Application.Billing_webApplication.Repository.CategoryRepository;
import com.billing_Application.Billing_webApplication.io.CategoryRequest;
import com.billing_Application.Billing_webApplication.io.CategoryResponse;
import com.cloudinary.Cloudinary;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ModelMapper mapper;

    @Autowired
    ImageService imageService;



    public CategoryResponse add(CategoryRequest request){
        CategoryEntity categoryEntity=mapper.map(request,CategoryEntity.class);
        categoryEntity.setCategoryId(UUID.randomUUID().toString());
        Map<String,String> uploadeddata=imageService.uploadImage(request.getImage());
        categoryEntity.setImageId(uploadeddata.get("publicId"));
        categoryEntity.setImageUrl(uploadeddata.get("url"));

        CategoryEntity savedCategory=categoryRepository.save(categoryEntity);

        return mapper.map(savedCategory,CategoryResponse.class);

    }

    public List<CategoryResponse> read(){
        List<CategoryEntity> categories=categoryRepository.findAll();
        List<CategoryResponse> categoryResponses=new ArrayList<>();
        for(CategoryEntity categoryEntity:categories){
            CategoryResponse response=new CategoryResponse();
            response=mapper.map(categoryEntity,CategoryResponse.class);
            response.setItemsLength((int)categoryEntity.getItem().stream().count());
            categoryResponses.add(response);
        }
        return categoryResponses;
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
}
