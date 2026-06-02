package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Repository.CategoryRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ImageService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    Cloudinary cloudinary;

    public ImageService(Cloudinary cloudinary)
    {
        this.cloudinary=cloudinary;
    }

    public Map<String,String> uploadImage(MultipartFile file){
        String publicid= UUID.randomUUID().toString();

        try{
            byte[] data=file.getBytes();
            Map upload=cloudinary.uploader().upload(data, ObjectUtils.asMap(
                    "folder", "BillingWebApplication",
                    "public_id",publicid
            ));

            Map<String,String> result=new HashMap<>();
            result.put("publicId",publicid);
            result.put("url",upload.get("secure_url").toString());

            return result;




        }
        catch (Exception e){
            throw new RuntimeException("Image upload failed: " + e.getMessage(), e);
        }
    }

    public void deleteImage(String publicId) throws IOException {
        Map result = cloudinary.uploader().destroy(publicId, Map.of("resource_type", "image"));

        System.out.println("Deleting image id: " + publicId);
        System.out.println("Cloudinary result: " + result);
    }


}
