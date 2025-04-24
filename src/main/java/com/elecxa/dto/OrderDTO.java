package com.elecxa.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long orderId;
    private Long userId;
    private Long productId;
    private BigDecimal totalAmount;
    private String orderStatus;
    private LocalDateTime orderedDate;
    private LocalDateTime expectedDeliveryDate;
}
