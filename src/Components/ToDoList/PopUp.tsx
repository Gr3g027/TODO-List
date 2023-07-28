import React, { PureComponent, ReactNode } from 'react'
import Box from '../Basic/Box'
import styled from '@emotion/styled'
import Button from '../Basic/Button';
import { getJson, saveJson } from '../../Utils/utils';

interface PopUpProps {
    showHandler: any;
    addToDo: any;
}
interface State {
    input: string;
    placeHolder: string;
    isDragging: boolean;
}

class PopUp extends PureComponent<PopUpProps, State> {
    constructor(props: PopUpProps) {
        super(props)
        this.escEvent = this.escEvent.bind(this);

        this.state = {
            input: '',
            placeHolder: '',
            isDragging: false,
        }
    }

    componentDidMount(): void {
        document.addEventListener("keydown", this.escEvent, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escEvent, false);
    }

    escEvent = (event: any) => {
        if (event.key === "Escape"){
            this.props.showHandler(false)
        }
    }

    save = (todo: string) => {
        if(todo === undefined || ''){
            this.setState({placeHolder: 'Scrivi qui...'})
        }
        this.props.addToDo(todo)
        this.props.showHandler(false)
        
    }

    render(): ReactNode {
        const { input, placeHolder, isDragging } = this.state        
        return (
            <Bg center bgColor='rgba(0, 0, 0, 0.5)' onClick={(event: React.MouseEvent) => {
                event.preventDefault()
                console.log(event.target, event.relatedTarget, event.currentTarget)
                
                if (event.target === event.currentTarget && !isDragging){
                    this.props.showHandler(false)
                }
            }}>
                <PopUpWindow center flexDir="column" bgColor='#2b2c2e'>
                    <TextAreaWrapper center>
                        <TextArea name="todo" placeholder={placeHolder} autoFocus                         
                        onChange={(event) => {
                            this.setState({input: event.target.value})
                        }} />
                    </TextAreaWrapper>
                    <Button action={this.save} actionValue={input} text='Salva'/>
                </PopUpWindow>
            </Bg>
        )
    }
}

export default PopUp

const Bg = styled(Box)`
    position: absolute;
    width: 100vw;
    height: 100vh;
    cursor: default;
`

const PopUpWindow = styled(Box)`
    position: absolute;
    width: 500px;
    height: 300px;
    border-radius: 32px;
`

const TextAreaWrapper = styled(Box)`
    width: 100%;
    height: 60%;
`

const TextArea = styled.textarea`
    background-color: transparent;
    width: 80%;
    height: 100%;
    max-height: 100%;
    border: none;
    resize: none;
    color: white;
    font-size: 24px;
    :focus{
        outline: none;
    }
`
