const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {

    const items = await Dynamo.scan(tableName).catch(err => {
        console.log('Error con DynamoDB', err);
        return null;
    });

    if (!items) {
        return Responses._404({ message: 'Ocurrio un error al listar los datos' });
    }

    return Responses._200({ items });
};