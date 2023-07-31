import gsap from 'gsap'

export function AddAnimation(id: string, ){
    gsap.to(`#${id}`, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: "power1.out",
        onComplete: function() {
          console.log("Add animation completed!");
        }
    })
}

export function SelectAnimation(id: string, ){
    gsap.from(`#${id}`, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        onComplete: function() {
          console.log("Select animation completed!");
        }
    })
}

export function DeleteAnimation(id: string){
    gsap.to(`#${id}`, {
        duration: 0.5,
        y: '-100%',
        opacity: 0,
        ease: 'none',
        onComplete: function() {
          console.log("Delete animation completed!");
        }
    })
}

export function ListItemsMapAnimation(index: number, id: string){
    gsap.to(`#${id}`, {
        duration: 0.5, 
        y: 0,
        opacity: 1,
        ease: 'none',
        delay: (index) * 0.15,

        onComplete: function() {
            console.log("Item MAP refresh animation completed!");
        }
    })
}