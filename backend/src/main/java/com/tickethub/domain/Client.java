package com.tickethub.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "clients")
public class Client extends User{
    private String name, lastname, gender, phone;
    private LocalDate birthDate;
}
