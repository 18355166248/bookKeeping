import LeaveStatesMange from '../leaveStatesManage/leaveStatesManage';

let leaveStates;

describe('测试 LeaveStatesMange', () => {
  beforeEach(() => {
    leaveStates = new LeaveStatesMange();
  });

  it('匹配快照', () => {
    expect(leaveStates)
    .toMatchSnapshot();
  });

  it('测试类 LeaveStatesMange', () => {
    expect(leaveStates)
    .toBeInstanceOf(LeaveStatesMange);
  });

  it('初始化是否包含 _statusId, chainSymbol, leaveStates, add, canLeave, remove', () => {
    expect(leaveStates)
    .toHaveProperty('_statusId', 0);
    expect(leaveStates)
    .toHaveProperty('chainSymbol', '.');
    expect(leaveStates)
    .toHaveProperty('leaveStates.id', 0);
    expect(leaveStates)
    .toHaveProperty('canLeave');
    expect(leaveStates)
    .toHaveProperty('add');
    expect(leaveStates)
    .toHaveProperty('remove');
  });

  it('执行销毁方法1', () => {
    leaveStates
    .add('a.b', () => false);

    leaveStates
    .canLeave('a')
    .then(res => {
      expect(res)
      .toBe(false);
    })
    .catch();

    leaveStates
    .remove('a.b');

    leaveStates
    .canLeave('a')
    .then(res => {
      expect(res)
      .toBe(true);
    })
    .catch();
  });

  it('执行销毁方法2', () => {
    // 返回销毁方法
    const destroyState = leaveStates.add('a');

    leaveStates.add('a.b.c');

    destroyState();

    expect(leaveStates.leaveStates.a)
    .toMatchObject({});
  });

  it('执行canLeave方法', () => {
    leaveStates.add('a');
    leaveStates.add('a.b.c', () => false);
    leaveStates.add('a.b');

    leaveStates
    .canLeave('a.b')
    .then(res => {
      expect(res)
      .toBe(false);
    })
    .catch();

    leaveStates.add('a.b.c', () => true);

    leaveStates
    .canLeave('a.b')
    .then(res => {
      expect(res)
      .toBe(true);
    })
    .catch();
  });

  it('执行异步回调', () => {
    const leaveStates = new LeaveStatesMange();

    leaveStates.add('a');
    leaveStates.add('a.b', () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(false);
        }, 1000);
      });
    });

    leaveStates
    .canLeave('a.b')
    .then(res => {
      expect(res)
      .toBe(false);
    })
    .catch();

    leaveStates.add('a.b.c');

    leaveStates
    .canLeave('a.b.c')
    .then(res => {
      expect(res)
      .toBe(true);
    })
    .catch();
  });
});
