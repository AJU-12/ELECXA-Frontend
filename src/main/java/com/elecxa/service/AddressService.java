package com.elecxa.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.elecxa.dto.AddressDTO;


@Service
public class AddressService {

	private final RestTemplate restTemplate;

    public AddressService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    public AddressDTO getUserAddress(int id) {
        String url = "http://localhost:8080/api/addresses/user/{id}";
        AddressDTO address= restTemplate.getForObject(url, AddressDTO.class , id);
        return address;
    }

	public void updateUserAddress(AddressDTO userAddress, int id) {
		String BACKEND_URL = "http://localhost:8080/api/addresses";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<AddressDTO> entity = new HttpEntity<>(userAddress, headers);

        restTemplate.exchange(
                BACKEND_URL + "/update/{id}",
                HttpMethod.PUT,
                entity,
                Void.class,
                id
        );
	}
}
