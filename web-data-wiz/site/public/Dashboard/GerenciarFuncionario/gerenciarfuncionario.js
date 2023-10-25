const menuFlutuante = document.getElementById("menuFlutuante");

function abrirMenuFlutuante(){
    if (menuFlutuante.style.display == 'flex') {
        menuFlutuante.style.display = 'none'
    } else {
        menuFlutuante.style.display = 'flex'
    }
}

function voltarPaginaAnterior(){
    window.history.back();
}

  