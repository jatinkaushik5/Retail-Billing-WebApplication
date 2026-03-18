package com.billing_Application.Billing_webApplication.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderitemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String itemId;
    private String name;
    private Double price;
    private Integer quantity;

    @ManyToOne
    private OrderEntity order;
}
