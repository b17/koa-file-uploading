const Joi = require('joi');
const uploader = require('./service/uploader');
const koaBody = require('koa-body');
const fs = require('fs');

module.exports = function (router) {

    router.get('/', async (ctx, next) => {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./public/index.html')
    });

    router.post('/upload', koaBody({multipart: true}), async (ctx, next) => {
        await Joi.validate(ctx.request.files, Joi.object().keys({file: Joi.required()}));

        let file = (ctx.request.files || {}).file || {};
        let webPath = await uploader.upload(file);
        ctx.redirect(webPath);
    });
};