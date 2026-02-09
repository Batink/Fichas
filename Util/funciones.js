// import '../lib/jspdf.umd.min.js';

const imagenes = [];

// let formato = document.getElementById("paperSize").value;

function crearPDF(){
    let formato = document.getElementById("paperSize").value != "" ? document.getElementById("paperSize").value : "letter";
    let fila = 0;
    let col = 0;
    let cuenta = 0;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        format: formato,
        unit: 'mm'
    });

    console.log(doc.internal);

    for (let i = 0; i < imagenes.length; i++) {

        const img = new Image();

        // console.log("for: " + i);
        
        img.src = imagenes[i];

        img.onload = function() {


            // ======== SAlTO DE LINEA =======
            if(((59+1)*(col+1))+10 < doc.internal.pageSize.width){
                // doc.addImage(img, 'png',((59+1)*col) + 10, ((87+1)*fila) + 10, 59, 87);    
            }
            else {
                col=0;
                fila++;
                // doc.addImage(img, 'png',((59+1)*col) + 10, ((87+1)*fila) + 10, 59, 87);    
            }
            // ================================

            
            // =========== SALTO DE PÁGINA ===========

            if(((87+1)*(fila+1))+10 < doc.internal.pageSize.height){
                //No hacer nada
            }
            else {
                fila=0;
                col=0;
                doc.addPage();
            }

            // =======================================
            

            if(cuenta < imagenes.length - 1){
                doc.addImage(img, 'png',((59+1)*col) + 10, ((87+1)*fila) + 10, 59, 87);
                // doc.addPage();
            } else {
                doc.addImage(img, 'png',((59+1)*col) + 10, ((87+1)*fila) + 10, 59, 87);
                doc.save("Fichas.pdf");
            }


            

            col++;
            cuenta++;
        };                  
    }
}

function guardarImagen(e){
    e.preventDefault();

    console.log(e.target.imagen.files[0]);

    for (i = 0; i<e.target.copias.value; i++){
        imagenes.push(URL.createObjectURL(e.target.imagen.files[0]));
    }

    // alert("Imagen Agregada: " + e.target.imagen.files[0].name);

    // console.log(imagenes);
    
    e.target.reset();

    ActualizarCola();
}

function ActualizarCola(){
    const itemCola = document.getElementById("cola");
    itemCola.innerHTML = "";

    for (let i = 0; i < imagenes.length; i++) {

        const newItem = document.createElement("img");

        newItem.className = "item-cola";

        newItem.src = imagenes[i];
        newItem.style.width = "20%";
        newItem.style.margin = "5px";
        itemCola.appendChild(newItem);
    }
}

function borrarCola(){
    imagenes.length = 0;
    ActualizarCola();
}

function test() {
    alert("Test");

}
