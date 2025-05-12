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

    @GetMapping
    public String viewAllOrders(Model model,
                                @RequestParam(value = "status", required = false, defaultValue = "All") String status) {

        List<OrderDTO> orders = status.equalsIgnoreCase("All")
                ? orderService.getAllOrders()
                : orderService.getOrdersByStatus(status.toUpperCase());

        model.addAttribute("orders", orders);
        model.addAttribute("statuses", List.of("All", "PLACED", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED"));
        model.addAttribute("selectedStatus", status.toUpperCase());
        return "admin/orders";
    }

    @GetMapping("/{id}")
    public String viewOrderDetails(@PathVariable Long id, Model model) {
        OrderDTO order = orderService.getOrderById(id);
        if (order == null) {
            return "redirect:/orders?error=notfound";
        }
        model.addAttribute("order", order);
        return "admin/order-detail";
    }

    @GetMapping("/{id}/update-status")
    public String updateOrderStatus(@PathVariable Long id,
                                    @RequestParam("status") String status,
                                    @RequestParam(value = "filter", defaultValue = "All") String filter) {
        orderService.updateOrderStatus(id, status.toUpperCase());
        return "redirect:/orders?status=" + filter;
    }

    @GetMapping("/{id}/invoice")
    public String generateInvoice(@PathVariable Long id, Model model) {
        model.addAttribute("orderId", id);
        return "admin/invoice";
    }
}
