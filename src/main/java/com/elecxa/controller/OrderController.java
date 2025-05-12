package com.elecxa.controller;

import com.elecxa.dto.OrderDTO;

import com.elecxa.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

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
    public String viewAllOrders(HttpSession session,Model model,
                                 @RequestParam(value = "status", required = false, defaultValue = "All") String status , HttpServletRequest request) {
    	
    	
    	if (session.getAttribute("darkMode") == null) {
			session.setAttribute("darkMode", false);
		}
		if (session.getAttribute("sidebarCollapsed") == null) {
			session.setAttribute("sidebarCollapsed", false);
		}

		model.addAttribute("currentUri", request.getRequestURI());

		String token = (String) session.getAttribute("accessToken");
        List<OrderDTO> orders = status.equals("All") 
                                ? orderService.getAllOrders(token)
                                : orderService.getOrdersByStatus(status , token);

       
        model.addAttribute("orders", orders);
        model.addAttribute("statuses", List.of("All", "Pending", "Shipped", "Delivered", "Cancelled"));
        model.addAttribute("selectedStatus", status);
        return "admin/orders";  // Thymeleaf template
    }

    // View specific order details
    @GetMapping("/{id}")
    public String viewOrderDetails(@PathVariable Long id, Model model , HttpSession session) {
		String token = (String) session.getAttribute("accessToken");

        OrderDTO order = orderService.getOrderById(id , token);
        model.addAttribute("order", order);
        return "admin/order-detail";
    }

    // ✅ Update order status using external API
    @GetMapping("/{id}/update-status")
    public String updateOrderStatus(@PathVariable Long id , @RequestParam("status") String status , HttpSession session) {
		String token = (String) session.getAttribute("accessToken");
        orderService.updateOrderStatus(id, status , token);
        return "redirect:/orders";
    }

    // Generate invoice (placeholder)
    @GetMapping("/{id}/invoice")
    public String generateInvoice(@PathVariable Long id, Model model) {
        model.addAttribute("orderId", id);
        return "admin/invoice";
    }
}
