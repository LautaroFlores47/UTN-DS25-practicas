function mostrarResultado(texto) {
            document.getElementById("resultado").innerText = texto;
        }

function ejercicio1() {
    let numero = 10;
    numero += 5;
    mostrarResultado("1. Resultado: " + numero);
}

function ejercicio2() {
    let nombre = "Lautaro";
    let apellido = "Flores";
    let nombreCompleto = nombre + " " + apellido;
    mostrarResultado("2. Nombre completo: " + nombreCompleto);
}

function ejercicio3() {
    let a = 8;
    let b = 5;
    let resultado = "";
    if (a === b) {
        resultado = "3. Son iguales";
    } else if (a > b) {
        resultado = "3. El primero es mayor";
    } else {
        resultado = "3. El segundo es mayor";
    }
    mostrarResultado(resultado);
}

function ejercicio4() {
    let numeroUsuario = Number(prompt("4. Ingresá un número del 1 al 10"));
    let resultado = "";
    switch (true) {
        case (numeroUsuario >= 1 && numeroUsuario <= 3):
            resultado = "Grupo 1: del 1 al 3";
            break;
        case (numeroUsuario >= 4 && numeroUsuario <= 6):
            resultado = "Grupo 2: del 4 al 6";
            break;
        case (numeroUsuario >= 7 && numeroUsuario <= 10):
            resultado = "Grupo 3: del 7 al 10";
            break;
        default:
            resultado = "Número fuera de rango";
    }
    mostrarResultado("4. Resultado: " + resultado);
}

function ejercicio5() {
    let suma = 0;
    for (let i = 0; i <= 10; i++) {
        suma += i;
    }
    mostrarResultado("5. Sumatoria de 0 a 10: " + suma);
}

function ejercicio6() {
    let numeros = [1,2,3,4,5,6,7,8,9,10];
    let producto = 1;
    for (let i = 0; i < numeros.length; i++) {
        producto *= numeros[i];
    }
    mostrarResultado("6. Producto total del array: " + producto);
}

function ejercicio7() {
    function multiplicar(x, y) {
        return x * y;
    }
    mostrarResultado("7. Multiplicación de 6 * 4: " + multiplicar(6, 4));
}

function ejercicio8() {
    function concatenarCadenas(cadena1, cadena2) {
        return cadena1 + cadena2;
    }
    let c1 = prompt("Ingresá la primera cadena:");
    let c2 = prompt("Ingresá la segunda cadena:");
    mostrarResultado("8. Resultado: " + concatenarCadenas(c1, c2));
}

function ejercicio9() {
    let a = Number(prompt("Ingresá el primer número:"));
    let b = Number(prompt("Ingresá el segundo número:"));
    let resultado = "";
    if (a > b) {
        resultado = a + " es mayor que " + b;
    } else if (a < b) {
        resultado = b + " es mayor que " + a;
    } else {
        resultado = "Ambos números son iguales";
    }
    mostrarResultado("9. Resultado: " + resultado);
}

function ejercicio10() {
    let n = Number(prompt("Ingresá la cantidad de asteriscos:"));
    let resultado = "";
    for (let i = 0; i < n; i++) {
        resultado += "*";
    }
    mostrarResultado("10. Resultado: " + resultado);
}

function ejercicio11() {
    let monto = Number(prompt("Ingresá el monto del producto:"));
    let medioPago = prompt("Ingresá el medio de pago (E, D o C):").toUpperCase();
    let descuento = 0;
    if (monto >= 200 && monto <= 400) {
        if (medioPago === "E") descuento = 0.30;
        else if (medioPago === "D") descuento = 0.20;
        else if (medioPago === "C") descuento = 0.10;
    } else if (monto > 400) {
        descuento = 0.40;
    }
    let montoFinal = monto - (monto * descuento);
    mostrarResultado("11. Monto final a abonar: $" + montoFinal.toFixed(2));
}

function ejercicio12() {
    let altura = Number(prompt("Ingresá la altura del medio-árbol:"));
    let resultado = "";
    for (let i = 1; i <= altura; i++) {
        resultado += "* ".repeat(i) + "\n";
    }
    mostrarResultado("12. Medio-árbol:\n\n" + resultado);
}

function ejercicio13() {
    let dia = Number(prompt("Ingresá un número (1 a 7):"));
    let resultado = "";
    switch (dia) {
        case 1: resultado = "Lunes"; break;
        case 2: resultado = "Martes"; break;
        case 3: resultado = "Miércoles"; break;
        case 4: resultado = "Jueves"; break;
        case 5: resultado = "Viernes"; break;
        case 6: resultado = "Fin de semana"; break;
        case 7: resultado = "Fin de semana"; break;
        default: resultado = "Error: día inválido";
    }
mostrarResultado("13. Resultado: " + resultado);
}

function ejercicio14() {
    const cantidad = Number(prompt("¿Cuántos números vas a ingresar?"));
    const numerosTexto = prompt("Ingresá " + cantidad + " números separados por comas (ej: 4,5,6,7):");
    const numeros = numerosTexto.split(",").map(num => Number(num));
    let suma = 0;
    for (let i = 0; i < numeros.length; i++) {
        suma += numeros[i];
    }
    const promedio = suma / numeros.length;
    mostrarResultado("14. Números: [" + numeros.join(", ") + "]\nPromedio: " + promedio);
}

function ejercicio15() {
    const valor = document.getElementById("alturaArbol").value;
    const altura = Number(valor);
    if (isNaN(altura) || altura <= 0) {
        mostrarResultado("Ingresá una altura válida (número mayor a 0).");
    } else {
        ejercicio12(altura);
    }
}



