package com.billing_Application.Billing_webApplication.Entity;

import com.billing_Application.Billing_webApplication.io.PaymentDetails;
import com.billing_Application.Billing_webApplication.io.PaymentMethod;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(unique = true)
    private String orderId;
    private String customerName;
    private String phoneNumber;
    private Double grandTotal;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<OrderitemEntity> items=new ArrayList<>();;

    private String stripeOrder=null;
    private String stripePayment=null;

    private String paymentMethod;

    @PrePersist
    protected void onCreate(){
        this.orderId="ORD"+System.currentTimeMillis();
        this.createdAt=LocalDateTime.now();
    }

    public void addItem(OrderitemEntity item) {
        items.add(item);      // add to list
        item.setOrder(this);  // set parent on child
    }
}
