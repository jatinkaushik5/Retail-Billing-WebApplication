package com.billing_Application.Billing_webApplication.Repository;

import com.billing_Application.Billing_webApplication.Entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,String> {
    Optional<UserEntity> getByEmail(String email);
    Optional<UserEntity> getByUserid(String email);
    Page<UserEntity> findAll(Pageable pageable);
    List<UserEntity> findByNameContaining(String name);
}
