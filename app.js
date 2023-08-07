async function populate(){
    const portfolioJson = await fetch("portfolio.json")
    console.log(portfolioJson)
}