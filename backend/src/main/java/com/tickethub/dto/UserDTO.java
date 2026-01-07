package com.tickethub.dto;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "accountType")
@JsonSubTypes({
    @JsonSubTypes.Type(value = ClientDTO.class, name = "client"),
    @JsonSubTypes.Type(value = OrganizerDTO.class, name = "vendor")
})
public class UserDTO {
    private String id;
    protected String email, username;
    protected OffsetDateTime registrationDate;
    protected String password;
}
