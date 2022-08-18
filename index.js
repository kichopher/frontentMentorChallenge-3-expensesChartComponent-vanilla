const barChartContainer = document.querySelector("#bar-chart-container")


function insertBars(data) {
    //first find maxAmount
    const arrayOfAmounts = data.map(dataObj=>dataObj.amount)
    const maxAmount = Math.max(...arrayOfAmounts)
    // console.log({maxAmount})
    data.forEach((dataObj) => {
        const bar = `
        <div class="bar-chart-bar">
            <div class="bar__flag">$${dataObj.amount}</div>
            <div class="bar ${dataObj.amount === maxAmount? 'bar--max': ''}" style="height: ${dataObj.amount * 0.175}rem;"></div>
            <p class="label">${dataObj.day}</p>
        </div>
        `
        barChartContainer.insertAdjacentHTML("beforeend", bar)
    })
    
    const bars = document.querySelectorAll(".bar-chart-bar>.bar")
    bars.forEach(bar=>{
        bar.addEventListener("mouseenter", (event)=>{
            const barWithMouseOver = event.currentTarget
            const barChartBarWithMouseOver = barWithMouseOver.closest(".bar-chart-bar")
            barChartBarWithMouseOver.classList.add("show-flag")
        })
        bar.addEventListener("mouseleave", (event)=>{
            const barWithMouseOver = event.currentTarget
            const barChartBarWithMouseOver = barWithMouseOver.closest(".bar-chart-bar")
            barChartBarWithMouseOver.classList.remove("show-flag")
        })
    })
}


fetch('./data.json')
    .then(response => response.json())
    .then(data => insertBars(data))
    .catch(error => console.error(error))
