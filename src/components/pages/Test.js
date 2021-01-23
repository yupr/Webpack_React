import React, { useEffect } from 'react';
import axios from 'axios';

import Sea from '../../img/sea.jpg';

const Test = (() => {

  useEffect(() => {
    const fetch = async () => {
      await axios.get(`https://jsondata.okiba.me/v1/json/demo01`).then((res) => {
        console.log('response', res)
      }).catch((err) => {
        console.log('err', err);
      });
    };

    fetch();

    return () => {
    };
  }, [])

  return (
    <div>
      <p>Test React</p>
      <img src={Sea} alt="海の絵"></img>
    </div>
  )
})

export default Test;
