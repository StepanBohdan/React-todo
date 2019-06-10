import React, { Component } from 'react';

import AppHeader        from '../app-header/app-header';
import SearchPanel      from '../search-panel/search-panel';
import ToDoList         from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm      from '../item-add-form/item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        toDoData: [
            { label: 'Drink Coffee', important: false, id: 1 },
            { label: 'Make Awesome App', important: true, id: 2 },
            { label: 'Have a lunch', important: false, id: 3 }
        ]
    };

    deleteItem = (id) => {
        this.setState(({ toDoData }) => {
            const idx = toDoData.findIndex((el) => el.id === id);
            toDoData.splice(idx, 1);

            const newArray = [
                ...toDoData.slice(0, idx),
                ...toDoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        })
    };

    AddItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };

        this.setState(({ toDoData }) => {
            const newArr = [
                ...toDoData,
                newItem
            ];

            return {
                toDoData: newArr
            };
        });
    };

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <ToDoList todos={ this.state.toDoData }
                          onDeleted={ this.deleteItem }
                />
                <ItemAddForm onItemAdded={ this.AddItem }/>
            </div>
        );
    }
};
