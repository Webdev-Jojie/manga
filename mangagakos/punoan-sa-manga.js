
document.getElementById('generate');

generate.addEventListener("click", async function () {
    let offset = document.getElementById("offset").value;
    let limit = document.getElementById("limit").value;

    try {
        let response = await fetch(`https://api.mangadex.org/cover?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        let details = document.getElementById('mangalist');
        details.innerHTML = '';

        for (const info of data.data) {
            try {
                let mangaResponse = await fetch(`https://api.mangadex.org/manga/${info.relationships[0].id}?includes%5B%5D=manga`);
                if (!mangaResponse.ok) {
                    throw new Error(`HTTP error! Status: ${mangaResponse.status}`);
                }

                let mangaData = await mangaResponse.json();
                let mangaDescription = mangaData.data.attributes.description.en;
                let mangaTitle = mangaData.data.attributes.title.en;

                let mangaContent = document.createElement('div');
                mangaContent.className = "mangaContent";
                details.appendChild(mangaContent);

                let imgcon = document.createElement('div');
                imgcon.className = "imgcon";
                mangaContent.appendChild(imgcon);

                let contain = document.createElement('div');
                contain.className = "description"; 
                mangaContent.appendChild(contain);
                
                let mangaTitled = document.createElement('div');
                mangaTitled.className = "title";
                mangaTitled.textContent = mangaTitle;
                contain.appendChild(mangaTitled);

                let coverImg = document.createElement('img');
                let mangaFilename = info.attributes.fileName;
                let mangaID = info.relationships[0].id;
                coverImg.src = `https://uploads.mangadex.org/covers/${mangaID}/${mangaFilename}`;
                imgcon.appendChild(coverImg);

                let descript = document.createElement('p');
                descript.textContent = mangaDescription;
                contain.appendChild(descript);

            } catch (error) {
                console.error("Error fetching manga data:", error);
            }
        }
    } catch (error) {
        console.error("Error fetching cover data:", error);
    }
});

let modal = 

description.addEventListener('click', function() {

    // modal.style.display = "flex";

    console.log("Click!");

})