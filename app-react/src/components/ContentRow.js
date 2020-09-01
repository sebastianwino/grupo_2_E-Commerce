import React, {Component} from 'react'
import Box from './Box'

let caja1 = {borde:'border-left-primary', icono:"clipboard-list", cifra:0, claseTexto:"text-primary", titulo:"PRODUCTS IN DATA BASE"}
let caja2 = {borde:"border-left-success", icono:"dollar-sign", cifra:0, claseTexto:"text-success", titulo:"AMOUNT IN PRODUCTS"}
let caja3 = {borde:"border-left-warning", icono:"user-check", cifra:0, claseTexto:"text-warning", titulo:"USERS QUANTITY"}

let cajas = [caja1, caja2, caja3]

class ContentRow extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cantProducts: "",
            totPrecios: "",
            totUsuarios: ""
        }
    }

    apiCall(url, consecuencia) {
        fetch(url)
        .then(response => response.json())
        .then( data => consecuencia(data))
        .catch(error => console.log(error))
    }

    changeProductState = (data) => {
        this.setState({
            cantProducts: data.meta.total_products,
            totPrecios: data.meta.total_price,
        })
    }

    changeUsersState = (data) => {
        this.setState({
            totUsuarios: data.meta.total_users
        })
    }

    componentDidMount() {
        this.apiCall("http://localhost:3000/api/products", this.changeProductState)
        this.apiCall("http://localhost:3000/api/users", this.changeUsersState)
    };
 
    render() {

        if (this.state.cantProducts === "") {
            caja1.cifra = 0;
        } else {
            caja1.cifra = Number(this.state.cantProducts)
            caja2.cifra = Number(this.state.totPrecios)
            caja3.cifra = Number(this.state.totUsuarios)
        }
        
        return(
            <div className="row" id="content-row">
                {cajas.map((valor, i) =>
                    <Box boxes={valor} key={i}/>
                )}
                
                
            </div>
        )
    }
}

export default ContentRow