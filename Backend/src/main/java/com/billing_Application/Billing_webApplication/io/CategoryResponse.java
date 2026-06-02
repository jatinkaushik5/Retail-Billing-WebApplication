package com.billing_Application.Billing_webApplication.io;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private String categoryid;
    private String name;
    private String description;
    private String imageid;
    private String imageUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private int itemsLength;
}
