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
            this.createToDoItem('Drink Coffee'),
            this.createToDoItem('Make Awesome App'),
            this.createToDoItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    };

    createToDoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

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
        const newItem = this.createToDoItem(text);

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

    toggleProperty(arr,  id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ toDoData }) => {
            return {
                toDoData: this.toggleProperty(toDoData, id, 'important')
            };
        });    };

    onToggleDone = (id) => {
        this.setState(({ toDoData }) => {
            return {
                toDoData: this.toggleProperty(toDoData, id, 'done')
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onFilterChange = ( filter ) => {
        this.setState({ filter });
    };

    searchItems(items, term) {
        if (term.length === 0) {
            return (items)
        }
        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    };

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    render() {
        const { toDoData, term, filter } = this.state;

        const visibleItems = this.filter(
            this.searchItems(toDoData, term), filter);

        const doneCount = toDoData
            .filter((el) => el.done).length;

        const toDoCount = toDoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={toDoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={ this.onSearchChange }
                    />
                    <ItemStatusFilter filter={ filter }
                                      onFilterChange={ this.onFilterChange }
                    />
                </div>

                <ToDoList todos={ visibleItems }
                          onDeleted={ this.deleteItem }
                          onToggleImportant={ this.onToggleImportant }
                          onToggleDone={ this.onToggleDone }
                />
                <ItemAddForm onItemAdded={ this.AddItem }/>
            </div>
        );
    }
};
