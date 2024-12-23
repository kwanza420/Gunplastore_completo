function actualizar_carro(){
    const Wrapper = document.querySelector('.card-wrapper')
    Wrapper.innerHTML=""
    const items = localcart.getItemsCarritoLocal("items_carrito")
    if(items === null) {
          total=0
          return}
    let cantidad = 0
    let total = 0
    for(const [key, valor] of items.entries()){
        const item_carro = document.createElement('div')
        item_carro.classList.add('card-item')
        let precio = valor.precio*valor.cantidad
        precio = Math.round(precio*100)/100
        cantidad+=1
        total += precio
        total = Math.round(total*100)/100
        item_carro.innerHTML =
        `
         <img src="${valor.imagen}" alt="imagen de prueba" />
         <div class="nombre_p">
            <h3>${valor.nombre}</h3>
         </div>
         <div class="texto_p">
            <p>
             ${valor.descripcion}
            </p>
         </div>
         <div class="precio_p">
            <p class="precio">${precio}</p>
         </div>
         <div class="cantidad_p">
            <p class="">${valor.cantidad}</p>
         </div>
         <div class="cancelar"><i class="fa-solid fa-xmark"></i></div>
        `
       item_carro.lastElementChild.addEventListener('click', ()=>{
           localcart.deleteItemscarritoLocal(key)
           actualizar_carro()
       })
        Wrapper.append(item_carro)
    }

    if(cantidad > 0){
        icono.classList.add('non-empty')
        let root = document.querySelector(':root')
        root.style.setProperty('--cantidad', `"${cantidad}"`)
        let subtotal = document.querySelector('.subtotal')
        subtotal.innerHTML = `SubTotal: $${total}`
    }
    else{
    icono.classList.remove('non-empty')
    let subtotal = document.querySelector('.subtotal')
    subtotal.innerHTML = `SubTotal: $${total}`
    }
}
const carrito =localStorage.getItem("items_carrito")
actualizar_carro()
document.addEventListener("DOMContentLoaded",()=>{actualizar_carro()})