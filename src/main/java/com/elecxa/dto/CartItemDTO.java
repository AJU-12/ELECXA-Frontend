package com.elecxa.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    private Long itemId;
    private Long cartId;
    private ProductDTO product;
    private int quantity;
    private BigDecimal price;
}
