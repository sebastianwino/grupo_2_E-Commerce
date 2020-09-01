import React from 'react'

function GrillFila(props) {
    return(
        <tr>
        <td>{props.data.name}</td>
        <td>{props.data.description}</td>
        <td>${props.data.price}</td>
        <td>{props.data.category.name}</td>
        <td>{props.data.slices}</td>
        <td>{props.data.stock}</td>
        </tr>
    )
}

export default GrillFila