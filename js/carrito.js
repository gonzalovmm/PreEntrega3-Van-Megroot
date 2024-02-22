function renderCarrito() {
    const carrito = obtenerCarritoLS();
    let contenido = "";

    if (cantTotalProductos() > 0) {
        contenido = `<table>
        <tbody>
        <tr>
        <td colspan='4' class="text-end"><button class="btn btn-sm btn-danger" onclick="confirmacionEliminarCarrito()" title="Eliminar Carrito">Eliminar Carrito</button></td>
        </tr>`;

        for (const producto of carrito) {
            contenido += `<tr>
            <td class="text-start"><img src="${producto.imagen}" alt="${producto.nombre}" width="200" /></td>
            <td class="text-start">${producto.nombre}</td>
            <td class="text-start"><b>$${producto.precio}</b></td>
            <td class="text-end"><button class="btn btn-sm btn-danger" onclick="eliminarProductoCarrito(${producto.id})" title="Eliminar Producto"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAdhJREFUSEuNVet5wzAI5DRJu0k6SibpKB2lGSWTmBSEBAjZjf/YH0aCu+MBkgdExPOlJreDQCy/o2v8Xc7adXqxfG8eu1Q93T07buwb/5MA/SpmvhHRDxF9KITkLajwBNMdrT0iyox+D2EE+CWiW7xbv81gryfQPpWn+ATaT5HzwSxZA7DcMy3MrOKgNZQAQ7PCZOBxBGiAJt1Fc8E1gFhnAtVHUxs6jgMZUiH/nFRz1YQGRbGkDj7UrgKvml5olb2ZAKHMynpHkVKzQo+OS99kqiKNJ31wfcA1GFkyH9qmaMDke1dFQw9BIBCESznYL3AxV3H3Yg/BN9yuCP4PYAgsIS/ZRJFzt81Q6733w/g/yjdTNNT1+VYwzADKqV0YGqr3h1eL+DultW9zSMtQD1gAkURS7+XHE4E2mFguqm477LYaRARLB0+KUkdbH9gESGN5PaAITAPJ6IgUFQRx1Atq69peVF1/CSBTrpcpkVPUDT2Ala0G2FSR1XygyEOtIp8NxDH4VkrjinsrQBnzMzvWxs2N+V6Z6qJJE69snTIVHwC+8mYfjbZwIKvyr/y/IUHmwKkr03coP5lwb8Bj+p9utIgwLov4XVqzqORxzn/tF8BlHK/5meYLajVWMARphpQAAAAASUVORK5CYII=" alt="Eliminar Producto" width="20" /></button></td>
            </tr>`;
        }

        contenido += `<tr>
        <td  colspan='2'>Total a Pagar</td>
        <td><b>$${sumaTotalProductos()}</b></td>
        <td class="text-end"><button class="btn btn-success btn-sm" onclick="finalizarCompra()" title="Finalizar Compra"><b>Finalizar Compra</b></button></td>
        </tr>
        </tbody>
        </table>`;
    } else {
        contenido = `<h1 class="my-5 p-5 text-center">UPS! Su carrito se encuentra vacío</h1>
        <div>
        <div class="col-md-8 offset-md-2 text-center">
        <a href="index.html"><p><button class="btn colorFondoNav text-center " >Seguir Buscando </button></p></a>
        </div>`;
    }

    document.getElementById("productos").innerHTML = contenido;
}

renderCarrito();
renderBotonCarrito();