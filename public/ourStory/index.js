window.addEventListener("scroll", (e)=>{
    let offsetY = document.documentElement.scrollTop
        if(offsetY > 140){
            document.querySelector(".middleContainer-R").style.animation = " fade-in 2.5s ease-in-out forwards;"
            console.log(document.querySelector(".middleContainer-R"))
        }
})