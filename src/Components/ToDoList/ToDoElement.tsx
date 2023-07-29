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
    }

    render(): ReactNode {
        const { todoData, selectAction, deleteAction, id, index } = this.props
        const checked = this.props.todoData.done

        return (
            <Box gap={24} key={id} className={this.props.className}>
                <Icon iconName='binIcon' onClick={() => deleteAction(index)}/> 
                <Icon iconName={checked ? 'checkBoxIconOn' : 'checkBoxIconOff'} onClick={() => {
                    selectAction(index, id)
                }}/>
                <Text className='text-regular' mar={"15px 5px"}>{todoData.text}</Text>
            </Box>
        )
    }
}

export default ToDoElement