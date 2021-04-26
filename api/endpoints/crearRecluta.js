const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const reclutaModel = require('../models/recluta.model');

const tableName = process.env.tableName;

exports.handler = async event => {

    const obj = await reclutaModel.recluta_model(JSON.parse(event.body));

    const newRecluta = await Dynamo.write(obj, tableName).catch(err => {
        console.log('Error en el registro con dynamoDB', err);
        return null;
    });

    if (!newRecluta) {
        return Responses._400({ message: 'No se pudo registrar por ID' });
    }

    return Responses._200({ newRecluta });
};