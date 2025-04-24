package com.elecxa.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import com.elecxa.dto.ProductDTO;
import com.elecxa.service.ProductService;

@Controller
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired 
    ProductService productService;
    
    private String backendUrl;

    @GetMapping("/{id}")
    public String showProductDetails(@PathVariable Long id, Model model) {
        

        ProductDTO product = productService.getProductsById(id);
        System.out.println(product);
        model.addAttribute("product", product);
        model.addAttribute("subcategory" , product.getSubcategory().getName());
        model.addAttribute("categoryname" , product.getSubcategory().getCategory().getName());
        model.addAttribute("categoryId" , product.getSubcategory().getCategory().getCategoryId());
        return "user/product-info";
    }
}

