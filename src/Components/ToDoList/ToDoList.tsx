import React, { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'

import Box from '../Basic/Box'
import Text from '../Basic/Text'

import PopUp from './PopUp'
import Button from '../Basic/Button'
import ToDoElement from './ToDoElement'
import { bringSelectedDown, deleteElementFromJson, getJson, saveJson } from '../../Utils/utils'
import Icon from '../Basic/Icon'

// import { saveJson, getJson } from '../../Utils/utils'

interface Props {}
interface State {
    showPopUp: boolean;
    todos: Array<{id: string, text: string, done: boolean}>;
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
        const todoList = getJson()
        if (todoList) {
            this.setState({todos: todoList})
        }
    }

    componentDidUpdate(): void {
        saveJson(this.state.todos)
    }
    
    showHandler = (value: boolean) => {
        this.setState({showPopUp: value})
    }

    addToDo = (text: string) => {
        const todoList = this.state.todos
        const todo = {
            id: "todo-" + todoList.length.toString(),
            text: text,
            done: false,
        }
        let newList = [todo, ...todoList]
        this.setState({todos: newList})
    }

    deleteTodo = (index: number) => {
        const todoList = getJson()
        const todoToDel = todoList.find((todo: any) => todo.id === todoList[index].id)
        todoList.splice(index, 1)
        
        this.setState({todos: todoList})

        return todoToDel
    }

    selectToDo = (index: number, elementId: string) => {
        const todoList = getJson()
        const todoElement = document.getElementById(elementId)
        
        if (todoElement?.classList.contains("selected") && todoList[index].done){
            todoElement.classList.remove('selected')
            todoList[index].done = false
        }
        else {
            todoElement?.classList.add('selected')
            todoList[index].done = true
            let todo = this.deleteTodo(index)
            this.setState({todos: [...todoList, todo]})
        }

        this.setState({todos: todoList})
    }

    updateOrder = (todoList:  Array<{id: string, text: string, done: boolean}>) => {
        todoList.sort((a, b) => Number(a.done) - Number(b.done));
        console.log("SORTED LIST", todoList)
        this.setState({todos: todoList})
    };

    render(): ReactNode {
        const showPopUP = this.state.showPopUp
        const todoList = this.state.todos

        return (
            <>
                { showPopUP && <PopUp addToDo={this.addToDo} showHandler={this.showHandler}/>}
                <Box center flexDir='column' pad={"8vw 9vh"}>
                    <ExeternalContainer>
                        <ToDoContainer flexDir='column'>
                            <Text className='text-title'>TODO</Text>
                            {
                                todoList
                                .map((todo: any, index: number) => {
                                    return(
                                        <ToDoElement 
                                            id= {"todo-" + index.toString()}
                                            index={index}
                                            className={todo.done ? 'selected' : ''}

                                            todoData={todo} 
                                            deleteAction={this.deleteTodo} 
                                            selectAction={this.selectToDo}
                                        />
                                    )
                                })
                            }
                        </ToDoContainer>
                    </ExeternalContainer>
                    <NewTodoBtn center action={this.showHandler} actionValue={true}>
                        <Icon iconName='addIcon'/>
                        <Text className='text-medium'>Nuova Voce</Text>
                    </NewTodoBtn>
                </Box>
            </>
        )
    }
}

export default ToDoList

const ExeternalContainer = styled(Box)`
    background-color: #242424;
    box-shadow: 4px 12px 24px rgba(0, 0, 0, 0.25);
    
    border-radius: 50px;
    width: 80%;
    padding: 60px 140px;
    margin-bottom: 50px;
`

const ToDoContainer = styled(Box)`
    width: 100%;
    max-height: 50vh;
    overflow-y: scroll;
    gap: 40px;
`

const NewTodoBtn = styled(Button)`
    gap: 24px;
    flex-direction: row;
    padding: 16px 32px;
`