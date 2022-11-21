import { useState, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import nextId from "react-id-generator";
import "./App.css";

function App() {
  const tareaLocal = JSON.parse(localStorage.getItem("tarea")) || [];
  const [task, setTask] = useState(tareaLocal || []);
  const [inputValue, setInputValue] = useState("");
  let htmlId = nextId();

  const addTask = (t) => {
    if (t) {
      setTask([...task, { id: htmlId, name: t, list: "inProcess" }]);
      setInputValue("");
    } else {
      console.log("no value");
    }
  };
  const finishTask = (t) => {
    let finish = [];
    task.forEach((tarea) => {
      if (tarea === t) {
        tarea.list = "finished";
        finish.push(tarea);
      } else {
        finish.push(tarea);
      }
      setTask(finish);
    });
  };
  const inProcessTask = (t) => {
    let process = [];
    task.forEach((tarea) => {
      if (tarea === t) {
        tarea.list = "inProcess";
        process.push(tarea);
      } else {
        process.push(tarea);
      }
      setTask(process);
    });
  };
  const deleteTask = (t) => {
    let newList = [];
    task.forEach((tarea) => {
      if (tarea.id !== t.id) {
        newList.push(tarea);
      }
      setTask(newList);
    });
  };

  useEffect(() => {
    localStorage.setItem("tarea", JSON.stringify(task));
  }, [task]);
  console.log(task);

  return (
    <body className="d-flex flex-column mx-auto justify-content-center  col-6">
      <Container className="App card my-2 cards-bg pb-2">
        <Row>
          <h1 className="letters-color"> To-Do List </h1>
        </Row>
        <Row className=" justify-content-between">
          <div className="col-6">
            <input
              className="col-12"
              type="text"
              placeholder="Type here a task..."
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            ></input>
          </div>
          <div className="col-6">
            <Button
              className="btn-warning "
              onClick={(e) => addTask(inputValue)}
            >
              Send
            </Button>
          </div>
        </Row>
      </Container>
      <Container className="App card my-2 cards-bg">
        <Row>
          <h2 className="letters-color">In Process...</h2>
        </Row>
        <Row className="text-white justify-content-between ">
          {task.some((i) => i.list === "inProcess") ? (
            task
              .filter((t) => t.list === "inProcess")
              .map((t) => (
                <Row className="d-flex" key={t.id}>
                  <div className="col-6">{t.name}</div>
                  <div className="col-6">
                    <Button
                      className="btn-success"
                      onClick={(e) => finishTask(t)}
                    >
                      Finished
                    </Button>
                    <Button
                      className="btn-danger"
                      onClick={(e) => deleteTask(t)}
                    >
                      Delete
                    </Button>
                  </div>
                </Row>
              ))
          ) : (
            <div className="mx-auto col-12">Nothing here!</div>
          )}
        </Row>
      </Container>
      <Container className="App card my-2 cards-bg">
        <Row>
          <h2 className="letters-color">Finished!!</h2>
        </Row>
        <Row className="text-white justify-content-between">
          {task.some((i) => i.list === "finished") ? (
            task
              .filter((t) => t.list === "finished")
              .map((t) => (
                <Row className="d-flex" key={t.id}>
                  <div className="col-6">{t.name}</div>
                  <div className="col-6">
                    <Button
                      className="btn-light"
                      onClick={(e) => inProcessTask(t)}
                    >
                      In Process
                    </Button>
                    <Button
                      className="btn-danger"
                      onClick={(e) => deleteTask(t)}
                    >
                      Delete
                    </Button>
                  </div>
                </Row>
              ))
          ) : (
            <div>Nothing here!</div>
          )}
        </Row>
      </Container>
    </body>
  );
}

export default App;
