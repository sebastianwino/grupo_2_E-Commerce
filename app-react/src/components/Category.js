import React, {Component} from 'react'

// let fondo = 'info';
class Category extends Component {

    constructor(props) {
		super(props);
		this.state = {
            fondo: 'info',
            category: props.data
		}
	}

    cambiarFondo() {
        if (this.state.fondo === 'info') {
            this.setState({
                fondo: 'danger'
            })
        } else {
            this.setState({
                fondo: 'info'
            }
        )}
    }

    render() {

        return(        
            <div className="col-lg-6 mb-2">
                <div onClick={()=>this.cambiarFondo()} className={`card bg-${this.state.fondo} text-white shadow h-75`}>
                    <div className="card-body">
                        <p>{this.state.category.name}: <small>{this.state.category.products_in_category} products</small></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Category