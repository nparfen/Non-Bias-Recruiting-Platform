import { Component } from 'react';
import { connect } from 'react-redux';

class ScrollToTop extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.redux.location !== prevProps.redux.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

const mapStateToProps = (state) => ({
    redux : {
        location: state.router.location,
    }
})

export default connect(mapStateToProps, {})(ScrollToTop);