package com.billing_Application.Billing_webApplication.Repository;

import com.billing_Application.Billing_webApplication.Entity.OrderitemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemEntityRepository extends JpaRepository<OrderitemEntity,String> {
}
