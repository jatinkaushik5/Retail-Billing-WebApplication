package com.billing_Application.Billing_webApplication.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/payment")
public class PaymentResponseController {

    @GetMapping("/success")
    public String msg(){
        return "Success";
    }

    @GetMapping("/abort")
    public String negmsg(){
        return "failed";
    }

}
