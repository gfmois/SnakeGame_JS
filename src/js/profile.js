document.addEventListener('DOMContentLoaded', async () => {
    if (localStorage.getItem('token')) {
        let token = JSON.parse(atob(localStorage.getItem('token')))
        let username = document.getElementById('username')
        let mode_ranking = document.getElementById('mode-ranking')
        let user_ranking = [];

        let ranking_div = Array.from(mode_ranking.childNodes)
            .filter((e) => e.nodeName != '#text' && e.tagName != "H3")
            .sort((a, b) => a > b)

        user_ranking = await fetch(`http://localhost:3000/score/getUserScore?uuid=${token.uuid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then((e) => e)

        username.appendChild(document.createTextNode(`Username: ${token.username}`))

        user_ranking.sort((a, b) => a < b).map((e, i) => {
            ranking_div.map((k) => {
                if (k.className.includes(e.mode)) {
                    k.appendChild(document.createTextNode(`${e.points} - ${e.mode}`))
                }
            })
        })

    } else window.location = 'index.html'

    document.getElementById('backbtn').addEventListener('click', (e) => {
        e.preventDefault()
        window.location = 'index.html'
    })
})