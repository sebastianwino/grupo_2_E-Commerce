import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PageHeading from './components/PageHeading'
import ContentRow from './components/ContentRow'
import Product from './components/Product'
import Categories from './components/Categories'
import Footer from './components/Footer'
import Grill from './components/Grill';

function App() {
  return (
    <div className="App">
        <div id="wrapper" className="row">
            <div className="col-2">
                <div className="position-fixed"><Sidebar/></div>
            </div>
            <div id="content-wrapper" className="d-flex flex-column col-10">
                <div id="content">
                        <Topbar/>
                    <div className="container-fluid">
                        <PageHeading/>
                        <ContentRow/>
                        <div className="row">
                            <Product/>
                            <Categories/>
                        </div>
                        <Grill/>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
  );
}

export default App;
