package com.billing_Application.Billing_webApplication.Repository;

import com.billing_Application.Billing_webApplication.Entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity,String> {

    Optional<CategoryEntity> findByCategoryId(String id);
    Optional<CategoryEntity> findByName(String name);
}
