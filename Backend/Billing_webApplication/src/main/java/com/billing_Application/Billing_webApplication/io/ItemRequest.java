package com.billing_Application.Billing_webApplication.io;

import com.billing_Application.Billing_webApplication.Entity.CategoryEntity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ItemRequest {

    private String name;
    private String category;
    private Double price;
    private String description;
    private MultipartFile image;
}
