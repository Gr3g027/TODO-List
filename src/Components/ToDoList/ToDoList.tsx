import { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import { nanoid } from 'nanoid'

import Box from '../Basic/Box'
import Text from '../Basic/Text'
import Button from '../Basic/Button'
import Icon from '../Basic/Icon'

import PopUp from './PopUp'
import ToDoElement from './ToDoElement'
import { getJson, saveJson } from '../../Utils/utils'

interface Props {}
interface State {
    showPopUp: boolean;
    todos: Array<any>;
}

class ToDoList extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            showPopUp: false,
            todos: [],
        }
    }

    componentDidMount(): void {
        // Retriveing localStorage data, if it exists
        const todoList = getJson()
        if (todoList) {
            this.setState({todos: todoList})
        }
    }

    componentDidUpdate(): void {
        // Saving in local storage every time the state changes
        saveJson(this.state.todos)
    }
    
    showHandler = (value: boolean) => {
        // Used for updating show state in child component "PopUp"
        this.setState({showPopUp: value})
    }

    addToDo = (text: string) => {
        // Handles creation of a todo element
        const todoList = this.state.todos
        const todo = {
            id: `todo-${nanoid(5)}`,
            text: text,
            done: false,
        }
        let newList = [todo, ...todoList]
        this.setState({todos: newList})
    }

    selectToDo = (index: number) => {
        /* Handles the selection of a todo element */
        
        const todoList = getJson()
        //changing 'selected' class by modifying 'done' property
        todoList[index].done ? todoList[index].done = false : todoList[index].done = true

        //update order
        this.updateOrder(todoList)
    }

    deleteTodo = (index: number) => {
        /* Handles the deletion of a todo element */
        const todoList = getJson()
        const todoToDel = todoList.find((todo: any) => todo.id === todoList[index].id)
        
        //delete
        todoList.splice(index, 1)
        this.setState({todos: todoList})
       
        return todoToDel
    }

    updateOrder = (todoList:  Array<any>) => {
        /* Updates the array order, sorts by boolean value 'done' */
        todoList.sort((a, b) => Number(a.done) - Number(b.done)); //false-first
        this.setState({todos: todoList})
    };

    render(): ReactNode {
        const { showPopUp } = this.state
        const todoList = this.state.todos

        return (
            <>
                { /* Shows 'PopUp' component if state 'showPopUp' is true */
                    showPopUp && <PopUp addToDo={this.addToDo} showHandler={this.showHandler}/> } 
                <ExternalContainer center>
                    <ToDoContainer>
                        <ListContainer>
                            <Text className='text-title'>TODO</Text>
                            {
                                // Rendering ToDo list
                                todoList.map((todo: any, index: number) => { 
                                    return(
                                        <ToDoElement 
                                            key={todo.id}
                                            
                                            id={todo.id}
                                            index={index}
                                            className={todo.done ? 'selected' : ''}

                                            todoData={todo} 
                                            deleteAction={this.deleteTodo} 
                                            selectAction={this.selectToDo}
                                        />
                                    )
                                })
                            }
                        </ListContainer>
                    </ToDoContainer>

                    {/* New ToDo button */}
                    <Button center action={this.showHandler} actionValue={true}>
                        <BtnInnerContainer>
                            <Icon iconName='addIcon'/>
                            <Text className='text-medium'>Nuova Voce</Text>
                        </BtnInnerContainer>
                    </Button>
                </ExternalContainer>
            </>
        )
    }
}

export default ToDoList

const ExternalContainer = styled(Box)`
    padding: 8vw 9vh;
    flex-direction: column;
    gap: 24px;
`

const ToDoContainer = styled(Box)`
    background-color: #242424;
    box-shadow: 4px 12px 24px rgba(0, 0, 0, 0.25);
    border-radius: 32px;
    padding: 80px 160px;

    width: 70%;
`

const ListContainer = styled(Box)`
    width: 100%;
    max-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;
    gap: 40px;
    flex-direction: column;
`

const BtnInnerContainer = styled(Box)`
    gap: 24px;
    flex-direction: row;
    padding: 16px 32px;
`