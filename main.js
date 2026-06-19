const words = document.querySelectorAll(".intro-word");
const intro = document.getElementById("intro");
const content = document.getElementById("content");

async function introSequence(){

    await delay(700);

    for(const word of words){

        word.animate(
            [
                {opacity:0},
                {opacity:1}
            ],
            {
                duration:900,
                fill:"forwards"
            }
        );

        await delay(1200);
    }

    await delay(800);

    intro.style.transition = "opacity 1.8s ease";
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.remove();
        content.style.opacity = "1";
    },1800);
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

introSequence();

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("visible");
        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".fade-in").forEach(section=>{
    observer.observe(section);
});