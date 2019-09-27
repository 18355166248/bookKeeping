import React from 'react'

const h1Style = {
  textAlign: 'center',
  color: '#fff',
  padding: '20px 0',
  margin: 0,
  fontSize: '30px',
  backgroundColor: 'black'
}

function HeaderTitle() {
  return (
    <div>
      <h1 style={h1Style}>Keep</h1>
    </div>
  )
}

export default HeaderTitle
