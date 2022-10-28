document.addEventListener('DOMContentLoaded', async () => {
    let userLis = Array.from(document.querySelectorAll('li#user'))

    if (localStorage.getItem('token')) {
        let user = JSON.parse(atob(localStorage.getItem('token')))
        let userScore = [];
        let ranking = {};

        

        userScore = await fetch(`http://localhost:3000/score/getUserScore?uuid=${user.uuid}`, {
            method: 'GET',
            headers: { "Content-Type": 'application/json' },
        }).then((res) => res.json()).then((e) => e)

        ranking = await fetch('http://localhost:3000/score/topPlayers', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((e) => e.json()).then((i) => i)

        console.log(ranking);

    
        if (userScore.length > 0) {
            userLis.map((i) => {
                if (i.parentElement.parentElement.parentElement.className.includes('normal')) 
                    i.appendChild(document.createTextNode(`${0}. ${user.username} - ${userScore.find((obj) => obj.mode == "normal").points}`))
                if (i.parentElement.parentElement.parentElement.className.includes('speed'))
                    i.appendChild(document.createTextNode(`${0}. ${user.username} - ${userScore.find((obj) => obj.mode == "speed").points}`))
                if (i.parentElement.parentElement.parentElement.className.includes('hard'))
                    i.appendChild(document.createTextNode(`No has jugado aún`))
            })
        } else {
            userLis.map((i) => {
                i.appendChild(document.createTextNode("Aún No has Jugado ningúna partida"))
            })
        }

    } else {
        userLis.map((i) => i.style.display = 'none')   
    }

    document.getElementById('btn').addEventListener('click', () => {
        window.location = 'index.html'
    })
})