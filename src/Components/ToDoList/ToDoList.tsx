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
    SelectAnimation,
} from '../../Utils/animation'

interface Props {
    responsive: boolean;
}
interface State {
    showPopUp: boolean;
    todos: Array<any>;

    added: string;
    selected: {id: string, action: boolean};
    deleted: string;
}

class ToDoList extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            showPopUp: false,
            todos: [],

            added: '',
            selected: {id: '', action: false},
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

        // Saving in local storage every time the 'todos' state changes
        if (prevState.todos !== todos) {
            saveJson(todos);
        }

        // Animations
        if (prevState.added !== added) {
            const isFirst = todos.findIndex((todo) => todo.id === added) === 0 ? true : false
            const nextIndex = todos.findIndex((todo) => todo.id === added) + 1

            const addedTodoIndex = todos.findIndex((todo) => todo.id === added)
            const elementsUnder = todos.slice(addedTodoIndex + 1)

            let nextId
            // console.log(todos.length - 1,  todos[nextIndex])
            if (todos.length - 1 >= nextIndex && nextIndex === 1) {
                nextId = todos[nextIndex].id
                AddAnimation(added, elementsUnder, isFirst, nextId)
            }

            AddAnimation(added, elementsUnder, isFirst)
        }

        if (prevState.deleted !== deleted) {
            const nextIndex = todos.findIndex((todo) => todo.id === deleted) + 1
            const isFirst = nextIndex === 1 ? true : false
            console.log(nextIndex, isFirst)
            let nextId
            if(todos.length - 1 >= nextIndex && isFirst){
                nextId = todos[nextIndex].id
                DeleteAnimation(deleted, nextId)
            }
            else {
                DeleteAnimation(deleted)
            }           
        }

        // if (prevState.selected !== selected) {
        //     const indexOfSel = todos.findIndex((todo) => todo.id === selected)
            
        //     const todosUnderneath = todos.length === 1 ? [] : todos.slice(indexOfSel + 1)
        //     SelectAnimation(selected.id, selected.action, this.getDestinationIndex(todos, indexOfSel))
        //     moveElementsUnderneath(todosUnderneath)
        // }
    }

    getDestinationIndex = (todos: Array<any>, todoIndex: number): number => {
        const firstDone = todos.findIndex((todo) => todo.done === true && todo.id !== todos.find(() => todoIndex).id)
        let indexToMove: number = 0

        if (todos.length === 0 || firstDone === todoIndex + 1){
            indexToMove = 0
        } 
        else if (firstDone !== -1 ) {
            indexToMove = firstDone
        }
        else {
            indexToMove = todos.length - 1
        }

        return indexToMove
    }

    showPopUpHandler = (value: boolean) => {
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

    selectToDo = (index: number) => {
        /* Handles the selection of a todo element */

        const todoList = getJson()

        //changing 'selected' class by modifying 'done' property
        if (todoList[index].done) {
            todoList[index].done = false
            // console.log(todoList[index].text, " unselected!")
            this.setState({selected: {id: todoList[index].id, action: false}})
        } else {
            todoList[index].done = true
            const todoSelected = todoList.find((todo: any) => todo.id === todoList[index].id)
            // console.log(todoSelected.text, " selected!")
            this.setState({selected: {id: todoList[index].id, action: true}})
        }
        
        
        const todoSelected = todoList.find((todo: any) => todo.id === todoList[index].id)
        
        this.setState({ todos: todoList })


        //update order
        // this.updateOrder(todoList)
    }

    updateOrder = (todoList: Array<any>) => {
        /* Updates the array order, sorts by boolean value 'done' */
        todoList.sort((a, b) => Number(a.done) - Number(b.done)) //false-first
        this.setState({ todos: todoList })


        // TODO find another way to refresh the list
        //animation for showing list on refresh
        todoList.map((todo, index) => {
            return ListItemsMapAnimation(index, todo.id)
        })
    };

    render(): ReactNode {
        const { showPopUp } = this.state
        const todoList = this.state.todos
        return (
            <>
                { this.props.responsive ? (
                    /* MOBILE */ <> 
                        { /* Shows 'PopUp' component if state 'showPopUp' is true */
                            showPopUp && <PopUp responsive={this.props.responsive} addToDo={this.addToDo} showHandler={this.showPopUpHandler} />}
                        <Box center flexDir='column' height='100%' gap={24}>
                            <ToDoContainerMobile flex>
                                <Text width='100%' textAlign='center' className='text-title' mar='30px 0px 64px 0px'>
                                    TODO
                                </Text>
                                <Line />
                                <ListContainerMobile id='todo-list'>
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
                                </ListContainerMobile>
                            </ToDoContainerMobile>

                            {/* New ToDo button */}
                            <Box height='30%'>
                                <Button action={this.showPopUpHandler} actionValue={true}>
                                    <BtnInnerContainerMobile center>
                                        <Icon iconName='addIcon' />
                                        <Text className='text-medium'>Nuova Voce</Text>
                                    </BtnInnerContainerMobile>
                                </Button>
                            </Box>
                        </Box>
                    </>
                ) : (
                    /* DESKTOP */ <>
                    { /* Shows 'PopUp' component if state 'showPopUp' is true */
                        showPopUp && <PopUp responsive={this.props.responsive} addToDo={this.addToDo} showHandler={this.showPopUpHandler} />}
                        <ExternalContainer center gap={24}>
                            <ToDoContainer flex flexDir='column'>
                                <ListContainer id='todo-list' flex flexDir='column' gap={64}>
                                    <Text className='text-title'>TODO</Text>
                                    { todoList.length !== 0 ? 
                                        <List>
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
                                        </List> 
                                        : <></>
                                    }
                                </ListContainer>
                            </ToDoContainer>

                            {/* New ToDo button */}
                            <Button center action={this.showPopUpHandler} actionValue={true}>
                                <BtnInnerContainer>
                                    <Icon iconName='addIcon' />
                                    <Text className='text-medium'>Nuova Voce</Text>
                                </BtnInnerContainer>
                            </Button>
                        </ExternalContainer>
                    </>
                )}
            </>
        )
    }
}

export default ToDoList

const ExternalContainer = styled(Box)`
    padding: 9vh 9vw;
    flex-direction: column;
    gap: 24px;
    max-height: 100vh;
`

const ToDoContainer = styled(Box)`
    background-color: var(--surface-color);
    box-shadow: var(--def-shadow);
    border-radius: 32px;
    padding: 80px 160px;
    width: 70%;
`

const ListContainer = styled(Box)`
    width: 100%;
    max-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;
    flex-direction: column;

    ::-webkit-scrollbar-track{
        visibility: visible;
    }::-webkit-scrollbar-thumb{
        visibility: visible;
    }
`

const BtnInnerContainer = styled(Box)`
    gap: 24px;
    flex-direction: row;
    padding: 16px 32px;
`

const ToDoContainerMobile = styled(Box)`
    background-color: var(--bg-color);;
    box-shadow: var(--def-shadow);
    flex-direction: column;
    overflow: hidden;
    align-items: center;
    width: 90%;
    height: 80vh;
    border-radius: 0px 0px 32px 32px;
    padding: 0px 15px;
`

const ListContainerMobile = styled(Box)`
    overflow-y: scroll;
    overflow-x: hidden;
    width: 70%;
    max-height: 75vh;
    flex-direction: column;
    margin: 30px 0px;

    ::-webkit-scrollbar-track {
        visibility: hidden;
    }

    ::-webkit-scrollbar-thumb {
        visibility: hidden;
    }
`

const Line = styled.hr`
    margin: 0px 20px;
    width: 80vw;
`

const BtnInnerContainerMobile  = styled(Box)`
    padding: 2px 8px;
`

const List = styled(Box)`
    flex-direction: column;
`