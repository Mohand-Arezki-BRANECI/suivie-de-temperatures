import React, { Component } from "react";

const Temperature =  ({
    code_commune, code_cours_eau,
    date_mesure_temp, heure_mesure_temp,
    libelle_commune, libelle_station,
    resultat, symbole_unite
}) => {
    return ( <tr>
                <td>{code_commune}</td>
                <td>{code_cours_eau}</td>
                <td>{libelle_commune}</td>
                <td>{libelle_station}</td>
                <td>{date_mesure_temp}</td>
                <td>{heure_mesure_temp}</td>
                <td>{resultat} {symbole_unite}</td>
            </tr>
         )
}

export default Temperature;