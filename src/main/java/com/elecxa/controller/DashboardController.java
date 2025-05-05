package com.elecxa.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.elecxa.service.OrderService;
import com.elecxa.service.ProductService;
import com.elecxa.service.UserService;


@Controller
@RequestMapping("/admin")
public class DashboardController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @GetMapping("/dashboard")
    public String showDashboard(Model model) {
        model.addAttribute("totalRevenue", orderService.getTotalRevenue());
        model.addAttribute("totalOrders", orderService.getTotalOrderCount());
        model.addAttribute("totalProducts", productService.getTotalProductCount());
        model.addAttribute("totalCustomers", userService.getTotalCustomerCount());
        
        model.addAttribute("recentOrders", orderService.getRecentOrders());
    //  model.addAttribute("topProducts", productService.getTopSellingProducts());
        
        model.addAttribute("revenueData", orderService.getRevenueChartData());

        return "admin/dashboard"; // your Thymeleaf path
    }
}
