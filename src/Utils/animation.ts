import { gsap } from 'gsap'

export function setDefaultValues(list: Array<any>){
    const timeLine = gsap.timeline()

    list.map((element, index) => {
        return(
            timeLine.set( `#${element.id}`,{
                height: '60px',
                marginTop: (index === 0 ? '0px' : '40px'),
                opacity: 1,
                display: 'flex',
                overflow: 'hidden',
                ease: 'power2.out',
            })
        )
    })
    
}

export function AddAnimation(id: string, isFirst: boolean, next?: string){
    const timeLine = gsap.timeline()

    timeLine.to(`#${id}`, {
        duration: 0.5,
        height: '60px',
        marginTop: (isFirst ? '0px' : '40px'),
        opacity: 1,
        display: 'flex',
        overflow: 'hidden',
        ease: 'power2.out',
    })

    if(next){
        timeLine.to(`#${next}`, {
            marginTop: '40px',
        })
    }
}

export function DeleteAnimation(id: string, next?: string){  
    const timeLine = gsap.timeline()

    timeLine.fromTo(`#${id}`, {
        opacity: 1,
        marginTop: '40px',
        height: '60px',
    }, {
        duration: 0.3,
        opacity: 0,
        marginTop: '0px',
        height: '0px',
        ease: 'power2.out',
    })
    if(next){
        timeLine.to(`#${next}`, {
            marginTop: '0px',
        })
    }
}

/* Tried to do select animation */
export function SelectAnimation(id: string, newFirstId: string){  
    const timeLine = gsap.timeline()

    timeLine.fromTo(`#${id}`, {
        opacity: 0,
        height: '0px',
        overflow: 'hidden',
        display: 'none',
    }, {
        duration: 0.5,
        opacity: 1,
        height: '60px',
        marginTop: '40px',
        overflow: 'hidden',
        display: 'flex',
    })

    if (newFirstId) {
        timeLine.to(`#${newFirstId}`, {
            marginTop: '0px'
        })
    }
}