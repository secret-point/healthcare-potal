import { useMemo } from "react";
import { useGetMemberTodos } from "../../api";
import Carousel from "../../components/Carousel";
import TodoItem from "../../components/TodoItem";
import { TodoItemType, TTodoItem, User } from "../../types";

const responsive = {
  desktop: {
    items: 4,
    partialVisibilityGutter: 40,
    breakpoint: { max: 3000, min: 1024 },
  },
  tablet: {
    items: 2,
    partialVisibilityGutter: 40,
    breakpoint: { max: 1024, min: 468 },
  },
  mobile: {
    items: 1,
    partialVisibilityGutter: 0,
    breakpoint: { max: 468, min: 0 },
  },
};

interface TodoListProps {
  user: User;
  onClickItem: (item: TTodoItem) => void;
}

const TodoList: React.FC<TodoListProps> = ({ user, onClickItem }) => {
  const { data: todoList = [] } = useGetMemberTodos();

  const incompletedTodos = useMemo(
    () =>
      todoList.filter((todo) => {
        if (todo.completed) return false;
        // For now we will not show the verify id todoItem
        if (todo.todoItemType === TodoItemType.VERIFY_ID) return false;
        // If user status is not pending, and todoItem is not completed, we will filter it out
        if (
          user.status !== "Pending" &&
          todo.todoItemType === TodoItemType.COMPLETE_INTAKE_FORM
        ) {
          return false;
        }

        return true;
      }),
    [user.status, todoList]
  );

  return (
    <Carousel
      title="To-do Items"
      itemCount={incompletedTodos.length}
      responsive={responsive}
    >
      {incompletedTodos?.map((todoItem) => (
        <TodoItem
          key={todoItem._id}
          item={todoItem}
          onClick={() => onClickItem(todoItem)}
        />
      ))}
    </Carousel>
  );
};

export default TodoList;
