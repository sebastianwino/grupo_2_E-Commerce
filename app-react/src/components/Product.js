import React, {Component} from 'react'


class Product extends Component {

	constructor(props) {
		super(props);
		this.state = {
			totalPages: 0,
			description: "",
            titulo: "",
            imagen: ""
		}
    }
    
	apiCall(url, consecuencia) {
		fetch(url)
		.then(response => response.json())
		.then( data => consecuencia(data))
		.catch(error => console.log(error))
	}

	cambiarState = (data) => {
		let last = this.totalPages -1
        this.setState({
			description: data.data[last].description,
            titulo: data.data[last].name,
            imagen: data.data[last].image_1
			
        })
	}
   
    componentDidMount() {
        this.apiCall("http://localhost:3000/api/products", this.guardarUltima)
    };

    guardarUltima = (data) => {
        this.setState({
			totalPages: data.meta.total_pages
		}, this.apiCall(`http://localhost:3000/api/products?page=8`, this.cambiarState))
    }

	// componentDidMount = () => {
    //    this.apiCall("http://localhost:3000/api/products", this.cambiarState)
    //     }, this.apiCall(`http://localhost:3000/api/products?page=${this.state.page}`, this.cambiarState))
	// }
	
    render() {
		let contenido;
        let titulo;
		let imagen;
		let hola;
        if (this.state.totalPages === 0) {
			hola = 0;
        } else {
            hola = this.state.totalPages
		}
		
        if (this.state.description === "") {
			contenido = <p>Cargando...</p>;
        } else {
            contenido = <p>{this.state.description}</p>
		}
		if (this.state.name === "") {
			titulo = <p>Cargando...</p>;
        } else {
			titulo = <h4>{this.state.titulo}</h4>
            
        }

        if (this.state.imagen === "") {
			imagen = <p>Cargando...</p>;
        } else {
            imagen = <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}} src= {`../../../app/public/images/upload/${this.state.imagen}`} alt="imagen"/>
		}
        
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase</h6>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                         {imagen}
                        </div>
                        {titulo}
                        {contenido}
                        <a target="_blank" rel="nofollow" href="/">View product detail</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product