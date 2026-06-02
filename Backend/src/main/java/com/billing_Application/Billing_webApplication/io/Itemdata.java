package com.billing_Application.Billing_webApplication.io;

import com.billing_Application.Billing_webApplication.Entity.CategoryEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Itemdata {

    private String itemId;
    private String name;
    private Double price;
    private String description;
    private Double discount;
    private Double tax;
    private String imageUrl;
    private String category;


}
