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
import {
    AddAnimation,
    DeleteAnimation,
    ListItemsMapAnimation,
    SelectAnimation
} from '../../Utils/animation'

interface Props { }
interface State {
    showPopUp: boolean;
    todos: Array<any>;

    added: string;
    selected: string;
    deleted: string;
}

class ToDoList extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            showPopUp: false,
            todos: [],

            added: '',
            selected: '',
            deleted: '',
        }
    }

    componentDidMount(): void {
        // Retriveing localStorage data, if it exists
        const todoList = getJson()
        if (todoList) {
            this.setState({ todos: todoList })
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        const { todos, added, selected, deleted } = this.state

        //animation for showing list on refresh
        todos.map((todo, index) => {
            ListItemsMapAnimation(index, todo.id)
        })
        
        // Saving in local storage every time the 'todos' state changes
        if (prevState.todos !== todos) {
            saveJson(todos);
        }

        // Animations
        if (prevState.added !== added)  AddAnimation(added)

        if (prevState.deleted !== deleted) DeleteAnimation(deleted)

        if (prevState.selected !== selected) SelectAnimation(selected)
    }
    showHandler = (value: boolean) => {
        // Used for updating show state in child component "PopUp"
        this.setState({ showPopUp: value })
    }

    addToDo = (text: string) => {
        // Handles creation of a todo element
        const todoList = this.state.todos
        const todo = {
            id: `todo-${nanoid(5)}`,
            text: text,
            done: false,
        }

        //set state for the add animation
        this.setState({ added: todo.id }) 

        //creating two lists so that new todo can be placed before selected ones, but after unselected ones
        const selectedList = todoList.filter((todo) => todo.done === true)
        const unselectedList = todoList.filter((todo) => todo.done === false)

        //add
        let newList = [...unselectedList, todo, ...selectedList]
        this.setState({ todos: newList })
    }

    selectToDo = (index: number) => {
        /* Handles the selection of a todo element */

        const todoList = getJson()
        //changing 'selected' class by modifying 'done' property
        todoList[index].done ? todoList[index].done = false : todoList[index].done = true
        this.setState({ todos: todoList })

        const todoSelected = todoList.find((todo: any) => todo.id === todoList[index].id)
        //update order
        this.updateOrder(todoList)
    }

    deleteTodo = (index: number) => {
        /* Handles the deletion of a todo element */
        const todoList = getJson()
        const todoDeleted = todoList.find((todo: any) => todo.id === todoList[index].id)

        this.setState({deleted: todoDeleted.id})

        setTimeout(()=>{
             //delete
            todoList.splice(index, 1)
            this.setState({ todos: todoList })
        }, 700)

        return todoDeleted
    }

    updateOrder = (todoList: Array<any>) => {
        /* Updates the array order, sorts by boolean value 'done' */
        todoList.sort((a, b) => Number(a.done) - Number(b.done)) //false-first
        this.setState({ todos: todoList })
    };

    render(): ReactNode {
        const { showPopUp } = this.state
        const todoList = this.state.todos

        return (
            <>
                { /* Shows 'PopUp' component if state 'showPopUp' is true */
                    showPopUp && <PopUp addToDo={this.addToDo} showHandler={this.showHandler} />}
                <ExternalContainer center>
                    <ToDoContainer>
                        <ListContainer id='todo-list' flex>
                            <Text className='text-title'>TODO</Text>
                            {
                                // Rendering ToDo list
                                todoList.map((todo: any, index: number) => {
                                    return (
                                        <ToDoElement
                                            key={todo.id}

                                            id={todo.id}
                                            index={index}
                                            className={todo.done ? 'todo-element selected' : 'todo-element'}

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
                            <Icon iconName='addIcon' />
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
    max-height: 45vh;
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