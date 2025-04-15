package com.elecxa.webapp.model;

import java.math.BigDecimal;

public class Product {
    private String name;
    private String description;
    private String imageUrl;
    private String videoUrl;
    private BigDecimal currentPrice;
    private BigDecimal originalPrice;
    private double rating;
    private int reviewCount;
    private String categorySlug;

    public Product(String name, String description, String imageUrl, BigDecimal currentPrice, 
                  BigDecimal originalPrice, double rating, int reviewCount, String categorySlug) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.currentPrice = currentPrice;
        this.originalPrice = originalPrice;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.categorySlug = categorySlug;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public String getCategorySlug() {
        return categorySlug;
    }

    public void setCategorySlug(String categorySlug) {
        this.categorySlug = categorySlug;
    }
} 