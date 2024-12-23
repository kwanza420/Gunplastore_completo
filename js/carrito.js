class item_carrito{
     constructor(nombre,descripcion,imagen,precio){
          this.nombre=nombre
          this.descripcion=descripcion
          this.imagen=imagen
          this.precio=precio
          this.cantidad=1
     }
}
class localcart{
     static key= "items_carrito"
     static getItemsCarritoLocal (){
          let carritoMapa= new Map()
          const carrito =localStorage.getItem(localcart.key)
          if (carrito===null|| carrito.length===0) return carritoMapa
            return new Map(Object.entries(JSON.parse(carrito)))
     }
     static addItemsCarritoLocal (id,item){
          let carrito=localcart.getItemsCarritoLocal()
          if (carrito.has(id)){
               let itemMapa= carrito.get(id)
               itemMapa.cantidad +=1
               carrito.set(id,itemMapa)
          }
          else
          carrito.set(id,item)
         localStorage.setItem(localcart.key, JSON.stringify(Object.fromEntries(carrito)))
         actualizar_carrito()
     }
     static deleteItemscarritoLocal (id){
          let carrito=localcart.getItemsCarritoLocal()
          if (carrito.has(id)){
          let itemMapa=carrito.get(id)
          if(itemMapa.cantidad>1){
               itemMapa.cantidad -=1
               carrito.set(id,itemMapa)
          }
          else
          carrito.delete(id)
          
     }
     if(carrito.length===0){
          localStorage.clear
     }
     else{
     localStorage.setItem(localcart.key, JSON.stringify(Object.fromEntries(carrito)))}
     actualizar_carrito()
     }
}

const icono=document.getElementById("icono")
const resto_caja =document.getElementById("resto")
resto_caja.en_caja=0
const botonesCarritos= document.querySelectorAll(".boton_añadir_al_carrito")
botonesCarritos.forEach((boton)=>{
     boton.addEventListener("click",funcionAñadirItem)
})
function funcionAñadirItem(e){
 const id =e.target.parentElement.parentElement.parentElement.getAttribute("data-id")    
 const imagen = e.target.parentElement.parentElement.previousElementSibling.src
 const nombre = e.target.parentElement.previousElementSibling.textContent
 const descripcion = e.target.parentElement.children[0].textContent
 let precio = e.target.parentElement.children[1].textContent
 precio = precio.replace("precio:$", '')
 const item = new item_carrito(nombre, descripcion, imagen, precio)
 localcart.addItemsCarritoLocal(id, item)
console.log(precio)
}

icono.addEventListener("mouseover",()=>{
  if(resto_caja.classList.contains("hide"))
      resto_caja.classList.remove("hide")
    })

icono.addEventListener("mouseleave",()=>{
     setTimeout( () =>{
          if(resto_caja.en_caja===0)
            resto_caja.classList.add("hide")
          },500)
     })
     resto_caja.addEventListener("mouseover",()=>{
          resto_caja.en_caja=1
         })
         resto_caja.addEventListener("mouseleave",()=>{
          resto_caja.en_caja=0
          resto_caja.classList.add("hide")
})

function actualizar_carrito(){
          const Wrapper = document.querySelector('.wrapper')
          Wrapper.innerHTML=""
          const items = localcart.getItemsCarritoLocal("items_carrito")
          if(items === null) {
                total=0
                return}
          let cantidad = 0
          let total = 0
          for(const [key, valor] of items.entries()){
              const item_carro = document.createElement('div')
              item_carro.classList.add('item_carrito')
              let precio = valor.precio*valor.cantidad
              precio = Math.round(precio*100)/100
              cantidad+=1
              total += precio
              total = Math.round(total*100)/100
              item_carro.innerHTML =
              `
              <img src="${valor.imagen}"> 
                             <div class="details">
                                 <h3>${valor.nombre}</h3>
                                 <p>${valor.descripcion}
                                  <span class="cantidad">cantidad: ${valor.cantidad}</span>
                                     <span class="precio">Precio: $ ${precio}</span>
                                 </p>
                             </div>
                             <div class="cancelar"><i class="fa-solid fa-xmark"></i></div>
              `
             item_carro.lastElementChild.addEventListener('click', ()=>{
                 localcart.deleteItemscarritoLocal(key)
                 actualizar_carro()// esto causa un error en cualquier pagina
                                   //  que no sea completar_compra.MAL AHI
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
     function limpiarcarrito(){
          localStorage.clear()
          actualizar_carrito()
          actualizar_carro()
      }
     function pagar() {
          window.location.href = "compra.html"; 
      }
      function volver(){
          window.location.href = "index.html";
      }
      document.addEventListener("DOMContentLoaded",()=>{actualizar_carrito()})