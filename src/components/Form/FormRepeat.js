import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button } from 'antd';
import { Fragment } from 'react';
import _ from 'lodash';

FormRepeat.prototype = {
  form: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  formKey: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  footer: PropTypes.func,
}

FormRepeat.displayname = 'FormRepeat';

function getInit() {
  let _id = 0;

  function add() {
    return _id++;
  }

  return () => {
    return add();
  }
}

function FormRepeat(props) {
  const {
    form,
    list: listProps = [],
    formKey,
    renderItem,
    footer,
  } = props;

  const [list, setList] = useState(listProps);

  if (!_.isEqual(listProps, list)) {
    setList(listProps)
  }

  const addId = useRef(getInit()).current;

  const formKeys = `${formKey}Keys`;

  const { getFieldDecorator, getFieldValue } = form;

  getFieldDecorator(formKeys, { initialValue: [] });

  useEffect(() => {
    form.setFieldsValue({
      [formKeys]: list.map(v => addId()),
    });
  }, [list]);

  const keys = getFieldValue(formKeys);

  const formItems = keys.map((k, index) => {
    return renderItem({
      item: list[k],
      index,
      keys,
      k,
      add,
      remove,
    })
  });

  return (
    <Fragment>
      {formItems}
      {_.isFunction(footer) && footer({ add, remove })}
    </Fragment>
  )

  function remove(k) {
    const keys = form.getFieldValue(formKeys);
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      [formKeys]: keys.filter(key => key !== k),
    });
  };

  function add() {
    const keys = form.getFieldValue(formKeys);

    const nextKeys = keys.concat(addId());

    form.setFieldsValue({
      [formKeys]: nextKeys,
    });
  };
}

export default FormRepeat;
