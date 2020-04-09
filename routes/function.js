var axios = require('axios');

var url = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst";
var queryParams =
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
  encodeURIComponent("20200409"); /* 15년 12월 1일발표 */
queryParams +=
  "&" +
  encodeURIComponent("base_time") +
  "=" +
  encodeURIComponent("1100"); /* 05시 발표 */
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

  async function getWeatherData(){
      const result = await axios.get(url + queryParams);
    //   console.log(result);
      console.log(result.data.response.body.items.item);
      return result.data.response.body.items.item;
  }

  module.exports = {
      getWeatherData
  }
//   request(
//     {
//       url: url + queryParams,
//       method: "GET"
//     },
//     function(error, response, body) {
//       // console.log("Status", response.statusCode);
//       // console.log("Headers", JSON.stringify(response.headers));
//       // console.log(body);
  
//       let data = JSON.parse(body);
//       console.log("Reponse received", data.response.body.items);
//     }
//   );

