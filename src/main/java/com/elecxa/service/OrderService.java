package com.elecxa.service;

import com.elecxa.dto.OrderDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class OrderService {

    private final RestTemplate restTemplate;
    private static final String BASE_URL = "http://localhost:8083/api/orders";

    public OrderService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<OrderDTO> getAllOrders() {
        ResponseEntity<List<OrderDTO>> response = restTemplate.exchange(
            BASE_URL,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<OrderDTO>>() {}
        );
        return response.getBody();
    }

    public OrderDTO getOrderById(Long orderId) {
        String url = BASE_URL + "/{id}";
        ResponseEntity<OrderDTO> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<OrderDTO>() {},
            orderId
        );
        return response.getBody();
    }

    public List<OrderDTO> getOrdersByCustomerId(Long customerId) {
        String url = BASE_URL + "/customer/{customerId}";
        ResponseEntity<List<OrderDTO>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<OrderDTO>>() {},
            customerId
        );
        return response.getBody();
    }

    public OrderDTO placeOrder(OrderDTO orderDTO) {
        ResponseEntity<OrderDTO> response = restTemplate.postForEntity(BASE_URL + "/place", orderDTO, OrderDTO.class);
        return response.getBody();
    }

    public void deleteOrder(Long orderId) {
        String url = BASE_URL + "/{id}";
        restTemplate.delete(url, orderId);
    }

    public Double getTotalRevenue() {
        String url = BASE_URL + "/total-revenue";
        ResponseEntity<Double> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            Double.class
        );
        return response.getBody();
    }

    public Long getTotalOrderCount() {
        String url = BASE_URL + "/total-orders";
        ResponseEntity<Long> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            Long.class
        );
        return response.getBody();
    }

    public List<OrderDTO> getRecentOrders() {
        String url = BASE_URL + "/recent";
        ResponseEntity<List<OrderDTO>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<OrderDTO>>() {}
        );
        return response.getBody();
    }

    public List<Double> getRevenueChartData() {
        String url = BASE_URL + "/revenue-data";
        ResponseEntity<List<Double>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<Double>>() {}
        );
        return response.getBody();
    }

    public List<OrderDTO> getOrdersByStatus(String status) {
        String url = BASE_URL + "/status/{status}";
        ResponseEntity<List<OrderDTO>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<OrderDTO>>() {},
            status
        );
        return response.getBody();
    }

    public void updateOrderStatus(Long orderId, String status) {
        String url = BASE_URL + "/{id}/status?status={status}";
        restTemplate.put(url, null, orderId, status);
    }
}
