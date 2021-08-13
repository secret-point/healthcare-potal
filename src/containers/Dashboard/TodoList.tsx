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
  userId: string;
  onClickItem?: (item: TTodoItem) => void;
}

const TodoList: React.FC<TodoListProps> = ({ userId, onClickItem }) => {
  const { data: todoList = [] } = useGetMemberTodos(userId);

  const handleClickItem = (item: TTodoItem) => {
    onClickItem?.(item);
  };

  return (
    <Carousel
      title="To-do Items"
      itemCount={todoList.length}
      missingCount={todoList.length}
      responsive={responsive}
    >
      {todoList?.map((todoItem) => (
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
