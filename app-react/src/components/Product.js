import React, {Component} from 'react'

class Product extends Component {

	constructor(props) {
		super(props);
		this.state = {
			totalPages: 0,
			description: "",
            title: "",
            image: ""
		}
    }
    
	apiCall(url, consecuencia) {
		fetch(url)
		.then(response => response.json())
		.then( data => consecuencia(data))
		.catch(error => console.log(error))
	}

	cambiarState = (data) => {
		let last = data.data.length-1
        this.setState({
			description: data.data[last].description,
            title: data.data[last].name,
            image: data.data[last].imageURL
			
        })
	}
   
    componentDidMount() {
        this.apiCall("http://localhost:3000/api/products", this.guardarUltima)
    };

    guardarUltima = (data) => {
        this.apiCall(`http://localhost:3000/api/products?page=${data.meta.total_pages-1}`, this.cambiarState)
    }

    render() {
		let description;
        let title;
        let image;
        
        this.state.description === "" ? description = <p>Cargando descripcion... </p> : description = <p>{this.state.description}</p>
        this.state.title === "" ? title = <p>Cargando nombre... </p> : title = <h4>{this.state.title}</h4>
        this.state.image === "" ? image = <p>Cargando image... </p> : image = <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}} alt="productImg" src={`http://localhost:3000${this.state.image}`} />

        return (
            <div className="col-lg-6 mb-4" id="last-product">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase</h6>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                         {image}
                        </div>
                        {title}
                        {description}
                    </div>
                </div>
            </div>
        )
    }
}

export default Product