import React, { useCallback, useEffect, useState } from "react";
import { getPosts, putPosts, postPosts, deletePosts } from "./apis/posts";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchBoardList, deleteBoard } from "./apis/board";
import { serverLogin } from "./apis/auth";

export default function App() {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    fetchBoardList().then((data) => {
      setBoardList(data);
    });
  }, []);

  const removeBoard = useCallback((boardId) => {
    deleteBoard(boardId).then((resp) => {
      setBoardList((prev) => prev.filter((board) => board.id !== boardId));
    });
  }, []);

  // const removeBoard = (boardId)=>{
  //   deleteBoard(boardId).then(resp=>{
  //     setBoardList(boardList.filter(board=>board.id !== boardId));
  //   });

  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  return (
    <Container>
      <Row>
        <Col sm={6}>
          {user ? (
            <>
              <div>{user.email}님 환영합니다.</div>
              <div>
                <h3>글쓰기</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="content">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                  <Button variant="글쓰기"></Button>
                </Form>
              </div>
            </>
          ) : (
            <div>
              <h3>로그인</h3>
              <Form.Group className="mb-3" controlId="user-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="name@example.com"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={(e) => {
                  serverLogin({ email, password }).then((data) => {
                    setUser(data);
                    // console.log(data);
                  });
                }}
              >
                로그인
              </Button>
            </div>
          )}
        </Col>
        <Col sm={6}>
          <h1>Posts</h1>
          <ListGroup>
            {boardList.map((board) => {
              return (
                <ListGroup.Item key={board.id}>
                  <div>
                    <h5>{board.title}</h5>
                    <div>{board.content}</div>
                  </div>
                  <span
                    onClick={() => removeBoard(board.id)}
                    style={{ position: "absolute", top: 3, right: 3 }}
                  >
                    X
                  </span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
