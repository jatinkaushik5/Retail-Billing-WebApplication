package com.billing_Application.Billing_webApplication.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class itemDetailsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private  String id;

    private String itemId;
    private String name;
    private Double price;
    private String description;
    private Double discount;
    private Double tax;
    private String imageUrl;
    private String category;
    private Integer quantity;
}
