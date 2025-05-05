package com.elecxa.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.elecxa.dto.CategoryDTO;
import com.elecxa.dto.SubCategoryDTO;

@Service
public class SubCategoryService {
	 private final RestTemplate restTemplate;

	    public SubCategoryService(RestTemplate restTemplate) {
	        this.restTemplate = restTemplate;
	    }

	    public List<SubCategoryDTO> getAllSubCategories() {
	        String url = "http://localhost:8080/api/subcategories";
	        SubCategoryDTO[] subcategories = restTemplate.getForObject(url, SubCategoryDTO[].class);
	        return Arrays.asList(subcategories);
	    }
	    
	    public List<SubCategoryDTO> getSubCategoriesByCategory(String category) {
	        String url = "http://localhost:8080/api/subcategories/category/{category}";
	        SubCategoryDTO[] subcategories = restTemplate.getForObject(url, SubCategoryDTO[].class , category);
	        return Arrays.asList(subcategories);
	    }

		public SubCategoryDTO getSubCategoryByName(String subcategoryName) {
			String url = "http://localhost:8080/api/subcategories/subcategory/{subcategoryName}";
	        SubCategoryDTO subcategories = restTemplate.getForObject(url, SubCategoryDTO.class , subcategoryName);
	        return subcategories;
		}
}
