import { connect } from 'react-redux'
import Counter from 'components/counter'
import * as actions from 'actions/counter'

const mapStateToProps = state => ({
    count: state.counter.count
})

const mapDispatchToProps = dispatch => ({
    onUpdate: () => dispatch(actions.increase())
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
