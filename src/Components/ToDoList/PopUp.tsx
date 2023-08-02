import React, { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'

import Box from '../Basic/Box'
import Text from '../Basic/Text';
import Button from '../Basic/Button';

interface PopUpProps {
    showHandler: any;
    addToDo: any;
    responsive: boolean;
}
interface State {
    input: string;
    placeHolder: string;
}

class PopUp extends PureComponent<PopUpProps, State> {
    /* Pop Up component, handles the pop-up logic */
    constructor(props: PopUpProps) {
        super(props)
        this.escEvent = this.escEvent.bind(this);

        this.state = {
            input: '',
            placeHolder: '',
        }
    }

    componentDidMount(): void {
        //adding exit event
        document.addEventListener("keydown", this.escEvent, false);
    }

    componentWillUnmount() {
        //removing exit event
        document.removeEventListener("keydown", this.escEvent, false);
    }

    escEvent = (event: any) => {
        /* Event for exiting the PopUp on 'ESC' key pressed */
        if (event.key === "Escape") {
            this.props.showHandler(false)
        }
    }

    saveTodo = (todo: string) => {
        /* Handles the saving of a new todo */
        if (todo === '' || todo === undefined) {
            this.setState({ placeHolder: 'Scrivi qui...' })
        } else {
            //using props to create the todo element
            this.props.addToDo(todo)

            //exiting PopUp window
            this.props.showHandler(false)
        }
    }

    render(): ReactNode {
        const { input, placeHolder } = this.state
        return (
            <>
                {this.props.responsive ? (
                    /* MOBILE */
                    <Bg center onClick={(event: React.MouseEvent) => {
                        event.preventDefault()

                        if (event.target === event.currentTarget) {
                            this.props.showHandler(false)
                        }
                    }}>
                        <PopUpWindowMobile center>
                            <TextAreaWrapperMobile center>
                                <TextAreaMobile
                                    name="todoInput"
                                    className='text-regular'
                                    placeholder={placeHolder}
                                    maxLength={90}
                                    autoFocus
                                    onChange={(event) => {
                                        this.setState({ input: event.target.value })
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

                        if (event.target === event.currentTarget) {
                            this.props.showHandler(false)
                        }
                    }}>
                        <PopUpWindowDesktop center flexDir="column">
                            <TextAreaWrapperDesktop center>
                                <TextAreaDesktop
                                    name="todo"
                                    className='text-regular'
                                    placeholder={placeHolder}
                                    maxLength={90}
                                    autoFocus
                                    onChange={(event) => {
                                        this.setState({ input: event.target.value })
                                    }} />
                            </TextAreaWrapperDesktop>
                            <SaveBtn action={this.saveTodo} actionValue={input}>
                                <Text className='text-medium'>Salva</Text>
                            </SaveBtn>
                        </PopUpWindowDesktop>
                    </Bg>
                )}
            </>
        )
    }
}

export default PopUp


// Common styles ----------------------------------------

const Bg = styled(Box)`
    background-color: var(--see-through-color);
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: default;
    z-index: 10;
`

const SaveBtn = styled(Button)`
    padding: 8px 32px;
`



// Desktop styles ---------------------------------------

const PopUpWindowDesktop = styled(Box)`
    background-color: var(--surface-color);
    position: absolute;
    padding: 40px;
    border-radius: 32px;
    gap: 24px;
`

const TextAreaWrapperDesktop = styled(Box)`
    width: 100%;
    height: 60%;
`

const TextAreaDesktop = styled.textarea`
    background-color: transparent;
    width: 429px;
    height: 155px;
    border: none;
    resize: none;
    
    :focus{
        outline: none;
    }
`



// Mobile styles ---------------------------------------

const PopUpWindowMobile = styled(Box)`
    background-color: var(--surface-color);
    flex-direction: column;
    min-height: 20vh;
    min-width: 40vw;
    border-radius: 32px;
    padding: 50px 0px 10px 0px;
`

const TextAreaMobile = styled.textarea`
    background-color: transparent;
    width: 250px;
    height: 150px;
    border: none;
    resize: none;
    
    :focus{
        outline: none;
    }
`

const TextAreaWrapperMobile = styled(Box)`
    width: 70vw;
    height: 10vh;
`