import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

function withSnackbar(WrappedComponent) {
    return class withSnackbar extends React.Component {
        constructor() {
            super();

            this.state = {
                open: false,
                autoHideDuration: 5,
                message: ''
            };
        }

        closeSnackbar = (clearMessage = true) => {
            this.setState({
                message: clearMessage ? '' : this.state.message,
                open: false
            });
        }

        showSnackbar = (message) => {
            this.setState({
                open: true,
                message
            });
        }

        render() {
            const { open } = this.state;
            return (
                <div>
                    <WrappedComponent {...this.props} showSnackbar={this.showSnackbar} />
                    {open &&
                        <Snackbar {...this.state} />
                    }
                </div>
            );
        }
    };
}

export default withSnackbar;
