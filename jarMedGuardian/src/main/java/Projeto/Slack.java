package Projeto;

import okhttp3.*;
import java.io.File;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class Slack {
    public static void enviarMensagemSlack(String mensagem) throws Exception {
        String jsonMensagem = """
                {\r\n  \"channel\": \"C064MNJC96E\",\r\n  \"text\": \"%s\"\r\n}
                """.formatted(mensagem);

        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
        String textoCriptografado = "FxmX1Oq3AdnO/xWwJpqP79DB4RqeTLCtExxhMro/wo19vPgoobHq8fET6f/WOVgFrCJ//5hOPJP35A61WUrgaA==";

        RequestBody body = RequestBody.create(mediaType, jsonMensagem);

        Request request = new Request.Builder()
                .url("https://slack.com/api/chat.postMessage")
                .method("POST", body)
                .addHeader("Content-type", "application/json")
                .addHeader("Authorization", "Bearer " + descriptografar(textoCriptografado))
                .build();

        try {
            Response response = client.newCall(request).execute();
            System.out.println(response.body().string());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void enviarArquivoSlack(String fileName, String pathFile, String mensagem) throws Exception {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("text/plain");
        String tokenCriptografado = "EWACHKBVEq6b9yHYkyiklCoyLzyIwf0HeO3qOWWhuRZqpkUbYg3Szcmn5eO3CCsHuoWrwKL4JrSlyTUiZIRA8/fF2YZ6sKbaOskYDQMF5Dc=";
        RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
                //Exemplo pathFile = C:Users\\Aluno\\Downloads\\nomeDoArquivo;

                .addFormDataPart("file",fileName,
                        RequestBody.create(MediaType.parse("application/octet-stream"), new File(pathFile)))
                .addFormDataPart("initial_comment",mensagem)
                .addFormDataPart("channels","C064MNJC96E")
                .build();
        Request request = new Request.Builder()
                .url("https://slack.com/api/files.upload")
                .method("POST", body)
                .addHeader("Authorization", "Bearer " + descriptografar(tokenCriptografado))
                .build();
        try {
            Response response = client.newCall(request).execute();
            System.out.println(response.body().string());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private static final String ALGORITHM = "AES";
    private static final String SECRET_KEY = "hello-world12345";
    private static final String CHARSET = "UTF-8";

    public static String descriptografar(String textoCriptografado) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(CHARSET), ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(textoCriptografado));
        return new String(decrypted, CHARSET);
    }

    public static void main(String[] args) throws Exception {
        enviarMensagemSlack("alguma coisa");
    }
}
