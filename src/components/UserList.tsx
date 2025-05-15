import { Children } from "react";

const UserList = ({ children }) => {
  return (
    <ul>
      {Children.map(children, (child) => (
        <li className="hover:bg-gray-50 active:bg-gray-50 p-3 flex items-center justify-between">
          {child}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
