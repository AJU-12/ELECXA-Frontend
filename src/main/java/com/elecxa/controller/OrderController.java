package com.elecxa.controller;

import com.elecxa.dto.OrderDTO;
import com.elecxa.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // View all orders (admin page with optional status filter)
    @GetMapping
    public String viewAllOrders(Model model,
                                 @RequestParam(value = "status", required = false, defaultValue = "All") String status) {
        List<OrderDTO> orders = status.equals("All") 
                                ? orderService.getAllOrders()
                                : orderService.getOrdersByStatus(status);

        model.addAttribute("orders", orders);
        model.addAttribute("statuses", List.of("All", "Pending", "Shipped", "Delivered", "Cancelled"));
        model.addAttribute("selectedStatus", status);
        return "admin/orders";  // Thymeleaf template
    }

    // View specific order details
    @GetMapping("/{id}")
    public String viewOrderDetails(@PathVariable Long id, Model model) {
        OrderDTO order = orderService.getOrderById(id);
        model.addAttribute("order", order);
        return "admin/order-detail";
    }

    // ✅ Update order status using external API
    @GetMapping("/{id}/update-status")
    public String updateOrderStatus(@PathVariable Long id,
                                     @RequestParam("status") String status) {
        orderService.updateOrderStatus(id, status);
        return "redirect:/orders";
    }

    // Generate invoice (placeholder)
    @GetMapping("/{id}/invoice")
    public String generateInvoice(@PathVariable Long id, Model model) {
        model.addAttribute("orderId", id);
        return "admin/invoice";
    }
}
