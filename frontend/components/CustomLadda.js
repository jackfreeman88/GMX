import { Component } from "react";
import { Spinner } from "react-bootstrap";
import Swal from 'sweetalert2'
export class CustomLadda extends Component {
    constructor(props){
        super(props)
        this.state = { loading: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
      Swal.fire({
        // customClass: {
        //   confirmButton: 'btn btn-primary br-30',
        //   cancelButton: 'btn btn-danger br-30'
        // },
        title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#22a612',
        cancelButtonColor: '#d93737',
        confirmButtonText: 'Yes, confirm!',
        customClass: {
          popup: 'swal2-dark',
        }	
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.setState({
            loading: !this.state.loading,
          });
          this.props.onClick();
        }
      })
    }

    render() {
      return (
        <a className={this.props.className + (this.props.disabled ? ' disabled' : '')}
        onClick={this.state.loading ? null : this.toggle}>
          {this.state.loading ? <Spinner animation="border" size="sm"/> : this.props.children}
        </a>
      );
    }
  };