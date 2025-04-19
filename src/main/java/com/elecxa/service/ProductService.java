package com.elecxa.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.elecxa.dto.ProductDTO;

import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    private final RestTemplate restTemplate;

    public ProductService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<ProductDTO> getPopularProducts() {
        String url = "http://localhost:8080/api/products";
        ProductDTO[] products = restTemplate.getForObject(url, ProductDTO[].class);
        return Arrays.asList(products);
    }

    public List<ProductDTO> getProductsByCategory(String category , int id) {
        String url = "http://localhost:8080/api/products/category/{id}";

        ResponseEntity<List<ProductDTO>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<ProductDTO>>() {},
            id
        );

        return response.getBody();
    }

	public List<ProductDTO> getProductsBysubCategory(String subcategory, Integer id) {
		String url = "http://localhost:8080/api/products/subcategory/{id}";

        ResponseEntity<List<ProductDTO>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<ProductDTO>>() {},
            id
        );

        return response.getBody();
	}
	
	 public ProductDTO getProductsById(long id) {
	        String url = "http://localhost:8080/api/products/{id}";

	        ResponseEntity<ProductDTO> response = restTemplate.exchange(
	            url,
	            HttpMethod.GET,
	            null,
	            new ParameterizedTypeReference<ProductDTO>() {},
	            id
	        );

	        return response.getBody();
	    }

}