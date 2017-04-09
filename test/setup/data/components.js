'use strict';

/**
 * Module dependencies.
 */
import React from 'react';

/**
 * Stateless component.
 */
export function Stateless() {
    return (
        <section>
            Stateless
        </section>
    );
}

/**
 * Class component.
 */
export class Component extends React.Component {
    render() {
        return (
            <div>
                Component
            </div>
        );
    }
}

/**
 * Class component with children.
 */
export class ComponentWithChildren extends React.Component {
    render() {
        return (
            <div>
                Children: {this.props.children}
            </div>
        );
    }
}

/**
 * Class component with onClick.
 */
export class Button extends React.Component {
    handleClick() {}
    render() {
        return (
            <button
                onClick={this.handleClick}
                className='class'
            >
                Click Me
            </button>
        );
    }
}
