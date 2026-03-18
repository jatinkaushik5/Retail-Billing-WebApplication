package com.billing_Application.Billing_webApplication.Controller;

import com.billing_Application.Billing_webApplication.Service.OrderService;
import com.billing_Application.Billing_webApplication.Service.StripeService;
import com.billing_Application.Billing_webApplication.io.OrderRequest;
import com.billing_Application.Billing_webApplication.io.OrderResponse;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    StripeService stripeService;

    @Autowired
    OrderService orderService;

    @PostMapping("/create-checkout-session")
    public Map<String,Object> checkout(@RequestParam Long amount) throws StripeException {
        return stripeService.createCheckoutSession(amount);
    }

    @PostMapping("/Create/{sessionId}")
    public OrderResponse make(@RequestBody OrderRequest request,@PathVariable("sessionId")String sessionId) throws StripeException {
        return orderService.createOrder(request,sessionId);
    }

    @GetMapping("/showDashboard")
    public Map<String,Object> fetchDetails(){
        return orderService.showDashboardDetails();
    }
}
