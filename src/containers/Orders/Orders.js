import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    state = {
        loading: true
    }
    
    componentDidMount() {
        this.props.initOrdersDispatch();
    }

    render () {
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initOrdersDispatch: () => {
            dispatch(actions.initOrders())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios));