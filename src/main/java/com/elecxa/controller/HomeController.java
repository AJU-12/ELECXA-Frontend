package com.elecxa.controller;

import com.elecxa.model.Category;
import com.elecxa.model.Product;
import com.elecxa.service.CategoryService;
import com.elecxa.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class HomeController {

    private final CategoryService categoryService;
    private final ProductService productService;

    public HomeController(CategoryService categoryService, ProductService productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }

    @GetMapping("/")
    public String showHomePage() {
//        List<Category> categories = categoryService.getAllCategories();
//        model.addAttribute("categories", categories);
//
//        List<Product> popularProducts = productService.getPopularProducts();
//        model.addAttribute("popularProducts", popularProducts);
 
        return "indexF"; 
    }

    @GetMapping("/products")
    public String showProductsByCategory(@RequestParam(required = false) String category, Model model) {
        if (category != null) {
            model.addAttribute("categoryName", category);
        }

        List<Product> products = (category != null)
                ? productService.getProductsByCategory(category)
                : productService.getPopularProducts();

        model.addAttribute("products", products);
        return "products-page";
    }
}