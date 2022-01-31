const mongoose = require('mongoose');

const Faturamento = new mongoose.Schema({
    projeto: {
        type: String,
        required: true
    },
    notaFiscal: {
        type: String,
        required: true
    },
    emissao: {
        type: String,
        required: true
    },
    consultor: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        required: true
    },
    gestor: {
        type: String,
        required: true
    },
    inicio: {
        type: String,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    qtdeHoras: {
        type: String,
        required: true
    },
    valorHoras: {
        type: String,
        required: true
    },
    totalHoras: {
        type: String,
        required: true
    },
    totalImposto: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Faturamento', Faturamento);
