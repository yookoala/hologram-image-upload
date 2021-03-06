/* eslint
react/forbid-prop-types: 'warn',
no-restricted-syntax: 'warn',
jsx-a11y/no-noninteractive-element-interactions: 'off'
*/

import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import CropperCom from './Cropper';

class ModalCom extends React.Component {
  static propTypes = {
    file: PropTypes.object,
    cropperConfig: PropTypes.object,
    removeFile: PropTypes.func,
    cropperUpdate: PropTypes.func,
  };

  static defaultProps = {
    file: {},
    cropperConfig: {},
    removeFile: () => {},
    cropperUpdate: () => {},
  };

  constructor(props) {
    super(props);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      open: false,
    };
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  handleClick() {
    this.props.removeFile(this.props.file);
  }

  render() {
    return (
      <div className="dropzone-image">
        <img alt="file preview" src={this.props.file.preview} onClick={this.onOpenModal} />
        <FaTimesCircle className="remove-icon" onClick={() => this.handleClick()} />
        <Modal little={true} modalClassName="hologram-modal" open={this.state.open} onClose={() => this.onCloseModal()}>
          <CropperCom
            config={this.props.cropperConfig}
            src={this.props.file.origin}
            file={this.props.file}
            onUpdate={this.props.cropperUpdate}
            closeModal={this.onCloseModal}
          />
        </Modal>
      </div>
    );
  }
}

export default ModalCom;
