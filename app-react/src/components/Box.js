import React from 'react'
import PropTypes from 'prop-types'

function Box(props) { 

    return(
        
        <div className="col-md-4 mb-4" >
        <div className={`card ${props.boxes.borde} shadow h-100 py-2`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={`text-xs font-weight-bold ${props.boxes.claseTexto} text-uppercase mb-1`}> {props.boxes.titulo}</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{props.boxes.cifra}</div>
                    </div>
                    <div className="col-auto">
                        <i className={`fas fa-${props.boxes.icono} fa-2x text-gray-300`}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
        
    )
}

Box.defaultProps = {
    boxes: {
        titulo: 'hola',
        borde: 'border-left-warning',
        icono: 'user-check',
        cifra: 50
    }
}

 Box.propTypes = {
     boxes: PropTypes.shape({
        titulo: PropTypes.string.isRequired,
        borde: PropTypes.string.isRequired,
        cifra: PropTypes.number.isRequired,
        icono: PropTypes.oneOf(['clipboard-list', 'dollar-sign', 'user-check'])
       })
    
   };

export default Box