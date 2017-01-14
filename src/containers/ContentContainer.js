import React from 'react';

function ContentContainer({ isDesktop, children }) {
  return (
    <div
      style={Object.assign(styles.container, { marginLeft: isDesktop ? 256 : 0 })}
    >
      {children}
    </div>
  );
}

const styles = {
  container: {
    paddingTop: 48,
  },
};

export default ContentContainer;
