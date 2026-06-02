package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Entity.OrderEntity;
import com.billing_Application.Billing_webApplication.Entity.OrderitemEntity;
import com.billing_Application.Billing_webApplication.Repository.OrderEntityRepository;
import com.billing_Application.Billing_webApplication.io.*;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;

@Service
public class OrderService {

    @Autowired
    ModelMapper mapper;

    @Autowired
    OrderEntityRepository orderEntityRepository;

    public OrderResponse createOrder(OrderRequest request,String sessionId) throws StripeException {
        String paymentIntentId=null;
        try{
            Session session=Session.retrieve(sessionId);
            paymentIntentId = session.getPaymentIntent();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
       finally {
            mapper.typeMap(OrderRequest.class, OrderEntity.class)
                    .addMappings(mapper -> mapper.skip(OrderEntity::setItems));
//        1  -> convert request to entity to Save
            OrderEntity orderEntity=mapper.map(request,OrderEntity.class);
            for (OrderRequest.OrderItemRequest o : request.getCartItems()) {
                OrderitemEntity orderItem = new OrderitemEntity();
                orderItem.setItemId(o.getItemId());
                orderItem.setName(o.getName());
                orderItem.setPrice(o.getPrice());
                orderItem.setQuantity(o.getQuantity());

                // add to order (sets both sides)
                orderEntity.addItem(orderItem); // ✅ adds to list
            }
            orderEntity.setStripePayment(paymentIntentId);
            orderEntity.setStripeOrder(sessionId);
            orderEntity.setTotaldiscount(request.getTotaldiscount());
            orderEntity.setTotaltax(request.getTotaltax());
            orderEntityRepository.save(orderEntity);

            OrderResponse orderResponse=mapper.map(orderEntity,OrderResponse.class);
            orderResponse.setItems(request.getCartItems());
            return orderResponse;
        }
    }

    public void deleteOrder(String id){
        OrderEntity orderEntity =orderEntityRepository.findByOrderId(id).orElse(null);

        if(orderEntity!=null){
            orderEntityRepository.delete(orderEntity);
        }
    }

//    public List<OrderResponse> getAllLatestOrder(){
//        List<OrderEntity> list=orderEntityRepository.findAllByOrderByCreatedAtDesc();
//        return list.stream().map((l)->mapper.map(l,OrderResponse.class)).toList();
//    }


    public Map<String,Object> showDashboardDetails(int PageNumber){
        LocalDate today = LocalDate.now();
        String currentMonth = LocalDate.now()
                .getMonth()
                .getDisplayName(TextStyle.FULL, Locale.ENGLISH);

// ✅ Today range
        LocalDateTime todayStart = today.atStartOfDay();
        LocalDateTime todayEnd = today.plusDays(1).atStartOfDay();

// ✅ Month range
        LocalDateTime monthStart = today.withDayOfMonth(1).atStartOfDay();
        LocalDateTime monthEnd = today.plusMonths(1).withDayOfMonth(1).atStartOfDay();
        Pageable pageable= PageRequest.of(PageNumber,10   );

        Page<OrderEntity> orders=orderEntityRepository.findAllByOrderByCreatedAtDesc(pageable);
        List<OrderEntity> currentOrders=orders.getContent();
        List<OrderEntity> allorders=orderEntityRepository.findAll();
        Double totalSale=0.0;
        List<OrderEntity> todayOrder=orderEntityRepository.findByCreatedAtBetween(todayStart,todayEnd);
        List<OrderEntity> monthOrders=orderEntityRepository.findByCreatedAtBetween(monthStart,monthEnd);
        totalSale+=monthOrders.stream().mapToDouble(order->order.getGrandTotal()).sum();
        Integer size=todayOrder.size();

        List<OrderdashDetails> orderResponses=currentOrders.stream().map(order->mapper.map(order,OrderdashDetails.class)).toList();
        Long totalOrder=allorders.stream().count();
        Map<String,Object> details=new HashMap<>();
        details.put("totalSale",totalSale);
        details.put("totalOrder",totalOrder);
        details.put("todayOrders",size);
        details.put("currentMonth",currentMonth);
        details.put("Orders",orderResponses.stream().sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt())).toList());
        return details;

    }

    public List<OrderResponse> getALLOrders(){

        return orderEntityRepository.findAll().stream().map(f->mapper.map(f,OrderResponse.class)).toList();

    }
}
