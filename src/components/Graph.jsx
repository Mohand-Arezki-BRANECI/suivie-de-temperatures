import React, { Component } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import fetchData from "../utils";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Temperature des cours d\'eau du département de la Gironde',
        },
    },
};


class Graph extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date_begin: "",
            date_end: "",
            shouldDisplay: false,
            data : {}
        }

    }




    afterFetch = (temperatures) => {
        let dates = []; let temps = []
        this.setState({ shouldDisplay: false })
        if(! temperatures.length) return
        temperatures.forEach(element => {
            dates.push(element.date_mesure_temp);
            temps.push(element.resultat)
        })

        const data = {

            labels: dates,
            datasets: [
                {
                    label: 'Temperature',
                    data: temps,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        }
        this.setState({ shouldDisplay: true, data: data })
    }


    onSend = () => {
        console.log(this.state.date_begin, this.state.date_end);
        if (this.state.date_begin && this.state.date_end) {
            fetchData(this.afterFetch, 1, this.state.date_begin, this.state.date_end, false)
        }

    }

    render() {
        return (
            <div className="mb-5">
                <h3 className="text-center">Selectionner une période pour consulter les variations des températures</h3>
                <div className="d-flex justify-content-around mt-5 mb-5">
                    <div >
                        <input className="form-control" type="text" name="" id="" placeholder="date debut yyyy-mm-dd" onChange={(e) => { this.setState({ date_begin: e.target.value }) }} />
                    </div>
                    <div>
                        <input className="form-control" type="text" name="" id="" placeholder="date find yyyy-mm-dd" onChange={(e) => this.setState({ date_end: e.target.value })} />
                    </div>
                    <div>
                        <button className="btn btn-primary" type="button" onClick={this.onSend}>Envoyer</button>
                    </div>
                </div>

                {this.state.shouldDisplay && <Line options={options} data={this.state.data} />}
            </div>


        )
    }
}

export default Graph;