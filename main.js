const prompt = require('prompt-sync')()
let attacks = [
    {
        name: "Frappe Rapide",
        damages: 10,
        precision: 1
    },
    {
        name: "Soin Léger",
        damages: -15,
        precision: 1
    },
    {
        name: "Coup Puissant",
        damages: 20,
        precision: 1
    },
    {
        name: "Frappe Dévastatrice",
        damages: 30,
        precision: 1
    },
]
let player =
{
    name: "Froton Paquet",
    pvMax: 50,
    pv: 50,
    attack: attacks,
}
let ia =
{
    name: "Bourbon Sake",
    pvMax: 50,
    pv: 50,
    attack: attacks,
}
console.log("Bien le bonjour , si tu es ici c'est que tu a voulu voir un spectacle grandiose.accroches bien tes mirrettes tu n'est pas pret!");
let game = prompt("Voulez-vous affronter la terreur de l'arene ? Oui (O) Non (N): ").toUpperCase()
if (game == "O") {
    function randomize(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }
    function choice() {
        for (let i = 0; i < player.attack.length; i++) {
            console.log(i + " " + player.attack[i].name);
        }
        let choice = parseInt(prompt("choisi ton attaque: "))
        while (choice != 0 && choice != 1 && choice != 2 && choice != 3) {
            choice = parseInt(prompt("choisi ton attaque 0, 1, 2, 3: "))
        }
        return player.attack[choice];
    }
    function atk(atks, luncher, opponent) {
        if (randomize(0, atks.precision) === atks.precision) {
            console.log(`${luncher.name} lance ${atks.name} et inflige ${atks.damages} dégâts`);
            if (atks.damages < 0) {
                luncher.pv -= atks.damages
            } else {
                opponent.pv -= atks.damages
                console.log(`${opponent.name} subit ${atks.damages} dégâts, il lui reste ${opponent.pv}PV`);
            }
            console.log(`${opponent.name} a maintenant ${opponent.pv} PV`);
            console.log(`${luncher.name} a maintenant ${luncher.pv} PV`);
        } else {
            console.log("Raté avec brio!");
        }
    }
    function playia() {
        let iachoice = randomize(0, ia.attack.length - 1)
        return ia.attack[iachoice]
    }
    while (player.pv > 0 || ia.pv > 0) {
        let atkplay = choice()
        atk(atkplay, player, ia)
        let atkia = playia()
        atk(atkia, ia, player)
        if (player.pv <= 0) {
            console.log("Tu as pathetiquement echoué,tu pourras fuir et te cacher autant que tu le veux,la honte te poursuivras toute ta vie.");
            break
        } else if (ia.pv <= 0) {
            console.log("Bien joué, tu as vaincu le margoulin!");
            break
        }
    }
} else {
    console.log("Allez viens on est bien, il est super ce jeu en plus, tu rates un truc dingo la.");
}
