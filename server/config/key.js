// 개발환경이 로컬인 경우와 배포모드일 경우 다르게 설정
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
