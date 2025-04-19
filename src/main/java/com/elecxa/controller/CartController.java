package com.elecxa.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.elecxa.dto.CartDTO;
import com.elecxa.dto.CartItemDTO;
import com.elecxa.service.CartService;

@Controller
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Display the cart page
    @GetMapping
    public String viewCart(Model model , @RequestParam long id) {
        CartDTO cart = cartService.getCart(id);
        List<CartItemDTO> cartItems = cartService.getCartItems(cart.getCartId());
        model.addAttribute("cartItems", cartItems);
        
        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal totalDiscount = BigDecimal.ZERO;

        for (CartItemDTO item : cartItems) {
            subtotal = subtotal.add(item.getPrice()); // total price for each item
            totalDiscount = totalDiscount.add(item.getProduct().getDiscount());
            System.out.println(item);
        }

        BigDecimal shipping = BigDecimal.ZERO;
        BigDecimal total = subtotal.subtract(totalDiscount).add(shipping);

        model.addAttribute("cartItems", cartItems);
        model.addAttribute("subtotal", subtotal);
        model.addAttribute("shipping", shipping);
        model.addAttribute("discount", totalDiscount);
        model.addAttribute("total", total);
        
        
        return "user/addcart-new";
    }

    @PostMapping("/update")
    public String updateQuantity(@RequestParam("itemId") Long itemId,
                                 @RequestParam("action") String action,
                                 Model model) {
        cartService.updateItemQuantity(itemId, action);
        return "redirect:/user/addcart-new";  // Redirect back to the cart page
    }

    // Remove an item from the cart
    @GetMapping("/remove")
    public String removeItem(@RequestParam("itemId") Long itemId) {
        cartService.removeItem(itemId);
        return "redirect:/user/addcart-new";  // Redirect back to the cart page
    }
}
