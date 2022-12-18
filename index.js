const express = require("express"); // express를 가져온다.
const app = express(); // express를 이용해서 app을 만들어준다.
const port = 5000; // port 번호를 5000번으로 설정
const bodyParser = require("body-parser"); // body-parser를 가져온다.
const { User } = require("./models/User.js"); // 모델 스키마 가져오기

const config = require("./config/key.js"); // config 폴더에 있는 key.js를 가져온다.

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose // 몽구스를 이용해서 mongoDB에 연결
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World! 안녕하세요~"));

app.post("/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body); // body parser를 이용해서 json 형식으로 정보를 가져온다.

  user.save((err, userInfo) => {
    // 몽고디비에서 오는 메소드
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      // status(200)은 성공했다는 뜻
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
