import React from 'react';
import IconButton from 'material-ui/IconButton';

function Button({ children, ...props }) {
  return (
    <IconButton
      className="material-icons"
      {...props}
    >
      {children}
    </IconButton>
  );
}

Button.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Button;
