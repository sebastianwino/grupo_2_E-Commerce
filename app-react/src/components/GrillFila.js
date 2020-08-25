import React from 'react'

function GrillFila(props){
    return(
        
       
    
<tr>
<td>{props.data.name}</td>
<td>{props.data.description}</td>
<td>${props.data.price}</td>
<td>
    <ul>
        {props.data.categories.map((sub, indice)=>
    
        <li key={indice}>{sub}</li>
    
        )}
    </ul>
</td>
<td>
    <ul>
        {props.data.colors.map((value, i)=>

        <li key={i}><span style={{color: `${value}`}}>{value}</span></li>

        )}
    </ul>
</td>
<td>{props.data.stock}</td>
</tr>


        
    )
}

export default GrillFila