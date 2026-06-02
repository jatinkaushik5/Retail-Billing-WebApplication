package com.billing_Application.Billing_webApplication.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Data
@ToString
@Getter
@Setter
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(unique = true)
    private String itemId;
    @Column(unique = true)
    private String name;
    private Double price;
    private Double tax;
    private String description;
    private Double discount;
    private String imageId;
    private String imageUrl;

    @ManyToOne
    @ToString.Exclude
    private CategoryEntity category;
}
