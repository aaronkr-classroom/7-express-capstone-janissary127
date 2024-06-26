// main.js
// Capstone 2: Express
"use strict";

const port = 3000,
    express = require('express'),
    layouts = require('express-ejs-layouts'),
    bodyParser = require('body-parser'),
    homeController = require('./controllers/homeController'),
    errorController = require('./controllers/errorController'),
    app = express();

app.set("view engine", "ejs");
app.set("port", process.env.PORT || port);

// 앱 설정

/**
 * Listing 12.7 (p. 179)
 * ejs 레이아웃 렌더링
 */


app.use(layouts);
app.use(express.static("public"));
/**
 * Listing 12.4 (p. 177)
 * body-parser의 추가
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Listing 12.6 (p. 178)
 * 각 페이지 및 요청 타입을 위한 라우트 추가
 */
app.get("/",homeController.showIndex);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedContactForm);

/**
 * Listing 12.12 (p. 184)
 * 에러 처리 라우트 
 */
app.use(errorController.logErrors);
app.use(errorController.pageNotFoundError);
app.use(errorController.interalServerError);

// 3000번 포트로 리스닝 설정
app.listen(app.get("port"), () => {
    console.log(`Server at: http://localhost:${app.get("port")}`);
});