package com.tickethub.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tickethub.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{
    List<Order> findByClient_Id(int clientId);
}
