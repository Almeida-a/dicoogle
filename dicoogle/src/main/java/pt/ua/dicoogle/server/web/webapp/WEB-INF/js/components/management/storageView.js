import React from 'react';

import {StorageActions} from '../../actions/storageActions';
import {StorageStore} from '../../stores/storageStore';
import {Button, Modal} from 'react-bootstrap';

const AddStorageModal = React.createClass({
  render: function() {
    return(<Modal {...this.props} bsStyle='primary' title='Add storage server' animation={true}>

      <div className='modal-body'>
        <div>
          AETitle
          <input id="storage_aetitle" className="form-control" style={{width: '100%'}} type="text" placeholder="aetitle" />
          <br></br>
          Ip Address
          <input id="storage_ip" className="form-control" style={{width: '100%'}} type="text" placeholder="ip address" />
          <br></br>
          Port
          <input id="storage_port" className="form-control" style={{width: '100%'}} type="text" placeholder="port" />
        </div>

      </div>
      <div className='modal-footer'>
        <Button onClick={this.onAdd}>Add</Button>
      </div>
    </Modal>);
  },

  onAdd () {
    console.log("onAdd clicked");
    StorageActions.add(
      document.getElementById("storage_aetitle").value,
      document.getElementById("storage_ip").value,
      document.getElementById("storage_port").value);
      this.props.onHide();
    }
});

const StorageView = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      showAdd: false,
      status: "loading"};
    },
    componentDidMount: function(){
      StorageActions.get();
      //$("#consolediv").scrollTop($("#consolediv")[0].scrollHeight);
    },
    componentWillMount: function() {
      StorageStore.listen(this._onChange);
    },
    _onChange: function(data){
      if (this.isMounted()) {
        this.setState({data: data.data});
      }
    },

    render: function() {
      const moves = this.state.data.map((item, index) => {
          return (
            <option key={index} value={index}>
              {item.AETitle + "@" + item.ipAddrs + ":" + item.port}
            </option>);
      });

      return (

        <div className="panel panel-primary topMargin">
          <div className="panel-heading">
            Storage Servers
          </div>
          <div className="panel-body">
            <select defaultValue={0} className="form-control" id="moves" size={6} style={{width: '100%'}}>
              {moves}
            </select>
            <div style={{textAlign: 'left'}}>
              <button className="btn btn_dicoogle" onClick={this.onAdd}>Add new</button>
              <button className="btn btn_dicoogle" onClick={this.onRemove}>Remove</button>
            </div>
          </div>
          <AddStorageModal show={this.state.showAdd} onHide={this.onHideAdd} />
        </div>
      );
    },
    onAdd() {
      this.setState({showAdd: true});
    },
    onHideAdd() {
      this.setState({showAdd: false});
    },
    onRemove() {
      var index = document.getElementById("moves").selectedIndex;
      StorageActions.remove(index);
    }

});

export {StorageView};
