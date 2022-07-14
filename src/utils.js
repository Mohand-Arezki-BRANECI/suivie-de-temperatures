const axios = require("axios");

const base_url = "https://hubeau.eaufrance.fr/api/v1/temperature/chronique"

const fetchData = (callback, page=1, date_begin="", date_end="", usePage=false) => {
    const params  =  {
        code_departement: "33",
        size: 20,
    
    }

    if(date_begin && date_end){
        params.date_debut_mesure = date_begin;
        params.date_fin_mesure = date_end
    }
    if(usePage) params.page = page;

    axios.get(base_url, {
        params: params
    })
    .then(response => response.data)
    .then(responseData => {
        const { data } = responseData;
        const temperatures = data.map(e => ({
            code_commune: e.code_commune, code_cours_eau: e.code_cours_eau,
            date_mesure_temp: e.date_mesure_temp, heure_mesure_temp: e.heure_mesure_temp,
            libelle_commune: e.libelle_commune, libelle_station: e.libelle_station,
            resultat: e.resultat, symbole_unite: e.symbole_unite
        })
        )

        callback(temperatures);
    })
}

export default fetchData;