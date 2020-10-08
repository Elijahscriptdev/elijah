import React from 'react';

export const PasswordField = ( props ) => (
  <>
    <div className="input-group">
      <span className="input-group-addon"> <i className="fa fa-lock"></i> </span>
      <input
        className="form-control"
        type="password"
        name="password"
        placeholder="Password"
        value={props.this.password}
        onChange={props.Change.handleChange}
        required
      />
    </div>
  </>
);

export const EmailField = ( props ) => (
  <>
    <div className="input-group">
      <span className="input-group-addon"> <i className="fa fa-envelope"></i> </span>
      <input
        className="form-control"
        type="email"
        name="email"
        placeholder="email@example.com"
        value={props.this.email}
        onChange={props.Change.handleChange}
        required
      />
    </div>
  </>
);