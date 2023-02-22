document.addEventListener("DOMContentLoaded", () =>{
    let filterButton = document.querySelector("#good-dog-filter");
    function getDogs() {
        fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(data => data.forEach((elem)=> {
            if (elem.isGoodDog === true && filterButton.innerText==="Filter good dogs: ON") {
                renderDog(elem);
            } else if (filterButton.innerText==="Filter good dogs: OFF") {
                renderDog(elem);
            }
        })) 
    }
    getDogs();
    
    
    function onlyGoodDogs() {
        fetch(`http://localhost:3000/pups`)
        .then (resp => resp.json())
        .then(data => data.forEach((elem)=>{
            if (elem.isGoodDog === true) {
                renderDog(elem);
            }
        }))
    }
    
    
        
    filterButton.addEventListener("click", (event) =>{
        if (filterButton.innerText === "Filter good dogs: OFF") {
            filterButton.innerText = "Filter good dogs: ON";
            document.querySelector("#dog-bar").innerHTML= "";
            //onlyGoodDogs()
            getDogs();
        } else {
            filterButton.innerText = "Filter good dogs: OFF";
            document.querySelector("#dog-bar").innerHTML= "";
            getDogs();
        }
        

    })   
    function renderDog(data) {
        let dogBar = document.querySelector("#dog-bar");
        let dogSquare = document.createElement("span");
        dogSquare.innerText= data.name;
        

        dogSquare.addEventListener("click", showDogInfo);
        

        function showDogInfo() {
            let dogInfo = document.querySelector("#dog-info");
            let card = document.createElement("div");
            dogInfo.innerHTML ="";
            card.className = "dog-card";
            card.innerHTML = `
            <img src="${data.image}">
            <h2>${data.name}</h2>
            <button>${data.isGoodDog}</button>
            `
            if (data.isGoodDog === true) {
                card.querySelector("button").innerText = "Good Dog!";
            } else {
                card.querySelector("button").innerText = "Bad Dog!";
            }

            card.querySelector("button").addEventListener("click", () => {
                if (card.querySelector("button").innerText === "Bad Dog!"){
                    card.querySelector("button").innerText = "Good Dog!";
                    data.isGoodDog = true;
                    updateDogNowTrue(data);
                } else {
                    card.querySelector("button").innerText = "Bad Dog!";
                    data.isGoodDog = false;
                    updateDogNowFalse(data);
                }
               
                
                
                
            })
            

            function updateDogNowTrue(data) {
                fetch(`http://localhost:3000/pups/${data.id}`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then (resp => resp.json())
                .then(data => data.isGoodDog=true)
            }

            function updateDogNowFalse(data) {
                fetch(`http://localhost:3000/pups/${data.id}`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then (resp => resp.json())
                .then(data => data.isGoodDog=false)
            }


            dogInfo.appendChild(card);
        }

        dogBar.appendChild(dogSquare);
        


    }






















})