package com.elecxa.webapp.controller;

import com.elecxa.webapp.model.Category;
import com.elecxa.webapp.model.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        // Add categories
        List<Category> categories = Arrays.asList(
            new Category("Mobiles", "mobiles", "/img/Categories Logos/smartphone (1).png"),
            new Category("Laptops", "laptops", "/img/Categories Logos/laptop.png"),
            new Category("Televisions", "televisions", "/img/Categories Logos/television (1).png"),
            new Category("Home Appliances", "home-appliances", "/img/Categories Logos/electric-appliance.png"),
            new Category("Audio Devices", "audio", "/img/Categories Logos/home-theater.png"),
            new Category("Wearables", "wearables", "/img/Categories Logos/sport-watch (1).png"),
            new Category("Gaming", "gaming", "/img/Categories Logos/game-controller.png"),
            new Category("Cameras", "cameras", "/img/Categories Logos/camera.png"),
            new Category("Smart Home", "smart-home", "/img/Categories Logos/smart-home.png"),
            new Category("Accessories", "accessories", "/img/Categories Logos/accessories.png")
        );
        model.addAttribute("categories", categories);

        // Add popular products
        List<Product> popularProducts = Arrays.asList(
            new Product(
                "Samsung Galaxy S24 Ultra",
                "Experience the next level of mobile photography",
                "/img/products/s24-ultra.png",
                new BigDecimal("124999"),
                new BigDecimal("129999"),
                4.8,
                1250,
                "mobiles"
            ),
            new Product(
                "MacBook Pro M3",
                "Unleash your creativity with the most powerful MacBook yet",
                "/img/products/macbook-m3.png",
                new BigDecimal("199999"),
                new BigDecimal("209999"),
                4.9,
                850,
                "laptops"
            ),
            new Product(
                "Sony WH-1000XM5",
                "Industry-leading noise cancellation with exceptional sound quality",
                "/img/products/sony-wh1000xm5.png",
                new BigDecimal("34999"),
                new BigDecimal("39999"),
                4.7,
                2100,
                "audio"
            )
        );
        model.addAttribute("popularProducts", popularProducts);

        return "index";
    }

    @GetMapping("/products")
    public String products(@RequestParam(required = false) String category, Model model) {
        // Add category name for breadcrumb
        if (category != null) {
            model.addAttribute("categoryName", category.substring(0, 1).toUpperCase() + category.substring(1));
        }

        // Add filter categories
        List<String> filters = Arrays.asList("Brand", "Price", "Rating", "Discount");
        model.addAttribute("filters", filters);

        // Add sample products
        List<Product> products = Arrays.asList(
            new Product(
                "SAMSUNG Galaxy S24 Ultra 5G (12GB RAM, 256GB, Titanium Gray)",
                "Latest flagship with AI capabilities",
                "/img/products/s24-ultra-gray.png",
                new BigDecimal("124999"),
                new BigDecimal("129999"),
                5.0,
                120,
                "mobiles"
            ),
            // Add more sample products here
            new Product(
                "iPhone 15 Pro Max (256GB, Natural Titanium)",
                "Pro camera system with next-level performance",
                "/img/products/iphone-15-pro.png",
                new BigDecimal("149999"),
                new BigDecimal("159999"),
                4.9,
                350,
                "mobiles"
            )
        );
        model.addAttribute("products", products);

        return "products";
    }
} 