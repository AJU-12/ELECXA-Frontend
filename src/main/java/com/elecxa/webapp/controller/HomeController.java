package com.elecxa.webapp.controller;

import com.elecxa.webapp.model.Category;
import com.elecxa.webapp.model.ProductAttribute;
import com.elecxa.webapp.model.Product;
import com.elecxa.webapp.service.CategoryService;
import com.elecxa.webapp.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    
    @GetMapping("/products/{category}")
    public String showProductsBySubCategory(@RequestParam(required = false) String subcategory, Model model) {
        if (subcategory != null) {
            model.addAttribute("subcategoryName", subcategory);
        }

        List<Product> products = productService.getProductsBysubCategory(subcategory);

        model.addAttribute("products", products);
        return "products-page";
    }
    
    @GetMapping("/products/{id}")
    public String showProducts(@PathVariable int id , Model model) {

        List<Product> products = productService.getProductsById(id);

        model.addAttribute("products", products);
        return "products-page";
    }

    @GetMapping("/products/attributes/{id}")
    public String showProductsAttributes(@PathVariable int id , Model model) {

        List<ProductAttribute> products = productService.getProductsAttributes(id);

        model.addAttribute("products", products);
        return "products-page";
    }
}
