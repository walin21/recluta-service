const AWS = require('aws-sdk');

let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: "AKIA34IK4323PW7TCBMO",
        secretAccessKey: "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"
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async scan(TableName) {
        const params = {
            TableName,
        };
        const data = await documentClient.scan(params).promise();
        return data.Items;
    },

    async write(data, TableName) {
        if (!data.ID) {
            throw Error('No hay un ID en los datos.');
        }
        const params = {
            TableName,
            Item: data,
        };
        const res = await documentClient.put(params).promise();
        if (!res) {
            throw Error(`Hubo un error al insertar el ID ${data.ID} en la tabla ${TableName}`);
        }
        return data;
    },
};
module.exports = Dynamo;