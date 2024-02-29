Cypress.Commands.add('eliminarProducto', (id) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlApi}/products?id=${id}`,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).its('body.products.docs').each((product) => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env().baseUrlApi}/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`
            }
        });
    })
});

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

Cypress.Commands.add('editarProducto', (id) => {
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
                "name": "Carteras",
                "price": "100.35",
                "img": "https://margies.shop/cdn/shop/files/Ron-Negro-2_800x.jpg?v=1696445384"
            }
        })
    })
})
