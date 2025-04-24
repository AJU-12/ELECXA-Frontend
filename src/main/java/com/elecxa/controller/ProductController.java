package com.elecxa.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.elecxa.dto.ProductAttributeDTO;
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
        model.addAttribute("product", product);
        model.addAttribute("subcategory" , product.getSubcategory().getName());
        model.addAttribute("categoryname" , product.getSubcategory().getCategory().getName());
        model.addAttribute("categoryId" , product.getSubcategory().getCategory().getCategoryId());

        List<ProductAttributeDTO> productAttribute = productService.getProductAttributes(id);
        model.addAttribute("generalSpecs" , productAttribute.subList(0, 2));
        model.addAttribute("performanceSpecs" , productAttribute.subList(2, 4));
        model.addAttribute("displaySpecs" , productAttribute.subList(4, 5));
        model.addAttribute("cameraSpecs" , productAttribute.subList(5,6));

        return "user/product-info";
    }
}

