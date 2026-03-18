package com.billing_Application.Billing_webApplication.Repository;

import com.billing_Application.Billing_webApplication.Entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderEntityRepository extends JpaRepository<OrderEntity,String> {


    Optional<OrderEntity> findByOrderId(String s);
    List<OrderEntity> findAllByOrderByCreatedAtDesc();
    List<OrderEntity> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
