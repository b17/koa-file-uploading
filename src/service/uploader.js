const crypto = require('crypto');
const util = require("util");
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const uploadSchema = Joi.object().keys({
    name: Joi.string().required(),
    path: Joi.string().required(),
}).unknown(true);

module.exports = {
    _ensureDirExists: async function (dir) {
        if (!await util.promisify(fs.exists)(dir)) {
            await util.promisify(fs.mkdir)(dir, {recursive: true});
        }
    },

    upload: async function (file) {

        await Joi.validate(file, uploadSchema);

        let token = crypto.randomBytes(8).toString('hex').match(/.{1,2}/g);
        let webPath = ['/uploads'].concat(token).concat([file.name]).join('/');
        let fsPath = './public' + webPath;

        await this._ensureDirExists(path.dirname(fsPath));
        await util.promisify(fs.copyFile)(file.path, fsPath);
        await util.promisify(fs.unlink)(file.path);
        return webPath;
    }
};