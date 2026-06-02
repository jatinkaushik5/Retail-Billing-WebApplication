package com.billing_Application.Billing_webApplication.Repository;

import com.billing_Application.Billing_webApplication.Entity.ItemEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity,String> {

    Optional<ItemEntity> findByItemId(String id);
    Optional<ItemEntity> findByName(String name);
    Page<ItemEntity> findAll(Pageable pageable);
}
