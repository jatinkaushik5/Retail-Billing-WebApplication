package com.billing_Application.Billing_webApplication.io;

import lombok.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class CartStorage {
    private String storageId= UUID.randomUUID().toString();
    private List<itemsDetails> items;
    private String customerName;
    private String phoneNumber;
    private String amount;
    private Double totaltax;
    private Double totaldiscount;
    private Double subtotal;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static  class itemsDetails{
        private String itemId;
        private String name;
        private Double price;
        private Integer quantity;
        private String category;
        private String description;
        private Double discount;
        private String imageUrl;
        private Double tax;


    }
}
