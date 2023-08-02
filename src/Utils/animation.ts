import { gsap } from 'gsap'

export function AddAnimation(id: string, elementsUnderneath: Array<any>, isFirst: boolean, next?: string){
    const timeLine = gsap.timeline()

    timeLine.to(`#${id}`, {
        duration: 0.5,
        height: '60px',
        marginTop: (isFirst ? '0px' : '40px'),
        opacity: 1,
        display: 'flex',
        overflow: 'hidden',
        ease: 'power2.out',
        onComplete: function() {
          console.log("Add animation completed!");
        }
    })

    if(next){
        timeLine.to(`#${next}`, {
            marginTop: '40px',
        })
    }
}

export function DeleteAnimation(id: string, next?: string){  
    const timeLine = gsap.timeline()

    timeLine.to(`#${id}`, {
        duration: 0.5,
        opacity: 0,
        marginTop: 0,
        height: 0,
        ease: 'power2.out',
        onComplete: () => {
            console.log("Delete animation completed!");
        }
    })
    if(next){
        timeLine.to(`#${next}`, {
            marginTop: '0px',
        })
    }
}

export function SelectAnimation(id: string, selected: boolean, indexToMove: number){
    const timeLine = gsap.timeline()
    
    selected 
    ? timeLine.from(`#${id}`, {
        duration: 0.5,
        y: ((indexToMove) * 100),
        opacity: 1,
        ease: "none",
        onComplete: function() {
          console.log("Select animation completed!");
        }
    })
    : timeLine.from(`#${id}`, {
        duration: 0.5,
        y: ((indexToMove) * -100),
        opacity: 1,
        ease: "none",
        onComplete: function() {
          console.log("Select animation completed!");
        }
    })
    
}

export function ListItemsMapAnimation(index: number, id: string){
    gsap
    .to(`#${id}`, {
        duration: 0.5,
        opacity: 1,
        height: '100%',
        marginTop: '40px',
        display: 'flex',
        ease: 'none',
        delay: (index) * 0.2,
    })
}