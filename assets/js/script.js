const carrinho = document.querySelector('#carrinho');
const conteudoCarrinho = document.querySelector('#lista-carrinho tbody');
const esvaziarCarrinho = document.querySelector('#esvaziar-carrinho');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrinho = [];

cargarEventListeners();
    
    function cargarEventListeners(){
        
         listaCursos.addEventListener('click', agregarCurso);
        
         carrinho.addEventListener('click',eliminarCurso);

         esvaziarCarrinho.addEventListener('click', () => {
             articulosCarrinho = [];

             limparHTML(); 
         })
    }
        

        function agregarCurso(e){
            e.preventDefault();
            if(e.target.classList.contains('agregar-carrinho')){
                const cursoSeleccionado = e.target.parentElement.parentElement;
                leerDatosCurso(cursoSeleccionado);
    
            }
        }
    
        
    
        function eliminarCurso(e) {
    
            if(e.target.classList.contains('borrar-curso')){
                const cursoId = e.target.getAttribute('data-id')
    
                
                articulosCarrinho = articulosCarrinho.filter(curso => curso.id !== cursoId);
    
        
                carrinhoHTML();
    
            }  
        }
    
        
    
        function leerDatosCurso(curso){
    
            
    
            const infoCurso = {
                imagen: curso.querySelector('img').src,
                titulo: curso.querySelector('h4').textContent,
                preço: curso.querySelector('.preço span').textContent,
                id:curso.querySelector('a').getAttribute('data-id'),
                quantidade: 1
            }
    
          
            const existe = articulosCarrinho.some( curso => curso.id === infoCurso.id);
    
            if(existe){
            
               const cursos= articulosCarrinho.map(curso => 
                {
    
                    if(curso.id === infoCurso.id){
                        curso.quantidade++;
                        return curso;
                    }else{
                        return curso; 
                    }
                });
    
               articulosCarrinho = [cursos];
    
            }else{
                
                articulosCarrinho = [articulosCarrinho, infoCurso];
                  
            }
    
            carrinhoHTML();
    
        }
    
    
    
        function carrinhoHTML(){
    
            //limpar html
            limparHTML();
    
    
            
            articulosCarrinho.forEach( curso =>{
                const {imagen,titulo,preço,quantidade,id} = curso
                const row = document.createElement('tr');
                row.innerHTML = `
                <td><img src="${imagen}" width="100"></td> 
                <td>${titulo}</td> 
                <td> ${preço}</td>
                <td> ${quantidade}</td>
                <td><a href="#" class="borrar-curso" data-id="${id}"> x </td>
                `;
                

    
                conteudoCarrinho.appendChild(row);
    
            })
    
        }
    

    
        function limparHTML(){
    
            while(conteudoCarrinho.firstChild){
                conteudoCarrinho.removeChild(conteudoCarrinho.firstChild)
            }
        }