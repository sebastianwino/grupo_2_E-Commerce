import React, {Component} from 'react'
import GrillFila from './GrillFila'

class Grill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {},
            grills: [],
            page: 0
        }
    }

    apiCall(url, consecuencia) {
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(error => console.log(error))
    }

    cambiarState = (data) => {
        this.setState({
            pagination: data.meta,
            grills: data.data
        })
    }

    componentDidMount() {
        this.apiCall(`http://localhost:3000/api/products?page=${this.state.page}`, this.cambiarState)
    };

    nextPage = () => {
        this.setState(state => {
            return {page : state.page+1}
        }, this.apiCall(`http://localhost:3000/api/products?page=${this.state.page+1}`, this.cambiarState))
    }

    prevPage = () => {
        this.setState(state => {
            return {page : state.page-1}
        }, this.apiCall(`http://localhost:3000/api/products?page=${this.state.page-1}`, this.cambiarState))
    }

    render() {
        
        let products = [];
        this.state.grills === [] ? products = [] : products = this.state.grills

        return(
            <div id="table">
            <h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>
            
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Slices</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((value, i) =>
                                    <GrillFila key={i} data={value}/>
                                )}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between">
                            {0 === this.state.page ? <p> </p> :
                            <button type="button" className="btn btn-info mt-3" onClick={this.prevPage}>Previus page</button>
                            }
                            {Number(this.state.pagination.total_pages-1) === this.state.page ? '' :
                            <button type="button" className="btn btn-info mt-3" onClick={this.nextPage}>Next page</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}


export default Grill