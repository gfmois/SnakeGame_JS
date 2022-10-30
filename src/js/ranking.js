document.addEventListener('DOMContentLoaded', async () => {
    let userLis = Array.from(document.querySelectorAll('li#user'))

    if (localStorage.getItem('token')) {
        let user = JSON.parse(atob(localStorage.getItem('token')))
        let ranking = {};

        userScore = await fetch(`http://localhost:3000/score/getUserScore?uuid=${user.uuid}`, {
            method: 'GET',
            headers: { "Content-Type": 'application/json' },
        }).then((res) => res.json()).then((e) => e)

        ranking = await fetch('http://localhost:3000/score/topPlayers', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((e) => e.json()).then((i) => i)

        Object.keys(ranking).map((k) => {
            if (ranking[k].length < 3) {
                while (ranking[k].length < 3) {
                    ranking[k].push(
                        {
                            _id: '-1',
                            user: "Nadie todavia",
                            mode: k,
                            points: "0",
                            position: ranking[k].length
                        }
                    )
                }
            }

                ranking[k].map((_, i) => {
                    Array.from(document.querySelectorAll('div.ranking-positions')).map((e) => {
                        if (e.parentElement.className.includes(k)) {
                            let li = document.createElement('li')
                            let trophy = ['🥇', '🥈', '🥉']

                            li.appendChild(document.createTextNode(`${trophy[ranking[k][i].position]}. ${ranking[k][i].user} - ${ranking[k][i].points}`))

                            if (ranking[k][i].position == 0) e.childNodes[1].insertBefore(li, e.childNodes[1].firstChild)
                            if (ranking[k][i].position != 0) e.childNodes[1].insertBefore(li, e.childNodes[1].childNodes[i])

                            // if (ranking[k].length < 3) {
                            //     let liNothing = document.createElement('li')


                            //     if (count == 0) {
                            //         let lastItemRanking = Array.from(e.childNodes[1].childNodes).map((e) => e.tagName == "LI" ? e : null).filter((m) => m != null).filter((r) => r.id != "user").at(-1)

                            //         liNothing.appendChild(document.createTextNode(`${trophy[lastItemRanking]}. Nadie Todavía - 0`))
                            //         lastItemRanking.parentElement.insertBefore(liNothing, lastItemRanking.nextSibling)
                            //         // e.childNodes[1].insertBefore(liNothing, e.childNodes[1].childNodes[Array.from(e.childNodes[1].childNodes).findIndex((e) => e == e)])
                            //         count++
                            //     }
                            // }
                        }
                    })
                })
        })


        //! USER RANKING TODO
        // if (userScore.length > 0) {
        //     userLis.map((i) => {
        //         if (i.parentElement.parentElement.parentElement.className.includes('normal') && ranking.normal.length > 0)
        //             i.insertBefore(document.createTextNode(`${ranking.normal[0].position + 1}. ${user.username} - ${userScore.find((obj) => obj.mode == "normal").points}`), i.firstChild)
        //         if (i.parentElement.parentElement.parentElement.className.includes('speed') && ranking.speed.length > 0)
        //             i.appendChild(document.createTextNode(`${ranking.speed[0].position + 1}. ${user.username} - ${userScore.find((obj) => obj.mode == "speed").points}`))
        //         if (i.parentElement.parentElement.parentElement.className.includes('hard') && ranking.hard.length > 0)
        //             i.appendChild(document.createTextNode((`${ranking.hard[0].position + 1}. ${user.username} - ${userScore.find((obj) => obj.mode == "speed").points}`)))
        //     })
        // } else {
        //     userLis.map((i) => {
        //         i.appendChild(document.createTextNode("Aún No has Jugado ningúna partida"))
        //     })
        // }

    } else {
        userLis.map((i) => i.style.display = 'none')
    }

    document.getElementById('btn').addEventListener('click', () => {
        window.location = 'index.html'
    })
})