import time from '@/assets/js/time';

/* let getRelativeTime = (anytime) => {
  let obj = time.getTime(anytime, new Date().toISOString());

  switch(true){
    case obj.year !== 0:
      return `${obj.year} 年前`;
      break;
    case obj.month !== 0:
      return `${obj.month} 个月前`;
      break;
    case obj.day !== 0:
      return `${obj.day} 天前`;
      break;
    case obj.hour !== 0:
      return `${obj.hour} 小时前`;
      break;
    case obj.minute !== 0:
      return `${obj.minute} 分钟前`;
      break;
    default:
      return '刚刚';
  };
}; */

export function getRelativeTime(anytime){
  let obj = time.getTime(anytime, new Date().toISOString());

  switch(true){
    case obj.year !== 0:
      return `${obj.year} 年前`;
      break;
    case obj.month !== 0:
      return `${obj.month} 个月前`;
      break;
    case obj.day !== 0:
      return `${obj.day} 天前`;
      break;
    case obj.hour !== 0:
      return `${obj.hour} 小时前`;
      break;
    case obj.minute !== 0:
      return `${obj.minute} 分钟前`;
      break;
    default:
      return '刚刚';
  };
};

//export default getRelativeTime;

export default {
  install(vue){
      vue.prototype.$myMethods = {
        getRelativeTime
      };
  }
};