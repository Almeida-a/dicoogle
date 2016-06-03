var React = require('react');

import {TransferOptionsView} from '../management/transferOptionsView';
import {ServicesView} from '../management/servicesView';
import {LoggerView} from '../management/loggerView';
import {IndexerView} from '../management/indexerView';
import {StorageView} from '../management/storageView';

var ManagementView = React.createClass({
    getInitialState: function() {
      return {selectedtab: 0};
    },
    render: function() {
      var views = [(<IndexerView/>),
      (<TransferOptionsView/>),
      (<ServicesView/>),
      (<StorageView/>),
      (<LoggerView/>)];
      return (
        <div className="container-fluid content">
            <ul className="nav nav-pills">
              <li className="active" role="presentation"><a href="#indexer" data-toggle="tab" onClick={this.onTabClicked.bind(this, 0)}>Index Options</a>
              </li>
                <li role="presentation"><a href="#transfer" data-toggle="tab" onClick={this.onTabClicked.bind(this, 1)}>Transfer Options</a>
                </li>
                <li role="presentation"><a href="#services" data-toggle="tab" onClick={this.onTabClicked.bind(this, 2)}>Services and Plugins</a>
                </li>
                <li role="presentation"><a href="#storage" data-toggle="tab" onClick={this.onTabClicked.bind(this, 3)}>Storage Servers</a>
                </li>
                <li role="presentation"><a href="#logs" data-toggle="tab" onClick={this.onTabClicked.bind(this, 4)}>Logs</a>
                </li>
            </ul>
            <div id="my-tab-content" className="tab-content">
              {views[this.state.selectedtab]}
            </div>
        </div>
      );
    },
    onTabClicked: function(index){
      console.log("tabSelected: ", index);
      this.setState({selectedtab: index});
    }
});

export {
  ManagementView
}
