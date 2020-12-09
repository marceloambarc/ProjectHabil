const express = require("express");
const { default: slugify } = require("slugify");
const router = express.Router();
const Empresa = require("../empresas/Empresa");
//const slugify = require("slugify");

router.get("/empresas", (req,res) => {
    Empresa.findAll().then(empresas => {
        res.send(empresas);
    });
});

router.get("/empresas/nova",(req,res) => {
    res.render("index");
});

router.post("/empresas/salvar", (req,res) => {
    var ramo = req.body.ramo;
    var fantasia = req.body.fantasia;
    var tel = req.body.tel;
    var email = req.body.email;
    var endereco = req.body.endereco;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;

    if(ramo != undefined){
        Empresa.create({
            ramo : ramo,
            fantasia : fantasia,
            slug : slugify(fantasia),
            tel : tel,
            email : email,
            endereco: endereco,
            bairro : bairro,
            cidade : cidade,
            uf : uf
        }).then(() => {
            console.log("DONE")
        });
    } else {
        res.send(ramo);
    }
});

module.exports = router;