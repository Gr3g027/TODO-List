import React, { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'

import Box from '../Basic/Box'
import Text from '../Basic/Text'
import Icon from '../Basic/Icon'

import PopUp from './PopUp'
import Button from '../Basic/Button'

// import { saveJson, getJson } from '../../Utils/utils'

interface Props {}
interface State {
    showPopUp: boolean;
    todos : object[];
}

class ToDoList extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            showPopUp: false,
            todos: [],
        }
    }
    
    showHandler = (value: boolean) => {
        this.setState({showPopUp: value})
    }

    addToDo = (text: string) => {
        let id: string = "todo-" +  this.state.todos.length.toString()
        this.state.todos.push({id: id, text: text})
        console.log(this.state.todos)
    }

    deleteToDo = (todoId: string) => {
        const todo = document.getElementById(todoId)
        todo ? todo.remove() : console.log('ERROR')
    }

    selectToDo = (todoId: string, index: number) => {
        let todosArr = this.state.todos
        const todo = document.getElementById(todoId)

        if (!(todo!.classList.contains('selected'))){
            todo!.classList.add('selected')
            
            const tmp = todosArr[index]
            for (let i = index; i < todosArr.length - 1; i++) {
                todosArr[i] = todosArr[i + 1];
            }
            todosArr[todosArr.length - 1] = tmp
        } 
        else {
            todo!.classList.remove('selected')
        }
        console.log(todosArr)
        this.setState({todos: todosArr})
    }

    updateTodos = (todosArr: any) => {
        this.setState({todos: todosArr})
    }

    render(): ReactNode {
        const showPopUP = this.state.showPopUp
        const todos = this.state.todos

        return (
            <>
                { showPopUP && <PopUp addToDo={this.addToDo} showHandler={this.showHandler}/>}
                <Box center flexDir='column' pad={"8vw 9vh"} >
                    <ExeternalContainer bgColor='#242424' borderRadius={50}>
                        <ToDoContainer flexDir='column'>
                            <Title>TODO</Title>
                            {todos.map((todo: any, index: number) => { 
                                return(
                                    <ToDo key={todo.id} id={todo.id}>
                                        <Icon iconName='binIcon' onClick={() => this.deleteToDo(todo.id)}/> 
                                        <Icon iconName='checkBoxIcon' onClick={() => this.selectToDo(todo.id, index)}/>
                                        <RegularText>{todo.text}</RegularText>
                                    </ToDo>
                                )
                            })}
                        </ToDoContainer>
                    </ExeternalContainer>
                    <NewTodoBtn action={this.showHandler} actionValue={true} text='Nuova voce' icon='addIcon'/>
                </Box>
            </>
        )
    }
}

export default ToDoList

const ExeternalContainer = styled(Box)`
    box-shadow: 4px 12px 24px rgba(0, 0, 0, 0.25);
    width: 80%;
    min-width: 60%;
    padding: 35px 54px;
    margin: 20px;
`

const ToDoContainer = styled(Box)`
    width: 100%;
    max-height: 50vh;
    overflow-y: scroll;
    gap: 64px;
`

const ToDo = styled(Box)`
    gap: 24px;
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

const NewTodoBtn = styled(Button)`
    margin: 50px;
`

