import React from 'react'
import GrillData from './GrillData'


function Grill(props){
    return(
        <div>
        <h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>
        
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Categories</th>
                                <th>Colors</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Categories</th>
                                <th>Colors</th>
                                <th>Stock</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            
                        <GrillData/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}


export default Grill