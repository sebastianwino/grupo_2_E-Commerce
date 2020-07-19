var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
const session = require('express-session')
const cookieMiddleware = require('./middlewares/cookieMiddleware')
const carritoMiddleware = require('./middlewares/carritoMiddleware')

//REQUERIMIENTO DE RUTAS
var indexRouter = require('./routes/indexRoutes');
var usersRouter = require('./routes/usersRoutes');
var productsRouter = require('./routes/productsRoutes');
var shoppingCartRoutesRouter = require('./routes/shoppingCartRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: "versteckt"}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))


//USO DE RUTAS
app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/productos', productsRouter);
app.use('/carrito',carritoMiddleware, shoppingCartRoutesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('errors', {title: 'Error'});
});

module.exports = app;
