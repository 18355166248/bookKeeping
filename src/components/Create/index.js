import React, { Component } from 'react'
import CategoryList from 'containers/CategoryList'
import PriceForm from 'components/Create/PriceForm'
import HeaderTitle from '../HeaderPrice/HeaderTitle'
import { Tabs, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { add, edit } from '@/redux/list'
import './index.scss'
const { TabPane } = Tabs

@withRouter
@connect(
  state => state.listReducer,
  { add, edit }
)
class Create extends Component {
  constructor(props) {
    super(props)
    const index = props.list.findIndex(
      v => v.id === Number(props.match.params.id)
    )
    const value = props.list[index]
    this.state = {
      selectCategory: value ? value.category : {},
      form: value ? value : {},
      type: this.props.location.pathname.indexOf('edit') > -1 ? 'edit' : 'add',
      index
    }
  }
  onSelectCategory = v => {
    this.setState({
      selectCategory: v
    })
  }
  submit = v => {
    if (Object.keys(this.state.selectCategory).length === 0) {
      return message.warning('请选择收支类型')
    }
    const value = {
      id: new Date().getTime(),
      ...v,
      type: this.state.selectCategory.type,
      cid: this.state.selectCategory.id,
      category: this.state.selectCategory
    }
    this.props[this.state.type]({ list: value, index: this.state.index })
    this.props.history.push('/')
  }
  render() {
    const { categoryList } = this.props
    const inprops = {
      categoryList: categoryList.filter(v => v.type === 'income'),
      selectCategory: this.state.selectCategory || {},
      onSelectCategory: this.onSelectCategory
    }
    const outprops = {
      categoryList: categoryList.filter(v => v.type === 'outcome'),
      onSelectCategory: this.onSelectCategory
    }
    return (
      <div>
        <HeaderTitle></HeaderTitle>
        <Tabs defaultActiveKey="1" className="create_tabs">
          <TabPane tab="支出" key="1">
            <CategoryList {...inprops}></CategoryList>
          </TabPane>
          <TabPane tab="收入" key="2">
            <CategoryList {...outprops}></CategoryList>
          </TabPane>
        </Tabs>

        <PriceForm
          className="pirce_form"
          submit={this.submit}
          value={this.state.form}
        ></PriceForm>
      </div>
    )
  }
}

export default Create
