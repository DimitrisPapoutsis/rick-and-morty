const heading = document.getElementById('heading');
const characters = document.getElementById('characters');
const singleCharacter = document.getElementById('single-character');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

fetch(`https://rickandmortyapi.com/api/character/`)
    .then(res => {
        if (!res.ok) {
            console.log("Character API Error")
            return         
        } 
        else 
        {
            console.log("Fetched Character API Data")
            json = res.json()
            .then(data => {
                console.log(data);
                var classNam = "";
                characters.innerHTML = data.results.map(item => `
                        <div class = 'character card_content'>
                            <img src = '${item.image}' /> 
                            <div class = 'character-info' data-characterID = '${item.id}'>
                                    <h3>${item.name}</h3>
                            </div>
                            <div>
                                <h5 class='card_title'>${item.name}</h5>              
                                <div class="sticky">                 
                                    <div class='circle ${classNam = item.status}'></div>
                                    <h4 class='card_text'>${item.status}</h4>                      
                                </div>     
                            </div>   
                        </div>       
            `).join('');
            })
        }
    });

// Get Character by ID
const getCharacterById = character => {
    fetch(`https://rickandmortyapi.com/api/character/${character}`)
      
    .then(res => {
        if (!res.ok) {
            console.log("Character ID Error")
            return         
        } 
        else 
        {
            console.log("Fetched Character ID Data")
            res.json()
            .then(data => {
                addCharacterToDOM(data);
            });
        }
    });
} 

// Load character to Modal
const addCharacterToDOM = character => {
    var classNam2 = "";
    singleCharacter.innerHTML = `
        <div class = 'modal' id = 'modal'>
            <div class = 'modal-container'>        
                <img class="modal_img" src = '${character.image}' />
                <div class = 'modal-container-info'>    
                                       
                    <div class='modal_text'>     
                        <h4>${character.name}</h4>            
                        <h5>${character.status} - ${character.species}</h5>                      
                    </div>     
                    
                    <div class='modal_text'> 
                        <p class='card_desc_modal'>Gender: ${character.gender}</p>
                        <p class='card_desc_modal'>Location: ${character.location.name}</p>
                        <p class='card_desc_modal'>Number of episodes appeared: ${character.episode.length}</p>  
                    </div>  
                </div>
            </div>
        </div>
    `;
}

// Open Modal
characters.addEventListener('click', e => {

    //CHROME + FIREFOX support
    const characterInfo =   e.composedPath().find(item => {
        if (item.classList) {
            return item.classList.contains('character-info');
        }
    });

    if (characterInfo) {
        const characterId = characterInfo.getAttribute('data-characterID');
        getCharacterById(characterId);
    }

});

// Close Modal
window.addEventListener('click', e => {
    const modal = document.getElementById('modal');
    if (e.target === modal && modal !== null) { //always check if null to avoid error
        modal.style.display = 'none';
    }
});

// Next clicking
let counter = 1;
next.addEventListener('click', () => {

    if (counter == 34)
    {
        document.getElementById('next').disabled = true;
    }
    else
    {
        document.getElementById("prev").disabled = false;
        fetch(`https://rickandmortyapi.com/api/character/?page=${++counter}`)       
        .then(res => {
            if (!res.ok) {
                console.log("Character API Error")
                return         
            } 
            else 
            {
                console.log("Fetched Character API Data")
                res.json()
                .then(data => {
                    console.log(data);
                    var classNam = "";
                    characters.innerHTML = data.results.map(item => `
                            <div class = 'character card_content'>
                                <img src = '${item.image}' /> 
                                <div class = 'character-info' data-characterID = '${item.id}'>
                                        <h3>${item.name}</h3>
                                </div>
                                <div>
                                    <h5 class='card_title'>${item.name}</h5>              
                                    <div class="sticky">                 
                                        <div class='circle ${classNam = item.status}'></div>
                                        <h4 class='card_text'>${item.status}</h4>                      
                                    </div>     
                                </div>   
                            </div>                 
                `).join('');
                })
            }
        });
    }    
});

// Prev clicking
prev.addEventListener('click', () => {

    if (counter == 1)
    {
        document.getElementById('prev').disabled = true;
    }
    else
    {
        document.getElementById("next").disabled = false;
        fetch(`https://rickandmortyapi.com/api/character/?page=${--counter}`)
        .then(res => {
            if (!res.ok) {
                console.log("Character API Error")
                return         
            } 
            else 
            {
                console.log("Fetched Character API Data")
                res.json()
                .then(data => {
                    console.log(data);
                    var classNam = "";
                    characters.innerHTML = data.results.map(item => `
                            <div class = 'character card_content'>
                                <img src = '${item.image}' /> 
                                <div class = 'character-info' data-characterID = '${item.id}'>
                                        <h3>${item.name}</h3>
                                </div>
                                <div>
                                    <h5 class='card_title'>${item.name}</h5>              
                                    <div class="sticky">                 
                                        <div class='circle ${classNam = item.status}'></div>
                                        <h4 class='card_text'>${item.status}</h4>                      
                                    </div>     
                                </div>   
                            </div>          
                `).join('');
                })
            }
        });
    }    
});





