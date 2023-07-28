import React, { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'

import Box from '../Basic/Box'
import Text from '../Basic/Text'
import Icon from '../Basic/Icon'

import PopUp from './PopUp'
import Button from '../Basic/Button'
import ToDoElement from './ToDoElement'
import { bringSelectedDown, deleteElementFromJson, getJson, saveJson } from '../../Utils/utils'

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

        console.log("MOUNTED", todoList)
    }

    componentDidUpdate(): void {
        console.log("UPDATE")
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
        todoList.splice(index, 1)

        this.setState({todos: todoList})
    }

    selectToDo = (index: number, elementId: string) => {
        const todoList = getJson()
        const todoElement = document.getElementById(elementId)
        
        if (todoElement?.classList.contains("selected") && todoList[index].done){
            todoElement.classList.remove('selected')
            todoList[index].done = false
            this.setState({todos: todoList})
        }
        else {
            todoElement?.classList.add('selected')
            todoList[index].done = true
            this.setState({todos: todoList})
        }

        // bringSelectedDown(todoList, index)
    }

    // updateOrder = () => {
    //     const todoList: Array<{id: string, text: string, done: boolean}> = getJson()

    //     let filteredList = todoList.sort((a, b) => (a.done && !b.done ? 1 : b.done && !a.done ? -1 : 0))
    //     console.log(filteredList)
    // };

    render(): ReactNode {
        const showPopUP = this.state.showPopUp
        const todoList = this.state.todos

        return (
            <>
                { showPopUP && <PopUp addToDo={this.addToDo} showHandler={this.showHandler}/>}
                <Box center flexDir='column' pad={"8vw 15vh"} >
                    <ExeternalContainer bgColor='#242424' borderRadius={50}>
                        <ToDoContainer flexDir='column'>
                            <Title>TODO</Title>
                            {
                                todoList
                                .map((todo: any, index: number) => {
                                    return(
                                        <ToDoElement 
                                            key= {"todo-" + index.toString()}
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
                    <Button action={this.showHandler} actionValue={true} text='Nuova voce' icon='addIcon'/>
                </Box>
            </>
        )
    }
}

export default ToDoList

const ExeternalContainer = styled(Box)`
    box-shadow: 4px 12px 24px rgba(0, 0, 0, 0.25);
    max-width: 80%;
    width: 80%;
    padding: 60px 140px;
    margin: 50px;
`

const ToDoContainer = styled(Box)`
    width: 100%;
    max-height: 50vh;
    overflow-y: scroll;
    gap: 40px;
`

const Title = styled(Text)`
    text-align: left;
    width: 100%;
    margin: 20px 0px;
    font-size: 54px;
    font-weight: bold;
    color: white;
`

const RegularText = styled(Text)`
    font-size: 24px; 
    font-weight: normal;
    color: white;
    margin: 15px 0px;
`