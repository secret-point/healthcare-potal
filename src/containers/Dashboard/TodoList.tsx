import { useMemo } from "react";
import { useGetMemberTodos } from "../../api";
import Carousel from "../../components/Carousel";
import TodoItem from "../../components/TodoItem";
import { TTodoItem } from "../../types";

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
    partialVisibilityGutter: 40,
    breakpoint: { max: 468, min: 0 },
  },
};

interface TodoListProps {
  onClickItem?: (item: TTodoItem) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onClickItem }) => {
  const { data: todoList = [] } = useGetMemberTodos();

  const handleClickItem = (item: TTodoItem) => {
    onClickItem?.(item);
  };

  const incompletedTodos = useMemo(
    () => todoList.filter((todo) => !todo.completed),
    [todoList]
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
          onClick={() => handleClickItem(todoItem)}
        />
      ))}
    </Carousel>
  );
};

export default TodoList;
