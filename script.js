const projectJson = "/portfolio.json"

if (window.location.pathname.includes("index.html")) {
    fetchProjectJson(generateTopThreePortfolio);
    generateAboutMe();
} else if (window.location.pathname.includes("project.html")) {
    fetchProjectJson(generateAllPortfolio);
}

function fetchProjectJson(callback){
    fetch(projectJson)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('Error fetching JSON:', error));
}

async function generateAllPortfolio(data){
    const container = document.getElementById("all-project-container");
    let html = "";

    data.forEach(element => {
        html += `
                    <article class="col-12" id="${element.id}" style="order: ${element.order};">
                        <header class="text-center p-2">${element.title}</header>
                        <div class="d-flex justify-content-center mb-3">
                            <img class="col-12 w-75" src="${element.thumbnail}">
                        </div>
                        
                        <strong>どういうアプリ？</strong>
                        <p>${element.summary}</p>
                        <strong>どうやって開発した？</strong>
                        <p>${element.content}</p>
                        <strong>作成日</strong>
                        <p>${element.date}</p>
                        <footer class="p-1 d-flex justify-content-center">
                            <a title="Go to the repository" href="${element.source}" class="text-dark"><i class="fa-brands fa-github fa-xl"></a></i>
                        </footer>
                    </article>
                `

        container.innerHTML = html
        
    });
}

async function generateTopThreePortfolio(data){
    const container = document.getElementById("top-project-container");
    let html = "";
    
    data.sort((a,b) => a.order - b.order);
    const maxItemsToShow = 3;
    data.slice(0,maxItemsToShow).forEach(element => {
        html += `
                    <article class="col-12 box" id="${element.id}" style="order: ${element.order};">
                    <header class="text-center p-2">${element.title}</header>
                    <div class="d-flex flex-column flex-md-row">
                        <div class="d-flex justify-content-center align-items-center col-12 col-md-6">
                            <img class="col-12 w-75" src="${element.thumbnail}">
                        </div>
                        <div class="mt-3 mt-md-0">
                            <strong>どういうアプリ？</strong>
                            <p>${element.summary}</p>
                            <strong>作成日</strong>
                            <p>${element.date}</p>
                        </div>
                    </div>
                    <footer class="p-1 d-flex justify-content-center">
                        <a title="Go to the repository" href="${element.source}" class="text-dark"><i class="fa-brands fa-github fa-xl"></a></i>
                    </footer>
                </article>
                `

        container.innerHTML = html
        
    });
}


function generateAboutMe(){
    const container = document.getElementById("about-me");
    let p = document.createElement("p")

    fetch("/aboutMe.txt")
        .then(response => response.text())
        .then(data => {
            data = data.replace(/\n/g, "<br>");
            p.innerHTML = data;
        })
        .catch(error => {
            console.log("Error fetching the text file:", error);
        });

        container.append(p);
}