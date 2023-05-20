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

const generatePdf_post = (req, res) => {
    //TODO extract actual data from req.body
    const { sourcePdfName, Text1, Text2 } = req.body;

    const sourcePdf = __dirname + '\\..\\public\\pdf\\' + sourcePdfName + '.pdf';
    const destinationPdf = __dirname + '\\..\\public\\pdf\\' + sourcePdfName + '_filled.pdf';

    const data = {
        'Text1': Text1,
        'Text2': Text2,
    };

    pdfFiller.fillForm(sourcePdf, destinationPdf, data, function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log('New pdf ' + sourcePdfName + ' Generated');
        res.status(200).json({ url: '/pdf/' + sourcePdfName + '_filled.pdf' });
    });
}


module.exports = {
    testPdf_get,
    generateTemplate_get,
    generatePdf_post
};
