import utils from "./utils";

let nivel       = 1,
    operacion   = "+",
    setActivado = false,
    operadores  = ["/", "*", "-", "+"];

 var TodaOp=[[]];    
 var concatena = '';
 var Puntaje = 0;
let presionaTecla = opc =>
{
    //Saber si se ha presionado la opción de SET...
    if(opc.toLowerCase() === "set" || setActivado)
    {
        //Saber si se ha presionado "go"...
        if(opc.toLowerCase() !== "go")
        {
            //Imprimir las opciones...
            if(utils.isNumber(opc))
            {
                //Saber si el número está en un nivel de 1 a 5...
                if(Number(opc) >= 1 && Number(opc) <= 5)
                {
                    nivel = Number(opc);
                }
                //console.log("Número");
            }
            else
            {
                for(let i = 0; i < operadores.length; i++)
                {
                    if(opc === operadores[i])
                    {
                        operacion = operadores[i];
                        break;
                    }
                }
            }
            utils.accesoDOM("lcd").innerHTML = `L${nivel}&nbsp;&nbsp;OP&nbsp;${operacion}`;
            setActivado = true;
        }
        else
        {
            setActivado = false;
            utils.accesoDOM("lcd").innerHTML = "";
            TodaOp = GeneraOperacion(nivel,operacion); 
            utils.accesoDOM("lcd").innerHTML = `${TodaOp} =`;
            
        }
    }
    else
    {
        if(utils.isNumber(opc) || opc === "-")
        {
            //Se debe mostrar una ecuación de forma aleatoria en el LCD...
            //Se debe validar que la respuesta dada por el usuario sea válida...
            //Se debe validar que la operación que se haga es relacionada al valor que está guardada en ecuación...
            //cont++;
            
            console.log(`Número seleccionado: ${opc}`);
            
            concatena = `${concatena}${opc}`;
            utils.accesoDOM("lcd").innerHTML= `${TodaOp} = ${concatena}`;
            validaOperacion(TodaOp,concatena);
        }
    }
};
let validaOperacion = (LaOperacion,ValorUsuario) =>
{
	let Opera = eval(LaOperacion);
	if(Opera === parseInt(ValorUsuario)){
		Puntaje++;
		utils.accesoDOM("Puntaje").innerHTML=`<center><h1 style='color:red'>Gano su Puntaje es: ${Puntaje}</h1></center>`;
		TodaOp = GeneraOperacion(nivel,operacion);
		utils.accesoDOM("lcd").innerHTML = `${TodaOp} =`;
	}else if(String(Opera).length === String(ValorUsuario).length){
		concatena = '';
		utils.accesoDOM("lcd").innerHTML = `${TodaOp} =`;
		utils.accesoDOM("Puntaje").innerHTML=`<center><h1>Sigue Intentando</h1>`;
	}
	
}

//String(variable).length

let ReturnRandom = (max, min) => {
	let aleatorio1=0,aleatorio2=0;
	aleatorio1 = Math.floor(Math.random()*(max-min+1)+min); 
	aleatorio2 = Math.floor(Math.random()*(max-min+1)+min); 
	return `${aleatorio1} ${operacion} ${aleatorio2}`;
}


let GeneraOperacion = (nivel,operacion) => {
	concatena = '';
	switch(nivel){
		case 1:
			return ReturnRandom(10,1,operacion);
		break;
		case 2:
			return ReturnRandom(20,10,operacion);
		break;
		case 3:
			return ReturnRandom(30,20,operacion);
		break;
		case 4:
			return ReturnRandom(40,30,operacion);
		break;
		case 5: 
			return ReturnRandom(50,40,operacion);
		break;
	}
};
TodaOp = GeneraOperacion(1,'+');
utils.accesoDOM("lcd").innerHTML = `${TodaOp} =`;


let crearBotones = () =>
{
    let posicion = {
                        left : 66,
                        bottom : 221
                   };

    let opciones     = ["set", "0", "go"],
        inciaNumero = 7;
    for(let i = 0; i < 4; i++)
    {
        for(let c = 0; c < 4; c++)
        {
            let data = c <= 2 ?
                       (inciaNumero > 0 ? (inciaNumero + c) : opciones[c])
                       : operadores[i];
            let style = `left: ${posicion.left + (c * 53)}px;
                         bottom: ${posicion.bottom - (i * 62)}px;`;
            let elementoDIV = `<div class = "tecla" style = "${style}" data = ${data} id = "${i}_${c}"></div>`;
            utils.accesoDOM("carcasa").insertAdjacentHTML('afterbegin', elementoDIV);
            utils.accesoDOM(`${i}_${c}`).addEventListener('click', event =>
            {
                let valor = utils.accesoDOM(event.target.id).getAttribute("data");
                presionaTecla(valor)
            });
        }
        inciaNumero -= 3;
    }
};
crearBotones();
