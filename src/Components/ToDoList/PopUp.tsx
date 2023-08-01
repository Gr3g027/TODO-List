import React, { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'

import Box from '../Basic/Box'
import Text from '../Basic/Text';
import Button from '../Basic/Button';
import Screen from '../System/Screen';

interface PopUpProps {
    showHandler: any;
    addToDo: any;
}
interface State {
    input: string;
    placeHolder: string;
    responsive: boolean;
}

class PopUp extends PureComponent<PopUpProps, State> {
    /* Pop Up component, handles the pop-up logic */
    constructor(props: PopUpProps) {
        super(props)
        this.escEvent = this.escEvent.bind(this);

        this.state = {
            input: '',
            placeHolder: '',
            responsive: false,
        }
    }

    componentDidMount(): void {
        //adding exit event
        document.addEventListener("keydown", this.escEvent, false);
    }

    componentWillUnmount(){
        //removing exit event
        document.removeEventListener("keydown", this.escEvent, false);
    }

    escEvent = (event: any) => {
        /* Event for exiting the PopUp on 'ESC' key pressed */
        if (event.key === "Escape"){
            this.props.showHandler(false)
        }
    }

    saveTodo = (todo: string) => {
        /* Handles the saving of a new todo */
        if(todo === '' || todo === undefined){
            this.setState({placeHolder: 'Scrivi qui...'})
        } else {
            //using props to create the todo element
            this.props.addToDo(todo)

            //exiting PopUp window
            this.props.showHandler(false)
        }
    }

    render(): ReactNode {
        const { input, placeHolder, responsive } = this.state        
        return (
            <>
            {responsive ? (
                /* MOBILE */
                <Bg center bgColor='rgba(0, 0, 0, 60%)' onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    
                    if (event.target === event.currentTarget){
                        this.props.showHandler(false)
                    }
                }}>
                    <PopUpWindowMobile center>
                        <TextAreaWrapperMobile center>
                            <TextAreaMobile name="todo" className='text-regular' placeholder={placeHolder} maxLength={90} autoFocus                         
                            onChange={(event) => {
                                this.setState({input: event.target.value})
                            }} />
                        </TextAreaWrapperMobile>
                        <SaveBtn action={this.saveTodo} actionValue={input}>
                            <Text className='text-medium'>Salva</Text>
                        </SaveBtn>
                    </PopUpWindowMobile>
                </Bg>
            ) : (
                /* DESKTOP */
                <Bg center bgColor='rgba(0, 0, 0, 60%)' onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    
                    if (event.target === event.currentTarget){
                        this.props.showHandler(false)
                    }
                }}>
                    <PopUpWindow center flexDir="column" bgColor='#2b2c2e'>
                        <TextAreaWrapper center>
                            <TextArea name="todo" className='text-regular' placeholder={placeHolder} maxLength={90} autoFocus                         
                            onChange={(event) => {
                                this.setState({input: event.target.value})
                            }} />
                        </TextAreaWrapper>
                        <SaveBtn action={this.saveTodo} actionValue={input}>
                            <Text className='text-medium'>Salva</Text>
                        </SaveBtn>
                    </PopUpWindow>
                </Bg>
            )}
            </>
        )
    }
}

export default PopUp

const Bg = styled(Box)`
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: default;
    z-index: 10;
`

const PopUpWindow = styled(Box)`
    position: absolute;
    padding: 40px;
    border-radius: 32px;
    gap: 24px;
`

const TextAreaWrapper = styled(Box)`
    width: 100%;
    height: 60%;
`

const TextArea = styled.textarea`
    background-color: transparent;
    width: 429px;
    height: 155px;
    border: none;
    resize: none;
    
    :focus{
        outline: none;
    }
`

const SaveBtn = styled(Button)`
    padding: 8px 32px;
`

const TextAreaWrapperMobile = styled(Box)`
    width: 70vw;
    height: 10vh;
`

const TextAreaMobile = styled.textarea`
    background-color: transparent;
    /* width: 270px;
    height: 150px; */
    border: none;
    resize: none;
    
    :focus{
        outline: none;
    }
`

const PopUpWindowMobile = styled(Box)`
    background-color: #2b2c2e;
    flex-direction: column;
    border-radius: 32px;
`