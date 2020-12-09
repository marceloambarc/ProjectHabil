const express = require("express");
const router = express.Router();
const Promocao = require("../promocoes/Promocao");
const Empresa = require("../empresas/Empresa");

router.get("/promocoes", (req,res) => {
    Promocao.findAll({
        include : [{ model : Empresa }]
    }).then(promocoes => {
        res.send({promocoes : promocoes})
    });
});

router.post("/promocoes/salvar", (req,res) => {
    var produto = req.body.produto;
    var valor = req.body.valor;
    var descricao = req.body.descricao;
    var data = req.body.data;
    var foto = req.body.foto;
    var empresa = req.body.empresa;

    Promocao.create({
        produto : produto,
        valor : valor,
        descricao : descricao,
        data : data,
        foto : foto,
        empresaId : empresa
    }).then(() => {
        res.send(console.log("Done"));
    });
});

module.exports = router;