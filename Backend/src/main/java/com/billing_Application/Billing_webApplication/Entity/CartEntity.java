package com.billing_Application.Billing_webApplication.Entity;

import com.billing_Application.Billing_webApplication.io.CartStorage;
import com.billing_Application.Billing_webApplication.io.Itemdata;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String storageId;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id") // foreign key
    private List<itemDetailsEntity> items;
    private String customerName;
    private String phoneNumber;
    private String amount;
    private Double totaltax;
    private Double totaldiscount;
    private Double subtotal;

}
