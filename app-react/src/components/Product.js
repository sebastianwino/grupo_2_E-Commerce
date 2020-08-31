import React, {Component} from 'react'


class Product extends Component {

	constructor(props){
		super(props);
		this.state = {
			description: "",
			}
	}
	apiCall(url, consecuencia){
		fetch(url)
		.then(response => response.json())
		.then( data => consecuencia(data))
		.catch(error => console.log(error))
	}

	cambiarState = (data)=>{
		let last = data.data.length -1
		 		this.setState({
		 			description: data.data[last].description
		 		})
	}
   

componentDidMount(){
	this.apiCall("http://localhost:3000/api/products", this.cambiarState)
};


render(){
	let contenido;
	if (this.state.description === ""){
        contenido = <p>Cargando...</p>;
    }else {
        contenido = <p>{this.state.description}</p>
	}
	
    return (
        <div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase</h6>
								</div>
								<div className="card-body">
									<div className="text-center">
										<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}} src="/images/product_dummy.svg" alt="imagen dummy"/>
									</div>
									{contenido}
									<a target="_blank" rel="nofollow" href="/">View product detail</a>
								</div>
							</div>
						</div>
    )
}
}

export default Product