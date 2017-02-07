import {connect} from 'react-redux'

import Home from 'components/home'
// Import redux actions here:
// eg. import * as actions from 'actions/home'

const mapStateToProps = state => ({
    // title: state.home.title
})

const mapDispatchToProps = dispatch => ({
    // onLoad: () => dispatch(actions.getTitle())
})

const Connector = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Connector
