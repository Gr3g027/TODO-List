import { PureComponent, ReactNode } from 'react'

import Icon from '../Basic/Icon'
import Box from '../Basic/Box';
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
    render(): ReactNode {
        const { todoData, selectAction, deleteAction, id, index } = this.props
        const checked = this.props.todoData.done

        return (
            /* ToDo element */
            <Box gap={24} borderRadius={50} id={id} className={this.props.className}>

                {/* delete icon */}
                <Icon iconName='binIcon' onClick={() => deleteAction(index)}/> 

                {/* checkbox icon */}
                <Icon iconName={checked ? 'checkBoxIconOn' : 'checkBoxIconOff'} onClick={() => {
                    selectAction(index)
                }}/>

                {/* todo-text */}
                <Text className='text-regular' mar={"15px 5px"}>{todoData.text}</Text>
            </Box>
        )
    }
}

export default ToDoElement