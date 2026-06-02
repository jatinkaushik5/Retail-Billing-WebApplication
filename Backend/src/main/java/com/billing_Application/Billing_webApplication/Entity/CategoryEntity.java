package com.billing_Application.Billing_webApplication.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@ToString
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(unique = true)
    private String categoryId;
    @Column(unique = true)
    private String name;
    private String description;
    private String imageId;
    private String imageUrl;
    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;
    @UpdateTimestamp
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private List<ItemEntity> item;
}
