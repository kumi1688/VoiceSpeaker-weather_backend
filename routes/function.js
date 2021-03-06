var axios = require('axios');
const RabbitmqWrapper = require('./rabbitmq.js');

var url = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst";
const getQueryParams = (date) => {
let queryParams = 
  "?" +
  encodeURIComponent("ServiceKey") +
  "=fQQmInPFuI3k1pbQjX1BaCfOE6zFzNXa9hXAEs92vl6OI140GB%2BGkwowNuF0YyKuRNTRFy%2F5BWAZb7N0ZfDuUw%3D%3D"; /* Service Key*/
queryParams +=
  "&" +
  encodeURIComponent("ServiceKey") +
  "=" +
  encodeURIComponent(
    "fQQmInPFuI3k1pbQjX1BaCfOE6zFzNXa9hXAEs92vl6OI140GB%2BGkwowNuF0YyKuRNTRFy%2F5BWAZb7N0ZfDuUw%3D%3D"
  ); /* 공공데이터포털에서 받은 인증키 */
queryParams +=
  "&" +
  encodeURIComponent("pageNo") +
  "=" +
  encodeURIComponent("1"); /* 페이지번호 */
queryParams +=
  "&" +
  encodeURIComponent("numOfRows") +
  "=" +
  encodeURIComponent("10"); /* 한 페이지 결과 수 */
queryParams +=
  "&" +
  encodeURIComponent("dataType") +
  "=" +
  encodeURIComponent("JSON"); /* 요청자료형식(XML/JSON)Default: XML */
queryParams +=
  "&" +
  encodeURIComponent("base_date") +
  "=" +
  encodeURIComponent(date); /* 15년 12월 1일발표 */
queryParams +=
  "&" +
  encodeURIComponent("base_time") +
  "=" +
  encodeURIComponent("0500"); /* 05시 발표 */
queryParams +=
  "&" +
  encodeURIComponent("nx") +
  "=" +
  encodeURIComponent("61"); /* 예보지점 X 좌표값 */
queryParams +=
  "&" +
  encodeURIComponent("ny") +
  "=" +
  encodeURIComponent("120"); /* 예보지점의 Y 좌표값 */
  return queryParams;
};

  const getWeatherData = async () => {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = date.getMonth() < 10 ? '0' + (date.getMonth()+1).toString() : (date.getMonth()+1).toString();
      const day = date.getDate().toString();
      const currentDate = year + month + day; 
      // console.log(url + getQueryParams(currentDate));
      
      const result = await axios.get(url + getQueryParams(currentDate));
      // console.log(result.data.response.body.items.item);
      return result.data.response.body.items.item;
  }

  const sendWeatherData = async (data) => {
    try{
        const url = 'amqp://ksh:1234@3.34.5.103';
        const queueName = 'res/weather/info/general';
        const rq = new RabbitmqWrapper(url, queueName);
        // console.dir(data);
        await rq.sendMessage(data);
    }catch(e){
        console.log(e);
        res.send('error');
    }
}

  module.exports = {
      getWeatherData, sendWeatherData
  }