package com.billing_Application.Billing_webApplication.Repository;

import com.billing_Application.Billing_webApplication.Entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity,String> {

    Optional<CartEntity> findByCustomerName(String name);
    Optional<CartEntity> findByStorageId(String id);
}
