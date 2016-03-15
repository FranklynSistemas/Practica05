(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nivel = 1,
    operacion = "+",
    setActivado = false,
    operadores = ["/", "*", "-", "+"];

var TodaOp = [[]];
var concatena = '';
var Puntaje = 0;
var presionaTecla = function presionaTecla(opc) {
    //Saber si se ha presionado la opción de SET...
    if (opc.toLowerCase() === "set" || setActivado) {
        //Saber si se ha presionado "go"...
        if (opc.toLowerCase() !== "go") {
            //Imprimir las opciones...
            if (_utils2.default.isNumber(opc)) {
                //Saber si el número está en un nivel de 1 a 5...
                if (Number(opc) >= 1 && Number(opc) <= 5) {
                    nivel = Number(opc);
                }
                //console.log("Número");
            } else {
                    for (var i = 0; i < operadores.length; i++) {
                        if (opc === operadores[i]) {
                            operacion = operadores[i];
                            break;
                        }
                    }
                }
            _utils2.default.accesoDOM("lcd").innerHTML = "L" + nivel + "&nbsp;&nbsp;OP&nbsp;" + operacion;
            setActivado = true;
        } else {
            setActivado = false;
            _utils2.default.accesoDOM("lcd").innerHTML = "";
            TodaOp = GeneraOperacion(nivel, operacion);
            _utils2.default.accesoDOM("lcd").innerHTML = TodaOp + " =";
        }
    } else {
        if (_utils2.default.isNumber(opc) || opc === "-") {
            //Se debe mostrar una ecuación de forma aleatoria en el LCD...
            //Se debe validar que la respuesta dada por el usuario sea válida...
            //Se debe validar que la operación que se haga es relacionada al valor que está guardada en ecuación...
            //cont++;

            console.log("Número seleccionado: " + opc);

            concatena = "" + concatena + opc;
            _utils2.default.accesoDOM("lcd").innerHTML = TodaOp + " = " + concatena;
            validaOperacion(TodaOp, concatena);
        }
    }
};
var validaOperacion = function validaOperacion(LaOperacion, ValorUsuario) {
    var Opera = eval(LaOperacion);
    if (Opera === parseInt(ValorUsuario)) {
        Puntaje++;
        _utils2.default.accesoDOM("Puntaje").innerHTML = "<center><h1 style='color:red'>Gano su Puntaje es: " + Puntaje + "</h1></center>";
        TodaOp = GeneraOperacion(nivel, operacion);
        _utils2.default.accesoDOM("lcd").innerHTML = TodaOp + " =";
    } else if (String(Opera).length === String(ValorUsuario).length) {
        concatena = '';
        _utils2.default.accesoDOM("lcd").innerHTML = TodaOp + " =";
        _utils2.default.accesoDOM("Puntaje").innerHTML = "<center><h1>Sigue Intentando</h1>";
    }
};

//String(variable).length

var ReturnRandom = function ReturnRandom(max, min) {
    var aleatorio1 = 0,
        aleatorio2 = 0;
    aleatorio1 = Math.floor(Math.random() * (max - min + 1) + min);
    aleatorio2 = Math.floor(Math.random() * (max - min + 1) + min);
    return aleatorio1 + " " + operacion + " " + aleatorio2;
};

var GeneraOperacion = function GeneraOperacion(nivel, operacion) {
    concatena = '';
    switch (nivel) {
        case 1:
            return ReturnRandom(10, 1, operacion);
            break;
        case 2:
            return ReturnRandom(20, 10, operacion);
            break;
        case 3:
            return ReturnRandom(30, 20, operacion);
            break;
        case 4:
            return ReturnRandom(40, 30, operacion);
            break;
        case 5:
            return ReturnRandom(50, 40, operacion);
            break;
    }
};
TodaOp = GeneraOperacion(1, '+');
_utils2.default.accesoDOM("lcd").innerHTML = TodaOp + " =";

var crearBotones = function crearBotones() {
    var posicion = {
        left: 66,
        bottom: 221
    };

    var opciones = ["set", "0", "go"],
        inciaNumero = 7;
    for (var i = 0; i < 4; i++) {
        for (var c = 0; c < 4; c++) {
            var data = c <= 2 ? inciaNumero > 0 ? inciaNumero + c : opciones[c] : operadores[i];
            var style = "left: " + (posicion.left + c * 53) + "px;\n                         bottom: " + (posicion.bottom - i * 62) + "px;";
            var elementoDIV = "<div class = \"tecla\" style = \"" + style + "\" data = " + data + " id = \"" + i + "_" + c + "\"></div>";
            _utils2.default.accesoDOM("carcasa").insertAdjacentHTML('afterbegin', elementoDIV);
            _utils2.default.accesoDOM(i + "_" + c).addEventListener('click', function (event) {
                var valor = _utils2.default.accesoDOM(event.target.id).getAttribute("data");
                presionaTecla(valor);
            });
        }
        inciaNumero -= 3;
    }
};
crearBotones();

},{"./utils":2}],2:[function(require,module,exports){
"use strict";

var accesoDOM = function accesoDOM(param) {
  return document.getElementById(param);
};
var isNumber = function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
module.exports = { accesoDOM: accesoDOM, isNumber: isNumber };

},{}]},{},[1]);
