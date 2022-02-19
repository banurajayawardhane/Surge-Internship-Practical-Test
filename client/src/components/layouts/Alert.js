import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div className="app-wrapper-error">
    <section className='error' key={alert.id}>
      <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
    </section>
    </div>
  ));
alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);