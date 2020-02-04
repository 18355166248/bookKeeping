import LeaveStatesMange from 'utils/leaveStatesManage/leaveStatesManage'

async function LeaveStatesMa() {
  const leaveStates = new LeaveStatesMange();

  leaveStates.add('b2', () => new Promise(resolve => resolve(true)))
  leaveStates.add('b2.c', () => new Promise(resolve => resolve(true)))
  leaveStates.add('b2.c.2.d', () => new Promise(resolve => resolve(true)))

  leaveStates.canLeave('b2')
}

export default LeaveStatesMa;
