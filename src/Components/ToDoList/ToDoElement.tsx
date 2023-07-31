import { PureComponent, ReactNode } from 'react'

import Icon from '../Basic/Icon'
import Box, { BoxProps } from '../Basic/Box';
import Text from '../Basic/Text';
import styled from '@emotion/styled';

interface ToDoProps extends BoxProps{
    className?: string;
    id: string;
    index: number;

    selectAction: any;
    deleteAction: any;
    todoData: any;
}
interface State {
    checked: boolean,
}

class ToDoElement extends PureComponent<ToDoProps, State> {
    render(): ReactNode {
        const props = this.props
        const checked = this.props.todoData.done

        return (
            /* ToDo element */
            <ToDo 
                id={props.id} 
                className={this.props.className} 
                >

                {/* delete icon */}
                <Icon iconName='binIcon' onClick={() =>{ 
                    props.deleteAction(props.index)
                }}/> 

                {/* checkbox icon */}
                <Icon iconName={checked ? 'checkBoxIconOn' : 'checkBoxIconOff'} onClick={() => {
                    props.selectAction(props.index)
                }}/>

                {/* todo-text */}
                <Text className='text-regular' mar={"5 auto"}>{props.todoData.text}</Text>
            </ToDo>
        )
    }
}

export default ToDoElement

const ToDo = styled(Box)<BoxProps>`
    gap: 24px;

    //default properties for animation
    opacity: 0;
    transform: translateY(-50px);
    transition: opacity 0.5s ease, transform 0.5s ease;
`