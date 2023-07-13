import React, { useState, useEffect } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import ReactDOM from "react-dom";
import './Dashboard.css';
const items = [
    {
        icon: "face",
        copy: '01. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }, {
        icon: "pets",
        copy: '02. Sed do eiusmod tempor incididunt ut labore.'
    }, {
        icon: "pets",
        copy: '02. Sed do eiusmod tempor incididunt ut labore.'
    }, {
        icon: "pets",
        copy: '02. Sed do eiusmod tempor incididunt ut labore.'
    }, {
        icon: "pets",
        copy: '02. Sed do eiusmod tempor incididunt ut labore.'
    }, {
        icon: "pets",
        copy: '02. Sed do eiusmod tempor incididunt ut labore.'
    }
];

const Card = (props) => {
    return (
        <li className="card">
            {/* <span class="material-icons">{props.icon}</span> */}
            <p>{props.copy}</p>
        </li>
    )
}

const Dashboard = () => {
    const [moveClass, setMoveClass] = useState('');
    const [carouselItems, setCarouselItems] = useState(items);

    useEffect(() => {
        document.documentElement.style.setProperty('--num', carouselItems.length);
    }, [carouselItems])

    const handleAnimationEnd = () => {
        if (moveClass === 'prev') {
            shiftNext([...carouselItems]);
        } else if (moveClass === 'next') {
            shiftPrev([...carouselItems]);
        }
        setMoveClass('')
    }

    const shiftPrev = (copy) => {
        let lastcard = copy.pop();
        copy.splice(0, 0, lastcard);
        setCarouselItems(copy);
    }

    const shiftNext = (copy) => {
        let firstcard = copy.shift();
        copy.splice(copy.length, 0, firstcard);
        setCarouselItems(copy);
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                {/* Content Header (Page header) */}

                {/* /.content-header */}
                {/* Main content */}
                <section className="content dashboardImg">
                    <div className="container-fluid ">
                        {/* Small boxes (Stat box) */}
                        <div className="row ">
                            <div className="col-md-4 col-6 p-3 mt-3">
                                {/* small box */}
                                <div className="small-box card">
                                    <div className="icon">
                                        <i className="fa fa-globe" style={{
                                            color: '#6bd098!important', fontSize: "40px",
                                            top: "20px", right: "20px"
                                        }} />
                                    </div>
                                    <div className="inner">
                                        {/* <p>Director</p> */}
                                        <h4> C-Cube </h4>
                                    </div>
                                    <a href="#/" className="small-box-footer"><i className="bi bi-arrow-clockwise" /> Details More... </a>
                                </div>
                            </div>

                            <div className="col-md-4 col-6 p-3 mt-3">
                                {/* small box */}
                                <div className="small-box card">
                                    <div className="icon">
                                        <i className="fa fa-window-maximize" aria-hidden="true" style={{
                                            color: '#6bd098!important', fontSize: "40px",
                                            top: "20px", right: "20px"
                                        }} />
                                    </div>
                                    <div className="inner">
                                        {/* <p>Director</p> */}
                                        <h4> CDG </h4>
                                    </div>
                                    <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                </div>
                            </div>
                            <div className="col-md-4 col-6 p-3 mt-3">
                                {/* small box */}
                                <div className="small-box card">
                                    <div className="icon">
                                        <i className="fa fa-area-chart" style={{
                                            color: '#6bd098!important', fontSize: "40px",
                                            top: "20px", right: "20px"
                                        }} />
                                    </div>
                                    <div className="inner">
                                        {/* <p>Director</p> */}
                                        <h4>CUEG</h4>
                                    </div>
                                    <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                </div>
                            </div>

                            <div className="col-md-4 col-6 p-3 ">
                                {/* small box */}
                                <div className="small-box card">
                                    <div className="icon">
                                        <i className="fa fa-adjust " style={{
                                            color: '#6bd098!important', fontSize: "40px",
                                            top: "20px", right: "20px"
                                        }} />
                                    </div>
                                    <div className="inner">
                                        {/* <p>Director</p> */}
                                        <h4>CMFG</h4>
                                    </div>
                                    <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                </div>
                            </div>
                            <div className="col-md-4 col-6 p-3">
                                {/* small box */}
                                <div className="small-box card">
                                    <div className="icon">
                                        <i className="fa fa-clone " style={{
                                            color: '#6bd098!important', fontSize: "40px",
                                            top: "20px", right: "20px"
                                        }} />
                                    </div>
                                    <div className="inner">
                                        {/* <p>Director</p> */}
                                        <h4>ICC</h4>
                                    </div>
                                    <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                </div>
                            </div>
                            <div className="col-md-4 col-6 p-3">
                                {/* small box */}
                                <div className="small-box card">
                                    <div className="icon">
                                        <i className="fa fa-tree" style={{
                                            color: '#6bd098!important', fontSize: "40px",
                                            top: "20px", right: "20px"
                                        }} />
                                    </div>
                                    <div className="inner">
                                        {/* <p>Director</p> */}
                                        <h4>CSSD</h4>
                                    </div>
                                    <a href="#/" className="small-box-footer"><i className="bi bi-stopwatch" />Details More...</a>
                                </div>
                            </div>



                        </div>
                        <div className="row">
                            <div className="carouselwrapper module-wrapper">
                                <div className="ui">
                                    <button onClick={() => setMoveClass('next')} className="prev">
                                        <span className="material-icons">chevron_left</span>
                                    </button>
                                    <button onClick={() => setMoveClass('prev')} className="next">
                                        <span className="material-icons">chevron_right</span>
                                    </button>
                                </div>
                                <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousel`}>
                                    <li className="card">
                                       <table className="table">
                                            <tr>
                                                <th style={{color:"orange"}}>Total Project</th>
                                                <th style={{color:"orange"}}>Running Project</th>
                                                <th style={{color:"orange"}}>Completed Project</th>
                                            </tr>
                                            <tr>
                                                <td> 10</td>
                                                <td> 8</td>
                                                <td> 2</td>
                                            </tr>
                                       </table>
                                    </li>
                                    <li className="card">
                                    <table className="table">
                                            <tr>
                                            <th style={{color:"orange"}}>Total Project</th>
                                                <th style={{color:"orange"}}>Running Project</th>
                                                <th style={{color:"orange"}}>Completed Project</th>
                                            </tr>
                                            <tr>
                                                <td> 10</td>
                                                <td> 8</td>
                                                <td> 2</td>
                                            </tr>
                                       </table>
                                    </li>
                                    <li className="card">
                                    <table className="table">
                                            <tr>
                                            <th style={{color:"orange"}}>Sanctioned Fund
</th>
                                                <th style={{color:"orange"}}>Fund Released</th>
                                                <th style={{color:"orange"}}>Fund Utilized</th>
                                                <th style={{color:"orange"}}>Fund Surplus/ Deficit</th>
                                            </tr>
                                            <tr>
                                                <td> 10</td>
                                                <td> 8</td>
                                                <td> 2</td>
                                                <td> 2</td>
                                            </tr>
                                       </table>
                                    </li>
                                    <li className="card">
                                    <table className="table">
                                            <tr>
                                                <th>Total Project</th>
                                                <th>Running Project</th>
                                                <th>Completed Project</th>
                                            </tr>
                                            <tr>
                                                <td> 10</td>
                                                <td> 8</td>
                                                <td> 2</td>
                                            </tr>
                                       </table>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* /.row */}

                    </div>
                    {/* /.container-fluid */}

                </section>
                {/* /.content */}

            </div>



        </>

    )
}
export default Dashboard
