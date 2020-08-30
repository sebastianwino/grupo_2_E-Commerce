import React, {Component} from 'react'

// let fondo = 'info';
class Category extends Component {

    constructor(){
		super();
		this.state = {
			fondo: 'info'
		}
	}

    cambiarFondo(){
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

    render(){

        return(        
            this.props.cant.map((category, i) =>
            <div className="col-lg-6 mb-4" key={category.id}>
                <div onClick={()=>this.cambiarFondo()} className={`card bg-${this.state.fondo} text-white shadow`}>
                    <div className="card-body">
                        {category.name}
                    </div>
                </div>
            </div>
            )
        )
    }
}

export default Category