package com.billing_Application.Billing_webApplication.Service;

import com.billing_Application.Billing_webApplication.Entity.OrderEntity;
import com.billing_Application.Billing_webApplication.Entity.OrderitemEntity;
import com.billing_Application.Billing_webApplication.Repository.OrderEntityRepository;
import com.billing_Application.Billing_webApplication.io.*;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
            System.out.println("Hello");
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
            orderEntityRepository.save(orderEntity);

            OrderResponse orderResponse=mapper.map(orderEntity,OrderResponse.class);
            orderResponse.setItems(request.getCartItems());
            System.out.println("OrderResponse: "+orderResponse);
            return orderResponse;
        }
    }

    public void deleteOrder(String id){
        OrderEntity orderEntity =orderEntityRepository.findByOrderId(id).orElse(null);

        if(orderEntity!=null){
            orderEntityRepository.delete(orderEntity);
        }
    }

    public List<OrderResponse> getAllLatestOrder(){
        List<OrderEntity> list=orderEntityRepository.findAllByOrderByCreatedAtDesc();
        return list.stream().map((l)->mapper.map(l,OrderResponse.class)).toList();
    }


    public Map<String,Object> showDashboardDetails(){
        LocalDate today=LocalDate.now();
        LocalDateTime start=today.atStartOfDay();
        LocalDateTime end=today.atTime(23,59,59);;

        List<OrderEntity> currentOrders=orderEntityRepository.findByCreatedAtBetween(start,end);
        Double totalSale=0.0;
        totalSale+=currentOrders.stream().mapToDouble(order->order.getGrandTotal()).sum();

        Integer size=currentOrders.size();

        List<OrderdashDetails> orderResponses=currentOrders.stream().map(order->mapper.map(order,OrderdashDetails.class)).toList();

        Map<String,Object> details=new HashMap<>();
        details.put("totalSale",totalSale);
        details.put("Size",size);
        details.put("Orders",orderResponses.stream().sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt())).toList());
        return details;

    }
}
