package com.billing_Application.Billing_webApplication.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    public Map<String,Object> createCheckoutSession(Double amount,String cartId) throws StripeException {
        Long finalAmount = Math.round(amount * 100);
        SessionCreateParams params=SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .putMetadata("cartId",cartId)
                .setSuccessUrl("http://localhost:5173/view/billing?cartId="+cartId)
                .setCancelUrl("http://localhost:8080/order/abort")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("INR")
                                                .setUnitAmount(finalAmount)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Total Amount to Pay")
                                                                .build()
                                                )
                                                .build()
                                )
                                .setQuantity(1L)
                                .build()
                )
                .build();

        Session session=Session.create(params);

        Map<String,Object> result = new HashMap<>();
        result.put("url", session.getUrl());
        result.put("stripeSessionId", session.getId());       // Order ID
        System.out.println("CartId :"+cartId);
        return result;
    }
}
