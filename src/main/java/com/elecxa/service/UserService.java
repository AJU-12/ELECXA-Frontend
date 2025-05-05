package com.elecxa.service;

import com.elecxa.dto.UserDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class UserService {

    private final RestTemplate restTemplate;

    public UserService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private static final String BASE_URL = "http://localhost:8080/api/user";

    public List<UserDTO> getAllUsers() {
        ResponseEntity<List<UserDTO>> response = restTemplate.exchange(
            BASE_URL,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<UserDTO>>() {}
        );
        return response.getBody();
    }

    public UserDTO getUserById(Long id) {
        String url = BASE_URL + "/{id}";
        ResponseEntity<UserDTO> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<UserDTO>() {},
            id
        );
        return response.getBody();
    }

    public UserDTO createUser(UserDTO userDTO) {
        ResponseEntity<UserDTO> response = restTemplate.postForEntity(
            BASE_URL,
            userDTO,
            UserDTO.class
        );
        return response.getBody();
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        String url = BASE_URL + "/update/{id}";
        HttpEntity<UserDTO> entity = new HttpEntity<>(userDTO);

        ResponseEntity<UserDTO> response = restTemplate.exchange(
            url,
            HttpMethod.PUT,
            entity,
            new ParameterizedTypeReference<UserDTO>() {},
            id
        );
        return response.getBody();
    }

    public void deleteUser(Long id) {
        String url = BASE_URL + "/{id}";
        restTemplate.delete(url, id);
    }

    public UserDTO getUserByEmail(String email) {
        String url = BASE_URL + "/email/{email}";
        ResponseEntity<UserDTO> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<UserDTO>() {},
            email
        );
        return response.getBody();
    }

    public UserDTO getUserByPhone(String phone) {
        String url = BASE_URL + "/phone/{phone}";
        ResponseEntity<UserDTO> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<UserDTO>() {},
            phone
        );
        return response.getBody();
    }

    public UserDTO changeUserRole(Long userId, Long roleId) {
        String url = BASE_URL + "/{id}/role/{roleId}";
        ResponseEntity<UserDTO> response = restTemplate.exchange(
            url,
            HttpMethod.PUT,
            null,
            new ParameterizedTypeReference<UserDTO>() {},
            userId,
            roleId
        );
        return response.getBody();
    }

    public List<UserDTO> getUsersByRole(String roleName) {
        String url = BASE_URL + "/role/{roleName}";
        ResponseEntity<List<UserDTO>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<UserDTO>>() {},
            roleName
        );
        return response.getBody();
    }

    public List<UserDTO> getUsersCreatedAfter(String dateTime) {
        String url = BASE_URL + "/created-after?dateTime={dateTime}";
        ResponseEntity<List<UserDTO>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<UserDTO>>() {},
            dateTime
        );
        return response.getBody();
    }
    public Long getTotalCustomerCount() {
        String url = BASE_URL + "/count";  
        ResponseEntity<Long> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            Long.class
        );
        return response.getBody();
    }
}
