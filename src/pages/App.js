import moment from "moment";
import { Button, Card, CardBody, CardHeader, CardTitle, Form, Input, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTodos, toggleTodo, addNewTodo } from "../store/todo";
import Collapsible from "react-collapsible";

let time = moment().format("dddd, D MMM, YYYY");

function App({ todos, getTodos, toggleTodo, addNewTodo }) {
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState({});

  const toggle = () => setModal(!modal);

  function getNewTask(e) {
    setTask({ id: todos.length + 1, title: e.target.value, completed: false, tasks: [] });
  }

  function submitTask() {
    addNewTodo(task);
    toggle();
  }

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <Card className="col-md-4 offset-4 mt-5 shadow">
            <CardHeader>
              <CardTitle tag="h6" className={"fst-italic"}>
                {time}
              </CardTitle>
            </CardHeader>

            <CardTitle tag="h3">To do list</CardTitle>

            <CardBody>
              {todos.map((item) => (
                <div className={"todo-list"} key={item.id}>
                  <Collapsible
                    trigger={<p className={item.completed ? "text-decoration-line-through" : ""}>{item.title}</p>}
                    easing={"ease"}>
                    {item.tasks.map((task) => (
                      <li key={task.taskId}>
                        - {task.title}
                        <Input
                          className={"task-checkbox"}
                          type={"checkbox"}
                          defaultChecked={item.completed}
                          onChange={() => toggleTodo(item)}
                        />
                      </li>
                    ))}
                  </Collapsible>
                  <Input type={"checkbox"} defaultChecked={item.completed} onChange={() => toggleTodo(item)} />
                </div>
              ))}
            </CardBody>

            <Button className={"addButton"} onClick={toggle}>
              +
            </Button>
          </Card>
          <Modal isOpen={modal} toggle={toggle}>
            <Form onChange={getNewTask}>
              <ModalBody>
                <h2>Add new task</h2>
                <Input type="text" name="text" id="task" placeholder="write task here..." />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={submitTask}>
                  Save
                </Button>
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default connect(({ todos }) => ({ todos }), { getTodos, toggleTodo, addNewTodo })(App);
