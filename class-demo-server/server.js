const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// 미들웨어 설정
app.use(cors()); // CORS 허용
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ===== 기본 페이지 =====
app.get("/", (req, res) => { 
    res.render("index");
});

// ===== GET 요청 실습 =====
// 검색어 1개 버전(get_result.ejs)
app.get("/search", (req, res) => {
    const query = req.query.q || "";
    res.render("get_result", { query });
});

// 값 2개 버전(get_result2.ejs)
app.get("/search2", (req, res) => {
    const v1 = req.query.value1 || "";
    const v2 = req.query.value2 || "";
    res.render("get_result2", { v1, v2 });
});

// ===== POST 요청 실습 =====
// text 제출 버전(post_result.ejs)
app.post("/submit", (req, res) => {
    const text = req.body.text || "";
    res.render("post_result", { text });
});

// 숫자 계산(form_result.ejs)
app.post("/submit-form", (req, res) => {
    const v1 = Number(req.body.value1);
    const v2 = Number(req.body.value2);

    const r1 = v1 % v2; // 예시: 나머지 연산

    res.render("form_result", { r1, v1, v2 });
});

// ===== JSON API =====
app.get("/api/data", (req, res) => {
    res.json({
        title: "서버에서 보낸 데이터입니다.",
        timestamp: Date.now()
    });
});

app.post("/api/save", (req, res) => {
    const text = req.body.text;
    console.log("클라이언트가 보낸 데이터:", text);

    res.json({ success: true, received: text });
});

// ===== 서버 실행 =====
app.listen(10000, () => {
    console.log("Server running on port 10000");
});
