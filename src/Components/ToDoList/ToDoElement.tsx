import { PureComponent, ReactNode } from 'react'

import Icon from '../Basic/Icon'
import Box, { BoxProps } from '../Basic/Box';
import Text from '../Basic/Text';
import styled from '@emotion/styled';

interface ToDoProps extends BoxProps {
    className?: string;
    id: string;
    index: number;

    selectAction: any;
    deleteAction: any;
    todoData: { id: string, text: string, done: boolean };

    responsive?: boolean;
}
interface State { }

class ToDoElement extends PureComponent<ToDoProps, State> {

    render(): ReactNode {
        /* ToDo element */

        const props = this.props
        const checked = this.props.todoData.done

        return (
            <>
                {props.responsive ? (
                    /* MOBILE */
                    <ToDoMobile
                        id={props.id}
                        className={this.props.className}
                        center
                    >

                        {/* delete icon */}
                        <Icon iconName='binIcon' onClick={() => {
                            props.deleteAction(props.index)
                        }} />

                        {/* checkbox icon */}
                        <Icon iconName={checked ? 'checkBoxIconOn' : 'checkBoxIconOff'} onClick={() => {
                            props.selectAction(props.index)
                        }} />

                        {/* todo-text */}
                        <TodoText className='text-regular'>{props.todoData.text}</TodoText>
                    </ToDoMobile>
                ) : (
                    /* DESKTOP */
                    <ToDo
                        id={props.id}
                        className={this.props.className}
                    >

                        {/* delete icon */}
                        <Icon iconName='binIcon' onClick={() => {
                            props.deleteAction(props.index)
                        }} />

                        {/* checkbox icon */}
                        <Icon iconName={checked ? 'checkBoxIconOn' : 'checkBoxIconOff'} onClick={() => {
                            props.selectAction(props.index)
                        }} />

                        {/* todo-text */}
                        <TodoText className='text-regular'>{props.todoData.text}</TodoText>
                    </ToDo>
                )}
            </>
        )
    }
}

export default ToDoElement

const ToDo = styled(Box) <BoxProps>`
    gap: 24px;

    opacity: 0;
    height: 0;
    display: none;
`

const TodoText = styled(Text)`
    text-align: left;
`

const ToDoMobile = styled(Box) <BoxProps>`
    gap: 24px;

    opacity: 0;
    height: 0;
    display: none;
`