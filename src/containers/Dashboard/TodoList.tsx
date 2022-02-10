import { useMemo } from "react";
import { useGetMemberTodos } from "src/api";
import Carousel from "src/components/Carousel";
import TodoItem from "src/components/TodoItem";
import { TodoItemType, TTodoItem, User } from "src/types";

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

  const incompletedTodos = useMemo(() => {
    const hasTrackProgressCard = todoList.some(
      (todo) =>
        !todo.completed &&
        todo.todoItemType === TodoItemType.TRACK_YOUR_PROGRESS
    );

    return todoList.filter((todo) => {
      if (todo.completed) {
        return false;
      }

      // For now we will not show the verify id todoItem
      if (todo.todoItemType === TodoItemType.VERIFY_ID) {
        return false;
      }

      // If user status is not pending, and todoItem is not completed, we will filter it out
      if (
        user.status !== "Pending" &&
        todo.todoItemType === TodoItemType.COMPLETE_INTAKE_FORM
      ) {
        return false;
      }

      // If user has both track and check card, we will delete check card.
      if (
        hasTrackProgressCard &&
        todo.todoItemType === TodoItemType.CHECK_YOUR_PROGRESS
      ) {
        return false;
      }

      return true;
    });
  }, [user.status, todoList]);

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
