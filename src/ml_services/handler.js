const predictClassification = require('../ml_services/inferenceService');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { confidenceScore, label } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        'id': id,
        'word': label,
        'confidenceScore': confidenceScore,
        'createdAt': createdAt
    }

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })
    response.code(201);
    return response;
}

module.exports = postPredictHandler;