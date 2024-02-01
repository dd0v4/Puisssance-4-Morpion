const puissance4 = document.querySelector("#puissance4");
const morpion = document.querySelector("#morpion");
const articles = document.querySelector("#articles");
const tableauPuissance4 = document.querySelector("#tableauPuissance4");
const tableauMorpion = document.querySelector("#tableauMorpion");
const gagnant = document.querySelector("#gagnant");
const joueurs = document.querySelector("#joueurs");
const boutonjoueur = document.querySelector("#joueur");
const boutonordi = document.querySelector("#ordi");

let son = new Audio("./assets/son/jeton.mp3");
let isP4 = false;
let isMP = false;
let vsHumain = false;
let vsOrdi = false;

let mptabl = "";
let p4tabl = "";

let turn1 = true;
let turn2 = false;

let win = false;


const genererTableauP4 = (col, row) => {
    let tableau = "";
    tableau += "<table>\n";
    for(let i = 0; i < row; i++){
        tableau += `<tr class="row-${i +1}">`;
        for(let j = 0; j < col; j++){
            tableau += `<td class="col-${j +1}"></td>\n`;
        }
        tableau += `</tr>\n`;
    }
    tableau += "</table>";
    return tableau;
} 
morpion.addEventListener("click", (e) => {
    
    articles.style.display = "none";
    joueurs.style.display = "flex";
    boutonjoueur.addEventListener("click", () => {
        vsHumain = true;
        fini = true;
        joueurs.style.display = "none";
        tableauMorpion.style.display = "flex";
    });

    boutonordi.addEventListener("click", () => {
        vsOrdi = true;
        fini = true;
        joueurs.style.display = "none";
        tableauMorpion.style.display = "flex";
    });
    mptabl = genererTableauP4(3, 3); 
    tableauMorpion.innerHTML = mptabl; 
    document.querySelectorAll("td").forEach(td => {
        td.innerHTML = '<div class="case"></div>';
    })
    isMP = true;
    if (isMP) {
        
        document.querySelectorAll(".case").forEach(div => {
            div.addEventListener("click", (event) => {
                const colIndex = event.currentTarget.parentElement.cellIndex + 1;
                const rowIndex = event.currentTarget.closest('tr').rowIndex + 1;

                
                if (turn1){
                    if (event.currentTarget.id != "croix" && event.currentTarget.id != "cerclemp"){
                        event.currentTarget.setAttribute("id", "cerclemp");
                        event.currentTarget.classList.remove("case");
                        if(vsOrdi){
                            turn1 = false;
                            turn2 = true;
                            let rows = document.querySelectorAll("tr");
                            
                            let colonnes = [];
                            let i = 0;
                            rows.forEach(row =>{
                                for(let cl of row.children){
                                    colonnes.push(cl)
                                }
                            })
                            console.log(colonnes)
                            let firstChildColonne = colonnes[Math.floor(Math.random() * (colonnes.length - 1) + 1)].firstChild;

                            while (firstChildColonne && firstChildColonne.id) {
                                firstChildColonne = colonnes[Math.floor(Math.random() * (colonnes.length - 1) + 1)].firstChild;
                                if (i >= 9 ){
                                    break;
                                }
                                i++;
                                
                            }
                            if (firstChildColonne) {
                                firstChildColonne.click();
                            }
                            
                        }else{
                            turn2 = true;
                            turn1 = false;
                        }
                    }
                }else if(turn2){
                    if (event.currentTarget.id != "croix" && event.currentTarget.id != "cerclemp"){
                        event.currentTarget.setAttribute("id", "croix");
                        event.currentTarget.classList.remove("case");
                        turn1 = true;
                        turn2 = false;
                    }
                }
                let compteurVcercle = 0;
                let compteurVcroix = 0;
                let cols = document.querySelectorAll(`.col-${colIndex}`);
                cols.forEach(casee => {
                    if (casee.firstChild.id === "croix") {
                        compteurVcroix++;
                        compteurVcercle = 0;
                    } else if (casee.firstChild.id === "cerclemp") {
                        compteurVcercle++;
                        compteurVcroix = 0;
                    } else {
                        compteurVcroix = 0;
                        compteurVcercle = 0;
                    }

                    if (compteurVcroix >= 3 && win === false) {
                        gagnant.innerHTML = "Croix gagne";
                        win = true;
                        return;
                    } else if (compteurVcercle >= 3 && win === false) {
                        gagnant.innerHTML = "Cercle gagne";
                        win = true;
                        return;
                    }
                });


                let compteurHcercle = 0;
                let compteurHcroix = 0;
                let rows = document.querySelectorAll(`.row-${rowIndex}`);
                rows.forEach(row => {
                    let rowChild = Array.from(row.children);

                    for (let j = 0; j < rowChild.length; j++) {
                        const caseh = rowChild[j];

                        if (caseh.firstChild.id === "cerclemp") {
                            compteurHcercle++;
                            compteurHcroix = 0;
                        } else if (caseh.firstChild.id === "croix") {
                            compteurHcroix++;
                            compteurHcercle = 0;
                        } else {
                            compteurHcercle = 0;
                            compteurHcroix = 0;
                        }

                        if (compteurHcercle >= 3 && win === false) {
                            gagnant.innerHTML = "Cercle gagne";
                            win = true;
                            return;
                        } else if (compteurHcroix >= 3 && win === false) {
                            gagnant.innerHTML = "Croix gagne";
                            win = true;
                            return;
                        }
                    }
                });

                
                rows.forEach(row => {
                    let rowsArray = Array.from(document.querySelectorAll("tr"));
                    let rowChild = Array.from(row.children);
                    let rows1child = rowsArray[0].children;
                    let rows2child = rowsArray[1].children;
                    let rows3child = rowsArray[2].children;
                    
                    if (rows1child[0].firstChild.id === "cerclemp" && rows2child[1].firstChild.id === "cerclemp" && rows3child[2].firstChild.id === "cerclemp" && win === false){
                        gagnant.innerHTML = "Cercle gagne";
                        win = true;
                        
                    }else if(rows1child[2].firstChild.id === "cerclemp" && rows2child[1].firstChild.id === "cerclemp" && rows3child[0].firstChild.id === "cerclemp" && win === false){
                        gagnant.innerHTML = "Cercle gagne";
                        win = true;
                        
                    }

                    if (rows1child[0].firstChild.id === "croix" && rows2child[1].firstChild.id === "croix" && rows3child[2].firstChild.id === "croix" && win === false){
                        gagnant.innerHTML = "Croix gagne";
                        win = true;
                        
                    }else if(rows1child[2].firstChild.id === "croix" && rows2child[1].firstChild.id === "croix" && rows3child[0].firstChild.id === "croix" && win === false){
                        gagnant.innerHTML = "Croix gagne";
                        win = true;
                        
                    }  
                })
            })
            

        })
    }    
})

let fini = false;
puissance4.addEventListener("click", (e) => {
    articles.style.display = "none";
    
    joueurs.style.display = "flex";
    
    boutonjoueur.addEventListener("click", () => {
        vsHumain = true;
        fini = true;
        joueurs.style.display = "none";
        tableauPuissance4.style.display = "flex";
    });

    boutonordi.addEventListener("click", () => {
        vsOrdi = true;
        fini = true;
        joueurs.style.display = "none";
        tableauPuissance4.style.display = "flex";
    });
    
    p4tabl = genererTableauP4(7, 6);
    tableauPuissance4.innerHTML = p4tabl;
    document.querySelectorAll("td").forEach(td => {
        td.innerHTML = '<div class="cercle"></div>';
    })
    isP4 = true;
    if (isP4) {
        document.querySelectorAll(".cercle").forEach(div => {
            div.addEventListener("click", (event) => {
                const colIndex = event.currentTarget.parentElement.cellIndex + 1;
                const col = document.querySelectorAll(`.col-${colIndex}`);
                const rowIndex = event.currentTarget.closest('tr').rowIndex + 1;

                let vide;

                for (let i = col.length - 1; i >= 0; i--) {
                    if (col[i].querySelector(".cercle").style.backgroundColor !== "red" && col[i].querySelector(".cercle").style.backgroundColor !== "yellow") {
                        vide = col[i];
                        break;
                    }
                }

                if (vide) {
                    const cercle = vide.querySelector(".cercle");
                    if (turn1) {
                        son.play()
                        cercle.style.backgroundColor = "red";
                        event.currentTarget.parentElement.setAttribute("id", "red");
                        if(vsOrdi){
                            turn1 = false;
                            turn2 = true;
                            let colonnes = [];
                            for (let i = 0; i < 7; i++){
                                colonnes.push(document.querySelector(`.col-${i+1}`));
                            }
                            let firstChildColonne = colonnes[Math.floor(Math.random() * (7 - 1) + 1)].firstChild
                            console.log(firstChildColonne)
                            firstChildColonne.click()
                            
                            
                        }else{
                            turn1 = false;
                            turn2 = true;
                        }
                        
                    } else if (turn2) {
                        son.play()
                        cercle.style.backgroundColor = "yellow";
                        event.currentTarget.parentElement.setAttribute("id", "yellow");
                        turn1 = true;
                        turn2 = false;
                    }
                    
                
                }
                
                gagner(colIndex, rowIndex);
                let comptDLred = 0;
                let comptDLyellow = 0;
                let rows = document.querySelectorAll(`.row-${rowIndex}`);
                rows.forEach(row => {
                    let rowsArray = Array.from(document.querySelectorAll("tr"));
                    for(let j = 0; j < 8; j++){
                        for(let i = 0; i < 8; i++){
                            try{
                                if (rowsArray[i].children[i + j -4]){
                                    if (rowsArray[i].children[i + j -4].firstChild.style.backgroundColor === "red"){
                                        comptDLred++;
                                        comptDLyellow = 0;
                                    }else if(rowsArray[i].children[i + j -4].firstChild.style.backgroundColor === "yellow"){
                                        comptDLyellow++;
                                        comptDLred = 0;
                                    }else{
                                        comptDLred = 0;
                                        comptDLyellow = 0;
                                    }

                                }
                            }
                            catch(typeError){
                                console.log("a")
                                break;
                            }


                            if (comptDLred >= 4 && win === false) {
                                gagnant.innerHTML = "Rouge gagne";
                                win = true;
                                return;
                            } else if (comptDLyellow >= 4 && win === false) {
                                gagnant.innerHTML = "Jaune gagne";
                                win = true;
                                return;
                            }
                        }
                    }                
                })
                

                let comptDRred = 0;
                let comptDRyellow = 0;
                rows.forEach(row => {
                    let rowsArray = Array.from(document.querySelectorAll("tr")).reverse()
                    for(let j = 0; j < 8; j++){
                        for(let i = 0; i < 8; i++){
                            try{
                                if (rowsArray[i].children[i + j -4]){
                                    if (rowsArray[i].children[i + j -4].firstChild.style.backgroundColor === "red"){
                                        comptDRred++;
                                        comptDRyellow = 0;
                                    }else if(rowsArray[i].children[i + j -4].firstChild.style.backgroundColor === "yellow"){
                                        comptDRyellow++;
                                        comptDRred = 0;
                                    }else{
                                        comptDRred = 0;
                                        comptDRyellow = 0;
                                    }
                                }
                            }
                            catch(typeError){
                                console.log("a")
                                break;
                            }


                            if (comptDRred >= 4 && win === false) {
                                gagnant.innerHTML = "Rouge gagne";
                                win = true;
                                return;
                            } else if (comptDRyellow >= 4 && win === false) {
                                gagnant.innerHTML = "Jaune gagne";
                                win = true;
                                return;
                            }
                        }
                        
                    } 
                                 
                })
            
            
            });
            
            
        });
        
    }
    
});



const gagner = (colIndex, rowIndex) => {
    let compteurVyellow = 0;
    let compteurVred = 0;
    document.querySelectorAll(`.col-${colIndex}`).forEach(casee => {
        if (casee.firstChild.style.backgroundColor === "red") {
            compteurVred++;
            compteurVyellow = 0;
        } else if (casee.firstChild.style.backgroundColor === "yellow") {
            compteurVyellow++;
            compteurVred = 0;
        } else {
            compteurVred = 0;
            compteurVyellow = 0;
        }

        if (compteurVred >= 4 && win === false) {
            gagnant.innerHTML = "Rouge gagne";
            win = true;
            return;
        } else if (compteurVyellow >= 4 && win === false) {
            gagnant.innerHTML = "Jaune gagne";
            win = true;
            return;
        }
    });
    let compteurHred = 0;
    let compteurHyellow = 0;

    let rows = document.querySelectorAll(`.row-${rowIndex}`);
    rows.forEach(row => {
        let rowChild = Array.from(row.children);

        for (let j = 0; j < rowChild.length; j++) {
            const caseh = rowChild[j];

            if (caseh.firstChild.style.backgroundColor === "red") {
                compteurHred++;
                compteurHyellow = 0;
            } else if (caseh.firstChild.style.backgroundColor === "yellow") {
                compteurHyellow++;
                compteurHred = 0;
            } else {
                compteurHred = 0;
                compteurHyellow = 0;
            }

            if (compteurHred >= 4 && win === false) {
                gagnant.innerHTML = "Rouge gagne";
                win = true;
                return;
            } else if (compteurHyellow >= 4 && win === false) {
                gagnant.innerHTML = "Jaune gagne";
                win = true;
                return;
            }
        }
    });   
}
