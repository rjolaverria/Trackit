import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const Alert = ({ messages }) => {
  useEffect(() => {
    if (messages.username)
      toast.error(messages.username[0], { position: 'top-center' });
    if (messages.deleted) toast.error(messages.deleted);
    if (messages.non_field_errors) {
      messages.non_field_errors.forEach((error) => {
        toast.error(error, { position: 'top-center' });
      });
    }
    if (messages.message) toast.info(messages.message);
    if (messages.success) toast.success(messages.success);
  });
  return <ToastContainer />;
};

Alert.propTypes = {
  messages: PropTypes.object.isRequired,
};

const mapDispatchtoProps = (state) => ({
  messages: state.messagesReducer.messages,
});
export default connect(mapDispatchtoProps)(Alert);
