    package com.billing_Application.Billing_webApplication.io;

    import lombok.*;

    import java.time.LocalDateTime;
    import java.util.List;

    @ToString
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public class OrderResponse {
        private String Orderid;
        private String customerName;
        private String phoneNumber;
        private List<OrderRequest.OrderItemRequest> items;
        private Double grandTotal;
        private String paymentMethod;
        private String stripeOrder;
        private String stripePayment;
        private LocalDateTime createdAt;
        private Double subtotal;
        private Double totaltax;
        private Double totaldiscount;

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
