
async function enviarPdfSlack(req, res) {
    try {
        console.log("chegou no pdfController");
        const pdfBlob = req.body.file;
        const response = await enviarPdfSlackParaSlack(pdfBlob);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function enviarPdfSlackParaSlack(pdfBlob) {
    const formData = new FormData();
    formData.append('file', pdfBlob, 'relatorio.pdf');
    formData.append('initial_comment', 'Aqui está o pdf');
    formData.append('channels', 'C064MNJC96E');

    const config = {
        headers: {
            'Authorization': 'Bearer xoxb-6157746735458-6180861943392-X6pZkghHkhyAejuY4LrTsbjF',
            'Content-Type': `multipart/form-data`,
        },
    };

    try {
        const response = await axios.post('https://slack.com/api/files.upload', formData, config);
        console.log("ta indo o pdf", response);
        return response;
    } catch (error) {
        console.error("Erro na requisição Axios:", error);
        throw error;
    }
}

module.exports = {
    enviarPdfSlack,
    enviarPdfSlackParaSlack
};
