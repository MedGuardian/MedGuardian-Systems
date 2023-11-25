package Projeto;

import okhttp3.*;
import java.io.File;

public class Slack {
    public static void enviarMensagemSlack(String mensagem) {
        String jsonMensagem = """
                {\r\n  \"channel\": \"C064MNJC96E\",\r\n  \"text\": \"%s\"\r\n}
                """.formatted(mensagem);

        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json; charset=utf-8");

        RequestBody body = RequestBody.create(mediaType, jsonMensagem);

        Request request = new Request.Builder()
                .url("https://slack.com/api/chat.postMessage")
                .method("POST", body)
                .addHeader("Content-type", "application/json")
                .addHeader("Authorization", "Bearer xoxb-6157746735458-6180861943392-jECH1eHG6tDVxnrtGqcCgFgD")
                .build();

        try {
            Response response = client.newCall(request).execute();
            System.out.println(response.body().string());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void enviarArquivoSlack(String fileName, String pathFile, String mensagem){
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("text/plain");
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
                .addHeader("Authorization", "Bearer xoxp-6157746735458-6143213066759-6181848644610-36809b6ccbb5a63ed3c05f23edd2cdc1")
                .build();
        try {
            Response response = client.newCall(request).execute();
            System.out.println(response.body().string());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
