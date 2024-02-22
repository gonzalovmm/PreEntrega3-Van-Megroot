//Defino Array de productos 
const productos = [
    {id:1, nombre: "AMD Ryzen 5 5600G",imagen:"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_32727_Procesador_AMD_Ryzen_5_4500___Wraith_Stealth_Cooler_AM4_475b8356-grn.jpg", categoria: "Procesadores", precio:210000},
    {id:2, nombre: "Intel Core i7 13700F",imagen:"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_31465_Procesador_Intel_Core_i7_12700_4.9GHz_Turbo_Socket_1700_Alder_Lake_9fb0b45d-grn.jpg", categoria: "Procesadores", precio:499999 },
    {id:3, nombre: "AMD Ryzen 7 5700X",imagen:"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_31690_Procesador_AMD_Ryzen_7_5700X_4.6GHz_Turbo_AM4_-_No_incluye_Cooler_df22f6d7-grn.jpg", categoria: "Procesadores", precio:330000 },
    {id:4, nombre: "Samsung 24 G50 Curvo 144Hz Full HD",imagen:"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38258_Monitor_Gamer_Samsung_24__G50_Curvo_144Hz_Full_HD_VA_FreeSync_ea8dab71-grn.jpg", categoria: "Monitores", precio:261500 },
    {id:5, nombre: "Samsung 22 T350 75Hz",imagen:"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38261_Monitor_Samsung_22__T350_75Hz_IPS_FHD_FreeSync_f578bdc5-grn.jpg", categoria: "Monitores", precio:123900 },
    {id:6, nombre: "MSI 27 Optix 170 Hz",imagen:"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_37270_Monitor_Gamer_MSI_27__Optix_G2712_170Hz_IPS_1ms_Flat_FreeSync_5b694934-grn.jpg", categoria: "Monitores", precio:356900 },
    {id:7, nombre: "Teclado Redragon Kumara K552",imagen:"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_21314_Teclado_Mecanico_Redragon_Kumara_K552_RGB_Outemu_Blue_ESP_ad353174-grn.jpg", categoria: "Perifericos", precio:40990 },
    {id:8, nombre: "Teclado Gaming Retroiluminado Wesdar MK10",imagen:"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_34677_Teclado_Gaming_Retroiluminado_Wesdar_MK10_0ac28ff2-grn.jpg", categoria: "Perifericos", precio:9130 },
    {id:9, nombre: "HyperX Cloud Flight Black Wireless",imagen:"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_37744_Auriculares_HyperX_Cloud_Flight_Black_Wireless__941f8aa7-grn.jpg", categoria: "Perifericos", precio:113000 },    
]

const guardarProductosLS = (productos)=>{
    localStorage.setItem("productos", JSON.stringify(productos));
}

const obtenerProductosLS =()=>{
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const guardarCarritoLS = (productos) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

const obtenerCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const obtenerIdProductoLS =()=>{
    return JSON.parse(localStorage.getItem("producto")) || 0;
}

const obtenerIdCategoriaLS =()=>{
    return JSON.parse(localStorage.getItem("categoria")) || "todos";
}

const cantTotalProductos = () => {
    const carrito = obtenerCarritoLS();

    return carrito.length; 
}

const sumaTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    
    return carrito.reduce((acumulador, item) => acumulador += item.precio, 0);
}
const eliminarCarrito = () => {
    localStorage.removeItem("carrito");
    
    renderCarrito();
    renderBotonCarrito();
}

const confirmacionEliminarCarrito = () => {
    Swal.fire({
        title: "Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            eliminarCarrito();
          Swal.fire({
            title: "Eliminado!",
            text: "Su carrito ha sido eliminado.",
            icon: "success"
          });
          notificacion("Carrito Eliminado!");
        }
      });
}


const renderTotalCarrito = ()=>{
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

const verProducto = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const verProductosPorCategoria = (id) => {
    localStorage.setItem("categoria", JSON.stringify(id));
}

const buscarProducto = () => {
    const productos = obtenerProductosLS();
    const id = obtenerIdProductoLS();
    const producto = productos.find(item => item.id===id);
    
    return producto;
}

const agregarProductoCarrito = () =>{
    const producto = buscarProducto();
    const carrito = obtenerCarritoLS(); 
    carrito.push(producto);
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    notificacion("Producto Agregado!");
}

const eliminarProductoCarrito = (id) => {
    const carrito = obtenerCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    notificacion("Producto Eliminado!");
}

const finalizarCompra = () => {
    Swal.fire({
        title: "Gracias por tu Compra!",
        text: "El total a pagar es $" + sumaTotalProductos() + " pesos.",
        imageUrl: "../multi/logo.png",
        imageWidth: 160,
        imageAlt: "Coches de Metal",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Volver a la tienda"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCarrito();
                notificacion("Gracias por su compra!");
            }
        });
}


const notificacion = (texto) => {
    Swal.fire({
        position: "top-end",
        title: texto,
        showConfirmButton: false,
        timer: 1000
    });
}


const renderBotonCarrito = () => {
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

guardarProductosLS(productos);