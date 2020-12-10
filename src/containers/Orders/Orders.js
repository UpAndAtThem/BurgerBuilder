import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.initOrdersDispatch(this.props.userToken);
    }

    render () {
        return (
            <div>
                { this.props.loading ? <Spinner></Spinner> : null }
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
        orders: state.order.orders,
        loading: state.order.loading,
        userToken: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initOrdersDispatch: (token) => {
            dispatch(actions.initOrdersStart(token))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios));