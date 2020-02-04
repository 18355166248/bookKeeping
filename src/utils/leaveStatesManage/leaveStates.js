import LeaveStatesMange from './leaveStatesManage';
import { Modal } from 'antd';
import _ from 'lodash';

const LeaveStates = new LeaveStatesMange();

function createLeaveStates({ name, onCallback }) {
  let destroy;

  if (name) {
    if (onCallback) {
      destroy = LeaveStates.add(name, onCallback);
    } else {
      destroy = LeaveStates.add(name);
    }
  }

  return destroy;
}

function canLeave({ name, onCallback }) {
  const canLeaveResult = LeaveStates.canLeave(name);

  if (canLeaveResult) {
    Modal.confirm({
      title: '当前页面有数据未保存，是否确定离开',
      onOk() {
        _.isFunction(onCallback) && onCallback();
      },
    });
  } else {
    _.isFunction(onCallback) && onCallback();
  }
}

export default {
  LeaveStates,
  createLeaveStates,
  canLeave,
};
