document.addEventListener("DOMContentLoaded", function() {
    let balle=document.querySelector("#balle") //appelle la balle
    let paddle=document.querySelector('#PADDLE') //appelle le paddle
    let lose=document.querySelector('#lose') //appelle de l'ecran lose
    let fin = document.querySelector('#gg') 
    let restart=document.querySelector('#restart')
    let vitesseV = 1 // vitesse verticale de la balle
    let vitesseH = 0 //(Math.floor(Math.random() * 3) - 1) / 2 // vitesse horizontale de la balle
    let vitesseP = 0 //vitesse horizontal du paddle
    let animate = false
    let score = 0
    let Level = 0
    let running = true
    let h1 = document.getElementsByTagName('h1')[0];
    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    let reset = document.getElementById('reset');
    let mils = 0;
    let sec = 0;
    let min = 0;
    var t;
    let briqueBackground = 'radial-gradient(#f06d06,maroon)'
//fonction qui dit que si la div balle touche une sur nimporte quelle face brique , la vitesse sera inversé
//boucle si une brique est toucher , alors elle disparaitra
    function collisonB () {
        let inversionH = false      
        let inversionV = false     
        let mur = document.querySelectorAll('.brique')  // selectionne toute les briques
        mur.forEach(brique => {
            let briqueBottom = brique.style.top.slice(0,-1)*1+brique.style.height.slice(0,-2)*1  //
            let briqueLeft = brique.style.left.slice(0,-1)*1          //
            let briqueTop = brique.style.top.slice(0,-1)*1            //
            let briqueRight = brique.style.left.slice(0,-1)*1+brique.style.width.slice(0,-2)*1   // appelle le coté de chaque brique
            let balleTop = balle.style.top.slice(0,-1)*1              // 
            let balleLeft = balle.style.left.slice(0,-1)*1            //
            let balleBottom = balle.style.top.slice(0,-1)*1+6        // 
            let balleRight = balle.style.left.slice(0,-1)*1+3         //
            let scored = false
            
            if ((balleRight >= briqueLeft) && (balleRight <= briqueLeft+1) && (balleLeft <= briqueLeft) && (balleTop <= briqueBottom) && (balleBottom >= briqueTop)) { 
                if (!inversionH) {                             //
                    vitesseH = -vitesseH                       //dit où la balle va aller si elle touche la gauche de la brique
                }
                inversionH = true
                inversionV = true
                console.log(brique,'colisionH')
                brique.remove()
                if (!scored) {
                    score++
                }
                scored = true
            }
            if ((balleLeft <= briqueRight) && (balleLeft >= briqueRight-1) && (balleRight >= briqueRight) && (balleTop <= briqueBottom) && (balleBottom >= briqueTop)) { 
                if (!inversionH) {                             //
                    vitesseH = -vitesseH                       //dit où la balle va aller si elle touche la droite de la brique
                }
                inversionH = true
                inversionV = true
                console.log(brique,'colisionH')
                brique.remove()
                if (!scored) {
                    score++
                }
                scored = true
            }

            if ((balleTop <= briqueBottom) && (balleBottom >= briqueBottom) && (balleRight >= briqueLeft) && (balleLeft <= briqueRight)) {
                if (!inversionV) {                             //
                    vitesseV = -vitesseV                       // dit où la balle va aller si elle touche le dessus de la brique 
                }
                inversionV = true
                console.log(brique,'colisionV')
                brique.remove()
                if (!scored) {
                    score++
                }
                scored = true
            }
            if ((balleBottom >= briqueTop) && (balleTop <= briqueTop) && (balleRight >= briqueLeft) && (balleLeft <= briqueRight)) {
                if (!inversionV) {                             //
                    vitesseV = -vitesseV                       // dit où la balle va aller si elle touche le dessous de la brique
                }
                inversionV = true
                console.log(brique,'colisionV')
                brique.remove()
                if (!scored) {
                    score++
                }
                scored = true
            }
        });
    }
    function fabriqueM () {
        if (Level == 5) {
            vitesseV = 0
            vitesseH = 0
            animate = false
            running = false
            newtop = "90%"
            fin.style.display='flex'
            stop.onclick()
            }
        if (Level == 4) {
            vitesseV = 2.2
            vitesseH + 0.2
            for (let i = 0; i < 8; i++) {             //
                for (let j = 0; j < 1; j++) {         //créer une boucle pour la colonne de briques de 8
                    ajouterB(10+(i*11),21+(j*16))      //
                }
            }                                     
            for (let i = 0; i < 8; i++) {                //
                for (let a = 0; a < 1; a++) {            //créer une boucle pour la colonne de briques de 7
                    ajouterB(14+(i*11),1+(a*22),2,20)        //
                }
            }
            for (let i = 0; i < 7; i++) {             //
                for (let j = 0; j < 3; j++) {         //créer une boucle pour la colonne de briques de 8
                    ajouterB(10+(i*14),30+(j*12),2,4)      //
                }
            }
        }
        if (Level == 3) {
            vitesseV = 1.8
        for (let i = 0; i < 8; i++) {             //
            for (let j = 0; j < 3; j++) {         //créer une boucle pour la colonne de briques de 8
                ajouterB(10+(i*11),2+(j*16))      //
            }
        }                                     
        for (let i = 0; i < 7; i++) {                //
            for (let a = 0; a < 2; a++) {            //créer une boucle pour la colonne de briques de 7
                ajouterB(16+(i*11),10+(a*16))        //
            }
        }}
        if (Level == 1) {
            for (let i = 0; i < 4 ; i++) {          
                for (let j = 0; j < 2; j++) {         
                    ajouterB(16+(i*22),3+(j*30))
                }
            }
            for (let i = 0; i < 3; i++) {     
                for (let a = 0; a < 1; a++) {      
                    ajouterB(26+(i*23),18+(a*20))
                }
            }
        }
        if (Level == 2) {
            vitesseV = 1.4
            for (let i = 0; i < 4 ; i++) {          
                for (let j = 0; j < 2; j++) {         
                    ajouterB(16+(i*22),2+(j*20))
                }
            }
            for (let i = 0; i < 4; i++) {     
                for (let a = 0; a < 2; a++) {      
                    ajouterB(26+(i*15),12+(a*20))
                }
            }
        }
    }
    function scoring () {
        document.getElementById("p1").innerHTML = score;
    }
    function ajouterB (left,top,width = 10, height = 5) {
        // crée un nouvel élément div pour représenter la brique
        var brique = document.createElement("div");
        // on lui ajoute une classe
        brique.className = 'brique';
        // on définit son left
        brique.style.left = left +'%'
        // on définit son top
        brique.style.top = top +'%'
        brique.style.width = width+'vw'
        brique.style.height = height+'vh'
        brique.style.background = briqueBackground
        // ajoute le nouvel élément créé et son contenu dans le DOM
        document.body.appendChild(brique);
    }

    function gravite () {              //
        if (vitesseV<5) {              //augmente la vitesse de la balle 
            vitesseV = vitesseV+0.3    //
        }
    }
    function inertie () {
        vitesseP = vitesseP * 0.9      // ralentissement du paddle si aucun bouton n'est actionné
        vitesseH = vitesseH * 0.99     // ralentissement de la balle horizontalement
    }
    // déplacement de la balle
    function deplaceB () {
        collisonB()
        // calcul du déplacement vertical
        let oldtop = balle.style.top.slice(0,-1)*1
        let newtop
        // rebond de la balle sur le paddle
        let balleSousPaddle = balle.style.top.slice(0,-1)*1+6 >= paddle.style.top.slice(0,-1)*1
        let balleADroiteDeLaGaucheDuPaddle = balle.style.left.slice(0,-1)*1+4 > paddle.style.left.slice(0,-1)*1
        let balleAGaucheDeLaDroiteDuPaddle = balle.style.left.slice(0,-1)*1 < paddle.style.left.slice(0,-1)*1+10
        if (balleSousPaddle && balleADroiteDeLaGaucheDuPaddle && balleAGaucheDeLaDroiteDuPaddle) {
            vitesseV = -vitesseV
            vitesseH = vitesseH + (vitesseP)
        }
        if (oldtop + vitesseV >90) { // arrêt de la balle en bas de l'écran
            vitesseV = 0
            vitesseH = 0
            animate = false
            running = false
            newtop = "90%"
            lose.style.display = 'flex'
        } 
        else {
            newtop = oldtop+vitesseV+'%'
        }
        if (oldtop + vitesseV <4) {
            vitesseV = -vitesseV 
        }
        balle.style.top = newtop
        // calcul du déplacement horizontal
        let oldleft = balle.style.left.slice(0,-1)*1
        let newleft
        if (oldleft <= 10) {
            vitesseH=-vitesseH
        }
        if (oldleft+3 >= 98) {
            vitesseH=-vitesseH
        }
        newleft = oldleft+vitesseH+'%'
        balle.style.left = newleft
    }
    // déplacement du paddle
    function deplaceP () {
        let oldleft = paddle.style.left.slice(0,-1)*1
        let newleft
        if ((oldleft+vitesseP <= 10) || (oldleft+vitesseP+10 >= 99)) {
            newleft = oldleft
            vitesseP = 0
        } else {
            newleft=oldleft+vitesseP+'%'
        }
        paddle.style.left=newleft
    }
    function actualisation () {
        if(animate && running) { 
            scoring()              //
            //gravite()            // actualisation de la vitesse verticale de la balle
            inertie()              // actualisation des vitesses horizontales de la balle et du paddle
            deplaceP()             // les fonctions de deplacement de la balle et du paddle 
            deplaceB()             //
            levelUp()
            reconstruction()
            leveling ()
        }
    }
    let actualiser=setInterval(actualisation,35)        // l'actualisation de l'état du jeu
    function goleft () {                            
        if (running) {
            animate = true                              //
            vitesseP = vitesseP - 0.6                   // accélère le paddle vers la gauche
        }
    }
    function goright () {                               // 
        if (running) {
            animate = true                              // accélère le paddle vers la droite
            vitesseP = vitesseP + 0.6                   //
        }
    }
    function pause () {                                 // 
        if (animate && running) {
            animate = false                              // accélère le paddle vers la droite
        }
    }
    function restarted () {                              
            let mur = document.querySelectorAll('.brique')
            mur.forEach(brique => brique.remove())
            lose.style.display = 'none'
            fin.style.display = 'none'
            paddle.style.left = '45%'
            balle.style.left = '47%'
            balle.style.top = '20%'
            vitesseV = 1
            running = true
            Level=0
            score=0
            vitesseP=0
            start.onclick()
    }
    // on agit en fonction des touches sur lesquelles on appuie
    function logKey (e) { 
        console.log(e.code)                          
        if ( e.code == "KeyA") {                    //
            goleft()                                // la touche Q permet d'aller a gauche
            
        }
        if ( e.code == "ArrowLeft") {                    //
            goleft()                                // la touche Q permet d'aller a gauche
            
        }
        if (e.code == "KeyD") {                     //
            goright()                               // la touche D permet d'aller a droite
        }
        if (e.code == "ArrowRight") {                     //
            goright()                               // la touche D permet d'aller a droite
        }
        if (e.code == "KeyP") {                     //
            pause()                               // la touche P permet de mettre pause
        }
        if (e.code == "KeyR") {                     //
            restarted()                               // la touche R permet de restart
            reset.onclick()
        }
        if (e.code == "KeyG") {                     //
            restarted()                               // la touche R permet de restart
            reset.onclick()
            
        }
        if (e.code =="Enter") {
            document.body.style.backgroundColor='rgb(6,7,7)'
            let h1s = document.querySelectorAll('h1')
            h1s.forEach(elem => elem.style.color = 'white')
            paddle.style.backgroundColor = 'white'
            balle.style.backgroundColor = 'white'
            let mur = document.querySelectorAll('.brique') 
            mur.forEach(brique => {
                brique.style.background = 'white'
            })
            briqueBackground = 'white'
            document.getElementById('egg').style.display = 'block';
            lose.style.backgroundColor = 'black'
            fin.style.backgroundColor = 'black'
        }
    }
    function reconstruction () {
        let mur = document.querySelectorAll('.brique')
        if (!mur.length && balle.style.top.slice(0,-1)*1 > 40) {
            fabriqueM()
            //Level++
        }
    }
    function levelUp () {
        let mur = document.querySelectorAll('.brique')
        let Leveled = false
        if (!mur.length && balle.style.top.slice(0,-1)*1 > 40) {
            if (!Leveled) {
                Level++
            }
                Leveled = true 
        }
    }
    
    function tick(){
        if (animate) {
            mils++;
            if (mils >= 100) {
                mils = 0;
                sec++;
                if (sec >= 60) {
                    sec = 0;
                    min++;
                }
            }
        }
    }
    function add() {
        tick();
        h1.textContent = (min > 9 ? min : "0" + min) 
                    + ":" + (sec > 9 ? sec : "0" + sec)
                    + ":" + (mils > 9 ? mils : "0" + mils);
        timer();
    }
    function timer() {
        t = setTimeout(add, 10);
    }

    timer();
    start.onclick = timer;
    stop.onclick = function() {
        clearTimeout(t);
    }
    reset.onclick = function() {
        clearInterval(t)
        h1.textContent = "00:00:00";
        mils = 0; sec = 0; min = 0;
    }
    function leveling () {
        document.getElementById("p2").innerHTML = Level;
    }
    const buttons = document.querySelectorAll('button');  //selectionne les boutons 
    buttons[0].addEventListener('click', goleft);         //fait en sorte que le bouton nous fasse aller a gauche
    buttons[1].addEventListener('click', goright);        //fait en sorte que le bouton nous fasse aller a droite
    buttons[2].addEventListener('click', restarted);
    buttons[3].addEventListener('click', restarted);
    // start.addEventListener('click', start);
    // stop.addEventListener('click', stop);
    // reset.addEventListener('click', reset);
    document.addEventListener('keydown', logKey);         //écoute les évènement d'appui de touches du clavier
});
