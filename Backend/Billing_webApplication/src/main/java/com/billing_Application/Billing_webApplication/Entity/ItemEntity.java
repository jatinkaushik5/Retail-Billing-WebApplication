package com.billing_Application.Billing_webApplication.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(unique = true)
    private String itemId;
    private String name;
    private Double price;
    private String description;
    private String imageId;
    private String imageUrl;

    @ManyToOne
    @ToString.Exclude
    private CategoryEntity category;
}
