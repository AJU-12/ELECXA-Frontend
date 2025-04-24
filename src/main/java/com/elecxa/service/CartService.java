package com.elecxa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponentsBuilder;

import com.elecxa.dto.CartDTO;
import com.elecxa.dto.CartItemDTO;

@Service
public class CartService {

    private static final String BASE_URL = "http://localhost:8080/api/cart/"; 
    
    @Autowired
    private RestTemplate restTemplate;

    // Get the current cart
    public CartDTO getCart(long id) {
        // Make GET request to fetch cart details
        ResponseEntity<CartDTO> response = restTemplate.exchange(
                BASE_URL + "{id}", // Endpoint to fetch cart data
                HttpMethod.GET,
                null,
                CartDTO.class,
                id
        );
        return response.getBody();
    }

    // Add item to the cart
    public void addItemToCart(CartItemDTO cartItem) {
        // Make POST request to add an item to the cart
        HttpEntity<CartItemDTO> entity = new HttpEntity<>(cartItem, new HttpHeaders());
        restTemplate.exchange(
                BASE_URL + "/add", // Endpoint to add item to cart
                HttpMethod.POST,
                entity,
                Void.class
        );
    }

    // Update the quantity of an item in the cart
    public void updateItemQuantity(Long itemId, String action) {
        // Prepare the request body and URL
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL + "/update")
                .queryParam("itemId", itemId)
                .queryParam("action", action)
                .toUriString();

        // Make PUT request to update item quantity
        restTemplate.exchange(
                url, // Endpoint to update item quantity
                HttpMethod.PUT,
                null,
                Void.class
        );
    }

    // Remove an item from the cart
    public void removeItem(Long itemId) {
        // Prepare the request URL
        String url = BASE_URL + "/remove/{itemId}";
        
        // Make DELETE request to remove item from cart
        restTemplate.exchange(
                url, // Endpoint to remove item from cart
                HttpMethod.DELETE,
                null,
                Void.class,
                itemId
        );
    }

	public List<CartItemDTO> getCartItems(Long cartId) {
		
	    String url = "http://localhost:8080/api/cart/cartitem/";
	    // Use RestTemplate.exchange() with the appropriate type
	    ResponseEntity<List<CartItemDTO>> response = restTemplate.exchange(
	            url + "{cartId}",  
	            HttpMethod.GET,
	            null,                   
	            new ParameterizedTypeReference<List<CartItemDTO>>() {},          
	            cartId                 
	    );
	    
	    return response.getBody(); 
	}

	public void updateCart(Long productId, Long userId) {
		
        String url = BASE_URL + "/add/{productId}/{userId}" ;

	        restTemplate.exchange(
	                url,
	                HttpMethod.POST,
	                null,
	                Void.class,
	                productId,
	                userId
	        );
	}
}
