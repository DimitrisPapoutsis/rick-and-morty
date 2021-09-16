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
                        <div class = 'character'>
                            <img  src = '${item.image}' /> 

                            <div class = 'character-info' data-characterID = '${item.id}'>
                                    <span class='char-name'>${item.name}</span>                  
                            </div>
                            <div class='character-status'>                       
                                <div class='circle ${classNam = item.status}'></div>
                                <span class='char-desc'>${item.status} - ${item.species}</span>                                                        
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
    var classNam3 = "";
    if (character.gender == "Male")
    {
        classNam3 = "fa-mars";
    }
    else if (character.gender == "Female")
    {
        classNam3 = "fa-venus";
    }
    
    singleCharacter.innerHTML = `
        <div class = 'modal' id = 'modal'>
            <div class = 'modal-container'>        
                <img class="modal_img" src = '${character.image}' />
                <div class = 'modal-container-info'>    
                                       
                    <div class='modal_text'>     
                        <span class="modal_title" >${character.name}</span>                                                     
                    </div>    
                    <div class='modal_text'>     
                        <div class='circle_modal_text ${classNam2 = character.status}'></div>
                        <span class="modal_status">${character.status} - ${character.species}</h5>                      
                    </div>  
                    
                    <div class='modal_rectangle'> 
                        <div class='modal_info'> 
                            <p class='modal_desc'>Gender: <span class='fa ${classNam3}'></span> ${character.gender}</p>
                            <p class='modal_desc'>Last Seen Location: ${character.location.name}</p>
                            <p class='modal_desc'>Number of episodes appeared: ${character.episode.length}</p>  
                        </div>  
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

// Next click
let counter = 1;
next.addEventListener('click', () => {

    if (counter == 33) //disable btn when counter reaches last page
    {
        document.getElementById('next').disabled = true;
        var element = document.getElementById("next");
        document.getElementById("next").classList.remove('cta-enable');
        element.classList.add("cta-disable");
    }
        document.getElementById("prev").disabled = false;
        var element = document.getElementById("prev");
        document.getElementById("prev").classList.remove('cta-disable');
        element.classList.add("cta-enable");

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
                            <div class = 'character'>
                            <img  src = '${item.image}' /> 

                            <div class = 'character-info' data-characterID = '${item.id}'>
                                    <span class='char-name'>${item.name}</span>         
                            </div>
                            <div class='character-status'>                       
                                <div class='circle ${classNam = item.status}'></div>
                                <span class='char-desc'>${item.status}</span>                                                        
                            </div>   
                        </div>               
                `).join('');
                })
            }
        });    
});

// Prev click
prev.addEventListener('click', () => {
    
    if (counter == 2)
    {
        document.getElementById('prev').disabled = true;
        var element = document.getElementById("prev");
        document.getElementById("prev").classList.remove('cta-enable');
        element.classList.add("cta-disable");
    }
        document.getElementById("next").disabled = false;
        var element = document.getElementById("next");
        document.getElementById("next").classList.remove('cta-disable');
        element.classList.add("cta-enable");

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
                            <div class = 'character'>
                            <img  src = '${item.image}' /> 

                            <div class = 'character-info' data-characterID = '${item.id}'>
                                    <span class='char-name'>${item.name}</span>                           
                            </div>
                            <div class='character-status'>                       
                                <div class='circle ${classNam = item.status}'></div>
                                <span class='char-desc'>${item.status}</span>                                                        
                            </div>   
                        </div>             
                `).join('');
                })
            }
        });       
});





