package com.elecxa.webapp.service;

import com.elecxa.webapp.model.Category;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {

    private final RestTemplate restTemplate;

    public CategoryService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Category> getAllCategories() {
        String url = "http://localhost:8080/api/both/categories";
        Category[] categories = restTemplate.getForObject(url, Category[].class);
        return Arrays.asList(categories);
    }
}
