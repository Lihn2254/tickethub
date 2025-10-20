package com.evant.services;

import org.springframework.stereotype.Service;

import com.evant.domain.Client;
import com.evant.repositories.ClientRepository;

@Service
public class ClientService {
    private ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }
}
