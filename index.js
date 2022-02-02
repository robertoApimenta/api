const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// imports das models
const Faturamento = require('./models/faturamento');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://roberto:PGupFSoeUpiXyKS2@cluster0.ynjbf.mongodb.net/pipo?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connectado ao MongoDB');
}).catch((err) => {
    console.log(err);
});

app.post('/novo', async (req, res) => {
    const dados = req.body;
    await Faturamento.create(dados).then(() => {
        return res.json({
            erro: false,
            dados
        })
    }).catch(() => {
        return res.json({
            erro: true
        })
    });
});

app.put('/editar/:id', async (req, res) => {
    await Faturamento.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    return res.json({
        msg: 'Faturamento editado com sucesso.',
    })
})

app.get('/lista', async (req, res) => {
    await Faturamento.find().then((dados) => res.status(200).json(dados))
        .catch((err) => res.status(400).json(err));
});

app.delete('/deletar/:id', async (req, res) => {
    await Faturamento.findOneAndRemove({ _id: req.params.id });
    return res.json({
        msg: 'Deletado com sucesso.',
    });
});

app.get('/listaID/:id', async (req, res) => {
    await Faturamento.findById(req.params.id).then((faturamento) => {
        return res.json({
            faturamento,
        });
    }).catch((err) => {
        return res.json({
            msg: 'Erro ao listar',
            err,
        });
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});