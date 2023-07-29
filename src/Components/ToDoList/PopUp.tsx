import React, { PureComponent, ReactNode } from 'react'
import Box from '../Basic/Box'
import styled from '@emotion/styled'
import Button from '../Basic/Button';
import Text from '../Basic/Text';

interface PopUpProps {
    showHandler: any;
    addToDo: any;
}
interface State {
    input: string;
    placeHolder: string;
}

class PopUp extends PureComponent<PopUpProps, State> {
    constructor(props: PopUpProps) {
        super(props)
        this.escEvent = this.escEvent.bind(this);

        this.state = {
            input: '',
            placeHolder: '',
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
        if(todo === '' || todo === undefined){
            this.setState({placeHolder: 'Scrivi qui...'})
        } else {
            this.props.addToDo(todo)
            this.props.showHandler(false)
        }
    }

    render(): ReactNode {
        const { input, placeHolder } = this.state        
        return (
            <Bg center bgColor='rgba(0, 0, 0, 60%)' onClick={(event: React.MouseEvent) => {
                event.preventDefault()
                
                if (event.target === event.currentTarget){
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
                    <SaveBtn action={this.save} actionValue={input}>
                        <Text className='text-medium'>Salva</Text>
                    </SaveBtn>
                </PopUpWindow>
            </Bg>
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
    color: white;
    font-size: 24px;
    :focus{
        outline: none;
    }
`

const SaveBtn = styled(Button)`
    padding: 8px 32px;
`