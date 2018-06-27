function getSteamData() {
    idjogador = document.getElementById("txtJogador").value;
    idjogo = document.getElementById("txtJogo").value;
    if(idjogador==="")
    {
        window.idjogador = "Não preenchido!"
    }
    else
    {
        document.getElementById("block_player").style.display = "block"
    }

    if(idjogo==="")
    {
        window.idjogo = "Não preenchido!"
    }
    else
    {
        document.getElementById("block_game").style.display = "block"
    }

    alert(idjogador+" - "+idjogo)
}