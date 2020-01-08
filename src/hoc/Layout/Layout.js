import React, { Component } from 'react';

import Aux from 'react-aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/actions'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <Aux>
                
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
           
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        light: state.light
    }
}

const mapDispatcheToProps = dispatch => {
    return {
        sunOn: (light) => dispatch({type: actionTypes.LIGHT_ON, 
           
           lightStatus: light
        }),sunOff: (light) => dispatch({type: actionTypes.LIGHT_OFF, 
           
            lightStatus: light
         }),
         toggleSun: () => dispatch({type: actionTypes.LIGHT_TOGGLE, 
          
         }),
    }
}

export default connect(mapStateToProps, mapDispatcheToProps)(Layout);