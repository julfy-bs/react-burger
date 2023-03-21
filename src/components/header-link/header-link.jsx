import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import headerLinkStyles from './header-link.module.css';

class HeaderLink extends Component {
  render() {
    return (
      <a href="/#"
         className={
           clsx(headerLinkStyles.link, this.props.active && headerLinkStyles.link_active, 'pt-4', 'pr-5', 'pb-4', 'pl-5')
         }
      >
        {this.props.children}
        <span className={clsx('ml-2')}>{this.props.text}</span>
      </a>
    );
  }
}

HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool
};

HeaderLink.defaultProps = {
  active: false
};

export default HeaderLink;