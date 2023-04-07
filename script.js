let count = 0;

function pesquisaInput(){
  let inputPesquisa = document.getElementById('searchInput');
 
  if(count == 0 &&  document.getElementById('menuInp').checked === false){
    inputPesquisa.style.visibility = "visible";
    count = 1;
  } else {
    inputPesquisa.style.visibility = "hidden";
	  tiraDestaque();
    count = 0;
  }
}

function menuSlid(){
  
  let navMenu = document.getElementById('navMenu').style;
    
    if(document.getElementById('menuInp').checked){
    navMenu.transform = "translateX(0%)";
    document.body.style.overflow = 'hidden';
      document.getElementById('conteudo').style.filter = "blur(2px) opacity(30%) brightness(50%)";
    document.getElementById('header').style.filter = "blur(2px) brightness(80%)";
    document.getElementById('searchInput').style.visibility = "hidden";
    document.body.style.userSelect = "none";
    
    document.getElementById('conteudo').onclick = function () {
      navMenu.transform = "translateX(-104%)";
      navMenu.boxShadow = "none";
      document.getElementById('menuInp').checked = false;
      document.body.style.overflow = 'visible';
      document.getElementById('conteudo').style.filter = "";
    document.getElementById('header').style.filter = "";
    document.getElementById('searchBut').disabled = false;
    document.body.style.userSelect = "text";
    
     };
  }
}

    function destacaTextoBuscado(Texto, termoBuscado){
      
	
    let inicioTag = "<font buscado class='destaque'>";
    let fimTag = "</font>";

		
    let novoTexto = "";
    let i = -1;
    let TermoBuscado_lc = termoBuscado.toLowerCase();
    let Texto_lc = Texto.toLowerCase();

    while(Texto.length > 0){
        i = Texto_lc.indexOf(TermoBuscado_lc, i+1);
        if (i < 0){
            novoTexto += Texto;
            Texto = "";
        } else {
            
					if (Texto.lastIndexOf(">", i) >= Texto.lastIndexOf("<", i)){
                if (Texto_lc.lastIndexOf("/script>", i) >= Texto_lc.lastIndexOf("<script", i)){
                    novoTexto += Texto.substring(0, i) + inicioTag + Texto.substr(i, termoBuscado.length) + fimTag;
                    Texto = Texto.substr(i + termoBuscado.length);
                    Texto_lc = Texto.toLowerCase();
                    i = -1;
                }
            }
        }
    }
    return novoTexto;
}



function buscaTexto(textoABuscar, textoObj, ehFrase){
		
    tiraDestaque();
	
    if(textoABuscar.trim() == ""){
			
			return false;
			
		} else {
			if(!ehFrase){
		
			  let Texto = destacaTextoBuscado(textoObj.innerHTML, textoABuscar);
		
        textoObj.innerHTML = Texto;
	
								
		  } else {

		    arrayBusca[textoABuscar];
        let Texto = textoObj.innerHTML;


		     for(let i = 0; i < arrayBusca.length; i++){
			     Texto = destacaTextoBuscado(Texto, arrayBusca[i]);
		   }
    
         textoObj.innerHTML = Texto;
											
  }
			     document.querySelector('.destaque').scrollIntoView({block: "center"});
			document.querySelector('.destaque').scrollTop += 35;
	}
}


function tiraDestaque(){
	let jaBuscado = document.querySelector('[buscado]');

	if (jaBuscado !==  null){
    let buscados = document.querySelectorAll('[buscado]');
		buscados.forEach(b => b.replaceWith(b.innerText))
	}
}