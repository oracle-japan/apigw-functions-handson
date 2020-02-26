package com.example.fn;

import com.fnproject.fn.api.RuntimeContext;
import com.fnproject.fn.api.httpgateway.HTTPGatewayContext;
import net.glxn.qrgen.core.image.ImageType;
import net.glxn.qrgen.javase.QRCode;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.*;

public class HelloFunction {

    private static final String IMG_DATA_URL_PREFIX = "data:image/png;base64,";
    private final String defaultFormat;

    public HelloFunction(RuntimeContext ctx) {
        defaultFormat = ctx.getConfigurationByKey("FORMAT").orElse("png");
    }

    public byte[] handleRequest(HTTPGatewayContext hctx) throws SQLException {

        ImageType type = getFormat(hctx.getQueryParameters().get("format").orElse(defaultFormat));
        System.err.println("Default format: " + type.toString());
        String contents = hctx.getQueryParameters().get("contents").orElseThrow(() -> new RuntimeException("Contents must be provided to the QR code"));

        ByteArrayOutputStream stream = QRCode.from(contents).to(type).stream();
        System.err.println("Generated QR Code for contents: " + contents);

        hctx.setResponseHeader("Content-Type", getMimeType(type));
        return stream.toByteArray();
    }

    private ImageType getFormat(String extension) {
        switch (extension.toLowerCase()) {
            case "png":
                return ImageType.PNG;
            case "jpg":
            case "jpeg":
                return ImageType.JPG;
            case "gif":
                return ImageType.GIF;
            case "bmp":
                return ImageType.BMP;
            default:
                throw new RuntimeException(String.format("Cannot use the specified format %s, must be one of png, jpg, gif, bmp", extension));
        }
    }

    private String getMimeType(ImageType type) {
        switch (type) {
            case JPG:
                return "image/jpeg";
            case GIF:
                return "image/gif";
            case PNG:
                return "image/png";
            case BMP:
                return "image/bmp";
            default:
                throw new RuntimeException("Invalid ImageType: " + type);
        }
    }

    // Utility methods.
    private static class Util {

        /**
         * Encodes the byte array into base64 string
         *
         * @param imageByteArray - byte array
         * @return String a {@link java.lang.String}
         */
        public static String encodeImage(byte[] imageByteArray) {
            return Base64.getEncoder().encodeToString(imageByteArray);
        }

        public static String generateImageDataUrl(String filePath) {

            try {
                File file = new File(filePath);
                // Reading a Image file from file system
                FileInputStream imageInFile = new FileInputStream(file);
                byte imageData[] = new byte[(int) file.length()];
                imageInFile.read(imageData);

                // Converting Image byte array into Base64 String
                String imageDataUrl = encodeImage(imageData);
                return imageDataUrl;
            } catch (IOException e) {
                e.printStackTrace();
            }
            return "";
        }
    }
}
