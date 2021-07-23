import Carousel from "../../components/Carousel";
import TodoItem from "../../components/TodoItem";
import { TodoItemType, TTodoItem } from "../../types";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 468 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 468, min: 0 },
    items: 1,
  },
};

const todoList = [
  {
    title: "Complete your profile",
    dueDate: new Date(2021, 6, 19),
    type: TodoItemType.COMPLETE_INTAKE_FORM,
  },
  {
    title: "Verify your ID",
    dueDate: new Date(2021, 6, 20),
    type: TodoItemType.VERIFY_ID,
  },
  {
    title: "Check your progress",
    dueDate: new Date(2021, 6, 19),
    type: TodoItemType.CHECK_YOUR_PROGRESS,
  },
  {
    title: "Complete your profile",
    dueDate: new Date(2021, 6, 19),
    type: TodoItemType.COMPLETE_INTAKE_FORM,
  },
  {
    title: "Verify your ID",
    dueDate: new Date(2021, 6, 20),
    type: TodoItemType.VERIFY_ID,
  },
  {
    title: "Check your progress",
    dueDate: new Date(2021, 6, 19),
    type: TodoItemType.CHECK_YOUR_PROGRESS,
  },
] as TTodoItem[];

interface TodoListProps {
  onClick?: (item: TTodoItem) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onClick }) => {
  const handleClickItem = (item: TTodoItem) => {
    onClick?.(item);
  };

  return (
    <Carousel title="To-do Items" responsive={responsive}>
      {todoList.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          onClick={() => handleClickItem(item)}
        />
      ))}
    </Carousel>
  );
};

export default TodoList;
