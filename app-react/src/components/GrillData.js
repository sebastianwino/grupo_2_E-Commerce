import React, {
    Component
} from 'react'
import GrillFila from './GrillFila'

// let data1 = {
//     name: 'Tiger Nixon',
//     description: 'System Architect',
//     price: 320.800,
//     categories: ['Category 01', 'Category 02', 'Category 03'],
//     colors: ['Red', 'Blue', 'Green'],
//     stock: 245
// }
// let data2 = {
//     name: 'Jane Doe',
//     description: 'Fullstack developer',
//     price: 320.800,
//     categories: ['Category 01', 'Category 02', 'Category 03'],
//     colors: ['Red', 'Blue', 'Green'],
//     stock: 245
// }


// let datas = [data1, data2]



class GrillData extends Component {


    constructor(props) {
        super(props);
        this.state = {
            grills: []
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
            grills: data.data
        })
    }

    componentDidMount() {
        this.apiCall("http://localhost:4000/products/grill", this.cambiarState)
    };

    render(){
        
         let datas = [];
         if (this.state.grills === []){
            datas = [];
         }else {
             datas = this.state.grills
         }

        return(
            <>
            {datas.map((value, i)=>
            <GrillFila key={i} data = {value}/>
            )}
            </>
        )
    }
    
}

export default GrillData