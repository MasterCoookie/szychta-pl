const pdfFiller = require('pdffiller');

const testPdf_get = (req, res) => {
    const sourcePdf = __dirname + '\\..\\public\\pdf\\pdf1.pdf';
    const destinationPdf = __dirname + '\\..\\public\\pdf\\pdf1_filled.pdf';

    const data = {
        'liczbaAplikacji5': '1',
        'sumaEtapow6': '2',
    };
    try {

        pdfFiller.fillForm(sourcePdf, destinationPdf, data, function(err) {
            if (err) throw err;
            console.log("Generated");
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
        if (err) throw err;
        console.log(fdfData);
    });
}

module.exports = { testPdf_get, generateTemplate_get };
