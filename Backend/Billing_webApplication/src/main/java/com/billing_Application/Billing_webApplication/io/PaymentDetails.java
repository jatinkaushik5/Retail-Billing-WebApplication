package com.billing_Application.Billing_webApplication.io;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PaymentDetails {

    private String stripeOrderId=null;
    private String stripePaymentId=null;
    private String stripeSignature=null;
    private String PaymentStatus;
}
