package com.tickethub.utils;

import java.util.Arrays;

import org.sqids.Sqids;

public class randomizeId {
    private static Sqids sqids = Sqids.builder()
            .alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
            .minLength(8)
            .build();

    public static String encode(Integer id) {
        return sqids.encode(Arrays.asList(Long.valueOf(id)));
    }

    public static int decode(String id) {
        return sqids.decode(id).get(0).intValue();
    }
}
