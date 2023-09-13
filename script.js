class ButtonSpawner{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        let btn = document.createElement("button");
        let styleContent = `position:absolute;width:${this.w}px;height:${this.h}px;transform:translate(${this.x}px, ${this.y}px);background-color: rgb(0,200,0);border: none;color:white;`
        btn.setAttribute("style", styleContent);
        btn.setAttribute("onclick", "clickedBtn(this)");

        btn.textContent = "Click Me";
        document.querySelector(".main").appendChild(btn);
        // console.log(this.x)
        // console.log(this.y)
        gameOver(btn);
        animation(btn);
    }
}



function dimensionRandomizer(dim){
    let width = Math.floor(Math.random() * (80 - 50)) + 50;
    let height = Math.floor(Math.random() * (80 - 50)) + 50;
    if(dim == "x" || dim == "w"){
        // console.log(width)
        return width;
    }else if(dim == "y" || dim == "h"){
        return height;
    }
}

function locationRandomizer(w, h, dim){
    let canvas = document.querySelector(".main");
    let canvasWidth = canvas.offsetWidth;
    let canvasHeight = canvas.offsetHeight;

    let x = Math.random() * (parseInt(canvasWidth) - parseInt(w));
    let y = Math.random() * (parseInt(canvasHeight) - parseInt(h));
    // console.log(canvasWidth)
    if(dim == "x" || dim == "w"){
        return x;
    }else if(dim == "y" || dim == "h"){
        return y;
    }
}

function assembler(){
    let btnWidth = dimensionRandomizer("w");
    let btnHeight = dimensionRandomizer("h");
    let btnX = locationRandomizer(btnWidth, btnHeight, "x");
    let btnY = locationRandomizer(btnWidth, btnHeight, "y");
    let btn = new ButtonSpawner(btnX, btnY, btnWidth, btnHeight);
}
let score = 0;
function clickedBtn(e){
    let main = document.querySelector(".main");
    main.removeChild(main.firstChild)
    assembler();
    score++;
}
function gameOver(btn){
    setTimeout(()=>{
        if(document.querySelector(".main").contains(btn)){
            console.log("Game Over");
            let main = document.querySelector(".main");
            main.removeChild(main.firstChild)
            alert(document.querySelector(".name").value+" you got: "+score)
            document.querySelector(".playbutton").style.display = "block";
            document.querySelector(".playbutton").textContent = "Retry";
            score = 0;
        }
    },1000)
}

function animation(btn){
    let r = 0;
    let g = 200;
    setInterval(()=>{
        btn.style.backgroundColor = `rgb(${r++}, ${g--}, 0)`;
    },1)
}
function startGame(e){
    let name = document.querySelector(".name").value;
    if(name != ""){
        assembler();
        document.querySelector(".name").style.display = "none";
        e.style.display = "none";
    }else{
        alert("Please enter a name");
    }
}