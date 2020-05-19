import {FunctionComponent, useState, useEffect} from 'react';
import * as React from 'react';

interface ICountDownProps {
  timer: number,
  onFinish: () => void
}

let timeId: NodeJS.Timeout;
const CountDownHooks: FunctionComponent<ICountDownProps> = (props) => {
  const [countDown, setcountDown] = useState(props.timer);

  const min = Math.floor(countDown / 1000 / 60);
  const second = Math.floor(countDown / 1000 % 60);
  const time = `${min}:${second < 10 ? `0${second}` : second}`;

  useEffect(() => {
    document.title = `${time}-饥人谷番茄`;
    timeId = setInterval(() => {
      setcountDown(countDown - 1000);
      if (countDown < 0) {
       props.onFinish()
        clearInterval(timeId)
      }
    }, 1000);
    return function clearUp() {
      clearInterval(timeId)
    }
  });


  return (
    <div className="CountDown">
      {time}
    </div>
  );
};

export default CountDownHooks;
