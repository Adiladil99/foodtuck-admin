module.exports = (app) => { 
 require('./client/auth.routes')(app);
 require('./client/me.routes')(app);
 require('./client/callform.routes')(app);

 require('./getters.routes')(app);
 require('./order.routes')(app);
 require('./order_tables.routes')(app);
 require('./products.routes')(app);
}