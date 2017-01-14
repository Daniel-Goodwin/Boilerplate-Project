import React from 'react';
import FontIcon from 'material-ui/FontIcon';

function Icon({ name, ...props }) {
  return (
    <FontIcon
      className="material-icons"
      {...props}
    >
      {name.replace(/\s/g, '_')}
    </FontIcon>
  );
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default Icon;
