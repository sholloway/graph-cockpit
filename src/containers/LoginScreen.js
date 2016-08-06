import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserChallenge from '../components/challenge/UserChallenge';
import * as AuthenticationActions from '../actions/authentication';

function mapStateToProps(state) {
  return {
    authenticated: state.authentication.user.authenticated,
		authenticating: state.authentication.system.authenticating,
		dispayPassword: state.authentication.userChallenge.dispayPassword
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthenticationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChallenge);
