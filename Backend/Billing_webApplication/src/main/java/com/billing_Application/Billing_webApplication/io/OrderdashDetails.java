package com.billing_Application.Billing_webApplication.io;

import com.billing_Application.Billing_webApplication.Entity.OrderitemEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class OrderdashDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String customerName;
    private String phoneNumber;
    private Double grandTotal;
    private LocalDateTime createdAt;
    private String paymentMethod;


}
