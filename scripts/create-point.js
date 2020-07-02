function populateUFs(){
    const ufSelected = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelected.innerHTML +=  ` <option value="${state.id}">${state.nome}</option>`
        }
        
    })

        

}

populateUFs()

function getCities(event) {
    const citySelected = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value


    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState]

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelected.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelected.disabled = true


    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(const city of cities ) {
            citySelected.innerHTML += `<option value="${city.nome}"> ${city.nome}`
        }
        citySelected.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)