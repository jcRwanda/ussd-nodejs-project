const express = require('express');
const router = express.Router();
// const axios = require('axios');

// const AT_USERNAME = 'jeancloudenizeyimana1@gmail.com';
// const AT_API_KEY = 'a285b35a86abb2fe90b372028d8620dd50f61f9b732337fc205c120105135130';



router.post('/', async (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = '';

    if (text === '') {
        response = `CON Murakaza neza kuri I-justice.\nUzuza amazina yawe.\n`;
    } else {
        let ussdRoute = text.split("*");
        console.log(ussdRoute);

        if (ussdRoute.length === 1) {
            response = `CON Uzuza umwaka wavutsemo\n`;
        } else if (ussdRoute.length > 1) {
            response = await processUSSDRequest(ussdRoute);
        }
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

async function processUSSDRequest(ussdRoute) {
    let response = '';

    if (ussdRoute.length === 2) {
        response = `CON Hitamo icyo tugufasha kuri E-Justice\n1. Uburenganzira bw'abana\n2. Uburenganzira bwabashakanye\n3. Ihohoterwa rishingiye kugitsina\n4. Gusiga ubutumwa\n`;
    } else if (ussdRoute.length === 3) {
        const option = ussdRoute[2];

        if (option === '1') {
            response = `CON Uburenganzira bw' abana\n1. Impamvu zatuma umwana ashakirwa ahandi arererwa\n2. Kwita ku mwana ufite ubumuga\n3. Kureba Itegeko Ryerekeye Kurengera Umwana\n4. Vugisha umukozi wacu.\n`;
        } else if (option === '2') {
            response = `CON Uburenganzira bw'abashakanye\n1. Uburenganzira ku mutungo w’abashyingiranywe\n2. Kugira uruhare mu bitunga urugo\n3. Kureba Itegeko rigenga abantu n’umuryango\n4. Vugisha umukozi wacu.\n`;
        } else if (option === '3') {
            response = `CON Ihohoterwa rishingiye kugitsina\n1. Uburenganzira ku mutungo w’abashyingiranywe\n2. Kurinda umwana ihohoterwa rishingiye ku gitsina\n3. Kureba Itegeko Ryerekeye Kurengera Umwana\n4. Vugisha umukozi wacu.\n`;
        } else if (option === '4') {
            response = 'CON Andika hano ubutumwa bugufi\n';
        }
    } else if (ussdRoute.length === 4) {
        const option = ussdRoute[2];
        const subOption = ussdRoute[3];

        if (option === '1' && subOption === '1') {
            response = `END Nta mwana ugomba gutandukanywa n’umuryango we nta mpamvu. Ku bw’inyungu ze, umwana ashobora kwamburwa umubyeyi we, umwishingizi cyangwa undi wese umufiteho ububasha mu buryo buteganywa n’amategeko agashyirwa ahandi arererwa kubera: ihohoterwa rikorewe mu rugo, ibikorwa bibi, kudashobora kumurera kubera uburwayi bwo mu mutwe cyangwa se umubyeyi yambuwe ububasha bwa kibyeyi. (ingingo ya 11)`;
        } else if (option === '1' && subOption === '2') {
            response = `END Umubyeyi afite inshingano yo kwita ku mwana ufite ubumuga. Leta yita ku umwana ufite ubumuga bwihariye bw’umubiri cyangwa ubwo mu mutwe iyo bibaye ngombwa. Umwana ufite ubumuga bwihariye bw’umubiri cyangwa bwo mu mutwe ashyirwa mu kigo cyabigenewe kugira ngo yitabweho kandi avurwe mu gihe bibaye ngombwa.`;
        } else if (option === '1' && subOption === '3') {
            response = `END Itegeko N°71/2018 Ryo Ku Wa 31/08/2018 Ryerekeye Kurengera Umwana`;
        } else if (option === '1' && subOption === '4') {
            response = 'END Hamagara 0789140853, uvugane numukozi wacu ushinzwe icyi kiciro.';
        } else if (option === '2' && subOption === '1') {
            response = `END Uburenganzira ku mutungo w’abashyingiranywe butangira bakimara gushyingirwa imbere y’umwanditsi w’irangamimerere hakurikijwe uburyo bw’icungamutungo bahisemo. Iyo ishyingirwa risheshwe cyangwa iyo riteshejwe agaciro mbere y’uko abashyingiranywe babana nta nkurikizi rigira ku mutungo w’abashyingiranywe keretse iyo bigaragaye ko hari uwo bari barafatanyije. (ingingo ya 208)`;
        } else if (option === '2' && subOption === '2') {
            response = `END Buri wese mu bashyingiranywe agomba kugira uruhare mu bitunga urugo rwabo bikurikije uburyo n’amikoro ye.`;
        } else if (option === '2' && subOption === '3') {
            response = `END Nº 32/2016 ryo ku wa 28/08/2016 Itegeko rigenga abantu n’umuryango rikenewe kubugenzacyaha bw'ubushakashatsi n'ubutabera`;
        } else if (option === '2' && subOption === '4') {
            response = 'END Hamagara 0789140853, uvugane numukozi wacu ushinzwe icyi kiciro.';
        } else if (option === '3' && subOption === '1') {
            response = `END Uburenganzira ku mutungo w’abashyingiranywe butangira bakimara gushyingirwa imbere y’umwanditsi w’irangamimerere hakurikijwe uburyo bw’icungamutungo bahisemo. Iyo ishyingirwa risheshwe cyangwa iyo riteshejwe agaciro mbere y’uko abashyingiranywe babana nta nkurikizi rigira ku mutungo w’abashyingiranywe keretse iyo bigaragaye ko hari uwo bari barafatanyije. (ingingo ya 208)`;
        } else if (option === '3' && subOption === '2') {
            response = `END Mubyeyi afite inshingano yo kurinda umwana ihohoterwa rishingiye ku gitsina ndetse n’umurimo abona se umwana abana. Abana bashyirwaho umuryango bapfa bakaba bagomba gufungurwa igitsina. Leta igihugu cyanditse mu kiganiro kizakurikiraho akamaro ka 23 k’itegeko n° 58/2018 ryo kuwa 13/08/2018 ryerekeye gukurikirana no gufungurana igitsina (S12)`;
        } else if (option === '3' && subOption === '3') {
            response = `END Itegeko N°71/2018 Ryo Ku Wa 31/08/2018 Ryerekeye Kurengera Umwana`;
        } else if (option === '3' && subOption === '4') {
            response = 'END Hamagara 0789140853, uvugane numukozi wacu ushinzwe icyi kiciro.';
        } else if (option === '4') {
            response = `END Andika bugufi uko ubwishyu bushyigikiwe\n`;
        }
    }

    return response;
}

module.exports = router;