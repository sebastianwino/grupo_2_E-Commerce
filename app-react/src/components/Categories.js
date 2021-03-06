import React, {Component} from 'react'
import Category from './Category'

class Categories extends Component{
    constructor(props) {
		super(props);
		this.state = {
			categories: []
		}
	}

    apiCall(url, consecuencia) {
		fetch(url)
		.then(response => response.json())
		.then( data => consecuencia(data))
		.catch(error => console.log(error))
    }

    changeState = (data) => {
		this.setState({
			categories: data.data
		})
    }

    componentDidMount() {
        this.apiCall("http://localhost:3000/api/products/categories", this.changeState)
    };

    render() {
        
        let allCategoiries;
        this.state.categories === [] ? allCategoiries = 0 : allCategoiries = this.state.categories

        return (
            <div className="col-lg-6 mb-4" id="categories">						
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                </div>
                <div className="card-body">
                    <div className="row">

                        {allCategoiries.map(category => <Category data={category} key={category.id} />)}

                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Categories