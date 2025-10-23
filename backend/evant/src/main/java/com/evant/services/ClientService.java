package com.evant.services;

import org.springframework.stereotype.Service;

import com.evant.repositories.ClientRepository;

@Service
public class ClientService {
    @SuppressWarnings("unused")
    private ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }
}
