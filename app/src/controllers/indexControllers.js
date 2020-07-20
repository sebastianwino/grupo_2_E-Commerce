const fs = require('fs');
const path = require('path')
const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { unlink } = require('fs-extra');


let indexControllers = {
    root: (req, res) => {
        let imagenActual = products[(products.length)-1].imageLg;
        imagenActual = imagenActual.substring(1)
          
        unlink('./public/images/upload/' + imagenActual , function (err) {            
          if (err) {                                                 
              console.error(err);                                    
          }                                                          
         console.log('archivo borrado');                           
        });
  
        let imagenActualB = products[(products.length)-1].image;
        imagenActualB = imagenActual.substring(1)
          
        unlink('./public/images/upload/' + imagenActualB , function (err) {            
          if (err) {                                                 
              console.error(err);                                    
          }                                                          
         console.log('archivo borrado');                           
        });
  
  
  
  
  
  
        res.render('home', {title: 'Home', user: req.session.user});
    }
}

module.exports = indexControllers;