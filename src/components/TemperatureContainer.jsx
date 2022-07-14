import React, { Component } from "react";
import axios from "axios";
import Temperature from "./Temperature/Temperature";
import Graph from "./Graph";
import fetchData from "../utils";


export default class TemperatureContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temperatures: [],
            displayGraph: false,
            page: 1
        }

        this.afterFetch = (temperatures)=> this.setState({temperatures: temperatures});
    }


    componentDidMount() {
        // making an http request to fetch our data
        // then applying a transformation to keep only the necessery data
        fetchData(this.afterFetch, this.state.page,"", "", true)
    }

    

    onNextPage = () =>{
        this.setState({page : this.state.page + 1})
        fetchData(this.afterFetch, this.state.page,"", "", true)
    }

    onPrevPage = () =>{
        if(this.state.page == 1) return

        this.setState({page : this.state.page - 1})
        fetchData(this.afterFetch, this.state.page,"", "", true)
    }

    render() {
        if( ! this.state.temperatures.length){
            return <div>Aucune donnée n'a été renvoyé</div>
        }
        return (
            <div className="container">
                <div className="d-flex justify-content-center mb-5" >

                    <button type="button" className="btn btn-primary" onClick={this.onPrevPage}>Page précédente</button>

                    <button type="button" className="btn btn-primary ms-5" onClick={this.onNextPage}>Page suivante</button>
                </div>
                <table className="table table-striped table-bordered border border-dark">
                    <tbody>
                    <tr>
                        <td>Code commune</td>
                        <td>Code cours d'eau</td>
                        <td>Libellé de la commune</td>
                        <td>Libellé de la station</td>
                        <td>Date de mesure</td>
                        <td>Heure</td>
                        <td>Temperature</td>
                    </tr>
                    {this.state.temperatures.map((e, index) => <Temperature {...e} key={index} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}