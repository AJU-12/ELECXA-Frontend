package com.elecxa.webapp.model;

public class Category {
    private String name;
    private String slug;
    private String iconUrl;

    public Category(String name, String slug, String iconUrl) {
        this.name = name;
        this.slug = slug;
        this.iconUrl = iconUrl;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }
} 