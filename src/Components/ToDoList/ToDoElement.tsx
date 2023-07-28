import React, { PureComponent, ReactNode } from 'react'
import Icon from '../Basic/Icon'
import Box from '../Basic/Box';
import styled from '@emotion/styled';
import Text from '../Basic/Text';

interface ToDoProps {
    className?: string;
    id: string;
    index: number;

    selectAction: any;
    deleteAction: any;
    todoData: any;
}
interface State {
    checked: boolean
}

class ToDoElement extends PureComponent<ToDoProps, State> {
    constructor(props: ToDoProps) {
        super(props)
        
        this.state = {
            checked: this.props.todoData.done,
        }
    }

    render(): ReactNode {
        const { todoData, selectAction, deleteAction, id, index } = this.props
        const checked = this.state.checked
        return (
            <Box gap={24} id={id} className={this.props.className}>
                <Icon iconName='binIcon' onClick={() => deleteAction(index)}/> 
                <Icon iconName='checkBoxIcon' setChecked={checked} onClick={() => {
                    selectAction(index, id)
                    this.setState({checked: !checked})
                }}/>
                <RegularText>{todoData.text}</RegularText>
            </Box>
        )
    }
}

export default ToDoElement

const RegularText = styled(Text)`
    user-select: text;
    font-size: 24px; 
    font-weight: normal;
    color: white;
    margin: 15px 0px;
`