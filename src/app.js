const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

app.use(require('koa-static')('./public', {maxage: 24 * 60 * 60 * 1000}));
app.use(require('./middleware/logger')());
app.use(require('./middleware/responseTime')());

app.use(require('./middleware/validation')());

const router = Router();
require('./routes')(router);
app.use(router.routes());

module.exports = app;