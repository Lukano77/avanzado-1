Cypress.Commands.add('verificarProducto',(id) =>{
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlApi}/products?id=${id}`,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
})
})

Cypress.Commands.add('eliminarProducto', (_id)=>{
        cy.request({
            method: "DELETE",
            url: `${Cypress.env().baseUrlApi}/product/${_id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`
            }
        })
})

Cypress.Commands.add('crearProducto', (id, productName, productPrice, ProductImageUrl) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlApi}/create-product`,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        },
        body: {

            "name": productName,
            "price": productPrice,
            "img": ProductImageUrl,
            "id": id
        }
    })
})

Cypress.Commands.add('editarProducto', (id, productName, productPrice, ProductImageUrl) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlApi}/products?id=${id}`,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).its('body.products.docs').each((product) => {
        cy.request({
            method: "PUT",
            url: `${Cypress.env().baseUrlApi}/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`
            },
            body: {
                "name": productName,
                "price": productPrice,
                "img": ProductImageUrl
            }
        })
    })
})

Cypress.Commands.add('comprarProducto',() =>
{
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlApi}/purchase`,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
})

})
