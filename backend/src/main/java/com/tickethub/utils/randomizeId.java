package com.tickethub.utils;

import java.util.Arrays;
import java.util.regex.Pattern;

import org.sqids.Sqids;

public class randomizeId {
    private final static Pattern textPattern = Pattern.compile("^(?=.*[a-z]).+$");

    private static Sqids sqids = Sqids.builder()
            .alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
            .minLength(8)
            .build();

    public static String encode(Integer id) {
        return sqids.encode(Arrays.asList(Long.valueOf(id)));
    }

    public static int decode(String id) throws IllegalArgumentException {
        if (id.length() != 8) {
            throw new IllegalArgumentException("ID must have a length of 8. The passed ID had a length of " + id.length());
        } else if (textPattern.matcher(id).matches()) {
            throw new IllegalArgumentException("ID must be composed of only uppercase letters and numbers");
        }
        
        return sqids.decode(id).get(0).intValue();
    }
}
