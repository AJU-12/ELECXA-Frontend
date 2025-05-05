
package com.elecxa.service;

import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;
import com.elecxa.dto.CategoryDTO;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {

    private final RestTemplate restTemplate;

    public CategoryService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<CategoryDTO> getAllCategories() {
        String url = "http://localhost:8080/api/categories";
        CategoryDTO[] categories = restTemplate.getForObject(url, CategoryDTO[].class);
        return Arrays.asList(categories);
    }

	public CategoryDTO getCategoryByName(String categoryName) {
		 String url = "http://localhost:8080/api/categories/categoryName/{categoryName}";
	        CategoryDTO categories = restTemplate.getForObject(url, CategoryDTO.class , categoryName);
	        return categories;
		
	}
}
