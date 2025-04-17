
package com.elecxa.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.elecxa.model.Category;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {

    private final RestTemplate restTemplate;

    public CategoryService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Category> getAllCategories() {
        String url = "http://localhost:8080/api/categories";
        Category[] categories = restTemplate.getForObject(url, Category[].class);
        return Arrays.asList(categories);
    }
}
