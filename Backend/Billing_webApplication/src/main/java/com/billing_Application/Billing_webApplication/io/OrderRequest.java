package com.billing_Application.Billing_webApplication.io;

import lombok.*;
import org.hibernate.query.sql.internal.ParameterRecognizerImpl;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class OrderRequest {

    private String customerName;
    private String phoneNumber;
    private List<OrderItemRequest> cartItems;
    private Double grandTotal;
    private String paymentMethod;
    private String stripeOrder;
    private String stripePayment;



    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static  class OrderItemRequest{
        private String itemId;
        private String name;
        private Double price;
        private Integer quantity;

    }
}
