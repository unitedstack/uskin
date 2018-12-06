import React, {PropTypes} from 'react';

function noop() {}

class Button extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled: props.disabled,
      hide: props.hide,
      loading: props.loading
    };

    ['onClick'].forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.disabled !== this.props.disabled ||
      nextProps.loading !== this.props.loading
    ) {
      this.setState({
        disabled: nextProps.disabled,
        loading: nextProps.loading
      });
    }
  }

  onClick(e) {
    this.props.onClick(e, this.props.btnKey);
  }

  getClassName(props, state) {
    let className = 'btn';

    props.type && (className += ' btn-' + props.type);
    props.size && (className += ' btn-' + props.size);
    props.initial && (className += ' btn-initial');
    props.selected && (className += ' selected');
    state.disabled && (className += ' disabled');
    state.loading && (className += ' btn-loading')

    return className;
  }

  // 如果不做这一步操作，当点击按钮之后，摁enter键，会重复执行点击事件。
  handleKeyDown(e) {
    e.preventDefault();
  }

  render() {
    const props = this.props;
    const state = this.state;
    const iconPrefix = 'glyphicon icon-';

    switch (props.tag) {
      case 'div':
        return (
          !state.hide ? <div className={this.getClassName(props, state)}
            onClick={!state.disabled && !state.loading ? this.onClick : null}
          >
            {props.iconClass && !state.loading ? <i className={iconPrefix + props.iconClass} /> : null}
            {state.loading ? <i className={iconPrefix + 'loading'} /> : null}
            {props.value ? <span>{props.value}</span> : null}
            {props.dropdown ? <i className={iconPrefix + 'dropdown'} /> : null}
          </div> : null
        );
      default:
        return (
          !state.hide ? <button onKeyDown={this.handleKeyDown}
            className={this.getClassName(props, state)}
            disabled={state.disabled}
            onClick={!state.disabled && !state.loading ? this.onClick : null}
          >
            {props.iconClass && !state.loading ? <i className={iconPrefix + props.iconClass} /> : null}
            {state.loading ? <i className={iconPrefix + 'loading'} /> : null}
            {props.value ? <span>{props.value}</span> : null}
            {props.dropdown ? <i className={iconPrefix + 'dropdown'} /> : null}
          </button> : null
        );
    }
  }

}

Button.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  btnKey: PropTypes.string,
  iconClass: PropTypes.string,
  type: PropTypes.oneOf(['create', 'delete', 'warning', 'cancel', 'status']),
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  tag: PropTypes.oneOf(['div']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  initial: PropTypes.bool,
  selected: PropTypes.bool,
  dropdown: PropTypes.bool,
  hide: PropTypes.bool
};

Button.defaultProps = {
  onClick: noop,
  disabled: false,
  initial: false,
  selected: false,
  dropdown: false,
  hide: false,
  loading: false
};

export default Button;
