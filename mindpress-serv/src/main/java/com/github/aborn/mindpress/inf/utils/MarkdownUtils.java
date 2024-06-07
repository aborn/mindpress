package com.github.aborn.mindpress.inf.utils;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author aborn
 * @date 2022/05/30 17:02
 */
public class MarkdownUtils {

    public static String getId(String s) {
        try {
            MessageDigest m = MessageDigest.getInstance("MD5");
            m.update(s.getBytes(), 0, s.length());
            String md5 = new BigInteger(1, m.digest()).toString(16);
            return md5.length() > 16 ? md5.substring(0, 16) : md5;
        } catch (Exception e) {
            return null;
        }
    }

    public static String generateRandomId() {
        String pattern = "EEEEE dd MMMMM yyyy HH:mm:ss.SSSZ";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String datStr = simpleDateFormat.format(new Date());
        return getId(datStr);
    }

    public static void main(String[] args) {
        System.out.println(getId("dddd"));
    }
}
