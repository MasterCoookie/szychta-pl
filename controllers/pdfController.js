const pdfFiller = require('pdffiller');

const testPdf_get = (req, res) => {
    const sourcePdf = __dirname + '\\..\\public\\pdf\\pdf2.pdf';
    const destinationPdf = __dirname + '\\..\\public\\pdf\\pdf2_filled.pdf';

    const data = {
        'Text1': '1',
        'Text2': '2',
    };
    try {
        pdfFiller.fillForm(sourcePdf, destinationPdf, data, function(err) {
            if (err) throw err;
            console.log('Generated');
            res.sendStatus(200);
        });
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
}

const generateTemplate_get = (req, res) => {
    const name = req.query.name;

    const nameRegex = null;

    const sourcePdf = __dirname + '\\..\\public\\pdf\\' + name + '.pdf';

    const FDF_data = pdfFiller.generateFDFTemplate(sourcePdf, nameRegex, function(err, fdfData) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log(fdfData);
        res.send(fdfData);
    });
}

const generatePdf_get = (req, res) => {
    const { sourcePdfName } = req.query;

    const sourcePdf = __dirname + '\\..\\public\\pdf\\' + sourcePdfName + '.pdf';
    const destinationPdf = __dirname + '\\..\\public\\pdf\\' + sourcePdfName + '_filled.pdf';

    //TODO use szczur's methods to get data

    const data = {
        'Text1': 69,
        'Text2': 420,
    };

    pdfFiller.fillForm(sourcePdf, destinationPdf, data, function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log('New pdf ' + sourcePdfName + ' Generated');
        res.download(destinationPdf);
    });
}


module.exports = {
    testPdf_get,
    generateTemplate_get,
    generatePdf_get
};
