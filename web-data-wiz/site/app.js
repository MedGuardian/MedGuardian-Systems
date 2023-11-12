process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');

var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();
app.use(bodyParser.json());

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var empresasRouter = require("./src/routes/empresas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/empresas", empresasRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});





app.post('/app.js', async (req, res) => {
    try {
        const data = req.body;
        const response = await enviarMensagem(data);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log("ta indo o post da msg")
});

async function enviarMensagem(data) {
    const slackUrl = 'https://slack.com/api/chat.postMessage';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer xoxb-6157746735458-6180861943392-X6pZkghHkhyAejuY4LrTsbjF',
            "Access-Control-Allow-Headers" : "true",
        }
    };
    console.log("ta indo a msg")
    return await axios.post(slackUrl, data, config);
}  

app.post('/app', async (req, res) => {
    try {
        const response = await makeRequest(req.body.pdfBlob);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log("ta indo o post da msg");
});


async function makeRequest(pdfBlob) {
    try {
        console.log('estou no try do makeRequest() app.js');

        const formData = new FormData();
        const blobData = new Blob([pdfBlob], { type: 'application/pdf' });
        formData.append('file', blobData, 'relatorio.pdf'); 
        formData.append('initial_comment', 'Nosso relatório');
        formData.append('channel', 'C065AMPG2TA');

        const headers = {
            'Authorization': 'Bearer xoxb-6157746735458-6180861943392-X6pZkghHkhyAejuY4LrTsbjF',
            'Content-Type': 'multipart/form-data',
        };

        const response = await axios.post('https://slack.com/api/files.upload', formData, { headers });

        response.data.file.downloadLink = response.data.file.url_private_download;
        console.log(JSON.stringify(response.data));
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
