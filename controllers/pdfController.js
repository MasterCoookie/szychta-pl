const pdfFiller = require('pdffiller');
const dataController = require('./dataController');

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

const generatePdf_get = async (req, res) => {
    const { sourcePdfName, chosenJob } = req.query;

    const sourcePdf = __dirname + '\\..\\public\\pdf\\' + sourcePdfName + '.pdf';
    const destinationPdf = __dirname + '\\..\\public\\pdf\\' + sourcePdfName + '_filled.pdf';

    //TODO use szczur's methods to get data
    const name = await dataController.jobOffer_name_get(req, res, chosenJob);
    const date = await dataController.jobOffer_date_get(req, res, chosenJob);
    const prettyDate = new Date(date).toLocaleString("pl-PL");
    const stagesSum = await dataController.stage_data_get(req, res, chosenJob);
    const jobOffers = await dataController.organistaion_jobOffers_get(req, res);
    const applications = await dataController.jobOffer_applications_get(req, res, chosenJob);
    const statusTable = await dataController.stage_status_get(req, res, chosenJob);

    const averageStage = (stagesSum)/(applications);
    
    const data = {
        "offerName": name,
        "iloscAplikacji": applications,
        "sumaEtapow": stagesSum,
        "sredniaEtapow": averageStage.toFixed(2),
        "liczbaNierozpatrzonych": statusTable[0]+statusTable[1],
        "liczbaZwrotow": statusTable[2],
        "LiczcbaZaakceptowanych": statusTable[3],
        "liczbaOdrzuconych": statusTable[4],
        "aktywnaOd": prettyDate
    }

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
