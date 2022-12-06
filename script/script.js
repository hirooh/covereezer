document.querySelector('#enviar').addEventListener('click', consulta);

async function consulta(){
    /* API config */
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '428ed3a953msh02d5768a4e04aecp18be4ejsn2ad602cc0f35',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    /* coleta pesquisa do input */
    let pesquisa = document.querySelector("#pesquisa").value;
    let resposta = await fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q='+pesquisa, options)
    .then(response => response.json())
    .catch(err => console.error(err));
    console.log(resposta);

    /* coleta imagem da api */
    let imagemData = await fetch(resposta.data[0].album.cover_xl);
    let imagem = await imagemData.blob();
    const imageObjectURL = URL.createObjectURL(imagem);
    let img = document.createElement('img');
    img.setAttribute("class", "img");
    img.setAttribute("alt", "album artwork");
    img.src = imageObjectURL;
    resultados.appendChild(img);

    /* coleta dados do lançamento */
    let info = resposta.data[0].artist.name;
    info = info + " - " +resposta.data[0].album.title;
    document.querySelector(".infoTexto").innerHTML = info;

    /* impede a repetição da mesma imagem */
    while(document.querySelectorAll('.img').length !== 1){
        document.querySelector(".img").remove();
    }
}